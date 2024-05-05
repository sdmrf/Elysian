import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types"; 

const initialState: UserReducerInitialState = {
    user: null,
    loading: true,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userExists(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
        },
        userDoesNotExist(state) {
            state.user = null;
            state.loading = false;
        },
    },
});

export const { userExists, userDoesNotExist } = userSlice.actions;
export { userSlice }