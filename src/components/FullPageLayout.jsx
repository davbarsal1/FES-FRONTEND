// src/components/FullPageLayout.jsx
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FullPageLayout({ children }) {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <main className="flex-1 w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-screen-2xl">{children}</div>
      </main>
    </div>
  );
}
