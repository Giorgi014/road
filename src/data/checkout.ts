import {
  Bitcoin,
  CreditCard,
  Landmark,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { PaymentMethod } from "@/types/checkout";

export type PaymentMethodContent = {
  id: PaymentMethod;
  label: string;
  detail: string;
  icon: LucideIcon;
};

export const PAYMENT_METHODS: PaymentMethodContent[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    detail: "Visa, Mastercard, Amex",
    icon: CreditCard,
  },
  {
    id: "crypto",
    label: "Crypto Wallet",
    detail: "BTC, ETH or USDT",
    icon: Bitcoin,
  },
  {
    id: "wallet",
    label: "Digital Wallet",
    detail: "Apple Pay, Google Pay",
    icon: Smartphone,
  },
  {
    id: "transfer",
    label: "Bank Transfer",
    detail: "Direct bank payment",
    icon: Landmark,
  },
];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: "Credit / Debit Card",
  crypto: "Crypto Wallet",
  wallet: "Digital Wallet",
  transfer: "Bank Transfer",
};

export const CHECKOUT_COPY = {
  paymentDetailsTitle: "Payment details",
  reviewTitle: "Review & confirm",
  successTitle: "Payment successful",
  successMessage: "Thank you. Your order has been placed successfully.",
  saveDetails: "Save payment details for next time",
  clearDetails: "Forget saved details",
};
