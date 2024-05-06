import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { cartSlice } from "./reducers/cartSlice";
import { orderSlice } from "./reducers/orderSlice";
import { productSlice } from "./reducers/productSlice";
import { UserApi } from "./rtk/userRTK";

const apiMiddlewares = [UserApi.middleware];

const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [productSlice.name]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...apiMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export { store };
