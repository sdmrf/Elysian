import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderReducerInitialState } from "../../types/reducer-types";
import { Order } from "../../types/types";

const initialState: OrderReducerInitialState = {
  loading: true,
  orders: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    ordersExists(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
      state.loading = false;
    },
    orderExists(state, action: PayloadAction<Order>) {
      state.orders = [action.payload, ...state.orders];
      state.loading = false;
    },
  },
});

export const { ordersExists, orderExists } = orderSlice.actions;
export { orderSlice };
