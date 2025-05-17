// src/components/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const { usuario } = useUser();
  const habbousername = usuario?.habbousername || "Usuario";
  const tipo = usuario?.userType;
  const [isOpen, setIsOpen] = useState(false);

  const commonLinks = (
    <>
      <NavLink to="/dashboard/mis-peticiones" onClick={() => setIsOpen(false)}>📋 Mis Peticiones</NavLink>
      <NavLink to="/dashboard/peticion" onClick={() => setIsOpen(false)}>✉️ Solicitar Cambio</NavLink>
      <NavLink to="/dashboard/perfil" onClick={() => setIsOpen(false)}>👤 Perfil</NavLink>
      <NavLink to="/dashboard/radio" onClick={() => setIsOpen(false)}>📻 Radio</NavLink>
    </>
  );

  const mandoLinks = (tipo === "MANDO" || tipo === "ADMIN") && (
    <>
      <NavLink to="/admin/tiempo" onClick={() => setIsOpen(false)}>⏲ Control de Sala</NavLink>
      <NavLink to="/admin/pda-usuarios" onClick={() => setIsOpen(false)}>📊 Ver PDAs</NavLink>

      <NavLink to="/admin/historial-publicidad" onClick={() => setIsOpen(false)}>📜 Historial Publicidad</NavLink>
    </>
  );

  const adminLinks = tipo === "ADMIN" && (
    <>
      <NavLink to="/admin/registrar-actividad" onClick={() => setIsOpen(false)}>📝 Registrar Actividad</NavLink>
      <NavLink to="/admin/registrar-publicidad" onClick={() => setIsOpen(false)}>📣 Registrar Publicidad</NavLink>
      <NavLink to="/admin/usuarios" onClick={() => setIsOpen(false)}>👥 Gestión de Usuarios</NavLink>
      <NavLink to="/admin/peticiones" onClick={() => setIsOpen(false)}>📩 Revisar Peticiones</NavLink>
      <NavLink to="/admin/ventajas" onClick={() => setIsOpen(false)}>🎖 Gestionar Ventajas</NavLink>
    </>
  );

  return (
    <>
      {/* Botón hamburguesa en móvil */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="text-yellow-400 bg-black p-2 rounded border border-yellow-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden md:flex w-64 bg-black text-yellow-400 min-h-screen p-6 flex-col justify-between border-r border-yellow-500 shadow-md">
        <SidebarContent habbousername={habbousername} links={{ commonLinks, mandoLinks, adminLinks }} />
      </div>

      {/* Sidebar para móvil (toggleable) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black text-yellow-400 w-64 p-6 flex flex-col justify-between border-r border-yellow-500 shadow-md md:hidden">
          <SidebarContent habbousername={habbousername} links={{ commonLinks, mandoLinks, adminLinks }} />
        </div>
      )}
    </>
  );
}

function SidebarContent({ habbousername, links }) {
  return (
    <>
      <div>
        <h2 className="text-3xl font-extrabold mb-8 text-yellow-300">F.E.S</h2>
        <nav className="flex flex-col space-y-4 font-semibold [&>a]:text-yellow-300">
          {links.commonLinks}
          {links.mandoLinks}
          {links.adminLinks}
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
    </>
  );
}
