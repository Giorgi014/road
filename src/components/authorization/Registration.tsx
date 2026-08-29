import { AuthBtn } from "../ui/AuthBtn";
import { Input } from "../ui/Input";

export const Registration = () => {
  return (
    <form
      action="signup"
      className="w-full space-y-6 text-(--ink-dim)"
      onSubmit={(e) => e.preventDefault()}
    >
      <section className="flex w-full items-center gap-3">
        <Input variant="name" />
        <Input variant="lastname" />
      </section>

      <Input variant="email" />
      <Input variant="password" />

      <AuthBtn variant="registration">SignUp</AuthBtn>
    </form>
  );
};
