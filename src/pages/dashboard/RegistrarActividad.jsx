import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

export default function RegistrarActividad() {
  const { usuario } = useUser();
  const [tipo, setTipo] = useState("JUEGO");
  const [guia, setGuia] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [participantes, setParticipantes] = useState([{ nombre: "", pda: 0.5 }]);
  const [mostrarSugerenciasGuia, setMostrarSugerenciasGuia] = useState(false);
  const [mostrarSugerenciasParticipantes, setMostrarSugerenciasParticipantes] = useState([false]);

  const API = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(API);
        setUsuarios(res.data);
      } catch {
        toast.error("Error al cargar usuarios");
      }
    };
    cargar();
  }, []);

  const handleChangeParticipante = (index, field, value) => {
    const updated = [...participantes];
    const mostrar = [...mostrarSugerenciasParticipantes];

    if (field === "pda") {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue < 0) {
        toast.error("El valor de PDA debe ser mayor o igual a 0");
        return;
      }
      if (numericValue > 1.5) {
        toast.error("Excedido cantidad de PDA permitida por participante (máx 1.5)");
        return;
      }
      updated[index][field] = numericValue;
    } else {
      updated[index][field] = value;
      mostrar[index] = true;
    }

    setParticipantes(updated);
    setMostrarSugerenciasParticipantes(mostrar);
  };

  const agregarParticipante = () => {
    setParticipantes([...participantes, { nombre: "", pda: 0.5 }]);
    setMostrarSugerenciasParticipantes([...mostrarSugerenciasParticipantes, false]);
  };

  const enviar = async (e) => {
    e.preventDefault();

    const nombres = participantes.map((p) => p.nombre);

    if (!guia || participantes.some(p => !p.nombre)) {
      toast.error("Todos los campos deben completarse");
      return;
    }

    if (new Set(nombres).size !== nombres.length) {
      toast.error("No se pueden repetir participantes");
      return;
    }

    if (nombres.includes(guia)) {
      toast.error("El guía no puede ser también participante");
      return;
    }

    const data = {
      tipo,
      supervisor: usuario.username,
      guia,
      participantes: Object.fromEntries(participantes.map(p => [p.nombre, p.pda]))
    };

    try {
      await axios.post(
        import.meta.env.PROD
          ? "https://fes-backend.onrender.com/api/actividad/registrar"
          : "http://localhost:8080/api/actividad/registrar",
        data
      );
      toast.success("✅ ¡Registro de actividad exitoso!");
      setGuia("");
      setParticipantes([{ nombre: "", pda: 0.5 }]);
      setMostrarSugerenciasParticipantes([false]);
    } catch {
      toast.error("Error al registrar actividad");
    }
  };

  const sugerenciasUsuarios = (input) =>
    input
      ? usuarios
          .filter((u) => u.username.toLowerCase().includes(input.toLowerCase()))
          .slice(0, 5)
      : [];

  const sugerenciasGuia = sugerenciasUsuarios(guia);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8 bg-black text-white rounded-xl border border-yellow-600 shadow">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Registrar Actividad</h2>

      <form onSubmit={enviar} className="space-y-6">
        <div>
          <label className="block font-semibold text-yellow-300 mb-1">Tipo de Actividad</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded border border-yellow-500"
          >
            <option value="JUEGO">Juego</option>
            <option value="ATAQUE">Ataque</option>
            <option value="DEFENSA">Defensa</option>
            <option value="MARCHA">Marcha</option>
          </select>
        </div>

        <div className="relative">
          <label className="block font-semibold text-yellow-300 mb-1">Guía</label>
          <input
            type="text"
            value={guia}
            onChange={(e) => {
              setGuia(e.target.value);
              setMostrarSugerenciasGuia(true);
            }}
            className="w-full bg-gray-900 text-white p-2 rounded border border-yellow-500"
            placeholder="Nombre del guía"
          />
          {mostrarSugerenciasGuia && sugerenciasGuia.length > 0 && (
            <ul className="absolute z-10 w-full bg-zinc-900 border border-yellow-500 mt-1 rounded shadow max-h-48 overflow-auto">
              {sugerenciasGuia.map((u) => (
                <li
                  key={u.username}
                  onClick={() => {
                    setGuia(u.username);
                    setMostrarSugerenciasGuia(false);
                  }}
                  className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block font-semibold text-yellow-300 mb-1">Participantes</label>
          {participantes.map((p, i) => {
            const sugerencias = sugerenciasUsuarios(p.nombre);
            return (
              <div key={i} className="mb-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Usuario"
                      value={p.nombre}
                      onChange={(e) => handleChangeParticipante(i, "nombre", e.target.value)}
                      onFocus={() => {
                        const mostrar = [...mostrarSugerenciasParticipantes];
                        mostrar[i] = true;
                        setMostrarSugerenciasParticipantes(mostrar);
                      }}
                      className="w-full bg-gray-900 text-white p-2 rounded border border-yellow-500"
                    />
                    {mostrarSugerenciasParticipantes[i] && sugerencias.length > 0 && (
                      <ul className="absolute z-10 w-full bg-zinc-900 border border-yellow-500 mt-1 rounded shadow max-h-48 overflow-auto">
                        {sugerencias.map((u) => (
                          <li
                            key={u.username}
                            onClick={() => {
                              const updated = [...participantes];
                              const mostrar = [...mostrarSugerenciasParticipantes];
                              updated[i].nombre = u.username;
                              mostrar[i] = false;
                              setParticipantes(updated);
                              setMostrarSugerenciasParticipantes(mostrar);
                            }}
                            className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer"
                          >
                            {u.username}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1.5"
                    placeholder="PDA"
                    value={p.pda}
                    onChange={(e) => handleChangeParticipante(i, "pda", e.target.value)}
                    className="w-24 bg-gray-900 text-white p-2 rounded border border-yellow-500"
                  />
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={agregarParticipante}
            className="text-sm mt-2 text-yellow-400 hover:text-yellow-300 transition"
          >
            + Agregar participante
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Registrar Actividad
        </button>
      </form>
    </div>
  );
}
