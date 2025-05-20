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
      const peticion = peticiones.find((p) => p.id === id);

      // ✅ Aceptar petición y aplicar cambios al usuario directamente
      if (peticion.rango) {
        await axios.post(`${API}/user/cambiarRango?username=${peticion.username}&rango=${peticion.rango}`);
      }

      if (peticion.userType) {
        await axios.post(`${API}/user/cambiarUserType?username=${peticion.username}&userType=${peticion.userType}`);
      }

      if (peticion.rangoEspecifico) {
        await axios.post(`${API_URL}/cambiarMision?username=${encodeURIComponent(username)}&rangoEspecifico=${encodeURIComponent(cambio.rangoEspecifico)}`)
      }

      await axios.post(`${API}/peticion/aceptar?id=${id}`);
      toast.success("Petición aceptada y cambios aplicados");
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
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Peticiones Pendientes</h2>

      <input
        type="text"
        placeholder="Buscar por usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-4 py-2 border border-yellow-400 bg-black text-white rounded w-full max-w-sm shadow"
      />

      {peticiones.length === 0 ? (
        <p>No hay peticiones pendientes.</p>
      ) : (
        <table className="w-full text-sm bg-black/60 text-white rounded-xl shadow overflow-hidden">
          <thead className="bg-yellow-500 text-black text-center">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Rango</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Misión</th>
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
                <tr
                  key={p.id}
                  className="bg-black/30 hover:bg-yellow-800/20 border-b border-yellow-700 text-center transition-colors"
                >
                  <td className="px-4 py-3">{p.username}</td>
                  <td className="px-4 py-3">{p.rango ?? "-"}</td>
                  <td className="px-4 py-3">{p.userType ?? "-"}</td>
                  <td className="px-4 py-3">{p.rangoEspecifico ?? "-"}</td>
                  <td className="px-4 py-3 text-left">{p.texto}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => aceptar(p.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => rechazar(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
