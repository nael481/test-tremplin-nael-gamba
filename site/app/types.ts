// types.ts
// Ce fichier contient les types utilisés dans le projet.

export type Coordinates = {
  sexe: "Mme" | "M";
  Nom: string;
  Prenom: string;
  Email: string;
  Téléphone: string;
};

export type Disponibilite = {
  jour: string;
  heure: number;
  minute: number;
};

export type Message = {
  demande: string;
  message: string;
};