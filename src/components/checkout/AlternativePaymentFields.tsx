import type { PaymentDetails, PaymentMethod } from "@/types";
import { checkoutInputClass } from "@/lib/checkout";
import { CheckoutField } from "./CheckoutField";

export const AlternativePaymentFields = ({
  method,
  value,
  onChange,
}: {
  method: PaymentMethod;
  value: PaymentDetails;
  onChange: (value: PaymentDetails) => void;
}) => {
  const setField = (field: keyof PaymentDetails, fieldValue: string) =>
    onChange({ ...value, [field]: fieldValue });

  if (method === "crypto") {
    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CheckoutField label="Network">
          <select
            className={checkoutInputClass}
            value={value.cryptoNetwork}
            onChange={(event) => setField("cryptoNetwork", event.target.value)}
          >
            <option value="">Select network</option>
            <option>Bitcoin</option>
            <option>Ethereum</option>
            <option>USDT ERC20</option>
            <option>USDT TRC20</option>
          </select>
        </CheckoutField>
        <CheckoutField label="Wallet address" className="sm:col-span-2">
          <input
            className={checkoutInputClass}
            value={value.cryptoAddress}
            onChange={(event) => setField("cryptoAddress", event.target.value)}
            placeholder="0x..."
          />
        </CheckoutField>
      </div>
    );
  }

  if (method === "wallet") {
    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CheckoutField label="Wallet">
          <select
            className={checkoutInputClass}
            value={value.walletProvider}
            onChange={(event) => setField("walletProvider", event.target.value)}
          >
            <option value="">Select wallet</option>
            <option>Apple Pay</option>
            <option>Google Pay</option>
            <option>PayPal</option>
          </select>
        </CheckoutField>
        <CheckoutField label="Wallet email">
          <input
            type="email"
            className={checkoutInputClass}
            value={value.walletEmail}
            onChange={(event) => setField("walletEmail", event.target.value)}
            placeholder="wallet@example.com"
          />
        </CheckoutField>
      </div>
    );
  }

  if (method === "transfer") {
    return (
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CheckoutField label="Account holder">
          <input
            className={checkoutInputClass}
            value={value.accountHolder}
            onChange={(event) => setField("accountHolder", event.target.value)}
          />
        </CheckoutField>
        <CheckoutField label="Bank name">
          <input
            className={checkoutInputClass}
            value={value.bankName}
            onChange={(event) => setField("bankName", event.target.value)}
          />
        </CheckoutField>
        <CheckoutField label="IBAN" className="sm:col-span-2">
          <input
            className={checkoutInputClass}
            value={value.iban}
            onChange={(event) =>
              setField("iban", event.target.value.toUpperCase())
            }
            placeholder="GE00..."
          />
        </CheckoutField>
      </div>
    );
  }

  return null;
};
