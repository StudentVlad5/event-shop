import { messagesSlice } from './slice';

export const getMessages = b => dispatch => {
  dispatch(messagesSlice.actions.getMessages({ ...b }));
};
export const addMessages = b => dispatch => {
  dispatch(messagesSlice.actions.addMessages({ ...b }));
};
export const deleteMessages = b => dispatch => {
  dispatch(messagesSlice.actions.deleteMessages({ ...b }));
};
