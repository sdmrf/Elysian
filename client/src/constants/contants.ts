// Generic type for import.meta.env
const Env = (import.meta as any).env;

// Constants
const USER_URL = Env.VITE_USER_ROUTE_URL;
const PRODUCT_URL = Env.VITE_PRODUCT_ROUTE_URL;
const ORDER_URL = Env.VITE_ORDER_ROUTE_URL;
const PAYMENT_URL = Env.VITE_PAYMENT_ROUTE_URL;

export { USER_URL, PRODUCT_URL, ORDER_URL, PAYMENT_URL }
