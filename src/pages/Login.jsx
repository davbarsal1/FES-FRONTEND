import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import CenteredBox from "../components/CenteredBox";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user/login"
    : "http://localhost:8080/api/user/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, { username, password });
      toast.success("Inicio de sesión exitoso");

      const userRes = await axios.get(
        `${API.replace("/login", "/getUser")}?username=${username}`
      );

      login(userRes.data);

      if (userRes.data.userType === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <ToastContainer />
        <CenteredBox>
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-3 py-2 rounded border border-black text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-yellow-400 font-semibold py-2 rounded hover:bg-yellow-500 hover:text-black transition"
            >
              Ingresar
            </button>
          </form>
        </CenteredBox>
      </div>
    </div>
  );
}
