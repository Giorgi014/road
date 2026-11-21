import { createContext } from "react";

export type ModalContextValue = {
	openAuth: (onSuccess?: () => void) => void;
	closeAuth: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
