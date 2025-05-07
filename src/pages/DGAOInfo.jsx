// src/pages/DGAOInfo.jsx
import FullPageLayout from "../components/FullPageLayout";
import JUDCardGroup from "../components/JUDCardGroup";

const dgaoData = {
    "Equipo Directivo - Coordinación de las Jefaturas de Unidad Departamental": [
        {
          nombre: ".:Ramses:.",
          cargo: "Jefe de DGAO",
          habbo: ".:Ramses:.",
        },

        {
                      nombre: "guaumila",
                      cargo: "Subjefa de DGAO",
                      habbo: "guaumila",
                    }
                ,{
                               nombre: "xavierfeijoo-",
                               cargo: "Director Administrativo",
                               habbo: "xavierfeijoo-",
                             },{
                                             nombre: "Apolo07",
                                             cargo: "Director Operativo",
                                             habbo: "Apolo07",
                                           },
      ],
  "JUD de Marchas - Capacitación e instrucción para marchas": [
    {
      nombre: "Apolo07",
      cargo: "Encargado",
      habbo: "Apolo07",
    },
{
            nombre: "Nana_1395",
            cargo: "Subencargada",
            habbo: "Nana_1395",
          },
  ],
  "JUD de Ataque - Coordinación y planificación de ataques": [
    {
      nombre: "Miqa",
      cargo: "Encargada",
      habbo: "Miqa",
    },{
            nombre: "@Basticos",
            cargo: "Subencargado",
            habbo: "@Basticos",
          },
  ],
  "JUD de Ocio": [
      {
        nombre: "guaumila",
        cargo: "Encargada",
        habbo: "guaumila",
      },{
              nombre: "p@=valeri=@q",
              cargo: "Subencargada",
              habbo: "p@=valeri=@q",
            },
    ],
"JUD de RRHH": [
      {
        nombre: "majoangel.",
        cargo: "Encargado",
        habbo: "majoangel.",
      },{
              nombre: "PRLA.X3",
              cargo: "Subencargada",
              habbo: "PRLA.X3",
            },
    ],
  "JUD de Times": [
    {
      nombre: "dapapayalove",
      cargo: "Encargada",
      habbo: "dapapayalove",
    },
  ],
  "JUD de Capacitación": [
    {
      nombre: "Lisaster",
      cargo: "Encargada",
      habbo: "Lisaster",
    },
  ],
  "JUD de TIC": [
      {
        nombre: "chatido00",
        cargo: "Encargado",
        habbo: "chatido00",
      },
  {
          nombre: "eltambo",
          cargo: "Subencargado",
          habbo: "eltambo",
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
