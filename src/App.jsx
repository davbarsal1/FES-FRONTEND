// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Rutas públicas
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Escalafon from "./pages/Escalafon";
import Constitucion from "./pages/Constitucion";
import Contacto from "./pages/Contacto";
import AdministracionInfo from "./pages/AdministracionInfo";
import DGAOInfo from "./pages/DGAOInfo";

// Layouts y protección
import DashboardLayout from "./components/DashboardLayout";
import DashboardGeneralLayout from "./components/DashboardGeneralLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MandoRoute from "./components/MandoRoute";

// Dashboard general (EMPLEADO, MANDO, ADMIN)
import DashboardGeneralHome from "./pages/dashboard/DashboardGeneralHome";
import PeticionForm from "./pages/dashboard/PeticionForm";
import MisPeticiones from "./pages/dashboard/MisPeticiones";
import MiTiempo from "./pages/dashboard/MiTiempo";
import PerfilUsuario from "./pages/dashboard/PerfilUsuario";
import Radio from "./pages/dashboard/Radio";

// Dashboard admin (ADMIN y MANDO)
import DashboardHome from "./pages/dashboard/DashboardHome";
import Usuarios from "./pages/dashboard/Usuarios";
import PeticionesAdmin from "./pages/dashboard/PeticionesAdmin";
import TiempoAdmin from "./pages/dashboard/TiempoAdmin";
import PDAUsuarios from "./pages/dashboard/PDAUsuarios";
import RegistrarActividad from "./pages/dashboard/RegistrarActividad";
import GestionarVentajas from "./pages/dashboard/GestionarVentajas";

// NUEVOS COMPONENTES DE PUBLICIDAD
import RegistrarPublicidad from "./pages/dashboard/RegistrarPublicidad";
import HistorialPublicidad from "./pages/dashboard/HistorialPublicidad";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/escalafon" element={<Escalafon />} />
      <Route path="/constitucion" element={<Constitucion />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/administracion" element={<AdministracionInfo />} />
      <Route path="/dgao" element={<DGAOInfo />} />

      {/* Panel general (EMPLEADO, MANDO, ADMIN) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardGeneralLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardGeneralHome />} />
        <Route path="peticion" element={<PeticionForm />} />
        <Route path="mis-peticiones" element={<MisPeticiones />} />
        <Route path="tiempo" element={<MiTiempo />} />
        <Route path="perfil" element={<PerfilUsuario />} />
        <Route path="radio" element={<Radio />} />
      </Route>

      {/* Panel admin (solo ADMIN y MANDO acceden aquí) */}
      <Route
        path="/admin"
        element={
          <MandoRoute>
            <DashboardLayout />
          </MandoRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="usuarios" element={<AdminRoute><Usuarios /></AdminRoute>} />
        <Route path="peticiones" element={<PeticionesAdmin />} />
        <Route path="tiempo" element={<TiempoAdmin />} />
        <Route path="pda-usuarios" element={<PDAUsuarios />} />
        <Route path="registrar-actividad" element={<RegistrarActividad />} />
        <Route path="ventajas" element={<AdminRoute><GestionarVentajas /></AdminRoute>} />
        <Route path="registrar-publicidad" element={<RegistrarPublicidad />} />
        <Route path="historial-publicidad" element={<HistorialPublicidad />} />
      </Route>
    </Routes>
  );
}

export default App;
