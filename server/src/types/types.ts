import { NextFunction, Request, Response } from "express";

// Interfaces
interface User {
  _id: string;
  fb_id: string;
  name: string;
  photo: string;
  email: string;
  password: string;
  role: UserRole;
  gender: Gender;
  dob: Date;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  age: number; // Virtual Attribute
}

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface OrderItem {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
}

interface Order {
  shippingInfo: ShippingInfo;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItem[];
}

interface AuthorisedUser extends User {
  accessToken: string;
}

// Enums
enum UserRole {
  Admin = "admin",
  User = "user",
}

enum Gender {
  Male = "male",
  Female = "female",
}

// Types
type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

type BaseQuery = {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
};

type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

// Request Type
interface CustomRequest extends Request {
  user?: AuthorisedUser;
}

export {
  User,
  Product,
  OrderItem,
  ShippingInfo,
  Order,
  AuthorisedUser,
  UserRole,
  Gender,
  ControllerType,
  SearchRequestQuery,
  BaseQuery,
  InvalidateCacheProps,
  CustomRequest,
};