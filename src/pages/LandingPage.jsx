import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CenteredBox from "../components/CenteredBox";
import axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://fes-backend.onrender.com/api/dummy"
  : "http://localhost:8080/api/dummy";

export default function LandingPage() {
  const [estadoBackend, setEstadoBackend] = useState("cargando"); // "activo", "error"

  useEffect(() => {
    const pingBackend = async () => {
      try {
        const res = await axios.get(API_URL);
        console.log("Backend activo:", res.data);
        setEstadoBackend("activo");
        setTimeout(() => setEstadoBackend("oculto"), 4000); // Ocultar mensaje tras 4s
      } catch (err) {
        console.error("Backend inactivo:", err);
        setEstadoBackend("error");
      }
    };

    pingBackend();
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto relative">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-32 py-20 px-4">
        <CenteredBox>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 tracking-widest drop-shadow">
            FUERZA ÉLITE SPARTAN
          </h2>
          <p className="text-sm md:text-base text-black font-medium">
            Unidad de élite con entrenamiento especializado, disciplina y honor.
          </p>
          <p className="italic text-sm text-black mt-2">
            Únete a la fuerza que marca la diferencia.
          </p>
        </CenteredBox>

        <section className="max-w-4xl text-center px-4">
          <h3 className="text-yellow-400 text-2xl font-bold mb-2">¿Quiénes somos?</h3>
          <p className="text-white">
            Somos una unidad de élite dedicada a mantener el orden y la disciplina en la base. Con valores como el honor, el respeto y la entrega como estandarte.
          </p>
        </section>

        <section className="max-w-4xl text-center px-4">
          <h3 className="text-yellow-400 text-2xl font-bold mb-2">Nuestra misión</h3>
          <p className="text-white">
            Formar, entrenar y elevar el nivel de cada miembro, alcanzando la excelencia en cada área de actuación militar.
          </p>
        </section>
      </main>

      {/* Mensaje flotante de estado */}
      {estadoBackend !== "oculto" && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-sm font-semibold transition duration-300 ${
            estadoBackend === "activo"
              ? "bg-green-600 text-white"
              : estadoBackend === "error"
              ? "bg-red-600 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {estadoBackend === "activo"
            ? "✅ Web activa!"
            : estadoBackend === "error"
            ? "⚠️ Vuelve en unos segundos..."
            : "⏳ Verificando conexión..."}
        </div>
      )}
    </div>
  );
}
