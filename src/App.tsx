import { Header } from "@/components/layout/header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/footer";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
