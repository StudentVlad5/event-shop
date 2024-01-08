import { createSlice } from "@reduxjs/toolkit";

export const activate_eventsSlice = createSlice({
  name: "activate_events",
  initialState: [],
  reducers: {
    get_activate_Events: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { get_activate_Events} = activate_eventsSlice.actions;
export const activate_eventsReducer = activate_eventsSlice.reducer;
