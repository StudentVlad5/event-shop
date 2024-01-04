import { specialistsSlice } from "./slice";

export const getSpecialists = (b) => (dispatch) => {
  dispatch(specialistsSlice.actions.getSpecialists({ ...b }));
};

