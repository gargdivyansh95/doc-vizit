import * as z from "zod";

const commonFields = {
    // useFor: z.string().min(1, "Use For is required"),
    accessDuration: z.number().min(1, "Access duration is required"),
    // documentScope: z.enum(["single", "all"]),
};

export const ShareReportSchema = z.discriminatedUnion("shareMethod", [

    // phone
    z.object({
        shareMethod: z.literal("phone"),
        recipentName: z.string().min(1, "Name is required"),
        recipientMobile: z
            .string()
            .length(10, "Mobile number must be 10 digits")
            .regex(/^\d{10}$/, "Invalid mobile number"),
        ...commonFields,
    }),

    // link
    z.object({
        shareMethod: z.literal("link"),
        ...commonFields,
    }),

    // group
    z.object({
        shareMethod: z.literal("group"),
        familyAccess: z.string().min(1, "Family Access is required"),
        accessLevel: z.string().min(1, "Access Level is required"),
        ...commonFields,
    }),
]);

export default ShareReportSchema;