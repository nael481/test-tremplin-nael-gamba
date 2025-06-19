// coordinates.ts
// Ce fichier contient l'API pour gérer les coordonnées utilisateur, permettant de les insérer ou de les récupérer depuis la base de données.

import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

type Coordinates = {
  sexe: "Mme" | "M";
  Nom: string;
  Prenom: string;
  Email: string;
  Téléphone: string;
};

type ResponseData = {
  message: string;
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const body: Coordinates = req.body;

    const sexeValue = body.sexe === "Mme" ? 1 : body.sexe === "M" ? 2 : null;
    if (sexeValue === null) {
      res.status(400).json({ message: "Valeur de sexe invalide" });
      return;
    }

    console.log("Données reçues:", { ...body, sexe: sexeValue });

    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "verysecurepassword",
        database: "app_data",
      });

      await connection.execute(
        "INSERT INTO Coordinates (sexe, Nom, Prenom, Email, Téléphone) VALUES (?, ?, ?, ?, ?)",
        [sexeValue, body.Nom, body.Prenom, body.Email, body.Téléphone]
      );

      console.log("Requête SQL exécutée avec succès");
      res.status(200).json({ message: "Coordonnées ajoutées avec succès" });
    } catch (error) {
      console.error("Erreur lors de la connexion ou de l’exécution de la requête SQL:", error);
      res.status(500).json({ message: "Erreur de connexion à la base de données", error });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
