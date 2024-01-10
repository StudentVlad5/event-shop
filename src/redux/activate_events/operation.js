import { activate_eventsSlice } from "./slice";

export const getActiveEvents = (b) => (dispatch) => {
  dispatch(activate_eventsSlice.actions.get_activate_Events({ ...b }));
};

