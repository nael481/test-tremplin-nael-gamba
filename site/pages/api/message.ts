// message.ts
// Ce fichier contient l'API pour gérer les messages utilisateur, permettant de les insérer ou de les récupérer depuis la base de données.

import type { NextApiRequest, NextApiResponse } from "next";
import mysql, { RowDataPacket } from "mysql2/promise";

type DemandeBody = {
  message: string;
  demande: "Demande de visite" | "Être rappelé.e" | "Plus de photos";
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
    const body: DemandeBody = req.body;

    const demandeValue =
      body.demande === "Demande de visite"
        ? "visite"
        : body.demande === "Être rappelé.e"
        ? "rappel"
        : body.demande === "Plus de photos"
        ? "photos"
        : null;

    if (demandeValue === null) {
      res.status(400).json({ message: "Valeur de demande invalide" });
      return;
    }

    console.log("Données reçues:", { message: body.message, demande: demandeValue });

    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "verysecurepassword",
        database: "app_data",
      });

      // Vérification de la colonne user_id
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT id FROM Users LIMIT 1"
      );
      const userId = rows.length > 0 ? rows[0].id : null;

      if (!userId) {
        res.status(500).json({ message: "Aucun utilisateur trouvé pour l'insertion" });
        return;
      }

      await connection.execute(
        "INSERT INTO Demandes (user_id, message, type) VALUES (?, ?, ?)",
        [userId, body.message, demandeValue]
      );

      console.log("Requête SQL exécutée avec succès");
      res.status(200).json({ message: "Message ajouté avec succès" });
    } catch (error) {
      console.error("Erreur lors de la connexion ou de l’exécution de la requête SQL:", error);
      res.status(500).json({ message: "Erreur de connexion à la base de données", error });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
