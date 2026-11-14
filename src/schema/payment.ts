import { z } from "zod";

const isValidCardNumber = (value: string) => {
	let sum = 0;
	let doubleDigit = false;

	for (let index = value.length - 1; index >= 0; index -= 1) {
		let digit = Number(value[index]);
		if (doubleDigit) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}
		sum += digit;
		doubleDigit = !doubleDigit;
	}

	return sum % 10 === 0;
};

const isFutureExpiry = (value: string) => {
	const [month, shortYear] = value.split("/").map(Number);
	const year = 2000 + shortYear;
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;

	return year > currentYear || (year === currentYear && month >= currentMonth);
};

const cardNumberSchema = z
	.string()
	.trim()
	.transform((value) => value.replace(/[\s-]/g, ""))
	.pipe(
		z
			.string()
			.regex(/^\d{13,19}$/, "Enter a valid card number.")
			.refine(isValidCardNumber, "Enter a valid card number."),
	);

const expirySchema = z
	.string()
	.trim()
	.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format.")
	.refine(isFutureExpiry, "The card has expired.");

export const paymentFormSchema = z.object({
	cardholder: z.string().trim().min(1, "Cardholder name is required."),
	cardNumber: cardNumberSchema,
	expiry: expirySchema,
	securityCode: z.string().regex(/^\d{3,4}$/, "Enter a valid security code."),
});

export const savedPaymentMethodSchema = z.object({
	id: z.string(),
	cardholder: z.string().min(1),
	brand: z.string().min(1),
	last4: z.string().regex(/^\d{4}$/),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/),
	isDefault: z.boolean(),
});

export const savedPaymentMethodListSchema = z.array(savedPaymentMethodSchema);

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
export type SavedPaymentMethod = z.infer<typeof savedPaymentMethodSchema>;
