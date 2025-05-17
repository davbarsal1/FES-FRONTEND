// src/components/DashboardGeneralLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerStatusBadge from "./ServerStatusBadge"; // ✅ Agrega esta línea

export default function DashboardGeneralLayout() {
  return (
    <div className="flex w-screen min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar izquierdo */}
      <Sidebar />

      {/* Panel principal expandido completamente */}
      <main className="flex-1 p-6 overflow-auto relative">
        <div className="w-full">
          <Outlet />
        </div>
        <ServerStatusBadge /> {/* ✅ Inserta aquí el estado del servidor */}
        <ToastContainer />     {/* Opcional: para los toasts si los usas en esta vista */}
      </main>
    </div>
  );
}
