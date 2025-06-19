// disponibilites.ts
// Ce fichier contient l'API pour gérer les disponibilités utilisateur, permettant de les insérer ou de les récupérer depuis la base de données.

import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

type Disponibilite = {
  id: number;
  jour: string;
  heure: number;
  minute: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message?: string; error?: unknown; rows?: Disponibilite[] }>
) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'verysecurepassword',
        database: 'app_data',
      });

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM Disponibilités'
      );

      const disponibilites = rows as Disponibilite[];

      res.status(200).json({ rows: disponibilites });
    } catch (error) {
      res.status(500).json({ message: 'Erreur de connexion à la base de données', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
