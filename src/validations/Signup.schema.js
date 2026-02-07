import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required"),

    abhaId: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{14}$/.test(val), {
        message: "ABHA ID must be 14 digits and contain only digits",
      }),
    
    mobile: z
        .string()
        .min(10, 'Mobile number must be 10 digits')
        .max(10, 'Mobile number must be 10 digits')
        .regex(/^\d{10}$/, 'No Alphabets and special characters allowed'),

    email: z
      .string()
      .optional()
      .refine((val) => !val || /^\S+@\S+\.\S+$/.test(val), {
        message: "Invalid email address",
      }),

    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the DISCLAIMER & CONSENT NOTICE",
      }),

  })

export default SignupSchema;