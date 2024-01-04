import { createSlice } from "@reduxjs/toolkit";

export const specialistsSlice = createSlice({
  name: "specialists",
  initialState: [],
  reducers: {
    getSpecialists: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { getSpecialists} = specialistsSlice.actions;
export const specialistsReducer = specialistsSlice.reducer;
