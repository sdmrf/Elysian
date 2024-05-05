import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductReducerInitialState } from "../../types/reducer-types";
import { Product } from "../../types/types";

const initialState: ProductReducerInitialState = {
    loading: true,
    products: [],
    product: null,
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        productsExists(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.loading = false;
        },
        productExists(state, action: PayloadAction<Product>) {
            state.product = action.payload;
            state.loading = false;
        },
        productDoesNotExist(state) {
            state.product = null;
            state.loading = false;
        },
    },
});

export const { productsExists, productExists, productDoesNotExist } = productSlice.actions;
export { productSlice } 