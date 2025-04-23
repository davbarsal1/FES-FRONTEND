// src/components/HistorialUsuarioPublicidad.jsx
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function HistorialUsuarioPublicidad() {
  const { usuario } = useUser();
  const [publicidades, setPublicidades] = useState([]);

  const API_BASE = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/publicidad"
    : "http://localhost:8080/api/publicidad";

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API_BASE}/por-usuario?username=${usuario.username}`);
        setPublicidades(res.data);
      } catch {
        toast.error("Error al cargar tus publicidades");
      }
    };

    if (usuario?.username) {
      cargar();
    }
  }, [usuario]);

  if (publicidades.length === 0) {
    return <p className="text-gray-400">No has registrado ninguna publicidad aún.</p>;
  }

  return (
    <div className="overflow-auto max-h-64">
      <table className="w-full text-sm bg-black/40 border border-yellow-700 rounded-xl">
        <thead className="bg-yellow-600 text-black text-center">
          <tr>
            <th className="py-2 px-4">Supervisor</th>
            <th className="py-2 px-4">Personas Traídas</th>
          </tr>
        </thead>
        <tbody>
          {publicidades.map((p, i) => (
            <tr key={i} className="text-center border-t border-yellow-800">
              <td className="py-2 px-4">{p.supervisor}</td>
              <td className="py-2 px-4">{p.personasTraidas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
