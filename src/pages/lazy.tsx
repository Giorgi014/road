import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const About = lazy(() => import("./About"));
export const Contact = lazy(() => import("./Contact"));
export const Details = lazy(() => import("./Details"));
export const Marketplace = lazy(() => import("./Marketplace"));
export const Profile = lazy(() => import("./Profile"));
export const ErrorPage = lazy(() => import("./ErrorPage"));
export const MaintenancePage = lazy(() => import("./MaintenancePage"));
