// src/components/DashboardGeneralLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardGeneralLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />

      </main>

    </div>
  );
}
