import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar"; // Esta es la ruta correcta

export default function CenteredPage({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-900 via-green-700 to-gray-800">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Navbar superior */}
      <Navbar />

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white text-black p-6 rounded shadow-md w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
