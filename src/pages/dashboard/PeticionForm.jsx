import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

export default function PeticionForm() {
  const { usuario } = useUser();

  const [form, setForm] = useState({
    rango: "",
    userType: "",
    texto: "",
    mision: ""
  });

  const RANGOS = [
    "MARINE", "SUBOFICIAL", "OFICIALALUMNO",
    "OFICIAL", "OFICIALGENERAL", "ELITE", "ZEALOT"
  ];
  const TIPOS = ["EMPLEADO", "MANDO", "ADMIN"];

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/peticion"
    : "http://localhost:8080/api/peticion";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarPeticion = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/crear`, {
        username: usuario.username,
        rango: form.rango || null,
        userType: form.userType || null,
        texto: form.texto,
        rangoEspecifico: form.mision || null,
      });

      toast.success("Petición enviada");
      setForm({ rango: "", userType: "", texto: "", mision: "" });
    } catch (err) {
      toast.error("Error al enviar petición");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black/80 text-white p-8 rounded-xl border border-yellow-500 shadow-md mt-10">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Solicitar Cambio</h2>

      <form onSubmit={enviarPeticion} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-yellow-300">Nuevo Rango (opcional)</label>
          <select
            name="rango"
            value={form.rango}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500 text-white"
          >
            <option value="">-- Seleccionar --</option>
            {RANGOS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-yellow-300">Nuevo Tipo de Usuario (opcional)</label>
          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500 text-white"
          >
            <option value="">-- Seleccionar --</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-yellow-300">Nueva Misión (opcional)</label>
          <input
            type="text"
            name="mision"
            placeholder="Ej: Director de Eventos"
            value={form.mision}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-yellow-300">Motivo</label>
          <textarea
            name="texto"
            value={form.texto}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500 text-white"
            required
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition"
        >
          Enviar Petición
        </button>
      </form>
    </div>
  );
}
