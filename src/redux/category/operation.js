import { categorySlice } from "./slice";

export const getCategory = (b) => (dispatch) => {
  dispatch(categorySlice.actions.getCategory({ ...b }));
};
export const addCategory = (b) => (dispatch) => {
  dispatch(categorySlice.actions.addCategory({ ...b }));
};
export const deleteCategory = (b) => (dispatch) => {
  dispatch(categorySlice.actions.deleteCategory({ ...b }));
};
