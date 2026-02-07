import * as z from "zod";

export const ProfileSchema = z.object({
    // name: z
    //     .string()
    //     .min(1, "Name is required"),
    // mobile: z
    //     .string()
    //     .min(10, 'Mobile number must be 10 digits')
    //     .max(10, 'Mobile number must be 10 digits')
    //     .regex(/^\d{10}$/, 'No Alphabets and special characters allowed'),
    // abhaId: z.string()
    //     .length(14, { message: "ABHA ID must be exactly 14 digits" })
    //     .regex(/^\d+$/, { message: "ABHA ID must contain only numbers" }),
    // dob: z.string()
    //     .min(1, { message: "Please enter your date of birth" })
    //     .refine((val) => !Number.isNaN(Date.parse(val)), { message: "Please enter a valid date of birth" })
    //     .refine((val) => new Date(val) <= new Date(), { message: "Date of birth cannot be in the future" }),
    // gender: z.string().min(1, { message: "Please select gender" }),
    // bloodGroup: z.string().min(1, { message: "Please select blood group" }),
    // heightFeet: z.string().min(1, { message: "Please select height in feet" }),
    // heightInches: z.string().min(1, { message: "Please select height in inches" }),
    // weight: z.string()
    //     .min(1, { message: "Please enter your weight" })
    //     .regex(/^\d+(\.\d+)?$/, { message: "Please enter a valid weight, e.g., 60.5" })
    //     .refine((val) => parseFloat(val) > 0 && parseFloat(val) < 500, {
    //         message: "Weight must be between 1 and 500 kg"
    //     }),


    name: z.string().min(1, "Name is required").optional(),
    
    mobile: z
        .string()
        .min(10, 'Mobile number must be 10 digits')
        .max(10, 'Mobile number must be 10 digits')
        .regex(/^\d{10}$/, 'No Alphabets and special characters allowed'),
    
    abhaId: z.string()
        .optional()
        .refine((val) => !val || /^\d{14}$/.test(val), {
            message: "ABHA ID must be 14 digits and contain only digits",
        }),
    
    dob: z.string()
        .refine((val) => !val || !Number.isNaN(Date.parse(val)), {
            message: "Please enter a valid date of birth"
        })
        .refine((val) => !val || new Date(val) <= new Date(), {
            message: "Date of birth cannot be in the future"
        })
        .optional(),
    
    gender: z.string().optional(),
    
    bloodGroup: z.string().optional(),
    
    heightFeet: z.string().optional(),
    
    heightInches: z.string().optional(),
    
    weight: z.string()
        .refine((val) => !val || /^\d+(\.\d+)?$/.test(val), {
            message: "Please enter a valid weight, e.g., 60.5"
        })
        .refine((val) => !val || (parseFloat(val) > 0 && parseFloat(val) < 500), {
            message: "Weight must be between 1 and 500 kg"
        })
        .optional(),
});

export default ProfileSchema;
