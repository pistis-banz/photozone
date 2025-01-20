import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
  const isLogged = useAuthStore((state) => state.isLogged);

  return isLogged ? children : <Navigate to="/login" />;
}
