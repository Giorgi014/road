import { useState } from "react";
import { SAVED_ADDRESSES } from "@/data";
import { savedAddressListSchema } from "@/schema/address";
import type { AddressFormValues } from "@/schema/address";
import type { SavedAddress } from "@/types";

const STORAGE_KEY = "savedAddresses";

const readSavedAddresses = (): SavedAddress[] => {
  try {
    const savedAddresses = window.localStorage.getItem(STORAGE_KEY);
    if (!savedAddresses) return [...SAVED_ADDRESSES];

    const parsed: unknown = JSON.parse(savedAddresses);
    const result = savedAddressListSchema.safeParse(parsed);
    if (result.success) return result.data;

    console.error("Saved addresses in localStorage have an invalid format.");
  } catch (error) {
    console.error("Unable to load saved addresses from localStorage.", error);
  }

  return [...SAVED_ADDRESSES];
};

export const useSavedAddresses = () => {
  const [addresses, setAddresses] = useState<SavedAddress[]>(readSavedAddresses);
  const [storageError, setStorageError] = useState<string | null>(null);

  const persistAddresses = (nextAddresses: SavedAddress[]) => {
    setAddresses(nextAddresses);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAddresses));
      setStorageError(null);
    } catch (error) {
      console.error("Unable to save addresses to localStorage.", error);
      setStorageError("Could not save your addresses in this browser.");
    }
  };

  const addAddress = (values: AddressFormValues) => {
    persistAddresses([
      ...addresses,
      {
        ...values,
        id: crypto.randomUUID(),
        isDefault: addresses.length === 0,
      },
    ]);
  };

  const updateAddress = (id: string, values: AddressFormValues) => {
    persistAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, ...values } : address,
      ),
    );
  };

  const deleteAddress = (id: string) => {
    const remaining = addresses.filter((address) => address.id !== id);
    const needsDefault =
      remaining.length > 0 && !remaining.some((address) => address.isDefault);

    persistAddresses(
      needsDefault
        ? remaining.map((address, index) => ({
            ...address,
            isDefault: index === 0,
          }))
        : remaining,
    );
  };

  return { addresses, storageError, addAddress, updateAddress, deleteAddress };
};
