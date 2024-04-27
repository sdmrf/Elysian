import { z } from "zod"

// Schema Validation
export const UserSchemaValidation = z.object({
    fb_id: z.string(),
    name: z.string().min(2), // Minimum 2 characters for name
    photo: z.string(),
    email: z.string().email(), // Email format validation
    password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/), // Strong password validation
    role: z.enum(["admin", "user"]),
    gender: z.enum(["male", "female"]),
    dob: z.date(),
    phone: z.string().regex(/^[0-9]{10}$/), // Phone format validation (10 digits)
    address: z.string(),
  });
