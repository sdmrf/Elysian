import { z } from "zod";

// Schema Validation
export const UserSchemaValidation = z.object({
  uid: z.string().nullable(), // Made nullable
  fullname: z.string().min(2), // Minimum 2 characters for name
  username: z.string().min(6), // Minimum 4 characters for username
  photo: z.string(),
  email: z.string().email(), // Email format validation
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}$/), // Strong password validation
  role: z.enum(["admin", "user"]),
  gender: z.enum(["male", "female"]),
  dob: z.date(),
  phone: z.string().regex(/^[0-9]{10}$/).optional(), // Phone format validation (10 digits), made optional
  address: z.string().optional(), // Made optional
});
