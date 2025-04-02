// src/pages/dashboard/PeticionForm.jsx
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
      });

      toast.success("Petición enviada");
      setForm({ rango: "", userType: "", texto: "" });
    } catch (err) {
      toast.error("Error al enviar petición");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Solicitar cambio
      </h2>
      <form onSubmit={enviarPeticion} className="space-y-4">
        <div>
          <label>Nuevo Rango (opcional)</label>
          <select
            name="rango"
            value={form.rango}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Seleccionar --</option>
            {RANGOS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Nuevo Tipo de Usuario (opcional)</label>
          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Seleccionar --</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Motivo</label>
          <textarea
            name="texto"
            value={form.texto}
            onChange={handleChange}
            className="input"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-primary w-full">
          Enviar Petición
        </button>
      </form>
    </div>
  );
}
