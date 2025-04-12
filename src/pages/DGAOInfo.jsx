// src/pages/DGAOInfo.jsx
import FullPageLayout from "../components/FullPageLayout";
import JUDCardGroup from "../components/JUDCardGroup";

const dgaoData = {
    "Equipo Directivo": [
        {
          nombre: ".:Ramses:.",
          cargo: "Director General",
          habbo: ".:Ramses:.",
        },
      ],
  "JUD de Marchas": [
    {
      nombre: "Nana_1395",
      cargo: "Jefa de Unidad Departamental",
      habbo: "Nana_1395",
    },
{
      nombre: "_Apolo_07_",
      cargo: "Comandante de Unidad Departamental",
      habbo: "_Apolo_07_",
    },
  ],
  "JUD de Entrenamientos": [
    {
      nombre: "guaumila",
      cargo: "Supervisora de rutinas",
      habbo: "guaumila",
    },
  ],
  "JUD de Exámenes": [
    {
      nombre: "JuanRyan",
      cargo: "Encargado de exámenes finales",
      habbo: "JuanRyan",
    },
  ],
  "JUD de Inteligencia": [
    {
      nombre: "dapapayalove",
      cargo: "CORTANA",
      habbo: "dapapayalove",
    },
  ],
  "JUD de Efectos y Automatización": [
    {
      nombre: "josedvb",
      cargo: "Diseñador de Efectos y Automatización",
      habbo: "josedvb",
    },
  ],
};

export default function DGAOInfo() {
  return (
      <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
    <FullPageLayout>
      <div className="py-10 px-4 md:px-10">
        <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-3">
          Dirección General de Actividades Operativas (D.G.A.O)
        </h2>
        <p className="text-center text-yellow-200 text-lg mb-10">
          Conoce a los responsables de cada JUD dentro de la DGAO.
        </p>

        {Object.entries(dgaoData).map(([seccion, miembros]) => (
          <JUDCardGroup key={seccion} titulo={seccion} miembros={miembros} />
        ))}
      </div>
    </FullPageLayout>
    </div>
  );
}
