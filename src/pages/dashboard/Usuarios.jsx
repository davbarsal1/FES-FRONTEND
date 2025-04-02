import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirmacion from "../../components/ModalConfirmacion";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [cambios, setCambios] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const API_URL = import.meta.env.PROD
    ? "https://fes-backend.onrender.com/api/user"
    : "http://localhost:8080/api/user";

  const tipos = ["EMPLEADO", "MANDO", "ADMIN"];
  const rangos = ["MARINE", "SUBOFICIAL", "OFICIALALUMNO", "OFICIAL", "OFICIALGENERAL", "ELITE", "ZEALOT"];

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      setUsuarios(res.data);
      setCambios({});
      setCargando(false);
    } catch (err) {
      toast.error("Error al obtener los usuarios");
    }
  };

  const manejarCambio = (username, campo, valor) => {
    setCambios((prev) => ({
      ...prev,
      [username]: {
        ...prev[username],
        [campo]: valor,
      },
    }));
  };

  const confirmarCambios = async (username) => {
    const cambio = cambios[username];
    try {
      if (cambio?.userType) {
        await axios.post(`${API_URL}/cambiarUserType?username=${username}&userType=${cambio.userType}`);
      }
      if (cambio?.rango) {
        await axios.post(`${API_URL}/cambiarRango?username=${username}&rango=${cambio.rango}`);
      }
      toast.success(`Cambios aplicados a ${username}`);
      obtenerUsuarios();
      cerrarModal();
    } catch (err) {
      toast.error("Error al aplicar cambios");
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setUsuarioSeleccionado(null);
  };

  const mostrarBoton = (u) => {
    const cambio = cambios[u.username];
    return (
      (cambio?.userType && cambio.userType !== u.userType) ||
      (cambio?.rango && cambio.rango !== u.rango)
    );
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Gestión de Usuarios</h2>

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full max-w-sm shadow"
      />

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-gray-700 bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-blue-100 text-blue-900 font-semibold text-left">
              <tr>
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Cambiar Tipo</th>
                <th className="px-4 py-3">Rango</th>
                <th className="px-4 py-3">Cambiar Rango</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                .filter((u) =>
                  u.username.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((u) => (
                  <tr key={u.username} className="hover:bg-blue-50 border-b last:border-none text-center">
                    <td className="px-4 py-3">{u.username}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.userType ?? "Sin tipo"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={cambios[u.username]?.userType ?? u.userType ?? ""}
                        onChange={(e) => manejarCambio(u.username, "userType", e.target.value)}
                        className="w-full px-3 py-1 border rounded bg-white text-black"
                      >
                        <option value="" disabled>Seleccionar tipo</option>
                        {tipos.map((tipo) => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">{u.rango ?? "Sin rango"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={cambios[u.username]?.rango ?? u.rango ?? ""}
                        onChange={(e) => manejarCambio(u.username, "rango", e.target.value)}
                        className="w-full px-3 py-1 border rounded bg-white text-black"
                      >
                        <option value="" disabled>Seleccionar rango</option>
                        {rangos.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {mostrarBoton(u) && (
                        <button
                          onClick={() => {
                            setUsuarioSeleccionado(u.username);
                            setModalVisible(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                        >
                          Revisar cambios
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <ModalConfirmacion
        visible={modalVisible}
        usuario={usuarioSeleccionado}
        cambios={cambios[usuarioSeleccionado]}
        onConfirmar={() => confirmarCambios(usuarioSeleccionado)}
        onCancelar={cerrarModal}
      />
    </div>
  );
}
