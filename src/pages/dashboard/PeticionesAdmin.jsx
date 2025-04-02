import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PeticionesAdmin() {
  const [peticiones, setPeticiones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api"
    : "http://localhost:8080/api";

  const cargar = async () => {
    try {
      const res = await axios.get(`${API}/peticion/todas`);
      setPeticiones(res.data.filter((p) => p.estado === "PENDIENTE"));
    } catch {
      toast.error("Error al cargar peticiones");
    }
  };

  const aceptar = async (id) => {
    try {
      await axios.post(`${API}/peticion/aceptar?id=${id}`);
      toast.success("Petición aceptada");
      cargar();
    } catch {
      toast.error("Error al aceptar");
    }
  };

  const rechazar = async (id) => {
    try {
      await axios.post(`${API}/peticion/rechazar?id=${id}`);
      toast.info("Petición rechazada");
      cargar();
    } catch {
      toast.error("Error al rechazar");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Peticiones Pendientes</h2>

      <input
        type="text"
        placeholder="Buscar por usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-sm shadow"
      />

      {peticiones.length === 0 ? (
        <p>No hay peticiones pendientes.</p>
      ) : (
        <table className="w-full text-sm text-gray-700 bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-blue-100 text-blue-900 font-semibold text-left">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Rango</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Motivo</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {peticiones
              .filter((p) =>
                p.username.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((p) => (
                <tr key={p.id} className="hover:bg-blue-50 border-b last:border-none text-center">
                  <td className="px-4 py-3">{p.username}</td>
                  <td className="px-4 py-3">{p.rango ?? "-"}</td>
                  <td className="px-4 py-3">{p.userType ?? "-"}</td>
                  <td className="px-4 py-3 text-left">{p.texto}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => aceptar(p.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => rechazar(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
