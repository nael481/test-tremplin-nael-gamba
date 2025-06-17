export default function CoordinatesForm() {
  return (
    <div>
      <div className="mb-4 text-white font-semibold">VOS COORDONNÉES</div>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-1 text-white">
          <input type="radio" name="sexe" value="Mme" /> Mme
        </label>
        <label className="flex items-center gap-1 text-white">
          <input type="radio" name="sexe" value="M" /> M
        </label>
      </div>

      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="Nom" className="w-1/2 px-4 py-2 rounded-full" />
        <input type="text" placeholder="Prénom" className="w-1/2 px-4 py-2 rounded-full" />
      </div>
      <input type="email" placeholder="Adresse mail" className="w-full px-4 py-2 mb-4 rounded-full" />
      <input type="tel" placeholder="Téléphone" className="w-full px-4 py-2 mb-6 rounded-full" />
    </div>
  );
}