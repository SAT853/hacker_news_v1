import { FETCH_DATE } from "../actions/type";

const initialState = {
  hn_feeds: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DATE: {
      return {
        ...state,
        hn_feeds: payload,
      };
    }
    default:
      return state;
  }
};
