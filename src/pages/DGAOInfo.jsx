// src/pages/DGAOInfo.jsx
import FullPageLayout from "../components/FullPageLayout";
import JUDCardGroup from "../components/JUDCardGroup";

const dgaoData = {
    "Equipo Directivo": [
        {
          nombre: ".:Ramses:.",
          cargo: "Director General",
          habbo: ".:Ramses:.",
        }
      ],
  "JUD de Marchas": [
    {
      nombre: "_Apolo_07_",
      cargo: "Jefe de Unidad Departamental",
      habbo: "_Apolo_07_",
    },
{
            nombre: "chatido00",
            cargo: "Comandante de Unidad Departamental",
            habbo: "chatido00",
          },
  ],
  "JUD de Ataque": [
    {
      nombre: "Miqa",
      cargo: "Jefa de Unidad Departamental",
      habbo: "Miqa",
    },
  ],
  "JUD de Times": [
    {
      nombre: "guaumila",
      cargo: "Jefa de Unidad Departamental",
      habbo: "guaumila",
    },
{
      nombre: "Lisaster",
      cargo: "Encargada de times",
      habbo: "Lisaster",
    },
{
      nombre: "_Apolo_07_",
      cargo: "Encargado de times",
      habbo: "_Apolo_07_",
    },
{
      nombre: "Miqa",
      cargo: "Encargada de times",
      habbo: "Miqa",
    },
{
      nombre: "Majoangel.",
      cargo: "Encargado de times",
      habbo: "Majoangel.",
    },
{
      nombre: "dapapayalove",
      cargo: "Encargada de times",
      habbo: "dapapayalove",
    },
{
      nombre: "jose-champion",
      cargo: "Encargado de times",
      habbo: "jose-champion",
    },
  ],
  "JUD de Capacitación": [
    {
      nombre: "Lisaster",
      cargo: "Jefa de Unidad Departamental",
      habbo: "Lisaster",
    },
  ],
  "JUD de TIC": [
      {
        nombre: "chatido00",
        cargo: "Jefe de Unidad Departamental",
        habbo: "chatido00",
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
