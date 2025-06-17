"use client";

import CoordinatesForm from "./components/CoordinatesForm";
import AvailabilityManager from "./components/Disponibilitis";
import MessageForm from "./components/MessageForm";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/salon.png')" }}
    >
      <div className="bg-white/50 backdrop-blur-md rounded-3xl p-10 w-[95%] max-w-6xl shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-white text-2xl font-bold mb-6">CONTACTEZ L’AGENCE</h2>
          <CoordinatesForm />
          <AvailabilityManager />
        </div>
        <div>
          <MessageForm />
        </div>
      </div>
    </div>
  );
}
