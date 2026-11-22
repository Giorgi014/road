import { z } from "zod";

const requiredAddressField = z
  .string()
  .trim()
  .min(1, "This field is required.");

export const addressFormSchema = z.object({
  label: requiredAddressField,
  street: requiredAddressField,
  city: requiredAddressField,
  region: requiredAddressField,
  postalCode: requiredAddressField,
  country: requiredAddressField,
  phone: requiredAddressField,
});

export const savedAddressSchema = addressFormSchema.extend({
  id: z.string(),
  isDefault: z.boolean(),
});

export const savedAddressListSchema = z.array(savedAddressSchema);

export type AddressFormValues = z.infer<typeof addressFormSchema>;
