import { CartItem, ShippingInfo, User, Order, Product } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
  isLogin: boolean;
}

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}

export interface OrderReducerInitialState {
  loading: boolean;
  orders: Order[];
}

export interface ProductReducerInitialState {
  loading: boolean;
  products: Product[];
  product: Product | null;
}


