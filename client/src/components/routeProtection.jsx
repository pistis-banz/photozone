import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}
