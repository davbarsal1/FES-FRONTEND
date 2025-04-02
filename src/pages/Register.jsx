// src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CenteredPage from "../components/CenteredPage";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    habboUsername: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const API_URL = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, habbousername, email, password } = form;

    if (!username || !habbousername || !email || !password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.post(`${API_URL}/registro`, form);
      toast.success("Registro exitoso");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error("Error al registrarse");
    }
  };

  return (
    <CenteredPage>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-800">
          Registro
        </h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="input"
        />
        <input
          name="habbousername"
          placeholder="Habbo Username"
          onChange={handleChange}
          className="input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn-primary mt-2">
          Registrarse
        </button>
      </form>
    </CenteredPage>
  );
}
