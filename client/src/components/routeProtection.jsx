import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

export default function RouteProtection({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isLoggIn = token && user;

  return isLoggIn ? children : <Navigate to="/login" />;
}
