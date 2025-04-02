import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-6 bg-white overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Panel Administrativo</h1>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
