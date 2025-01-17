// // import authContext from "@/contexts/auth.context";
// // import { useContext } from "react";
// import { Navigate } from "react-router-dom";

import AuthContext from "@/contexts/auth.context";
import { useContext } from "react";

// // useContext(authContext);
// // const navigate = useNavigate();

// function useAuth(token) {

//     if (token) {
//         const token = JSON.stringify(token);
//         localStorage.setItem("token", token);
//          <Navigate  to="/"/>
//       } else {
//         localStorage.removeItem("token");
//       }
// }

// export default useAuth;

///////////////

export const useAuth = () => {
  return useContext(AuthContext);
};
