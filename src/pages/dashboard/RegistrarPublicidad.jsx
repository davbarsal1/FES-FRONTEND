// src/pages/dashboard/RegistrarPublicidad.jsx
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegistrarPublicidad() {
  const { usuario } = useUser();
  const [username, setUsername] = useState("");
  const [personasTraidas, setPersonasTraidas] = useState(0);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/publicidad"
    : "http://localhost:8080/api/publicidad";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || personasTraidas < 0) {
      toast.error("Completa todos los campos correctamente");
      return;
    }

    try {
      await axios.post(`${API}/registrar`, {
        username,
        supervisor: usuario.username,
        personasTraidas: parseInt(personasTraidas)
      });
      toast.success("Publicidad registrada");
      setUsername("");
      setPersonasTraidas(0);
    } catch {
      toast.error("Error al registrar publicidad");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black text-white p-6 rounded-xl border border-yellow-600 shadow mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
        📢 Registrar Publicidad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario que realizó la publicidad"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-yellow-600"
        />
        <input
          type="number"
          placeholder="Personas traídas"
          value={personasTraidas}
          onChange={(e) => setPersonasTraidas(e.target.value)}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-yellow-600"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
