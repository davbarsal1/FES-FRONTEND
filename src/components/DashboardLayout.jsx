// src/components/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex w-screen min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar izquierdo */}
      <Sidebar />

      {/* Panel principal expandido completamente */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
