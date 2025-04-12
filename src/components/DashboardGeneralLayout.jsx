// src/components/DashboardGeneralLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardGeneralLayout() {
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
