import { modalSlice } from './slice';
export const addModal = b => dispatch => {
  dispatch(modalSlice.actions.addModal({ ...b }));
};
export const cleanModal = () => dispatch => {
  dispatch(modalSlice.actions.cleanModal());
};
