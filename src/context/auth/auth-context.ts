import { createContext } from "react";
import type { SignInValues, SignUpValues } from "@/schema/auth";

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
	register: (values: SignUpValues) => void;
	login: (values: SignInValues) => string | null;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
