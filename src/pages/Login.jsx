import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import CenteredPage from "../components/CenteredPage";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const API_URL = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user/login"
    : "http://localhost:8080/api/user/login";

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, form);
      login(res.data);
      toast.success("Sesión iniciada");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data || "Error al iniciar sesión");
    }
  };

  return (
    <CenteredPage>
      <div className="w-full max-w-md mx-auto bg-zinc-900 p-6 rounded-xl border border-yellow-600 shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center">
          Iniciar sesión
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
            Ingresar
          </button>
        </form>
      </div>
    </CenteredPage>
  );
}
