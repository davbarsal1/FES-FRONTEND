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

  if (!tiempo) return <p className="text-yellow-300 text-center mt-10">Cargando tu tiempo...</p>;

  return (
    <div className="bg-black text-yellow-300 p-6 rounded-lg max-w-md mx-auto mt-10 border border-yellow-500 shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">🕒 Mi Tiempo en Sala</h2>

      <div className="space-y-4 text-center text-lg">
        <p><span className="text-yellow-500 font-semibold">Total acumulado:</span> {formatearTiempo(tiempo.segundosTotales)}</p>
        <p>
          <span className="text-yellow-500 font-semibold">Estado actual:</span>{" "}
          {tiempo.activo ? (
            <span className="text-green-400 font-bold">🟢 En sala</span>
          ) : (
            <span className="text-gray-400 font-bold">⚪ Fuera</span>
          )}
        </p>
      </div>
    </div>
  );
}
