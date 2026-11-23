import { useState } from "react";
import { savedCheckoutDetailsSchema } from "@/schema/checkout";
import type { SavedCheckoutDetails } from "@/types/checkout";

const STORAGE_KEY = "savedCheckoutDetails";

const readSavedCheckoutDetails = (): SavedCheckoutDetails | null => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed: unknown = JSON.parse(saved);
    const result = savedCheckoutDetailsSchema.safeParse(parsed);
    if (result.success) return result.data;
  } catch (error) {
    console.error("Unable to load saved checkout details.", error);
  }
  return null;
};

export const useSavedCheckoutDetails = () => {
  const [details, setDetails] =
    useState<SavedCheckoutDetails | null>(readSavedCheckoutDetails);
  const [storageError, setStorageError] = useState<string | null>(null);

  const saveDetails = (nextDetails: SavedCheckoutDetails) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDetails));
      setDetails(nextDetails);
      setStorageError(null);
      return true;
    } catch (error) {
      console.error("Unable to save checkout details.", error);
      setStorageError("Could not save your checkout details in this browser.");
      return false;
    }
  };

  const clearDetails = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setDetails(null);
      setStorageError(null);
    } catch (error) {
      console.error("Unable to delete saved checkout details.", error);
      setStorageError("Could not delete your saved checkout details.");
    }
  };

  return { details, storageError, saveDetails, clearDetails };
};
