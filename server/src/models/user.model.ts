// Imports
import mongoose, { Document, Schema } from "mongoose"; // Importing mongoose for schema and model creation
import { UserSchemaValidation } from "../validation/user.validation.js"; // Importing user schema validation
import { JWT_SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Interface for User document
interface IUser extends Document {
  uid: string;
  fullname: string;
  username: string;
  photo: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
  // Virtual Attribute
  age: number;
  // Mongoose Methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// User Schema
const UserSchema = new Schema(
  {
    // Defining the schema fields with their types and validation
    uid: {
      type: String,
    },
    fullname: {
      type: String,
      required: [true, "Please provide a name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please specify a gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide a date of birth"],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Including timestamps for createdAt and updatedAt
);

//* Virtual Attribute: Calculating age based on date of birth
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

//* Mongoose Methods

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  await UserSchemaValidation.parseAsync(this.toObject());
  next();
});

UserSchema.methods.isPasswordCorrect = async function (
  this: IUser,
  password: string
) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (this: IUser) {
  return jwt.sign(
    {
      _id: this._id,
      uid: this.uid,
      email: this.email,
      username: this.username,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

UserSchema.methods.generateRefreshToken = function (this: IUser) {
  return jwt.sign({ _id: this._id, uid: this.uid }, JWT_SECRET, {
    expiresIn: "10d",
  });
};
// Exporting the User model
export const User = mongoose.model<IUser>("User", UserSchema);
