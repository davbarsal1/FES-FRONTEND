// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import CenteredBox from "../components/CenteredBox";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-32 py-20 px-4 scroll-smooth">
        {/* 🔰 Sección principal */}
        <section id="inicio">
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
        </section>

        {/* 👥 Sección: Quiénes somos */}
        <section id="quienes-somos" className="max-w-4xl text-center px-4 scroll-mt-24">
          <h3 className="text-yellow-400 text-2xl font-bold mb-2">¿Quiénes somos?</h3>
          <p className="text-white">
            Somos una unidad de élite dedicada a mantener el orden y la disciplina en la base.
            Con valores como el honor, el respeto y la entrega como estandarte.
          </p>
        </section>

        {/* 🎯 Sección: Misión */}
        <section id="mision" className="max-w-4xl text-center px-4 scroll-mt-24">
          <h3 className="text-yellow-400 text-2xl font-bold mb-2">Nuestra misión</h3>
          <p className="text-white">
            Formar, entrenar y elevar el nivel de cada miembro, alcanzando la excelencia en cada
            área de actuación militar.
          </p>
        </section>

        {/* 🧭 Secciones públicas en tarjetas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-4 mt-12">
          <Link
            to="/administracion"
            className="bg-zinc-800 border border-yellow-500 p-6 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h4 className="text-yellow-400 text-xl font-bold mb-2">Administración</h4>
            <p className="text-sm text-gray-300">
              Conoce la estructura administrativa y roles claves dentro de la organización.
            </p>
          </Link>

          <Link
            to="/dgao"
            className="bg-zinc-800 border border-yellow-500 p-6 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h4 className="text-yellow-400 text-xl font-bold mb-2">DGAO</h4>
            <p className="text-sm text-gray-300">
              Información sobre la Dirección General de Administración Operativa.
            </p>
          </Link>

          <Link
            to="/escalafon"
            className="bg-zinc-800 border border-yellow-500 p-6 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h4 className="text-yellow-400 text-xl font-bold mb-2">Escalafón</h4>
            <p className="text-sm text-gray-300">
              Consulta el recorrido completo desde Recluta hasta Capitán General.
            </p>
          </Link>

          <Link
            to="/constitucion"
            className="bg-zinc-800 border border-yellow-500 p-6 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h4 className="text-yellow-400 text-xl font-bold mb-2">Constitución</h4>
            <p className="text-sm text-gray-300">
              Revisa las normativas que rigen el comportamiento y estructura de la FES.
            </p>
          </Link>

          <Link
            to="/contacto"
            className="bg-zinc-800 border border-yellow-500 p-6 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h4 className="text-yellow-400 text-xl font-bold mb-2">Contacto</h4>
            <p className="text-sm text-gray-300">
              ¿Tienes dudas? Contáctanos directamente desde aquí.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
