// src/pages/dashboard/RegistrarPublicidad.jsx
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegistrarPublicidad() {
  const { usuario } = useUser();
  const [username, setUsername] = useState("");
  const [personasTraidas, setPersonasTraidas] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/publicidad"
    : "http://localhost:8080/api/publicidad";

  const API_USERS = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await axios.get(API_USERS);
        setUsuarios(res.data);
      } catch {
        toast.error("Error al cargar usuarios");
      }
    };
    cargarUsuarios();
  }, []);

  const sugerenciasUsuarios = (input) =>
    input
      ? usuarios
          .filter((u) => u.username.toLowerCase().includes(input.toLowerCase()))
          .slice(0, 5)
      : [];

  const sugerencias = sugerenciasUsuarios(username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || parseInt(personasTraidas) < 0) {
      toast.error("Completa todos los campos correctamente");
      return;
    }

    try {
      await axios.post(`${API}/registrar`, {
        username,
        supervisor: usuario.username,
        personasTraidas: parseInt(personasTraidas),
      });
      toast.success("Publicidad registrada");
      setUsername("");
      setPersonasTraidas(0);
      setMostrarSugerencias(false);
    } catch {
      toast.error("Error al registrar publicidad");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black text-white p-6 rounded-xl border border-yellow-600 shadow mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
        📢 Registrar Publicidad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Usuario que realizó la publicidad"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setMostrarSugerencias(true);
            }}
            onFocus={() => setMostrarSugerencias(true)}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-yellow-600"
          />
          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul className="absolute z-10 w-full bg-zinc-900 border border-yellow-600 mt-1 rounded shadow max-h-48 overflow-auto">
              {sugerencias.map((u) => (
                <li
                  key={u.username}
                  onClick={() => {
                    setUsername(u.username);
                    setMostrarSugerencias(false);
                  }}
                  className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          min="0"
          placeholder="Personas traídas"
          value={personasTraidas}
          onChange={(e) => setPersonasTraidas(e.target.value)}
          className="w-full bg-gray-900 text-white px-4 py-2 rounded border border-yellow-600"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
