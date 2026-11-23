import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const About = lazy(() => import("./About"));
export const Contact = lazy(() => import("./Contact"));
export const Details = lazy(() => import("./Details"));
export const Checkout = lazy(() => import("./Checkout"));
export const Marketplace = lazy(() => import("./Marketplace"));
export const Profile = lazy(() => import("./Profile"));
export const Wishlist = lazy(() => import("./Wishlist"));
export const Orders = lazy(() => import("./Orders"));
export const ErrorPage = lazy(() => import("./ErrorPage"));
export const MaintenancePage = lazy(() => import("./MaintenancePage"));
