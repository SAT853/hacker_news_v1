import { FETCH_DATE, IS_DATA_LOADING } from "../actions/type";

const initialState = {
  hn_feeds: "",
  isDataLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DATE: {
      return {
        ...state,
        hn_feeds: payload,
        isDataLoading: true,
      };
    }
    case IS_DATA_LOADING:
      return {
        ...state,
        isDataLoading: false,
      };
    default:
      return state;
  }
};
