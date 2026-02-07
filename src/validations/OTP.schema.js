import * as z from "zod";

export const OtpSchema = z
    .object({
        mobileOtp: z
            .string()
            .length(6, 'OTP must be 6 digits')
            .regex(/^\d{6}$/, 'No Alphabets and special characters allowed'),

        // emailOtp: z
        //     .string()
        //     .length(6, 'OTP must be 6 digits')
        //     .regex(/^\d{6}$/, 'No Alphabets and special characters allowed'),

    })

export default OtpSchema;