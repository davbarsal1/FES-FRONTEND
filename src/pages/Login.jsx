import CenteredPage from '../components/CenteredPage';

export default function Login() {
  return (
    <CenteredPage>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Iniciar Sesión</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input type="text" placeholder="Ej: Spartan123" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="********" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold">
          Ingresar
        </button>
      </form>
    </CenteredPage>
  );
}
