import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import RouteProtection from "./components/routeProtection";
import AuthProvider from "./contexts/auth.context.jsx";
import "./index.css";
import PageNotFound from "./pages/error/pageNotFound";
import Feed from "./pages/feed/Feed.jsx";
import Like from "./pages/like/Like.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProtection>
        <App />
      </RouteProtection>
    ),
  },
  {
    path: "*",
    element: (
      <RouteProtection>
        <PageNotFound />
      </RouteProtection>
    ),
  },
  {
    path: "/like",
    element: (
      <RouteProtection>
        <Like />
      </RouteProtection>
    ),
  },
  {
    path: "/feed",
    element: (
      <RouteProtection>
        <Feed />
      </RouteProtection>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   
      <QueryClientProvider client={new QueryClient()}>
        <Suspense fallback={<div>loading...</div>}>
          <RouterProvider router={route} />
        </Suspense>
      </QueryClientProvider>

  </StrictMode>
);
