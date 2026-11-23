import { z } from "zod";
import { emailSchema } from "@/schema/common";
import { cardNumberSchema, expirySchema } from "@/schema/payment";

const requiredText = (message: string) =>
  z.string().trim().min(1, message);

const billingSchema = z.object({
  name: requiredText("Full name is required."),
  email: emailSchema,
  address: requiredText("Billing address is required."),
  city: requiredText("City is required."),
  region: z.string().trim(),
  postalCode: requiredText("Postal code is required."),
  country: requiredText("Country is required."),
});

const cardSchema = billingSchema
  .extend({
    method: z.literal("card"),
    savedCardId: z.string(),
    cardNumber: z.string(),
    expiry: z.string(),
    cvv: z.string(),
  })
  .superRefine((value, context) => {
    if (value.savedCardId) return;

    if (!cardNumberSchema.safeParse(value.cardNumber).success) {
      context.addIssue({
        code: "custom",
        path: ["cardNumber"],
        message: "Enter a valid card number.",
      });
    }
    if (!expirySchema.safeParse(value.expiry).success) {
      context.addIssue({
        code: "custom",
        path: ["expiry"],
        message: "Use a valid future expiry date in MM/YY format.",
      });
    }
    if (!/^\d{3,4}$/.test(value.cvv)) {
      context.addIssue({
        code: "custom",
        path: ["cvv"],
        message: "Enter a valid 3 or 4 digit security code.",
      });
    }
  });

const cryptoSchema = billingSchema.extend({
  method: z.literal("crypto"),
  cryptoAddress: z
    .string()
    .trim()
    .min(1, "Enter a valid wallet address.")
    .regex(
      /^((0x[a-fA-F0-9]{40})|[13][a-km-zA-HJ-NP-Z1-9]{25,34}|[A-Za-z0-9]{32,44})$/,
      "Enter a valid wallet address.",
    ),
  cryptoNetwork: requiredText("Select a network."),
});

const walletSchema = billingSchema.extend({
  method: z.literal("wallet"),
  walletProvider: requiredText("Select a digital wallet."),
  walletEmail: emailSchema,
});

const transferSchema = billingSchema.extend({
  method: z.literal("transfer"),
  accountHolder: requiredText("Account holder name is required."),
  iban: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, "").toUpperCase())
    .pipe(
      z
        .string()
        .regex(/^[A-Z]{2}[A-Z0-9]{13,31}$/, "Enter a valid IBAN."),
    ),
  bankName: requiredText("Bank name is required."),
});

export const checkoutDetailsSchema = z.discriminatedUnion("method", [
  cardSchema,
  cryptoSchema,
  walletSchema,
  transferSchema,
]);

export const savedCheckoutDetailsSchema = z.object({
  method: z.enum(["card", "crypto", "wallet", "transfer"]),
  name: z.string(),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
  savedCardId: z.string(),
  cryptoAddress: z.string(),
  cryptoNetwork: z.string(),
  walletProvider: z.string(),
  walletEmail: z.string(),
  accountHolder: z.string(),
  bankName: z.string(),
});
