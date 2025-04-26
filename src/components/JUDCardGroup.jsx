export default function JUDCardGroup({ titulo, miembros }) {
  return (
    <section className="mb-12 p-6 rounded-lg bg-black/20 border border-yellow-500 shadow-md">
      <h3 className="text-2xl font-bold text-yellow-400 border-b border-yellow-500 pb-2 mb-6">
        {titulo}
      </h3>
      <div className="flex flex-wrap gap-8 justify-start">
        {miembros.map((m) => {
          const cargoLower = m.cargo.toLowerCase();
          const esJefe =
            cargoLower.includes("jefe") ||
            cargoLower.includes("jefa") ||
            cargoLower.includes("director");

          return (
            <div
              key={m.habbo}
              className={`p-6 rounded-xl shadow-lg text-center w-full sm:w-64 transition ${
                esJefe
                  ? "bg-yellow-100/10 border border-yellow-400"
                  : "bg-zinc-900"
              }`}
            >
              <img
                src={`https://www.habbo.es/habbo-imaging/avatarimage?user=${m.habbo}&direction=2&head_direction=2&action=std&gesture=sml`}
                alt={`Avatar de ${m.nombre}`}
                className="mx-auto mb-4 w-24"
              />
              <h4 className="text-yellow-300 font-bold text-lg flex items-center justify-center gap-1">
                {m.nombre} {esJefe && <span className="text-yellow-400">🛡️</span>}
              </h4>
              <p className="text-white text-sm mt-1">{m.cargo}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
