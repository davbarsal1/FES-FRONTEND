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
      login(res.data); // ✅ GUARDAMOS TODO EL USUARIO
      toast.success("Sesión iniciada");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data || "Error al iniciar sesión");
    }
  };

  return (
    <CenteredPage>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-black text-white border border-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-black text-white border border-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
        >
          Ingresar
        </button>
      </form>
    </CenteredPage>
  );
}
