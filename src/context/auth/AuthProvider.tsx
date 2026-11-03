import { useCallback, useMemo, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import type { SignInValues, SignUpValues } from "@/schema/auth";
import { AuthContext, type User } from "./auth-context";

const readUser = (): User | null => {
  const saved = Cookies.get("user");
  if (!saved) return null;
  try {
    return JSON.parse(saved) as User;
  } catch {
    Cookies.remove("user");
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(readUser);

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove("user");
  }, []);

  const register = useCallback((values: SignUpValues) => {
    setUser(values);
    Cookies.set("user", JSON.stringify(values), { expires: 7 });
  }, []);

  const login = useCallback(({ email, password }: SignInValues) => {
    const saved = readUser();
    if (!saved) return "User not found.";
    if (saved.email !== email || saved.password !== password) {
      return "Email or password is incorrect.";
    }
    setUser(saved);
    return null;
  }, []);

  const value = useMemo(
    () => ({ user, register, login, logout }),
    [user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
