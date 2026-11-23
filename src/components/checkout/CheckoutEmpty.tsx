import { Link } from "react-router-dom";

export const CheckoutEmpty = () => (
  <main className="mx-auto mt-19 flex min-h-[65vh] max-w-[1600px] flex-col items-center justify-center px-5 text-center">
    <h1 className="font-display text-lg uppercase">Your checkout is empty</h1>
    <Link
      to="/marketplace"
      className="mt-5 rounded-xl bg-(image:--pill-grad) px-5 py-3 text-xs uppercase text-white"
    >
      Explore marketplace
    </Link>
  </main>
);
