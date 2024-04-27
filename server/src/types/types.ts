import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
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

export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}

export interface AuthorisedUser {
  _id: string;
  fb_id: string;
  name: string;
  photo: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  // Virtual Attribute
  age: number;
  // Access Token
  accessToken: string;
}
export interface CustomRequest extends Request {
  user?: AuthorisedUser;
}
