import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Full first name is required");

export const lastNameSchema = z
  .string()
  .trim()
  .min(1, "Full last name is required");

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .pipe(z.email("Invalid email format"));

export const passwordSchema = z
  .string()
  .min(8, "The password must contain at least 8 characters.")
  .regex(/[A-Z]/, "Add at least one uppercase letter")
  .regex(/[a-z]/, "Add at least one lowercase letter")
  .regex(/[0-9]/, "Add at least one digit");
