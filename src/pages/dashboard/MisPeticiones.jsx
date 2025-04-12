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
        return "text-green-500 font-bold";
      case "RECHAZADA":
        return "text-red-500 font-bold";
      case "PENDIENTE":
        return "text-yellow-400 font-bold";
      default:
        return "text-white";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Mis Peticiones</h2>
      {peticiones.length === 0 ? (
        <p className="text-gray-400">No has enviado ninguna petición aún.</p>
      ) : (
        <div className="overflow-auto bg-black p-4 rounded-xl border border-yellow-600 shadow-md">
          <table className="w-full text-sm bg-black text-white rounded-xl">
            <thead className="bg-yellow-600 text-black">
              <tr className="text-center">
                <th className="px-4 py-3">Rango</th>
                <th className="px-4 py-3">Tipo Usuario</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {peticiones.map((p) => (
                <tr
                  key={p.id}
                  className="text-center border-t border-yellow-800 hover:bg-yellow-900/10"
                >
                  <td className="px-4 py-2">{p.rango ?? "-"}</td>
                  <td className="px-4 py-2">{p.userType ?? "-"}</td>
                  <td className="px-4 py-2 text-left">{p.texto}</td>
                  <td className={`px-4 py-2 ${estadoColor(p.estado)}`}>{p.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
