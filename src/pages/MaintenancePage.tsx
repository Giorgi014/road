import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Loader } from "@/components/ui";

const MaintenancePage = () => {
  return (
    <main className="relative min-h-screen">
      <Loader />
      <div className="absolute left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 translate-y-32 px-5 text-center">
        <h1 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white sm:text-base">
          We&apos;re making a few improvements
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
          This page is temporarily unavailable while we carry out technical
          maintenance. We expect to be back shortly. Sorry for the interruption,
          and thank you for your patience.
        </p>
      </div>
      <Link
        to="/"
        className="absolute bottom-8 left-1/2 group inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full px-6 py-4 text-2xl font-semibold uppercase tracking-[0.12em] text-white no-underline transition-transform duration-300 hover:scale-[1.03]"
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

export default MaintenancePage;
