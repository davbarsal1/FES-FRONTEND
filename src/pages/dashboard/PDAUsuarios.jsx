// src/pages/dashboard/PDAUsuarios.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PDAUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/actividad"
    : "http://localhost:8080/api/actividad";

  const cargar = async () => {
    try {
      const res = await axios.get(`${API}/pdas`);
      const array = Object.entries(res.data).map(([username, pda]) => ({
        username,
        pda,
      }));
      setUsuarios(array);
    } catch {
      toast.error("Error al cargar PDAs");
    }
  };

  const reiniciar = async () => {
    try {
      await axios.delete(`${API}/reiniciar`);
      toast.success("Historial reiniciado");
      cargar();
    } catch {
      toast.error("Error al reiniciar historial");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="w-full">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
        PDAs por Usuario
      </h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="px-4 py-2 border rounded shadow bg-gray-100 text-black w-full max-w-sm"
        />
        <button
          onClick={reiniciar}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Reiniciar Historial
        </button>
      </div>

      {usuarios.length === 0 ? (
        <p>No hay registros de PDAs.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-yellow-100 bg-zinc-900 rounded-xl shadow overflow-hidden">
            <thead className="bg-yellow-700 text-black font-semibold text-center">
              <tr>
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">Total de PDAs</th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                .filter((u) =>
                  u.username.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((u) => (
                  <tr
                    key={u.username}
                    className="hover:bg-yellow-100/10 border-b last:border-none text-center"
                  >
                    <td className="px-4 py-3 font-medium">{u.username}</td>
                    <td className="px-4 py-3">{u.pda}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
