import * as z from "zod";

export const LoginSchema = z.object({
  mobile: z
    .string()
    .min(10, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number must be 10 digits')
    .regex(/^\d{10}$/, 'No Alphabets and special characters allowed'),

  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'No Alphabets and special characters allowed'),
});

export default LoginSchema;
