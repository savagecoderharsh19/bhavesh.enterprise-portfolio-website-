import * as z from "zod"

export const enquirySchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
    quantity: z.string().optional(),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    dimensions: z.string().optional(),
    material: z.string().optional(),
    application: z.string().optional(),
    timeline: z.string().optional(),
    requirementType: z.string().optional(),
    files: z.any().optional(), // File validation handled separately or refined later
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>
