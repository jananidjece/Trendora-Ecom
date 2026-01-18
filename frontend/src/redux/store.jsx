import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"
import productSlice from './productSlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice,
        user: userSlice,
        order: orderSlice
    },
    devTools: true,
})

export default store;