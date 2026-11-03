import { AuthBtn, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useState, type FormEvent } from "react";

export const LogIn = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = login(
      String(formData.get("email") ?? ""),
      String(formData.get("password") ?? ""),
    );
    setError(Object.values(result.errors ?? {})[0] ?? "");
  };

  return (
    <form
      action="login"
      className="w-full space-y-6 text-(--ink-dim)"
      onSubmit={handleSubmit}
    >
      <Input variant="email" />
      <Input variant="password" />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <AuthBtn variant="login">SignIn</AuthBtn>
    </form>
  );
};
