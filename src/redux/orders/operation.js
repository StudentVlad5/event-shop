import { ordersSlice } from "./slice";

export const getOrders = (b) => (dispatch) => {
  dispatch(ordersSlice.actions.getOrders({ ...b }));
};

