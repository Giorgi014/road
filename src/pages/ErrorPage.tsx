import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ErrorImg from "@/assets/img/error.png";

const ErrorPage = () => {
  return (
    <main className="mx-auto relative flex min-h-[70vh] w-full max-w-[1600px] flex-col items-center justify-center gap-8">
      <img
        src={ErrorImg}
        alt="404 - Page not found"
        className="w-full h-full object-contain"
      />
      <Link
        to="/"
        className="absolute group inline-flex items-center gap-2.5 rounded-full px-6 py-4 text-2xl font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03]"
      >
        <ArrowLeft
          size={26}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Home
      </Link>
    </main>
  );
};

export default ErrorPage;
