import type { PaymentDetails } from "@/types";
import { checkoutInputClass } from "@/lib/checkout";
import { CheckoutField } from "./CheckoutField";

export const BillingAddressFields = ({
  value,
  onChange,
}: {
  value: PaymentDetails;
  onChange: (value: PaymentDetails) => void;
}) => {
  const setField = (field: keyof PaymentDetails, fieldValue: string) =>
    onChange({ ...value, [field]: fieldValue });

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <CheckoutField label="Full name">
        <input
          className={checkoutInputClass}
          value={value.name}
          onChange={(event) => setField("name", event.target.value)}
          placeholder="Alex Morgan"
        />
      </CheckoutField>
      <CheckoutField label="Email">
        <input
          type="email"
          className={checkoutInputClass}
          value={value.email}
          onChange={(event) => setField("email", event.target.value)}
          placeholder="alex@example.com"
        />
      </CheckoutField>
      <CheckoutField label="Billing address" className="sm:col-span-2">
        <input
          className={checkoutInputClass}
          value={value.address}
          onChange={(event) => setField("address", event.target.value)}
          placeholder="Street address"
        />
      </CheckoutField>
      <CheckoutField label="City">
        <input
          className={checkoutInputClass}
          value={value.city}
          onChange={(event) => setField("city", event.target.value)}
          placeholder="Tbilisi"
        />
      </CheckoutField>
      <CheckoutField label="Region">
        <input
          className={checkoutInputClass}
          value={value.region}
          onChange={(event) => setField("region", event.target.value)}
          placeholder="Region"
        />
      </CheckoutField>
      <CheckoutField label="Postal code">
        <input
          className={checkoutInputClass}
          value={value.postalCode}
          onChange={(event) => setField("postalCode", event.target.value)}
          placeholder="0100"
        />
      </CheckoutField>
      <CheckoutField label="Country">
        <input
          className={checkoutInputClass}
          value={value.country}
          onChange={(event) => setField("country", event.target.value)}
          placeholder="Georgia"
        />
      </CheckoutField>
    </div>
  );
};
