// src/pages/Escalafon.jsx
import Navbar from "../components/Navbar";
import FullPageLayout from "../components/FullPageLayout";
const grupoColores = {
  Marine: "bg-white text-black",
  SubOficial: "bg-cyan-100 text-black",
  "Oficial Alumno": "bg-pink-100 text-black",
  Oficial: "bg-blue-900 text-white",
  "Oficial General": "bg-orange-300 text-black",
};

const escalafon = [
  { grupo: "Marine", rango: "Recluta", coste: "-", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Soldado Raso", coste: "10c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Soldado", coste: "20c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Soldado 1ro", coste: "30c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Cabo", coste: "40c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Cabo Grado 1", coste: "50c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Cabo Grado 2", coste: "60c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Cabo Mayor", coste: "70c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Alumno Grado 1", coste: "80c", tareas: "POR DEFINIR" },
  { grupo: "Marine", rango: "Alumno Grado 2", coste: "90c", tareas: "POR DEFINIR" },

  { grupo: "SubOficial", rango: "Sargento", coste: "100c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Sargento Grado 1", coste: "120c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Sargento Grado 2", coste: "140c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Sargento Primero", coste: "160c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Brigada", coste: "180c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Brigada Grado 1", coste: "200c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Brigada Grado 2", coste: "220c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Brigada Mayor", coste: "240c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "Subteniente", coste: "280c", tareas: "POR DEFINIR" },
  { grupo: "SubOficial", rango: "SubOficial Mayor", coste: "300c", tareas: "POR DEFINIR" },

  { grupo: "Oficial Alumno", rango: "Sub Alferez", coste: "330c", tareas: "POR DEFINIR" },
  { grupo: "Oficial Alumno", rango: "Sub Alferez Grado 1", coste: "360c", tareas: "POR DEFINIR" },
  { grupo: "Oficial Alumno", rango: "Alferez", coste: "390c", tareas: "POR DEFINIR" },
  { grupo: "Oficial Alumno", rango: "Alferez Grado 1", coste: "420c", tareas: "POR DEFINIR" },
  { grupo: "Oficial Alumno", rango: "Alferez Grado 2", coste: "450c", tareas: "POR DEFINIR" },

  { grupo: "Oficial", rango: "Teniente", coste: "480c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Teniente Grado 1", coste: "520c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Teniente Grado 2", coste: "560c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Capitan", coste: "600c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Capitan Grado 1", coste: "640c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Capitan Grado 2", coste: "680c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Comandante", coste: "720c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Comandante Grado 1", coste: "760c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Comandante Grado 2", coste: "800c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Tte Coronel", coste: "840c", tareas: "POR DEFINIR" },
  { grupo: "Oficial", rango: "Coronel", coste: "880c", tareas: "POR DEFINIR" },

  { grupo: "Oficial General", rango: "General", coste: "970c", tareas: "POR DEFINIR" },
  { grupo: "Oficial General", rango: "General de Brigada", coste: "1020c", tareas: "POR DEFINIR" },
  { grupo: "Oficial General", rango: "General de División", coste: "1070c", tareas: "POR DEFINIR" },
  { grupo: "Oficial General", rango: "Teniente General", coste: "1120c", tareas: "POR DEFINIR" },
  { grupo: "Oficial General", rango: "General del Ejército", coste: "1170c", tareas: "POR DEFINIR" },
  { grupo: "Oficial General", rango: "Capitán General", coste: "1300c", tareas: "POR DEFINIR" },
];

const getGrupos = () => {
  const grupos = {};
  escalafon.forEach((e) => {
    if (!grupos[e.grupo]) grupos[e.grupo] = [];
    grupos[e.grupo].push(e);
  });
  return grupos;
};

export default function Escalafon() {
  const grupos = getGrupos();

  return (
      <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white overflow-y-auto">
      <FullPageLayout>

      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28">
        <h2 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
          Escalafón Militar
        </h2>

        {Object.entries(grupos).map(([grupo, filas]) => (
          <div key={grupo} className="mb-10 rounded-xl shadow-lg overflow-hidden border border-yellow-400">
            <h3 className={`text-xl font-bold px-4 py-3 ${grupoColores[grupo]}`}>
              {grupo}
            </h3>
            <table className="w-full text-sm md:text-base text-left bg-white text-black">
              <thead className="bg-yellow-200 text-black">
                <tr>
                  <th className="px-4 py-2">Rango</th>
                  <th className="px-4 py-2">Coste del Rango</th>
                  <th className="px-4 py-2">Nómina</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((item, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50 border-t border-gray-200">
                    <td className="px-4 py-2">{item.rango}</td>
                    <td className="px-4 py-2">{item.coste}</td>
                    <td className="px-4 py-2">
                      {grupo === "Marine"
                        ? "25c"
                        : grupo === "SubOficial"
                        ? "30c"
                        : grupo === "Oficial Alumno"
                        ? "40c"
                        : grupo === "Oficial"
                        ? "50c"
                        : grupo === "Oficial General"
                        ? "60c"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

    </FullPageLayout>
    </div>
  );
}
