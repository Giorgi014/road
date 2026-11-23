import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import { ProtectedRoute } from "@/components/authorization";
import { AuthProvider } from "@/context/auth";
import { AccountDataProvider } from "@/context/data";
import { ModalProvider } from "@/context/modal";
import { Loader } from "./components/ui";
import {
  About,
  Contact,
  Checkout,
  Details,
  ErrorPage,
  Home,
  MaintenancePage,
  Marketplace,
  Orders,
  Profile,
  Wishlist,
} from "./pages/lazy";
import "./index.css";
import CategoryRedirect from "./pages/CategoryRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:id/:name", element: <Details /> },
      { path: "checkout", element: <Checkout /> },
      {
        path: "profile/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "profile/*", element: <MaintenancePage /> },
      { path: "ranks", element: <MaintenancePage /> },
      { path: "category/:slug", element: <CategoryRedirect /> },
      { path: "products/:id", element: <MaintenancePage /> },
      { path: "*", element: <ErrorPage /> },
      { path: "maintenance", element: <MaintenancePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AccountDataProvider>
        <ModalProvider>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </ModalProvider>
      </AccountDataProvider>
    </AuthProvider>
  </StrictMode>,
);
