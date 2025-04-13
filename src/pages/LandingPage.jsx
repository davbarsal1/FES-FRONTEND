import Navbar from "../components/Navbar";
import CenteredBox from "../components/CenteredBox";

export default function LandingPage() {
  return (

    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center gap-32 py-20 px-4">
        {/* Panel principal */}
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

        {/* Secciones scroll abajo */}
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
    </div>
  );
}
