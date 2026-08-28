import { AuthBtn } from "../ui/AuthBtn";
import { Input } from "../ui/Input";

export const LogIn = () => {
  return (
    <form
      action="login"
      className="w-full space-y-6 text-(--ink-dim)"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input variant="email" />
      <Input variant="password" />
      <AuthBtn variant="login">SignIn</AuthBtn>
    </form>
  );
};
