// src/components/ServerStatusBadge.jsx
import useServerStatus from "../hooks/useServerStatus";

export default function ServerStatusBadge() {
  const estadoServidor = useServerStatus();

  if (estadoServidor === "cargando") return null;

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-sm font-medium transition z-50 ${
        estadoServidor === "activo"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      Servidor {estadoServidor === "activo" ? "activo" : "inactivo"}
    </div>
  );
}
