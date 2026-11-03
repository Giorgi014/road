import { AuthBtn, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useState, type FormEvent } from "react";

export const Registration = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = register(
      String(formData.get("first-name") ?? ""),
      String(formData.get("last-name") ?? ""),
      String(formData.get("email") ?? ""),
      String(formData.get("password") ?? ""),
    );
    setError(Object.values(result.errors ?? {})[0] ?? "");
  };

  return (
    <form
      action="signup"
      className="w-full space-y-6 text-(--ink-dim)"
      onSubmit={handleSubmit}
    >
      <section className="flex w-full items-center gap-3">
        <Input variant="name" />
        <Input variant="lastname" />
      </section>

      <Input variant="email" />
      <Input variant="password" />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <AuthBtn variant="registration">SignUp</AuthBtn>
    </form>
  );
};
