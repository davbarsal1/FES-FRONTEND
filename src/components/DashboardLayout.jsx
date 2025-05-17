// src/components/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ServerStatusBadge from "./ServerStatusBadge"; // <-- Importar

export default function DashboardLayout() {
  return (
    <div className="flex w-screen min-h-screen bg-black text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto relative">
        <div className="w-full">
          <Outlet />
        </div>
        <ServerStatusBadge /> {/* <-- Insertar aquí */}
      </main>
    </div>
  );
}
