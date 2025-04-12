
// src/components/CenteredPage.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

export default function CenteredPage({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Navbar superior */}
      <Navbar />

      {/* Contenido centrado debajo del navbar */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-zinc-900 p-8 rounded shadow-md w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
