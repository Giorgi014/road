export const checkoutInputClass =
  "mt-2 w-full rounded-lg border border-ink-400/60 bg-ink-900/60 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-primary-light";

export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

export const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};
