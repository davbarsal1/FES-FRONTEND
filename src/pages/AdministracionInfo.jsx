import FullPageLayout from "../components/FullPageLayout";

const lideres = [
  {
    nombre: "HYUNGZERO",
    cargo: "LÍDER",
    habbo: "HYUNGZERO",
  },
  {
    nombre: "guaumila",
    cargo: "PRINCESA - JUD de Times",
    habbo: "guaumila",
  },
  {
    nombre: ".:Ramses:.",
    cargo: "HEREDERO - Director General de Actividades Operativas",
    habbo: ".:Ramses:.",
  },
  {
    nombre: "chatido00",
    cargo: "NOBLE - JUD de TIC",
    habbo: "chatido00",
  },
  {
    nombre: "xavierfeijoo-",
    cargo: "LEYENDA - JUD de Recursos Humanos",
    habbo: "xavierfeijoo-",
  },
  {
      nombre: "josedvb",
      cargo: "Diseñador de Efectos y Automatización",
      habbo: "josedvb",
    },
    {
          nombre: "dapapayalove",
          cargo: "CORTANA",
          habbo: "dapapayalove",
        },
    {
          nombre: "JuanRyan",
          cargo: "NOVA",
          habbo: "JuanRyan",
        }
];

export default function AdministracionInfo() {
  return (
      <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
    <FullPageLayout>
      <div className="bg-yellow-500/10 py-10 px-4 md:px-10 rounded-lg shadow-md">
        <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-3">
          Administración de F.E.S
        </h2>
        <p className="text-center text-yellow-200 text-lg mb-10">
          Conoce a los líderes que guían a la Fuerza Élite Spartan<br />
          con honor, disciplina y entrega.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {lideres.map((l) => (
            <div
              key={l.habbo}
              className="bg-zinc-900 p-6 rounded-xl shadow-xl text-center w-full max-w-xs"
            >
              <img
                src={`https://www.habbo.es/habbo-imaging/avatarimage?user=${l.habbo}&direction=2&head_direction=2&action=std&gesture=sml`}
                alt={`Avatar de ${l.nombre}`}
                className="mx-auto mb-4 w-24"
              />
              <h3 className="text-yellow-400 text-lg font-bold">{l.nombre}</h3>
              <p className="text-white text-sm mt-1">{l.cargo}</p>
            </div>
          ))}
        </div>
      </div>
    </FullPageLayout>
    </div>
  );
}
