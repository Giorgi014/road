import { useCallback, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { signInSchema, signUpSchema } from "@/schema/auth";
import type { z } from "zod";
import {
  AuthContext,
  type AuthErrors,
  type User,
} from "./authContext";

const fieldErrors = (issues: z.core.$ZodIssue[]) => {
  const errors: AuthErrors = {};

  issues.forEach((issue) => {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  });

  return errors;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = Cookies.get("user");
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      Cookies.remove("user");
      return null;
    }
  });

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove("user");
  }, []);

  const register = useCallback(
    (name: string, lastname: string, email: string, password: string) => {
      const parsed = signUpSchema.safeParse({
        name,
        lastname,
        email,
        password,
      });

      if (!parsed.success) {
        return { ok: false, errors: fieldErrors(parsed.error.issues) };
      }

      const newUser = {
        name: parsed.data.name,
        lastname: parsed.data.lastname,
        email: parsed.data.email,
        password: parsed.data.password,
      };

      setUser(newUser);
      Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
      return { ok: true, user: newUser };
    },
    [],
  );

  const login = useCallback((email: string, password: string) => {
    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) {
      return { ok: false, errors: fieldErrors(parsed.error.issues) };
    }

    const savedUser = Cookies.get("user");
    if (!savedUser) {
      return { ok: false, errors: { form: "User not found." } };
    }

    let parsedUser: User;
    try {
      parsedUser = JSON.parse(savedUser) as User;
    } catch {
      Cookies.remove("user");
      return {
        ok: false,
        errors: { form: "Corrupted session. Please register again." },
      };
    }

    if (parsedUser.email === parsed.data.email && parsedUser.password === parsed.data.password) {
      setUser(parsedUser);
      return { ok: true, user: parsedUser };
    }

    return {
      ok: false,
      errors: { form: "Email or password is incorrect." },
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
