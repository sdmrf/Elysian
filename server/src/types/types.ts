import { NextFunction, Request, Response } from "express";

// Interfaces
interface User {
  _id: string;
  uid: string;
  fullname: string;
  username: string;
  photo: string;
  email: string;
  password: string;
  role: UserRole;
  gender: Gender;
  dob: Date;
  phone: string;
  address: string;
  refreshToken: string;
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

interface OrderItemRequest {
  shippingInfo: ShippingInfo;
  userId: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItem[];
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

interface BaseQuery {
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

interface ProductsRequest {
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  description?: string;
  images?: ProductPhoto[];
}
type ProductPhoto = {
  url?: string;
  index?: number;
};


// Request Type
interface CustomRequest extends Request {
  user?: User;
}

export {
  User,
  Product,
  OrderItem,
  ShippingInfo,
  OrderItemRequest,
  UserRole,
  Gender,
  ControllerType,
  SearchRequestQuery,
  BaseQuery,
  InvalidateCacheProps,
  ProductPhoto,
  ProductsRequest,
  CustomRequest,
};