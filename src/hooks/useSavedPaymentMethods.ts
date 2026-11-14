import { useState } from "react";
import {
	savedPaymentMethodListSchema,
	type PaymentFormValues,
	type SavedPaymentMethod,
} from "@/schema/payment";

const STORAGE_KEY = "savedPaymentMethods";

const readSavedPaymentMethods = (): SavedPaymentMethod[] => {
	try {
		const savedMethods = window.localStorage.getItem(STORAGE_KEY);
		if (!savedMethods) return [];

		const parsed: unknown = JSON.parse(savedMethods);
		const result = savedPaymentMethodListSchema.safeParse(parsed);
		if (result.success) return result.data;

		console.error("Saved payment methods in localStorage have an invalid format.");
	} catch (error) {
		console.error("Unable to load payment methods from localStorage.", error);
	}

	return [];
};

const getCardBrand = (number: string) => {
	if (/^4/.test(number)) return "Visa";
	if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(number)) {
		return "Mastercard";
	}
	if (/^3[47]/.test(number)) return "American Express";
	if (/^(6011|65|64[4-9])/.test(number)) return "Discover";
	return "Card";
};

const toSavedPaymentMethod = (
	values: PaymentFormValues,
	id: string,
	isDefault: boolean,
): SavedPaymentMethod => ({
	id,
	cardholder: values.cardholder,
	brand: getCardBrand(values.cardNumber),
	last4: values.cardNumber.slice(-4),
	expiry: values.expiry,
	isDefault,
});

export const useSavedPaymentMethods = () => {
	const [paymentMethods, setPaymentMethods] = useState<SavedPaymentMethod[]>(
		readSavedPaymentMethods,
	);
	const [storageError, setStorageError] = useState<string | null>(null);

	const persistPaymentMethods = (nextMethods: SavedPaymentMethod[]) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMethods));
			setPaymentMethods(nextMethods);
			setStorageError(null);
			return true;
		} catch (error) {
			console.error("Unable to save payment methods to localStorage.", error);
			setStorageError("Could not save your payment methods in this browser.");
			return false;
		}
	};

	const addPaymentMethod = (values: PaymentFormValues) =>
		persistPaymentMethods([
			...paymentMethods,
			toSavedPaymentMethod(values, crypto.randomUUID(), paymentMethods.length === 0),
		]);

	const updatePaymentMethod = (
		id: string,
		values: PaymentFormValues,
	) =>
		persistPaymentMethods(
			paymentMethods.map((method) =>
				method.id === id
					? toSavedPaymentMethod(values, method.id, method.isDefault)
					: method,
			),
		);

	const deletePaymentMethod = (id: string) => {
		const remaining = paymentMethods.filter((method) => method.id !== id);
		const needsDefault =
			remaining.length > 0 && !remaining.some((method) => method.isDefault);

		return persistPaymentMethods(
			needsDefault
				? remaining.map((method, index) => ({
						...method,
						isDefault: index === 0,
					}))
				: remaining,
		);
	};

	const setDefaultPaymentMethod = (id: string) =>
		persistPaymentMethods(
			paymentMethods.map((method) => ({
				...method,
				isDefault: method.id === id,
			})),
		);

	return {
		paymentMethods,
		storageError,
		addPaymentMethod,
		updatePaymentMethod,
		deletePaymentMethod,
		setDefaultPaymentMethod,
	};
};
