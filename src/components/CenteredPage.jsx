import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

export default function CenteredPage({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Navbar superior */}
      <Navbar />

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
