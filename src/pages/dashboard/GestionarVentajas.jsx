import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VENTAJAS = ["GRUNT", "COBRA", "GRIZZLY", "SCORPION", "PELICAN", "FORERUNNER", "GUARDAPAGA"];

export default function GestionarVentajas() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
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

  const usuarioFiltrado = usuarios.find((u) => u.username.toLowerCase() === seleccionado.toLowerCase());
  const ventajasUsuario = usuarioFiltrado?.ventajas || {};

  const sugerencias = busqueda
    ? usuarios
        .filter((u) => u.username.toLowerCase().includes(busqueda.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">Gestión de Ventajas</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Búsqueda de usuario */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setSeleccionado(""); // Resetear selección
            }}
            className="bg-black border border-yellow-500 p-2 rounded text-white w-full"
          />
          {sugerencias.length > 0 && (
            <ul className="absolute bg-zinc-900 border border-yellow-500 mt-1 rounded z-10 w-full max-h-48 overflow-auto shadow">
              {sugerencias.map((u) => (
                <li
                  key={u.username}
                  onClick={() => {
                    setSeleccionado(u.username);
                    setBusqueda(u.username);
                  }}
                  className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selector de ventaja */}
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
