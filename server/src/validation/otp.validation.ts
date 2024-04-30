import { z } from "zod";

// Schema Validation
export const OTPSchemaValidation = z.object({
  email : z.string().email(),
  otp : z.string().length(6),
  createdAt: z.date().optional(),
});