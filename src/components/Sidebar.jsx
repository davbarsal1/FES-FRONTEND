// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const { usuario } = useUser();
  const habbousername = usuario?.habbousername || "Usuario";
  const tipo = usuario?.userType;

  return (
    <div className="w-64 bg-black text-yellow-400 min-h-screen p-6 flex flex-col justify-between border-r border-yellow-500 shadow-md">
      <div>
        <h2 className="text-3xl font-extrabold mb-8 text-yellow-300">F.E.S</h2>

        <nav className="flex flex-col space-y-4 font-semibold">
          <NavLink to="/dashboard" end className="text-yellow-300">🏠 Panel General</NavLink>
          <NavLink to="/dashboard/perfil" className="text-yellow-300">🧑‍💼 Mi Perfil</NavLink> {/* ✅ NUEVO */}
          <NavLink to="/dashboard/mis-peticiones" className="text-yellow-300">📋 Mis Peticiones</NavLink>
          <NavLink to="/dashboard/peticion" className="text-yellow-300">✉️ Solicitar Cambio</NavLink>

          {(tipo === "MANDO" || tipo === "ADMIN") && (
            <>
              <NavLink to="/admin/tiempo" className="text-yellow-300">
                ⏲ Control de Sala
              </NavLink>
              <NavLink to="/admin/pda-usuarios" className="text-yellow-300">
                📊 Ver PDAs
              </NavLink>
              <NavLink to="/admin/registrar-actividad" className="text-yellow-300">
                📝 Registrar Actividad
              </NavLink>
            </>
          )}

          {tipo === "ADMIN" && (
            <>
              <NavLink to="/admin/usuarios" className="text-yellow-300">👥 Gestión de Usuarios</NavLink>
              <NavLink to="/admin/peticiones" className="text-yellow-300">📩 Revisar Peticiones</NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="text-center mt-10 border-t border-yellow-500 pt-4">
        <img
          src={`https://www.habbo.es/habbo-imaging/avatarimage?user=${habbousername}&direction=2&head_direction=2&action=std&gesture=sml`}
          alt="Avatar Habbo"
          className="mx-auto mb-2 rounded shadow-md border border-yellow-400"
        />
        <p className="text-sm text-yellow-300 font-semibold">{habbousername}</p>
      </div>
    </div>
  );
}
