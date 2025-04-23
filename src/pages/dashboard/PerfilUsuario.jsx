import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import MiTiempo from "./MiTiempo";
import MisVentajas from "./MisVentajas";
import HistorialUsuarioPublicidad from "../../components/HistorialUsuarioPublicidad"
export default function PerfilUsuario() {
  const { usuario } = useUser();
  const [actividades, setActividades] = useState([]);
  const [form, setForm] = useState({
    actual: "",
    nueva: "",
    confirmar: ""
  });

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api"
    : "http://localhost:8080/api";

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const res = await axios.get(`${API}/actividad/por-usuario?username=${usuario.username}`);
        setActividades(res.data);
      } catch {
        toast.error("Error al cargar actividades");
      }
    };

    if (usuario?.username) {
      cargarActividades();
    }
  }, [usuario]);

  const cambiarPassword = async (e) => {
    e.preventDefault();
    if (!form.actual || !form.nueva || !form.confirmar) {
      toast.error("Completa todos los campos");
      return;
    }
    if (form.nueva !== form.confirmar) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post(`${API}/user/cambiar-password`, {
        username: usuario.username,
        actual: form.actual,
        nueva: form.nueva
      });
      toast.success("Contraseña cambiada con éxito");
      setForm({ actual: "", nueva: "", confirmar: "" });
    } catch {
      toast.error("Error al cambiar contraseña");
    }
  };

  const handleInput = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex min-h-screen bg-black text-yellow-300">
      {/* Sidebar está fuera de este layout */}

      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-2xl mx-auto">

        {/* 🧍 Avatar + Datos */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">👤 Información</h2>
          <div className="flex items-center space-x-6">
            <img
              src={`https://www.habbo.es/habbo-imaging/avatarimage?user=${usuario.username}&direction=2&head_direction=2&action=std&gesture=sml`}
              alt="avatar"
              className=" mb-2 rounded shadow-md border border-yellow-400"
            />
            <div>
              <p><strong>Usuario:</strong> {usuario.username}</p>
              <p><strong>Rango:</strong> {usuario.rango ?? "Sin rango"}</p>
              <p><strong>Mision:</strong> {usuario.rangoEspecifico}</p>
              <p><strong>Tipo:</strong> {usuario.userType}</p>

            </div>
          </div>
        </section>

        {/* ⏱ Tiempo */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">⏱ Tiempo en Sala</h2>
          <MiTiempo />
        </section>

        {/* 🗂 Actividades */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🗂 Actividades</h2>
          {actividades.length === 0 ? (
            <p className="text-gray-400">Aún no has participado en actividades.</p>
          ) : (
            <div className="overflow-auto max-h-64">
              <table className="w-full text-sm bg-black/40 border border-yellow-700 rounded-xl">
                <thead className="bg-yellow-600 text-black text-center">
                  <tr>
                    <th className="py-2 px-4">Tipo</th>
                    <th className="py-2 px-4">Supervisor</th>
                    <th className="py-2 px-4">Guía</th>
                    <th className="py-2 px-4">Participantes</th>
                  </tr>
                </thead>
                <tbody>
                  {actividades.map((a, i) => (
                    <tr key={i} className="text-center border-t border-yellow-800">
                      <td className="py-2 px-2">{a.tipo}</td>
                      <td className="py-2 px-2">{a.supervisor}</td>
                      <td className="py-2 px-2">{a.guia}</td>
                      <td className="py-2 px-2">
                        {Object.entries(a.participantes || {}).map(([nombre, pda], idx) => (
                          <div key={idx}>{nombre} ({pda} PDA)</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 🔒 Contraseña */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-1">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🔒 Cambiar Contraseña</h2>
          <form onSubmit={cambiarPassword} className="space-y-4">
            <input
              type="password"
              name="actual"
              placeholder="Contraseña actual"
              value={form.actual}
              onChange={handleInput}
              className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 rounded text-white"
            />
            <input
              type="password"
              name="nueva"
              placeholder="Nueva contraseña"
              value={form.nueva}
              onChange={handleInput}
              className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 rounded text-white"
            />
            <input
              type="password"
              name="confirmar"
              placeholder="Confirmar nueva contraseña"
              value={form.confirmar}
              onChange={handleInput}
              className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 rounded text-white"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition"
            >
              Cambiar Contraseña
            </button>
          </form>
        </section>

        {/* 🎁 Ventajas */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-2">
          <MisVentajas />
        </section>
        {/* 📣 Publicidades */}
        <section className="bg-zinc-900 rounded-xl p-6 shadow-lg col-span-2">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📣 Publicidades Realizadas</h2>
          <HistorialUsuarioPublicidad />
        </section>

      </div>
    </div>
  );
}
