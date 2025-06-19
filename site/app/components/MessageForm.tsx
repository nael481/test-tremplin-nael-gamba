"use client";
import { useState } from "react";
import { Message } from "../types";

export default function MessageForm({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
}) {
  const [formData, setFormData] = useState<Message>({ demande: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setMessage(updated);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, demande: value }));
    setMessage((prev) => ({ ...prev, demande: value }));
  };

  return (
    <div className="form">
      <h2>VOTRE MESSAGE</h2>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="demande"
            value="Demande de visite"
            onChange={handleRadioChange}
            checked={formData.demande === "Demande de visite"}
          />
          Demande de visite
        </label>
        <label>
          <input
            type="radio"
            name="demande"
            value="Être rappelé.e"
            onChange={handleRadioChange}
            checked={formData.demande === "Être rappelé.e"}
          />
          Être rappelé.e
        </label>
        <label>
          <input
            type="radio"
            name="demande"
            value="Plus de photos"
            onChange={handleRadioChange}
            checked={formData.demande === "Plus de photos"}
          />
          Plus de photos
        </label>
      </div>

      <textarea
        name="message"
        placeholder="Votre message"
        value={formData.message}
        className="col message-textarea"
        onChange={handleChange}
      />
    </div>
  );
}
