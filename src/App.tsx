import { Outlet } from "react-router-dom";
import { Footer, Header, ScrollToTop } from "./components";

export default function App() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<ScrollToTop />
		</>
	);
}
