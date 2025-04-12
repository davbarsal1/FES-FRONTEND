// src/pages/dashboard/RegistrarActividad.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

export default function RegistrarActividad() {
  const { usuario } = useUser();
  const [tipo, setTipo] = useState("JUEGO");
  const [guia, setGuia] = useState("");
  const [participantes, setParticipantes] = useState([{ nombre: "", pda: 0.5 }]);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/actividad"
    : "http://localhost:8080/api/actividad";

  const handleChangeParticipante = (index, field, value) => {
    const updated = [...participantes];
    updated[index][field] = field === "pda" ? parseFloat(value) : value;
    setParticipantes(updated);
  };

  const agregarParticipante = () => {
    setParticipantes([...participantes, { nombre: "", pda: 0.5 }]);
  };

  const enviar = async (e) => {
    e.preventDefault();
    if (!guia || participantes.some(p => !p.nombre)) {
      toast.error("Todos los campos deben completarse");
      return;
    }

    const data = {
      tipo,
      supervisor: usuario.username,
      guia,
      participantes: Object.fromEntries(participantes.map(p => [p.nombre, p.pda]))
    };

    try {
      await axios.post(`${API}/registrar`, data);
      toast.success("✅ ¡Registro de actividad exitoso!");
      setGuia("");
      setParticipantes([{ nombre: "", pda: 0.5 }]);
    } catch {
      toast.error("Error al registrar actividad");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8 bg-black text-white rounded-xl border border-yellow-600 shadow">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Registrar Actividad</h2>

      <form onSubmit={enviar} className="space-y-6">
        <div>
          <label className="block font-semibold text-yellow-300 mb-1">Tipo de Actividad</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-yellow-500"
          >
            <option value="JUEGO">Juego</option>
            <option value="ATAQUE">Ataque</option>
            <option value="DEFENSA">Defensa</option>
            <option value="MARCHA">Marcha</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-yellow-300 mb-1">Guía</label>
          <input
            type="text"
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-yellow-500"
            placeholder="Nombre del guía"
          />
        </div>

        <div>
          <label className="block font-semibold text-yellow-300 mb-1">Participantes</label>
          {participantes.map((p, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <input
                type="text"
                placeholder="Usuario"
                value={p.nombre}
                onChange={(e) => handleChangeParticipante(i, "nombre", e.target.value)}
                className="flex-1 bg-gray-900 text-white p-2 rounded border border-yellow-500"
              />
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="PDA"
                value={p.pda}
                onChange={(e) => handleChangeParticipante(i, "pda", e.target.value)}
                className="w-24 bg-gray-900 text-white p-2 rounded border border-yellow-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={agregarParticipante}
            className="text-sm mt-2 text-yellow-400 hover:text-yellow-300 transition"
          >
            + Agregar participante
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Registrar Actividad
        </button>
      </form>
    </div>
  );
}
