import { Link } from "react-router-dom";
import { useState } from "react";
import badge from "../assets/fes-badge.gif"; // Asegúrate de tener el badge en tu carpeta assets

export default function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dgaoOpen, setDgaoOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-yellow-400 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Título */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={badge} alt="FES badge" className="w-7 h-7" />
          <span className="text-xl hover:text-yellow-300 font-bold">Fuerza Élite Spartan</span>
        </Link>

        {/* Menú de navegación */}
        <div className="flex items-center space-x-8">
          <ul className="flex space-x-6 font-medium hover:text-yellow-300">
            <li>
              <Link className="hover:text-yellow-300 transition" to="/">
                Inicio
              </Link>
            </li>

            {/* Administración y DGAO */}
            <li
              className="relative"
              onMouseEnter={() => setAdminOpen(true)}
              onMouseLeave={() => setAdminOpen(false)}
            >
              <span className="cursor-pointer hover:text-yellow-300 transition">
                Administración
              </span>
              {adminOpen && (
                <ul
                  className="absolute left-0 mt-2 w-44 bg-black text-yellow-400 shadow-lg rounded"
                  onMouseEnter={() => setAdminOpen(true)}
                  onMouseLeave={() => setAdminOpen(false)}
                >
                  <li className="hover:bg-yellow-900 px-4 py-2 rounded">
                    <Link to="/mandos">Mandos</Link>
                  </li>
                  <li
                    className="relative group"
                    onMouseEnter={() => setDgaoOpen(true)}
                    onMouseLeave={() => setDgaoOpen(false)}
                  >
                    <span className="block hover:bg-yellow-900 px-4 py-2 rounded cursor-pointer">
                      DGAO
                    </span>
                    {dgaoOpen && (
                      <ul className="absolute left-full top-0 w-48 bg-black text-yellow-400 shadow-lg rounded ml-1">
                        <li className="hover:bg-yellow-900 px-4 py-2 rounded">
                          <Link to="/jud-marchas">JUD Marchas</Link>
                        </li>
                        <li className="hover:bg-yellow-900 px-4 py-2 rounded">
                          <Link to="/jud-ataque">JUD Ataque</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link className="hover:text-yellow-300 transition" to="/escalafon">
                Escalafón
              </Link>
            </li>
            <li>
              <Link className="hover:text-yellow-300 transition" to="/constitucion">
                Constitución
              </Link>
            </li>
            <li>
              <Link className="hover:text-yellow-300 transition" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botones de acceso */}
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
      </div>
    </nav>
  );
}
