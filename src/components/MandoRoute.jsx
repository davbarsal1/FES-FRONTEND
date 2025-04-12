// src/components/MandoRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function MandoRoute({ children }) {
  const { usuario } = useUser();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.userType !== "MANDO" && usuario.userType !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
