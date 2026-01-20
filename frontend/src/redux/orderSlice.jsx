import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

// Async Thunks
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (order, { rejectWithValue, getState }) => {
        try {
            const {
                user: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axiosInstance.post(
                `/api/orders/add/`,
                order,
                config
            );
            return data;
        } catch (error) {
            const message =
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message;
            return rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        success: false,
        order: null,
        error: null,
    },
    reducers: {
        orderReset: (state) => {
            state.loading = false
            state.success = false
            state.order = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { orderReset } = orderSlice.actions;
export default orderSlice.reducer;
