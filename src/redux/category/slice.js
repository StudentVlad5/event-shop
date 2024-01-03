import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    getCategory: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    addCategory: (state, { payload }) => ({
      ...payload,
    }),
    deleteCategory: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { getCategory, addCategory, deleteCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
