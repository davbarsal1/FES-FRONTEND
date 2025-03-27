import Navbar from "../components/Navbar";

export default function Constitucion() {
  const articulos = [
    {
      titulo: "Artículo 1 — Pago de Nóminas",
      contenido: `Los dueños se comprometen a cumplir con el pago de nóminas todos los domingos desde las 22:00 hrs (España) o 15:00 hrs (México), salvo causas mayores. El pago se hará a quienes cumplan con horas mínimas, asistencia a actividades y no tengan sanciones. Puede solicitarse ascenso en lugar de pago si se avisa a JUD Nóminas.`
    },
    {
      titulo: "Artículo 2 — Cumplimiento del Reglamento",
      contenido: `Todo militar debe cumplir el reglamento. Está prohibido ausentarse, usar efectos, exigir paga en base, trolear o bailar. Debe usarse uniforme, placa y misión correspondiente, y saludar correctamente con S.M# / D.M#.`
    },
    {
      titulo: "Artículo 3 — Guarda Paga",
      contenido: `Se puede solicitar guarda paga con disponibilidad 24h, pero solo dentro del horario oficial. El abuso del sistema será sancionado.`
    },
    {
      titulo: "Artículo 4 — Solicitudes de Ascenso",
      contenido: `Se puede solicitar ascenso, estímulos o crecimiento, si se cuenta con récord limpio de asistencias y requisitos cumplidos.`
    },
    {
      titulo: "Artículo 5 — Consejo de Honor y Justicia",
      contenido: `Todo militar puede acudir al CHyJ por asuntos disciplinarios. El trato será claro, pronto y anónimo si se solicita.`
    },
    {
      titulo: "Artículo 6 — Derechos y Garantías",
      contenido: `Se velará por la sana convivencia y tranquilidad dentro del ejército. Deben respetarse las normas de Habbo.`
    },
    {
      titulo: "Artículo 7 — Sugerencias",
      contenido: `Las ideas deben ser comunicadas al personal ZEALOT para su discusión.`
    },
    {
      titulo: "Artículo 8 — Funciones del Personal Administrativo",
      contenido: `No están obligados a asistir a actividades militares, pero deben justificar sus PDA. Defensa en base es obligatoria para todos.`
    },
    {
      titulo: "Artículo 9 — Estímulos y Manejo de Documentos",
      contenido: `El personal de JUD puede recibir estímulos. Toda filtración de documentos fuera de canales oficiales será sancionada.`
    },
    {
      titulo: "Artículo 10 — Propiedad de Documentos",
      contenido: `Todo documento hecho por miembros de F.E.S es propiedad del ejército una vez publicado oficialmente.`
    },
    {
      titulo: "Artículo 11 — Clasificación DEFCON",
      contenido: `Documentos se clasifican en DEFCON del 5 al 1. El DEFCON 1 solo lo maneja ZEALOT y el Líder Supremo. Su filtración implica baja inmediata.`
    },
    {
      titulo: "Artículo 12 — Venta de Cargos y Misiones",
      contenido: `Solo personal autorizado puede vender. Deben registrar, firmar, entregar placa, y pagar comisión. Venta de ZEALOT prohibida salvo autorización.`
    },
    {
      titulo: "Artículo 13 — PDA's para Nómina",
      contenido: `Debe cumplirse con PDA's (puntos de actividad) para recibir paga. JUDs operativas suman puntos al registrar e implementar actividades.`
    },
    {
      titulo: "Artículo 14 — Premios en Actividades",
      contenido: `En marchas o entrenamientos puede haber premios económicos si el instructor lo justifica.`
    },
    {
      titulo: "Artículo 15 — Capacitación Obligatoria",
      contenido: `Todo reclutador debe capacitar o delegar la capacitación a un superior. Debe avisarse si no se cumple.`
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900  via-black to-green-800 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-lg mt-24 mb-10">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Constitución Marcial de la Fuerza Elite Spartan
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Documento oficial que rige la estructura, deberes y derechos dentro del ejército F.E.S.
        </p>

        {articulos.map((articulo, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              {articulo.titulo}
            </h2>
            <p className="text-justify leading-relaxed">
              {articulo.contenido}
            </p>
            <hr className="my-4 border-gray-300" />
          </div>
        ))}

        <p className="text-sm text-gray-500 mt-8 italic text-center">
          Esta constitución entra en vigor tras su publicación y puede ser modificada por el Líder Supremo y cúpula de poder.
        </p>
      </div>
    </div>
  );
}
