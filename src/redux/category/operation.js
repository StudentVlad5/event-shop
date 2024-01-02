import { categorySlice } from "./slice";

export const getCategory = (b) => (dispatch) => {
  dispatch(categorySlice.actions.getCategory({ ...b }));
};
