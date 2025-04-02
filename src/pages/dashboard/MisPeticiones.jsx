// src/pages/dashboard/MisPeticiones.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export default function MisPeticiones() {
  const { usuario } = useUser();
  const [peticiones, setPeticiones] = useState([]);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/peticion"
    : "http://localhost:8080/api/peticion";

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API}/por-usuario?username=${usuario.username}`);
        setPeticiones(res.data);
      } catch {
        console.error("Error al cargar tus peticiones");
      }
    };

    if (usuario?.username) {
      cargar();
    }
  }, [usuario]);

  const estadoColor = (estado) => {
    switch (estado) {
      case "APROBADA":
        return "text-green-600 font-semibold";
      case "RECHAZADA":
        return "text-red-600 font-semibold";
      case "PENDIENTE":
        return "text-yellow-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Mis Peticiones</h2>
      {peticiones.length === 0 ? (
        <p>No has enviado ninguna petición aún.</p>
      ) : (
        <table className="w-full text-sm text-gray-700 bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-blue-100 text-blue-900 font-semibold text-left">
            <tr>
              <th className="px-4 py-3">Rango</th>
              <th className="px-4 py-3">Tipo Usuario</th>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {peticiones.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50 border-b last:border-none text-center">
                <td className="px-4 py-3">{p.rango ?? "-"}</td>
                <td className="px-4 py-3">{p.userType ?? "-"}</td>
                <td className="px-4 py-3 text-left">{p.texto}</td>
                <td className={`px-4 py-3 ${estadoColor(p.estado)}`}>{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
