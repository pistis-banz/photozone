import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      avatarFile: null,
      avatarUrl: null,

      // Décoder le token JWT
      decodeToken: (jwtToken) => {
        try {
          return JSON.parse(atob(jwtToken.split(".")[1]));
        } catch (error) {
          console.error("Token invalide : ", error);
          return null;
        }
      },

      // fonction de recuperation de l'avatar
      getAvatar: async (id, token) => {
        try {
          const response = await fetch(
            `http://localhost:3000/user/avatar/${id}`,
            {
              method: "POST",
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const file = await response.blob();
            return file;
          } else {
            throw new Error("Échec de la récupération de l'avatar");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'avatar : ", error);
          return null;
        }
      },
      // Fonction pour connecter l'utilisateur
      login: async (jwtToken) => {
        const decodeToken = get().decodeToken;
        let userInfo;
        try {
          userInfo = decodeToken(jwtToken);
          console.log(userInfo);
        } catch (error) {
          console.log(error);
        }
        const getAvatar = get().getAvatar;

        const file = await getAvatar(userInfo.id, jwtToken);
        const reader = new FileReader();

        reader.onloadend = () => {
          set({
            token: jwtToken,
            user: userInfo,
            avatarUrl: reader.result,
          });
        };
        reader.readAsDataURL(file);
      },

      // Fonction pour déconnecter l'utilisateur
      logout: () => {
        set({
          token: null,
          user: null,
          avatarUrl: null,
        });

        localStorage.removeItem("token");
      },
    }),
    {
      name: "token",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        avatarUrl: state.avatarUrl,
      }),
    }
  )
);
