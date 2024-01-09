import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    getOrders: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { getOrders} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
