// src/pages/dashboard/TiempoAdmin.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TiempoAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const API_BASE = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api"
    : "http://localhost:8080/api";

  const cargar = async () => {
    try {
      const [usersRes, tiemposRes] = await Promise.all([
        axios.get(`${API_BASE}/user`),
        axios.get(`${API_BASE}/tiempo/todos`)
      ]);

      const tiemposMap = new Map();
      tiemposRes.data.forEach(t => {
        tiemposMap.set(t.username, t);
      });

      const combinados = usersRes.data.map(user => {
        const tiempo = tiemposMap.get(user.username);
        return {
          username: user.username,
          segundosTotales: tiempo?.segundosTotales || 0,
          activo: tiempo?.activo || false
        };
      });

      setUsuarios(combinados);
    } catch (err) {
      toast.error("Error al cargar datos");
    }
  };

  const iniciar = async (username) => {
    try {
      await axios.post(`${API_BASE}/tiempo/iniciar?username=${username}`);
      toast.success(`Sesión iniciada para ${username}`);
      cargar();
    } catch {
      toast.error("Error al iniciar sesión");
    }
  };

  const detener = async (username) => {
    try {
      await axios.post(`${API_BASE}/tiempo/detener?username=${username}`);
      toast.info(`Sesión detenida para ${username}`);
      cargar();
    } catch {
      toast.error("Error al detener sesión");
    }
  };

  const formatearTiempo = (segundos) => {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Control de Tiempo en Sala</h2>

      <input
        type="text"
        placeholder="Buscar por usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-sm shadow"
      />

      {usuarios.length === 0 ? (
        <p>No hay usuarios aún.</p>
      ) : (
        <table className="w-full text-sm text-gray-700 bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-blue-100 text-blue-900 font-semibold text-left">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Tiempo Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter((u) =>
                u.username.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map((u) => (
                <tr key={u.username} className="hover:bg-blue-50 border-b last:border-none text-center">
                  <td className="px-4 py-3">{u.username}</td>
                  <td className="px-4 py-3">{formatearTiempo(u.segundosTotales)}</td>
                  <td className="px-4 py-3">
                    {u.activo ? "🟢 En sala" : "⚪ Fuera"}
                  </td>
                  <td className="px-4 py-3">
                    {u.activo ? (
                      <button
                        onClick={() => detener(u.username)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Detener
                      </button>
                    ) : (
                      <button
                        onClick={() => iniciar(u.username)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                      >
                        Iniciar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
