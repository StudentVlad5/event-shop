import { eventsSlice } from "./slice";

export const getEvents = (b) => (dispatch) => {
  dispatch(eventsSlice.actions.getEvents({ ...b }));
};

