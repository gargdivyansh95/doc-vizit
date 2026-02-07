import * as z from "zod";

export const RequestAccessSchema = z.object({

    requestAccess: z.string().min(1, { message: "Please Select Request access level" }),
});

export default RequestAccessSchema;
