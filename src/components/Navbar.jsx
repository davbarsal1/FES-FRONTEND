import { Link, useLocation } from "react-router-dom";
import logo from "../assets/fes-badge.gif";

export default function Navbar() {
  const location = useLocation();

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

        <ul className="flex space-x-6 font-medium">
          <li><Link className={linkClasses("/")} to="/">Inicio</Link></li>
          <li><Link className={linkClasses("/administracion")} to="/administracion">Administración</Link></li>
          <li><Link className={linkClasses("/dgao")} to="/dgao">DGAO</Link></li>
          <li><Link className={linkClasses("/escalafon")} to="/escalafon">Escalafón</Link></li>
          <li><Link className={linkClasses("/constitucion")} to="/constitucion">Constitución</Link></li>
          <li><Link className={linkClasses("/contacto")} to="/contacto">Contacto</Link></li>
        </ul>

        <div className="flex gap-3">
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
      </div>
    </nav>
  );
}
