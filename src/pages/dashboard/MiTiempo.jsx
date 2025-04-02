// src/pages/dashboard/MiTiempo.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export default function MiTiempo() {
  const { usuario } = useUser();
  const [tiempo, setTiempo] = useState(null);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/tiempo"
    : "http://localhost:8080/api/tiempo";

  const formatearTiempo = (segundos) => {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API}/usuario?username=${usuario.username}`);
        setTiempo(res.data);
      } catch {
        console.error("Error al obtener tiempo");
      }
    };

    if (usuario?.username) {
      cargar();
    }
  }, [usuario]);

  if (!tiempo) return <p className="p-4">Cargando tu tiempo...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Mi Tiempo en Sala</h2>
      <p><strong>Total:</strong> {formatearTiempo(tiempo.segundosTotales)}</p>
      <p><strong>Estado actual:</strong> {tiempo.activo ? "🟢 En sala" : "⚪ Fuera"}</p>
    </div>
  );
}
