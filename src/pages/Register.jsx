import { useState } from 'react';
import CenteredPage from '../components/CenteredPage';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    habboUsername: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // VALIDACIONES
    if (!form.username || !form.habboUsername || !form.email || !form.password) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage('El correo no tiene un formato válido.');
      return;
    }

    if (form.password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/user/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || 'Error en el registro');
        return;
      }

      setMessage('Registro exitoso ✅');
    } catch (err) {
      setMessage('Error de conexión con el servidor');
    }
  };

  return (
    <CenteredPage>
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Registro</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-800 mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Ej: Spartan123"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">Habbo Username</label>
          <input
            name="habboUsername"
            value={form.habboUsername}
            onChange={handleChange}
            placeholder="Ej: HabboSoldier"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-semibold"
        >
          Registrarse
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-red-700">{message}</p>
        )}
      </form>
    </CenteredPage>
  );
}
