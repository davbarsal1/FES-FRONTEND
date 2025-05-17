import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

export default function TiempoAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const { usuario } = useUser();

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
          activo: tiempo?.activo || false,
          estado: tiempo?.estado || "sala",
          iniciadoPor: tiempo?.iniciadoPor || "",
        };
      });

      setUsuarios(combinados);
    } catch (err) {
      toast.error("Error al cargar datos");
    }
  };

  const iniciar = async (username) => {
    try {
      const iniciadoPor = usuario?.username || "Sistema";
      await axios.post(`${API_BASE}/tiempo/iniciar?username=${username}&iniciadoPor=${iniciadoPor}`);
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

  const cambiarEstado = async (username, nuevoEstado) => {
    try {
      await axios.post(`${API_BASE}/tiempo/estado?username=${username}&estado=${nuevoEstado}`);
      cargar();
    } catch {
      toast.error("Error al cambiar el estado");
    }
  };

  const formatearTiempo = (segundos) => {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const reiniciar = async () => {
    const confirmado = window.confirm("Esta acción borrará todos los tiempos de la semana. ¿Deseas continuar?");
    if (!confirmado) return;

    try {
      await axios.delete(`${API_BASE}/tiempo/reiniciar`);
      toast.success("Tiempos reiniciados");
      cargar();
    } catch {
      toast.error("Error al reiniciar");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-400">Control de Tiempo en Sala</h2>
        <button
          onClick={reiniciar}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          Reiniciar Tiempos
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full max-w-sm shadow text-black"
      />


      {usuarios.length === 0 ? (
        <p>No hay usuarios aún.</p>
      ) : (
        <div className="overflow-auto bg-gray-900 text-white rounded-xl shadow-xl">
          <table className="w-full text-sm">
            <thead className="bg-yellow-700 text-white">
              <tr className="text-center">
                <th className="px-4 py-3 text-center">Usuario</th>
                <th className="px-4 py-3 text-center">Tiempo Total</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Iniciado por</th>
                <th className="px-4 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                .filter((u) =>
                  u.username.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((u) => (
                  <tr key={u.username} className="border-t border-gray-800 text-center">
                    <td className="px-4 py-3">{u.username}</td>
                    <td className="px-4 py-3">{formatearTiempo(u.segundosTotales)}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.estado === "actividad" ? "bg-green-600" : "bg-gray-700"
                        }`}
                        onClick={() =>
                          cambiarEstado(u.username, u.estado === "actividad" ? "sala" : "actividad")
                        }
                      >
                        Actividad
                      </button>
                      <button
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.estado === "publicidad" ? "bg-blue-600" : "bg-gray-700"
                        }`}
                        onClick={() =>
                          cambiarEstado(u.username, u.estado === "publicidad" ? "sala" : "publicidad")
                        }
                      >
                        Publicidad
                      </button>
                    </td>
                    <td className="px-4 py-3">{u.iniciadoPor || "-"}</td>
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
        </div>
      )}
    </div>
  );
}
