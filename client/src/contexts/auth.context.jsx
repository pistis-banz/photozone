// const [data, setData] = useState("");
// const [token, setToken] = useState(localStorage.getItem("token"));

// if (token) {
//   try {
//     if (atob(token.split(".")[1])) {
//       setData(JSON.parse(atob(token.split(".")[1])));
//     }
//     var userDataContext = createContext(data);
//   } catch {
//     localStorage.removeItem("token");
//   }
// }

// const token = localStorage.getItem("token");

// if (token) {
//   const data = JSON.parse(atob(token.split(".")[1]));

//   var authContext = createContext(data);
// } else {
//   localStorage.removeItem("token");
// }

// export default authContext;

// let userInfo = {
//    id,
//   username,
//   firstname,
//   lastname,
//   email,
//   avatar};
//////////////////////////////////////////////////////////////////////////////////////
// const AuthContext = createContext({
//   userData: {},
//   handleAuth: () => {},
// });

// const AuthContextProvider = ({ children }) => {
//   const [newToken, setNewToken] = useState("");
//   const [data, setData] = useState("");

//   const handleAuth = (token) => {
//     setNewToken(token);
//     localStorage.setItem("token", token);
//     if (newToken) {
//       setData(JSON.parse(atob(token.split(".")[1])));
//       <Navigate to="/" />;
//     } else {
//       localStorage.removeItem("token");
//     }
//   };

//   const token = localStorage.getItem("token");

//   const getUserData = () => {
//      if (token) {
//     setData(JSON.parse(atob(token.split(".")[1])));
//     return data;
//   } else {
//     <Navigate to="/login" />;
//   }
//   };

//   return (
//     <AuthContext.Provider value={{ getUserData, handleAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default { AuthContextProvider };

// authContext.js
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [avatarUrl, setAvatarUrl] = useState(null);
//   const navigate = useNavigate();

//   // Décoder le token pour extraire les informations de l'utilisateur
//   const decodeToken = (jwtToken) => {
//     try {
//       const decoded = JSON.parse(atob(jwtToken.split(".")[1]));
//       return {
//         id: decoded.id,
//         username: decoded.username,
//         firstname: decoded.firstname,
//         lastname: decoded.lastname,
//         roles: decoded.roles, // Supposons que les rôles sont inclus dans le token
//       };
//     } catch (error) {
//       console.error("Token invalide", error);
//       return null;
//     }
//   };

//   // Enregistrer le token et extraire les données utilisateur
//   const login = (jwtToken) => {
//     setToken(jwtToken);
//     const userInfo = decodeToken(jwtToken);
//     setUser(userInfo);
//     navigate("/"); // Rediriger vers la page principale
//   };

//   // Effacer les données utilisateur et le token
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     setAvatarUrl(null);
//     navigate("/login");
//   };

//   // Récupérer l'avatar une seule fois lorsque l'utilisateur se connecte
//   useEffect(() => {
//     const fetchAvatar = async () => {
//       if (user?.id) {
//         try {
//           const response = await fetch(`/api/users/${user.id}/avatar`);
//           if (!response.ok) {
//             throw new Error("Échec de la récupération de l'avatar");
//           }
//           const blob = await response.blob();
//           setAvatarUrl(URL.createObjectURL(blob));
//         } catch (error) {
//           console.error("Erreur lors de la récupération de l'avatar", error);
//         }
//       }
//     };

//     fetchAvatar();
//   }, [user]);

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         user,
//         avatarUrl,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

////////////////////////////////////////////////////////////////////

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Function to decode JWT and extract user information
  const decodeToken = (jwtToken) => {
    try {
      const decoded = JSON.parse(atob(jwtToken.split(".")[1]));
      return {
        id: decoded.id,
        username: decoded.username,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
      };
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  // Function to fetch user avatar
  // const fetchUserAvatar = async (userId) => {
  //   try {
  //     const response = await fetch(`localhost:3000/users/${userId}/avatar`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user avatar");
  //     }
  //     const blob = await response.blob();
  //     return URL.createObjectURL(blob);
  //   } catch (error) {
  //     console.error("Error fetching avatar:", error);
  //     return null;
  //   }
  // };

  // Function to handle login
  const login = async (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    const userData = decodeToken(jwtToken);
    if (userData) {
      // const avatarUrl = await fetchUserAvatar(userData.id);

      setUser({ ...userData });
      navigate("/"); // Redirect to the home page
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login"); // Redirect to the login page
  };

  // Initialize user data from token on app load
  useEffect(() => {
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        // fetchUserAvatar(userData.id).then((avatarUrl) => {
        //   setUser({ ...userData, avatar: avatarUrl });
        // });
        setUser(userData);
      } else {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
