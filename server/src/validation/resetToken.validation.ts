import { z } from "zod";

// Schema Validation
export const resetTokenSchemaValidation = z.object({
    userId: z.string(),
    token: z.string(),
    createdAt: z.date().optional(),
});