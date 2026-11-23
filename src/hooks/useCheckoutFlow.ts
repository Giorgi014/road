import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useData } from "@/context/data";
import { useSavedAddresses } from "@/hooks/useSavedAddresses";
import { useSavedCheckoutDetails } from "@/hooks/useSavedCheckoutDetails";
import { useSavedPaymentMethods } from "@/hooks/useSavedPaymentMethods";
import { useSavedOrders } from "@/hooks/useSavedOrders";
import { checkoutDetailsSchema } from "@/schema/checkout";
import type {
  CheckoutState,
  PaymentDetails,
  PaymentMethod,
  SavedAddress,
} from "@/types";

export const useCheckoutFlow = (state: CheckoutState) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, removeCart } = useData();
  const { addresses } = useSavedAddresses();
  const { paymentMethods } = useSavedPaymentMethods();
  const { addOrder } = useSavedOrders();
  const {
    details: savedDetails,
    saveDetails,
    clearDetails,
  } = useSavedCheckoutDetails();

  const items = state.items?.length ? state.items : cartItems;
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<PaymentMethod>(
    savedDetails?.method ?? "card",
  );
  const defaultAddress = addresses.find((address) => address.isDefault);
  const availableSavedCardId =
    savedDetails?.savedCardId &&
    paymentMethods.some((card) => card.id === savedDetails.savedCardId)
      ? savedDetails.savedCardId
      : (paymentMethods.find((card) => card.isDefault)?.id ?? "");
  const [details, setDetails] = useState<PaymentDetails>({
    name: savedDetails?.name ?? user?.name ?? "",
    email: savedDetails?.email ?? user?.email ?? "",
    address: savedDetails?.address ?? defaultAddress?.street ?? "",
    city: savedDetails?.city ?? defaultAddress?.city ?? "",
    region: savedDetails?.region ?? defaultAddress?.region ?? "",
    postalCode: savedDetails?.postalCode ?? defaultAddress?.postalCode ?? "",
    country: savedDetails?.country ?? defaultAddress?.country ?? "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    savedCardId: availableSavedCardId,
    cryptoAddress: savedDetails?.cryptoAddress ?? "",
    cryptoNetwork: savedDetails?.cryptoNetwork ?? "",
    walletProvider: savedDetails?.walletProvider ?? "",
    walletEmail: savedDetails?.walletEmail ?? "",
    accountHolder: savedDetails?.accountHolder ?? "",
    iban: "",
    bankName: savedDetails?.bankName ?? "",
  });
  const [shouldSaveDetails, setShouldSaveDetails] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderId] = useState(
    () => `ROAD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  );

  const handleContinue = () => {
    if (step === 2) {
      const result = checkoutDetailsSchema.safeParse({ method, ...details });
      if (!result.success) {
        setValidationErrors(
          result.error.issues.map((issue) => issue.message),
        );
        return;
      }
      setValidationErrors([]);
      if (shouldSaveDetails) {
        saveDetails({
          method,
          name: details.name,
          email: details.email,
          address: details.address,
          city: details.city,
          region: details.region,
          postalCode: details.postalCode,
          country: details.country,
          savedCardId: details.savedCardId,
          cryptoAddress: details.cryptoAddress,
          cryptoNetwork: details.cryptoNetwork,
          walletProvider: details.walletProvider,
          walletEmail: details.walletEmail,
          accountHolder: details.accountHolder,
          bankName: details.bankName,
        });
      }
    }
    setStep((current) => current + 1);
  };

  const selectAddress = (address: SavedAddress) => {
    setDetails((current) => ({
      ...current,
      address: address.street,
      city: address.city,
      region: address.region,
      postalCode: address.postalCode,
      country: address.country,
    }));
  };

  const clearSavedDetails = () => {
    clearDetails();
    setDetails((current) => ({
      ...current,
      savedCardId: "",
      cryptoAddress: "",
      cryptoNetwork: "",
      walletProvider: "",
      walletEmail: "",
      accountHolder: "",
      iban: "",
      bankName: "",
    }));
  };

  const placeOrder = () => {
    const saved = addOrder({
      id: orderId,
      customerEmail: user?.email ?? details.email,
      items,
    });
    if (!saved) {
      setOrderError("Order could not be saved. Please try again.");
      return;
    }

    if (state.source !== "buy-now") {
      for (const item of items) {
        removeCart(item.id, item.selectedSize, item.selectedColor);
      }
    }
    setOrderError(null);
    setStep(4);
  };

  return {
    addresses,
    paymentMethods,
    items,
    step,
    setStep,
    method,
    setMethod,
    details,
    setDetails,
    shouldSaveDetails,
    setShouldSaveDetails,
    validationErrors,
    setValidationErrors,
    orderError,
    orderId,
    handleContinue,
    selectAddress,
    clearSavedDetails,
    placeOrder,
    navigate,
  };
};
