// Imports
import mongoose, { Document } from "mongoose";
import { z } from "zod";

// Instance of mongoose
const Schema = mongoose.Schema;

// Schema Validation
const UserSchemaValidation = z.object({
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

// Interface for User
interface IUser extends Document {
  fb_id: string;
  name: string;
  photo: string;
  email: string;
  password: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  // Virtual Attribute
  age: number;
}

// User Schema
const UserSchema = new Schema(
  {
    fb_id: {
      type: String,
      required: [true, "Please provide a fb_id"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      validate: {
        validator: (value: string) => UserSchemaValidation.parse({ email: value }), // Validate email against Zod schema
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      validate: {
        validator: (value: string) => UserSchemaValidation.parse({ password: value }), // Validate password against Zod schema
        message: "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please specify a gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide a dob"],
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string) => UserSchemaValidation.parse({ phone: value }), // Validate phone against Zod schema
        message: "Invalid phone number format",
      },
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Virtual Attribute
UserSchema.virtual("age").get(function (this: IUser) {
  const today = new Date();
  const dob = this.dob;

  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

// Export
export const User = mongoose.model<IUser>("User", UserSchema);
