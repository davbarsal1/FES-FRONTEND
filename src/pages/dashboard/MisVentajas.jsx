// src/pages/dashboard/MisVentajas.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function MisVentajas() {
  const { usuario } = useUser();
  const [ventajas, setVentajas] = useState({});

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API}/getUser?username=${usuario.username}`);
        setVentajas(res.data.ventajas || {});
      } catch {
        toast.error("No se pudieron cargar tus ventajas.");
      }
    };
    if (usuario?.username) cargar();
  }, [usuario]);

  const formatearFecha = (fechaStr) => {
    const date = new Date(fechaStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-8 text-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Mis Ventajas</h2>
      {Object.keys(ventajas).length === 0 ? (
        <p className="text-gray-400">No tienes ventajas activas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(ventajas).map(([nombre, fecha]) => (
            <div
              key={nombre}
              className="bg-black/50 border border-yellow-500 p-4 rounded shadow-md"
            >
              <h3 className="text-xl font-semibold text-yellow-300">{nombre}</h3>
              <p className="text-sm text-gray-300">Adquirida el: {formatearFecha(fecha)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
