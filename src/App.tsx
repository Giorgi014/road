import { Header } from "./components/layout/header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/layout/footer/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
