import { useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    habbo: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.habbo.trim() ||
      !form.asunto.trim() ||
      !form.mensaje.trim() ||
      form.mensaje.length < 10
    ) {
      toast.error("Por favor, completá todos los campos correctamente.", {
        position: "top-center",
      });
      return;
    }

    console.log("Formulario enviado:", form);

    toast.success("Consulta enviada correctamente. ¡Gracias!", {
      position: "top-center",
    });

    setForm({
      habbo: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (

        <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
      <Navbar />
      <ToastContainer />

      <div className="max-w-3xl mx-auto bg-zinc-900 text-white p-8 rounded-lg shadow-xl mt-24 mb-10 border border-yellow-600">
        <h1 className="text-3xl font-extrabold text-center text-yellow-400 mb-6">
          Formulario de Contacto
        </h1>
        <p className="text-center text-gray-300 mb-8">
          ¿Tenés dudas, sugerencias o algo que comunicar? Completa este formulario y nos pondremos en contacto contigo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1">Nombre de Habbo</label>
            <input
              type="text"
              name="habbo"
              value={form.habbo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Ej: chatido00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1">Asunto</label>
            <input
              type="text"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Ej: Sugerencia / Reporte / Reclamo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1">Motivo de consulta</label>
            <textarea
              name="mensaje"
              rows="5"
              value={form.mensaje}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
              placeholder="Escribí tu mensaje aquí..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded transition"
          >
            Enviar consulta
          </button>
        </form>
      </div>
    </div>
  );
}
