import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    getMessages: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    addMessages: (state, { payload }) => ({
      ...payload,
    }),
    deleteMessages: (state, { payload }) => ({
      ...payload,
    }),
  },
});
export const { getMessages, addMessages, deleteMessages } =
  messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
