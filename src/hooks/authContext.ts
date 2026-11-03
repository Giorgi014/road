import { createContext } from "react";

export type User = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type AuthErrors = Record<string, string>;

export type AuthResult = {
  ok: boolean;
  errors?: AuthErrors;
  user?: User;
};

export type AuthContextValue = {
  user: User | null;
  register: (
    name: string,
    lastname: string,
    email: string,
    password: string,
  ) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
