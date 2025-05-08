import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/fes-badge.gif";
import { Menu, X } from "lucide-react"; // Si usas Lucide icons

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = (path) =>
    `hover:text-yellow-400 transition ${
      location.pathname === path ? "text-yellow-400" : "text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
          <img src={logo} alt="FES Logo" className="w-8 h-8" />
          Fuerza Élite Spartan
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link className={linkClasses("/")} to="/">Inicio</Link></li>
          <li><Link className={linkClasses("/administracion")} to="/administracion">Administración</Link></li>
          <li><Link className={linkClasses("/dgao")} to="/dgao">DGAO</Link></li>
          <li><Link className={linkClasses("/escalafon")} to="/escalafon">Escalafón</Link></li>
          <li><Link className={linkClasses("/constitucion")} to="/constitucion">Constitución</Link></li>
          <li><Link className={linkClasses("/contacto")} to="/contacto">Contacto</Link></li>
        </ul>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded font-semibold hover:bg-yellow-400 hover:text-black transition"
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-3 font-medium border-t border-yellow-800 pt-4">
            <li><Link className={linkClasses("/")} to="/" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            <li><Link className={linkClasses("/administracion")} to="/administracion" onClick={() => setIsOpen(false)}>Administración</Link></li>
            <li><Link className={linkClasses("/dgao")} to="/dgao" onClick={() => setIsOpen(false)}>DGAO</Link></li>
            <li><Link className={linkClasses("/escalafon")} to="/escalafon" onClick={() => setIsOpen(false)}>Escalafón</Link></li>
            <li><Link className={linkClasses("/constitucion")} to="/constitucion" onClick={() => setIsOpen(false)}>Constitución</Link></li>
            <li><Link className={linkClasses("/contacto")} to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link></li>
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold text-center hover:bg-yellow-300 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded font-semibold text-center hover:bg-yellow-400 hover:text-black transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
