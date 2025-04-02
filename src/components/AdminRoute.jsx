// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute({ children }) {
  const { usuario } = useUser();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.userType !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
