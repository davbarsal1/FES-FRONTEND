// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Rutas públicas
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Escalafon from "./pages/Escalafon";
import Constitucion from "./pages/Constitucion";
import Contacto from "./pages/Contacto";
import Placeholder from "./pages/Placeholder";

// Layouts y protección
import DashboardLayout from "./components/DashboardLayout";
import DashboardGeneralLayout from "./components/DashboardGeneralLayout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Dashboard general (usuarios logueados)
import DashboardGeneralHome from "./pages/dashboard/DashboardGeneralHome";
import PeticionForm from "./pages/dashboard/PeticionForm";
import MisPeticiones from "./pages/dashboard/MisPeticiones";
import MiTiempo from "./pages/dashboard/MiTiempo";

// Dashboard admin (ADMIN y MANDO)
import DashboardHome from "./pages/dashboard/DashboardHome";
import Usuarios from "./pages/dashboard/Usuarios";
import PeticionesAdmin from "./pages/dashboard/PeticionesAdmin";
import TiempoAdmin from "./pages/dashboard/TiempoAdmin";

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
      <Route path="/mandos" element={<Placeholder title="Mandos" />} />
      <Route path="/jud-marchas" element={<Placeholder title="JUD Marchas" />} />
      <Route path="/jud-ataque" element={<Placeholder title="JUD Ataque" />} />

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
      </Route>

      {/* Panel admin (solo ADMIN y MANDO acceden aquí) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="peticiones" element={<PeticionesAdmin />} />
        <Route path="tiempo" element={<TiempoAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
