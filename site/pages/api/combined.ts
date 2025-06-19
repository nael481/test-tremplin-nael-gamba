// combined.ts
// Ce fichier contient l'API qui combine les données des coordonnées, des disponibilités et du message pour les insérer dans la base de données.

import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import fetch from 'node-fetch';

const validateCaptcha = async (captchaToken: string): Promise<boolean> => {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=6LejrWUrAAAAANY3y6qxvftp2wkhB_mZDzj62HwW&response=${captchaToken}`,
  });

  const result = await response.json();
  return result.success;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { captchaToken, coordinates, message, disponibilites } = req.body;

    const isCaptchaValid = await validateCaptcha(captchaToken);
    if (!isCaptchaValid) {
      res.status(400).json({ message: 'Captcha invalide.' });
      return;
    }

    console.log('Données reçues par l’API:', { coordinates, message, disponibilites });

    // Validation des coordonnées
    if (
      !coordinates ||
      !coordinates.sexe ||
      !coordinates.Nom ||
      !coordinates.Prenom ||
      !coordinates.Email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      !coordinates.Téléphone.match(/^\+?[0-9]{10,15}$/)
    ) {
      console.log('Coordonnées manquantes ou invalides:', coordinates);
      res.status(400).json({ message: 'Les coordonnées sont incomplètes ou invalides' });
      return;
    }

    const sexeValue = coordinates.sexe === 'Mme' ? 1 : coordinates.sexe === 'M' ? 2 : null;
    if (sexeValue === null) {
      console.log('Valeur de sexe invalide:', coordinates.sexe);
      res.status(400).json({ message: 'Valeur de sexe invalide' });
      return;
    }

    // Validation du message
    if (!message.type || !message.message) {
      console.log('Message manquant ou invalide:', message);
      res.status(400).json({ message: 'Le message est incomplet ou invalide' });
      return;
    }

    // Validation des disponibilités
    if (
      !Array.isArray(disponibilites) ||
      disponibilites.some(
        (dispo) =>
          !dispo.jour ||
          typeof dispo.heure !== 'number' ||
          typeof dispo.minute !== 'number'
      )
    ) {
      console.log('Disponibilités manquantes ou invalides:', disponibilites);
      res.status(400).json({ message: 'Les disponibilités sont incomplètes ou invalides' });
      return;
    }

    try {
      const connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'verysecurepassword',
        database: 'app_data',
      });

      // Insérer les coordonnées avec une requête préparée
      const [coordinatesResult] = await connection.execute<mysql.ResultSetHeader>(
        'INSERT INTO Coordinates (sexe, Nom, Prenom, Email, Téléphone) VALUES (?, ?, ?, ?, ?)',
        [
          sexeValue,
          coordinates.Nom,
          coordinates.Prenom,
          coordinates.Email,
          coordinates.Téléphone,
        ]
      );

      const userId = coordinatesResult.insertId;

      // Insérer le message avec une requête préparée
      await connection.execute(
        'INSERT INTO Demandes (user_id, type, message) VALUES (?, ?, ?)',
        [userId, message.type, message.message]
      );

      // Insérer les disponibilités avec une requête préparée
      for (const dispo of disponibilites) {
        await connection.execute(
          'INSERT INTO Disponibilités (jour, heure, minute, user_id) VALUES (?, ?, ?, ?)',
          [dispo.jour, dispo.heure, dispo.minute, userId]
        );
      }

      res.status(200).json({ message: 'Toutes les données ont été ajoutées avec succès' });
    } catch (error) {
      console.error('Erreur lors de la connexion ou de l’exécution des requêtes SQL:', error);
      res.status(500).json({ message: 'Erreur de connexion à la base de données', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
