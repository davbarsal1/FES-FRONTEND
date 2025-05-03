// src/pages/dashboard/Usuarios.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ModalConfirmacion from "../../components/ModalConfirmacion";
import "react-toastify/dist/ReactToastify.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [cambios, setCambios] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [estadoRequisitos, setEstadoRequisitos] = useState({});

  const { usuario, login } = useUser();
  const navigate = useNavigate();

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
      const users = res.data;
      setUsuarios(users);
      setCargando(false);

      // Comprobar requisitos uno a uno
      for (const u of users) {
        try {
          const result = await axios.get(`${API_URL}/requisitos-cumplidos?username=${u.username}`);
          setEstadoRequisitos((prev) => ({
            ...prev,
            [u.username]: result.data === true,
          }));
        } catch {
          setEstadoRequisitos((prev) => ({
            ...prev,
            [u.username]: false,
          }));
        }
      }

    } catch {
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
    let requiereRedireccion = false;

    try {
      if (cambio?.userType) {
        await axios.post(`${API_URL}/cambiarUserType?username=${username}&userType=${cambio.userType}`);
        if (username === usuario.username) {
          const actualizado = { ...usuario, userType: cambio.userType };
          login(actualizado);
          localStorage.setItem("usuarioFES", JSON.stringify(actualizado));
          requiereRedireccion = true;
        }
      }

      if (cambio?.rango) {
        await axios.post(`${API_URL}/cambiarRango?username=${username}&rango=${cambio.rango}`);
        if (username === usuario.username) {
          const actualizado = { ...usuario, rango: cambio.rango };
          login(actualizado);
          localStorage.setItem("usuarioFES", JSON.stringify(actualizado));
          requiereRedireccion = true;
        }
      }

      if (cambio?.rangoEspecifico !== undefined) {
        await axios.post(`${API_URL}/cambiarMision?username=${username}&rangoEspecifico=${cambio.rangoEspecifico}`);
      }

      toast.success(`Cambios aplicados a ${username}`);
      obtenerUsuarios();
      cerrarModal();

      if (requiereRedireccion) {
        navigate("/dashboard", { replace: true });
      }

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
      (cambio?.rango && cambio.rango !== u.rango) ||
      (cambio?.rangoEspecifico !== undefined && cambio.rangoEspecifico !== u.rangoEspecifico)
    );
  };

  return (
    <div className="w-full text-white">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Gestión de Usuarios</h2>

      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-4 py-2 border border-yellow-400 bg-black text-white rounded w-full max-w-sm shadow"
      />

      {cargando ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="overflow-auto bg-black p-4 rounded-xl border border-yellow-700 shadow-md">
          <table className="w-full text-sm bg-black rounded-xl overflow-hidden text-white">
            <thead className="bg-yellow-600 text-black">
              <tr className="text-center">
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Cambiar Tipo</th>
                <th className="px-4 py-3">Rango</th>
                <th className="px-4 py-3">Cambiar Rango</th>
                <th className="px-4 py-3">Misión</th>
                <th className="px-4 py-3">Cumple requisitos</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                .filter((u) =>
                  u.username.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((u) => (
                  <tr key={u.username} className="text-center border-t border-yellow-800">
                    <td className="px-4 py-2">{u.username}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.userType ?? "Sin tipo"}</td>
                    <td className="px-4 py-2">
                      <select
                        value={cambios[u.username]?.userType ?? u.userType ?? ""}
                        onChange={(e) => manejarCambio(u.username, "userType", e.target.value)}
                        className="w-full px-2 py-1 bg-gray-900 border border-yellow-600 rounded text-white"
                      >
                        <option value="" disabled>Seleccionar tipo</option>
                        {tipos.map((tipo) => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">{u.rango ?? "Sin rango"}</td>
                    <td className="px-4 py-2">
                      <select
                        value={cambios[u.username]?.rango ?? u.rango ?? ""}
                        onChange={(e) => manejarCambio(u.username, "rango", e.target.value)}
                        className="w-full px-2 py-1 bg-gray-900 border border-yellow-600 rounded text-white"
                      >
                        <option value="" disabled>Seleccionar rango</option>
                        {rangos.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        placeholder="Misión"
                        value={cambios[u.username]?.rangoEspecifico ?? u.rangoEspecifico ?? ""}
                        onChange={(e) => manejarCambio(u.username, "rangoEspecifico", e.target.value)}
                        className="w-full px-2 py-1 bg-gray-900 border border-yellow-600 rounded text-white"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {estadoRequisitos[u.username] === true ? (
                        <span className="text-green-400 font-semibold">✅ Sí</span>
                      ) : estadoRequisitos[u.username] === false ? (
                        <span className="text-red-400 font-semibold">❌ No</span>
                      ) : (
                        <span className="text-gray-400">Cargando...</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
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
