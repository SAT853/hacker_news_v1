import { VOTE_COUNT_INCREMENT } from "../actions/type";

const initialState = {
  vote_count: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case VOTE_COUNT_INCREMENT:
      return {
        ...state,
        vote_count: payload,
      };
    default:
      return state;
  }
};
