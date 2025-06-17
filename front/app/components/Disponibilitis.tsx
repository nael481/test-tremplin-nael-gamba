import { useState } from "react";

export default function AvailabilityManager() {
  const [disponibilites, setDisponibilites] = useState([]);
  const [selectedHour, setSelectedHour] = useState(9);
  const validHours = [9, 10, 11, 14, 15, 16, 17, 18];
  const getValidMinutes = (hour) => {
    if (hour === 9) return [30, 45];
    if (hour === 18) return [0, 15];
    return [0, 15, 30, 45];
  };
  const ajouterDisponibilite = (jour, heure, minute) => {
    const paddedMinute = minute.toString().padStart(2, "0");
    const nouvelleDispo = `${jour} à ${heure}h${paddedMinute}`;
    setDisponibilites([...disponibilites, nouvelleDispo]);
  };
  const supprimerDisponibilite = (index) => {
    setDisponibilites(disponibilites.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div className="text-white font-semibold mb-2">DISPONIBILITÉS POUR UNE VISITE</div>
      <div className="flex gap-2 mb-4">
        <select id="jour" className="rounded-full px-3 py-1">
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
        </select>

        <select
          id="heure"
          className="rounded-full px-3 py-1"
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
        >
          {validHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}h
            </option>
          ))}
        </select>

        <select id="minute" className="rounded-full px-3 py-1">
          {getValidMinutes(selectedHour).map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        <button
          className="bg-purple-700 text-white px-4 py-1 rounded-full"
          onClick={() => {
            const jour = document.getElementById("jour").value;
            const heure = parseInt(document.getElementById("heure").value);
            const minute = parseInt(document.getElementById("minute").value);
            ajouterDisponibilite(jour, heure, minute);
          }}
        >
          AJOUTER DISPO
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {disponibilites.map((dispo, index) => (
          <div
            key={index}
            className="bg-white rounded-full px-4 py-1 flex justify-between items-center text-sm shadow-md"
          >
            {dispo}
            <span
              className="text-gray-500 cursor-pointer"
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
