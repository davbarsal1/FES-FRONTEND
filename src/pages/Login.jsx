import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CenteredPage from "../components/CenteredPage";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUser();

  const API_URL = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      toast.error("Complete todos los campos");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, form);

      if (res.status === 200) {
        // obtener datos del usuario para usar en el contexto
        const userData = await axios.get(`${API_URL}/getUser?username=${username}`);
        login(userData.data);
        toast.success("Bienvenido");
        setTimeout(() => navigate("/admin"), 1500);
      } else {
          console.log(res);
        toast.error("Respuesta inesperada del servidor");
      }

    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Credenciales incorrectas");
      } else if (err.response?.status === 408) {
        toast.warn("Servidor ocupado, intente de nuevo");
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <CenteredPage>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-800">
          Iniciar Sesión
        </h2>
        <input
          name="username"
          type="user"
          placeholder="Username"
          onChange={handleChange}
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn-primary mt-2">
          Ingresar
        </button>
      </form>
    </CenteredPage>
  );
}
