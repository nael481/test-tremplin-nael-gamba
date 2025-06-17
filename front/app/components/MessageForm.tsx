export default function MessageForm() {
  return (
    <div>
      <div className="text-white font-semibold mb-2">VOTRE MESSAGE</div>

      <div className="flex gap-4 mb-4 text-white">
        <label>
          <input type="radio" name="demande" /> Demande de visite
        </label>
        <label>
          <input type="radio" name="demande" /> Être rappelé.e
        </label>
        <label>
          <input type="radio" name="demande" /> Plus de photos
        </label>
      </div>

      <textarea
        placeholder="Votre message"
        rows={8}
        className="w-full px-4 py-2 rounded-2xl"
      ></textarea>

      <div className="mt-6">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-8 rounded-full float-right">
          ENVOYER
        </button>
      </div>
    </div>
  );
}