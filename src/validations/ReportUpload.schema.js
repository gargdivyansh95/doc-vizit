import * as z from "zod";

export const ReportUploadSchema = z.object({
    // docType: z.object({
    //     id: z.number(),
    //     label: z.string()
    // }).nullable().refine((val) => val !== null, { message: "Please select upload type" }),
    file: z.any()
        .nullable()
        .refine((file) => file !== null, { message: "Please select a file" })
        .refine((file) => file instanceof File, { message: "Please select a file" })
        .refine((file) => file?.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB" })
        .refine(
            (file) => {
                const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png',
                    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                return validTypes.includes(file?.type);
            },
            { message: "Only PDF, JPG, PNG, DOC, DOCX files are allowed" }
        ),
});

export default ReportUploadSchema;
