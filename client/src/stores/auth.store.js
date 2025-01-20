import { getAvatar } from "@/utils/getAvatar";
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

      // fonction pour verifier si l'utilisateur est dejà authentifié
      isLogged: async () => {
        const decodeToken = get().decodeToken;
        const userInfo = decodeToken(jwtToken);
        const jwtToken = (state) => state.token;
        const user = (state) => state.user;

        if (jwtToken && user) {

          if (user == null) {
            set({
              token: jwtToken,
              user: userInfo,
            });
          }
        } else {
          return false;
        }
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
