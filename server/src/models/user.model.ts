// Imports
import mongoose, { Document, Schema } from "mongoose"; // Importing mongoose for schema and model creation
import { UserSchemaValidation } from "../validation/user.validation.js"; // Importing user schema validation
import { JWT_SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// Interface for User document
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
  refreshToken: string;
  // Virtual Attribute
  age: number;
}

// User Schema
const UserSchema = new Schema(
  {
    // Defining the schema fields with their types and validation
    fb_id: {
      type: String,
      required: [true, "Please provide an fb_id"],
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
      required: [true, "Please provide an email"],
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
      required: [true, "Please provide a date of birth"],
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
UserSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password : string){
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getAccessToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name : this.name,
    },
    JWT_SECRET,
    {expiresIn: "1d"}
  )
}

UserSchema.methods.getRefreshToken = function(){
  return jwt.sign({_id: this._id}, JWT_SECRET, {expiresIn: "10d"})
}
// Exporting the User model
export const User = mongoose.model<IUser>("User", UserSchema);
