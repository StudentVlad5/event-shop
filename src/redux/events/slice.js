import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    getEvents: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { getEvents} = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
