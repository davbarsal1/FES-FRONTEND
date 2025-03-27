import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dgaoOpen, setDgaoOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400">
          Fuerza Elite Spartan
        </Link>

        <div className="flex items-center space-x-8">
          <ul className="flex space-x-6 relative font-medium">
            <li><Link className="hover:text-green-300 transition" to="/">Inicio</Link></li>
            <li
              className="relative group"
              onMouseEnter={() => setAdminOpen(true)}
              onMouseLeave={() => {
                setAdminOpen(false);
                setDgaoOpen(false);
              }}
            >
              <span className="cursor-pointer hover:text-green-300 transition">Administración</span>
              {adminOpen && (
                <ul className="absolute bg-white text-black mt-2 w-40 shadow-lg rounded z-50">
                  <li className="hover:bg-gray-100 px-4 py-2"><Link to="/mandos">Mandos</Link></li>
                  <li
                    onMouseEnter={() => setDgaoOpen(true)}
                    onMouseLeave={() => setDgaoOpen(false)}
                    className="relative"
                  >
                    <span className="block hover:bg-gray-100 px-4 py-2 cursor-pointer">DGAO</span>
                    {dgaoOpen && (
                      <ul className="absolute left-full top-0 bg-white w-48 shadow-lg rounded text-black">
                        <li className="hover:bg-gray-100 px-4 py-2"><Link to="/jud-marchas">JUD Marchas</Link></li>
                        <li className="hover:bg-gray-100 px-4 py-2"><Link to="/jud-ataque">JUD Ataque</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li><Link className="hover:text-green-300 transition" to="/escalafon">Escalafón</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/constitucion">Constitución</Link></li>
            <li><Link className="hover:text-green-300 transition" to="/contacto">Contacto</Link></li>
          </ul>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
