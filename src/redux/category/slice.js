import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    getCategory: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
});
export const { getCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
