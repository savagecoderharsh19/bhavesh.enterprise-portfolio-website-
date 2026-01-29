import { z } from "zod"

export const enquirySchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email().optional().or(z.literal("")),
    quantity: z.string().optional(),
    description: z.string().min(5, "Please provide more detail about your requirement"),
    requirementType: z.string().optional(),
    // Client-side only
    files: z.any().optional(),
    // Internal fields used after upload
    fileNames: z.array(z.string()).optional(),
    fileUrls: z.array(z.string()).optional(),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>
