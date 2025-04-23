// src/pages/dashboard/HistorialPublicidad.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function HistorialPublicidad() {
  const [lista, setLista] = useState([]);
  const [busquedaSupervisor, setBusquedaSupervisor] = useState("");
  const [busquedaUsuario, setBusquedaUsuario] = useState("");

  const { usuario } = useUser();

  const API_BASE = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/publicidad"
    : "http://localhost:8080/api/publicidad";

  const cargarDatos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/todas`);
      setLista(res.data);
    } catch {
      toast.error("Error al cargar historial de publicidades");
    }
  };

  const reiniciar = async () => {
    try {
      await axios.delete(`${API_BASE}/reiniciar`);
      toast.success("Historial reiniciado");
      cargarDatos();
    } catch {
      toast.error("Error al reiniciar historial");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const filtradas = lista.filter((p) =>
    p.supervisor.toLowerCase().includes(busquedaSupervisor.toLowerCase()) &&
    p.username.toLowerCase().includes(busquedaUsuario.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-black border border-yellow-600 rounded shadow text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-yellow-400 text-center md:text-left">Historial de Publicidades</h2>
        {usuario?.userType === "ADMIN" && (
          <button
            onClick={reiniciar}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
          >
            Reiniciar Historial
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por supervisor..."
          value={busquedaSupervisor}
          onChange={(e) => setBusquedaSupervisor(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 bg-zinc-900 border border-yellow-500 rounded text-white"
        />
        <input
          type="text"
          placeholder="Filtrar por usuario..."
          value={busquedaUsuario}
          onChange={(e) => setBusquedaUsuario(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 bg-zinc-900 border border-yellow-500 rounded text-white"
        />
      </div>

      {filtradas.length === 0 ? (
        <p className="text-gray-400 text-center">No se encontraron resultados con los filtros actuales.</p>
      ) : (
        <table className="w-full bg-black text-white border border-yellow-700 rounded">
          <thead className="bg-yellow-600 text-black">
            <tr className="text-center">
              <th className="px-4 py-2">Supervisor</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Personas Traídas</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((p, i) => (
              <tr key={i} className="text-center border-t border-yellow-700">
                <td>{p.supervisor}</td>
                <td>{p.username}</td>
                <td>{p.personasTraidas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
