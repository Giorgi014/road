import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthModal } from "@/components/authorization/AuthModal";
import { ModalContext } from "./modal-context";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [onSuccess, setOnSuccess] = useState<(() => void) | undefined>();

	const openAuth = useCallback((success?: () => void) => {
		setOnSuccess(() => success);
		setIsOpen(true);
	}, []);

	const closeAuth = useCallback(() => {
		setIsOpen(false);
		setOnSuccess(undefined);
	}, []);

	const value = useMemo(
		() => ({ openAuth, closeAuth }),
		[openAuth, closeAuth],
	);

	return (
		<ModalContext.Provider value={value}>
			{children}
			{isOpen && (
				<AuthModal
					onClose={closeAuth}
					onSuccess={() => {
						closeAuth();
						onSuccess?.();
					}}
				/>
			)}
		</ModalContext.Provider>
	);
};
