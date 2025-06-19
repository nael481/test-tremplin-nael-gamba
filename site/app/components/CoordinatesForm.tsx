// CoordinatesForm.tsx
// Ce composant gère le formulaire des coordonnées utilisateur, adapté pour correspondre à la maquette.

"use client";
import { useState } from "react";
import { Coordinates } from "../types";

export default function CoordinatesForm({
  setCoordinates,
}: {
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
}) {
  const [formData, setFormData] = useState<Coordinates>({
    sexe: "Mme",
    Nom: "",
    Prenom: "",
    Email: "",
    Téléphone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setCoordinates(updatedData);
  };

  return (
    <div className="form">
      <h2>VOS COORDONNÉES</h2>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="sexe"
            value="Mme"
            onChange={handleChange}
            checked={formData.sexe === "Mme"}
          />
          Mme
        </label>
        <label>
          <input
            type="radio"
            name="sexe"
            value="M"
            onChange={handleChange}
            checked={formData.sexe === "M"}
          />
          M
        </label>
      </div>

      <div className="row">
        <input
          type="text"
          name="Nom"
          placeholder="Nom"
          value={formData.Nom}
          className="col"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Prenom"
          placeholder="Prénom"
          value={formData.Prenom}
          className="col"
          onChange={handleChange}
        />
      </div>

      <input
        type="email"
        name="Email"
        placeholder="Adresse mail"
        value={formData.Email}
        className="col"
        onChange={handleChange}
      />
      <input
        type="tel"
        name="Téléphone"
        placeholder="Téléphone"
        value={formData.Téléphone}
        className="col"
        onChange={handleChange}
      />
    </div>
  );
}
