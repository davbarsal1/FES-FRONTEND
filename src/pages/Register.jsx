import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CenteredBox from "../components/CenteredBox";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    habbousername: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user/registro"
    : "http://localhost:8080/api/user/registro";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      toast.success("Registro exitoso");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      toast.error("Error al registrarse");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <ToastContainer />
        <CenteredBox>
          <h2 className="text-2xl font-bold mb-6">Registro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="habbousername"
              placeholder="Habbo Username"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={form.habbousername}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-yellow-400 font-semibold py-2 rounded hover:bg-yellow-500 hover:text-black transition"
            >
              Registrarse
            </button>
          </form>
        </CenteredBox>
      </div>
    </div>
  );
}
