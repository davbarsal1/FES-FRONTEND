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

    // Aquí enviarías con EmailJS o a tu backend (ejemplo: fetch/post)

    console.log("Formulario enviado:", form);

    toast.success("Consulta enviada correctamente. ¡Gracias!", {
      position: "top-center",
    });

    setForm({
      nombre: "",
      habbo: "",
      asunto: "",
      mensaje: "",
    });
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 via-gray-700 to-green-800 text-white">
      <Navbar />
      <ToastContainer />

      <div className="max-w-3xl mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-lg mt-24 mb-10">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Formulario de Contacto</h1>
        <p className="text-center text-gray-600 mb-8">
          ¿Tenés dudas, sugerencias o algo que comunicar? Completá este formulario y nos pondremos en contacto contigo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre de contacto</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Nombre de Habbo</label>
            <input
              type="text"
              name="habbo"
              value={form.habbo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ej: chatido00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Asunto</label>
            <input
              type="text"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Ej: Sugerencia / Reporte / Reclamo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Motivo de consulta</label>
            <textarea
              name="mensaje"
              rows="5"
              value={form.mensaje}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Escribe tu mensaje aquí..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            Enviar consulta
          </button>
        </form>
      </div>
    </div>
  );
}
