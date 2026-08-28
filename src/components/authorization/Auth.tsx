import { useState } from "react";
import { LogIn } from "./LogIn";
import { Ragistration } from "./Ragistration";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <article className="my-5 flex w-full flex-col items-center justify-center">
      {isLogin ? (
        <>
          <LogIn />
          <p className="mt-6 text-sm text-white/40">
            You don&apos;t have an account?{" "}
            <button
              type="button"
              className="cursor-pointer font-medium text-electric-400 transition-colors hover:text-electric-300"
              onClick={() => setIsLogin(false)}
            >
              SignUp
            </button>
          </p>
        </>
      ) : (
        <>
          <Ragistration />
          <p className="mt-6 text-sm text-white/40">
            Already have an account?{" "}
            <button
              type="button"
              className="cursor-pointer font-medium text-electric-400 transition-colors hover:text-electric-300"
              onClick={() => setIsLogin(true)}
            >
              SignIn
            </button>
          </p>
        </>
      )}
    </article>
  );
};
