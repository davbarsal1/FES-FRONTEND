// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CenteredPage from "../components/CenteredPage";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    habbousername: "",
    email: "",
    password: "",
  });

  const API_URL = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user/registro"
    : "http://localhost:8080/api/user/registro";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      toast.success("Registro exitoso. Ya puedes iniciar sesión.");
    } catch (error) {
      toast.error(error.response?.data || "Error al registrar.");
    }
  };

  return (
    <CenteredPage>
      <div className="w-full max-w-md mx-auto bg-zinc-900 p-6 rounded-xl border border-yellow-600 shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center">
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            name="habbousername"
            placeholder="Habbo Username"
            value={form.habbousername}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </CenteredPage>
  );
}
