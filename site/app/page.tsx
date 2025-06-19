// page.tsx
// Gestion de la partie front-end.
"use client";

import { useState } from "react";
import CoordinatesForm from "./components/CoordinatesForm";
import AvailabilityManager from "./components/Disponibilitis";
import MessageForm from "./components/MessageForm";
import { Coordinates } from "./types";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    sexe: "Mme",
    Nom: "",
    Prenom: "",
    Email: "",
    Téléphone: "",
  });

  const [disponibilites, setDisponibilites] = useState<
    { jour: string; heure: number; minute: number }[]
  >([]);

  const [message, setMessage] = useState<{ demande: string; message: string }>({
    demande: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSendAll = async () => {
    if (!captchaToken) {
      alert("Veuillez compléter le captcha.");
      return;
    }

    const formattedMessage = {
      ...message,
      type:
        message.demande === "Demande de visite"
          ? "visite"
          : message.demande === "Être rappelé.e"
          ? "rappel"
          : message.demande === "Plus de photos"
          ? "photos"
          : null,
    };

    if (!formattedMessage.type) {
      alert("Valeur de demande invalide. Veuillez choisir une option valide.");
      return;
    }

    try {
      const response = await fetch("/api/combined", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coordinates,
          disponibilites,
          message: formattedMessage,
          captchaToken,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi des données");

      alert("Toutes les données ont été envoyées avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi des données.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-10 pl-8">
          <h1 className="text-white text-6xl font-bold drop-shadow-lg absolute top-10 left-25">
            CONTACTEZ L’AGENCE
          </h1>
          <div className="flex flex-col gap-10 mt-[3cm]">
            <CoordinatesForm setCoordinates={setCoordinates} />
            <AvailabilityManager setDisponibilites={setDisponibilites} />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-10 justify-between">
          <div className="flex flex-col gap-10 mt-[3cm]">
            <MessageForm setMessage={setMessage} />
          </div>
          <button
            onClick={handleSendAll}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-2 rounded-full text-sm self-end mt"
          >
            ENVOYER
          </button>
        </div>
      </div>

      {/* CAPTCHA centré en bas de page */}
      <div className="mt-4">
        <ReCAPTCHA
          sitekey="6LejrWUrAAAAAO87KTNKe5GefDWAGbou9W7G0AGr"
          onChange={handleCaptchaChange}
        />
      </div>
    </div>
  );
}
