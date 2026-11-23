export type PaymentMethod =
  | "card"
  | "crypto"
  | "wallet"
  | "transfer";

export type PaymentDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  savedCardId: string;
  cryptoAddress: string;
  cryptoNetwork: string;
  walletProvider: string;
  walletEmail: string;
  accountHolder: string;
  iban: string;
  bankName: string;
};

export type SavedCheckoutDetails = Pick<
  PaymentDetails,
  | "name"
  | "email"
  | "address"
  | "city"
  | "region"
  | "postalCode"
  | "country"
  | "savedCardId"
  | "cryptoAddress"
  | "cryptoNetwork"
  | "walletProvider"
  | "walletEmail"
  | "accountHolder"
  | "bankName"
> & {
  method: PaymentMethod;
};

export type CheckoutState = {
  items?: import("./data").CartItem[];
  source?: "cart" | "buy-now";
};
