import { z } from "zod";
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
  passwordSchema,
} from "./common";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  lastname: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
