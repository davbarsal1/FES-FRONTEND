import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VENTAJAS = ["GRUNT", "COBRA", "GRIZZLY", "SCORPION", "PELICAN", "FORERUNNER", "GUARDAPAGA"];

export default function GestionarVentajas() {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [ventaja, setVentaja] = useState("");

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  const cargar = async () => {
    try {
      const res = await axios.get(`${API}`);
      setUsuarios(res.data);
    } catch {
      toast.error("Error al cargar usuarios");
    }
  };

  const agregar = async () => {
    if (!seleccionado || !ventaja) return toast.error("Selecciona un usuario y una ventaja");
    try {
      await axios.post(`${API}/agregarVentaja?username=${seleccionado}&ventaja=${ventaja}`);
      toast.success("Ventaja añadida");
      cargar();
    } catch {
      toast.error("Error al añadir ventaja");
    }
  };

  const eliminar = async (v) => {
    try {
      await axios.post(`${API}/eliminarVentaja?username=${seleccionado}&ventaja=${v}`);
      toast.info("Ventaja eliminada");
      cargar();
    } catch {
      toast.error("Error al eliminar ventaja");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const ventajasUsuario = usuarios.find((u) => u.username === seleccionado)?.ventajas || {};

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Gestión de Ventajas</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          onChange={(e) => setSeleccionado(e.target.value)}
          className="bg-black border border-yellow-500 p-2 rounded text-white w-full"
          value={seleccionado}
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u) => (
            <option key={u.username} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setVentaja(e.target.value)}
          className="bg-black border border-yellow-500 p-2 rounded text-white w-full"
          value={ventaja}
        >
          <option value="">Seleccionar ventaja</option>
          {VENTAJAS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <button
          onClick={agregar}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
        >
          Añadir
        </button>
      </div>

      {seleccionado && (
        <div className="bg-black border border-yellow-600 rounded p-4">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">
            Ventajas de {seleccionado}
          </h3>
          {Object.entries(ventajasUsuario).length === 0 ? (
            <p className="text-gray-400">Este usuario no tiene ventajas.</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(ventajasUsuario).map(([v, fecha]) => (
                <li key={v} className="flex justify-between items-center border-b border-yellow-800 py-1">
                  <span>{v} - <span className="text-sm text-gray-400">({fecha})</span></span>
                  <button
                    onClick={() => eliminar(v)}
                    className="text-red-400 hover:text-red-600 font-bold text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
