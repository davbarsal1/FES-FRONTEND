// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const { usuario } = useUser();
  const habbousername = usuario?.habbousername || "Usuario";
  const tipo = usuario?.userType;

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6 relative flex flex-col justify-between">
      {/* Navegación */}
      <div>
        <h2 className="text-2xl font-bold mb-8">F.E.S</h2>
        <nav className="flex flex-col space-y-4">
          {/* Panel general (todos los logueados) */}
          <NavLink to="/dashboard" end className="hover:text-green-400">
            🏠 Panel General
          </NavLink>

          <NavLink to="/dashboard/mis-peticiones" className="hover:text-green-400">
            📋 Mis Peticiones
          </NavLink>

          {/* EMPLEADO puede pedir cambio y ver su tiempo */}
          {tipo !== "ADMIN" && (
            <>
              <NavLink to="/dashboard/peticion" className="hover:text-green-400">
                ✉️ Solicitar Cambio
              </NavLink>
              <NavLink to="/dashboard/tiempo" className="hover:text-green-400">
                ⏱ Mi Tiempo
              </NavLink>
            </>
          )}

          {/* ADMIN y MANDO acceden a gestión */}
          {(tipo === "ADMIN" || tipo === "MANDO") && (
            <>
              <NavLink to="/admin" end className="hover:text-green-400">
                🛠 Panel Admin
              </NavLink>
              <NavLink to="/admin/usuarios" className="hover:text-green-400">
                👥 Usuarios
              </NavLink>
              <NavLink to="/admin/peticiones" className="hover:text-green-400">
                📩 Peticiones Pendientes
              </NavLink>
              <NavLink to="/admin/tiempo" className="hover:text-green-400">
                ⏲ Control de Sala
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Avatar Habbo */}
      <div className="text-center mt-10">
        <img
          src={`https://www.habbo.es/habbo-imaging/avatarimage?user=${habbousername}&direction=2&head_direction=2&action=std&gesture=sml`}
          alt="Avatar Habbo"
          className="mx-auto mb-2 rounded shadow-md"
        />
        <p className="text-sm text-white font-semibold">{habbousername}</p>
      </div>
    </div>
  );
}
