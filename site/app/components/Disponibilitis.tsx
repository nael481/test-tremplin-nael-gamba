// Disponibilitis.tsx
// Ce composant gère les disponibilités pour une visite, adapté pour correspondre à la maquette.

"use client";
import { useState } from "react";
import { Disponibilite } from "../types";

export default function AvailabilityManager({
  setDisponibilites,
}: {
  setDisponibilites: React.Dispatch<
    React.SetStateAction<Disponibilite[]>
  >;
}) {
  const [disponibilites, setLocalDisponibilites] = useState<Disponibilite[]>([]);
  const [selectedHour, setSelectedHour] = useState(9);

  const validHours = [9, 10, 11, 14, 15, 16, 17, 18];
  const getValidMinutes = (hour: number) => {
    if (hour === 9) return [30, 45];
    if (hour === 18) return [0, 15];
    return [0, 15, 30, 45];
  };

  const ajouterDisponibilite = (jour: string, heure: number, minute: number) => {
    const nouvelleDispo = { jour, heure, minute };
    const updated = [...disponibilites, nouvelleDispo];
    setLocalDisponibilites(updated);
    setDisponibilites(updated);
  };

  const supprimerDisponibilite = (index: number) => {
    const updated = disponibilites.filter((_, i) => i !== index);
    setLocalDisponibilites(updated);
    setDisponibilites(updated);
  };

  return (
    <div className="form">
      <h2>DISPONIBILITÉS POUR UNE VISITE</h2>

      <div className="flex flex-row items-center space-x-2 my-4">
        <select id="jour" className="border rounded px-2 py-1">
          {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((jour) => (
            <option key={jour} value={jour}>
              {jour}
            </option>
          ))}
        </select>

        <select
          id="heure"
          className="border rounded px-2 py-1"
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
        >
          {validHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}h
            </option>
          ))}
        </select>

        <select id="minute" className="border rounded px-2 py-1">
          {getValidMinutes(selectedHour).map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-500 text-white rounded px-2 py-1 text-xs"
          onClick={() => {
            const jour = (document.getElementById("jour") as HTMLSelectElement).value;
            const heure = parseInt(
              (document.getElementById("heure") as HTMLSelectElement).value
            );
            const minute = parseInt(
              (document.getElementById("minute") as HTMLSelectElement).value
            );
            ajouterDisponibilite(jour, heure, minute);
          }}
        >
          AJOUTER<br />DISPO
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {disponibilites.map((dispo, index) => (
          <div
            key={index}
            className="bg-gray-100 px-2 py-1 rounded shadow text-sm flex items-center gap-1"
          >
            {`${dispo.jour} à ${dispo.heure}h${dispo.minute
              .toString()
              .padStart(2, "0")}`}
            <span
              className="text-red-500 font-bold cursor-pointer ml-1"
              onClick={() => supprimerDisponibilite(index)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
