import { combineReducers } from "redux";
import fetchDataReducers from "./fetchDataReducers";
import upCountReducer from "./upCountReducer";
export default combineReducers({
  news: fetchDataReducers,
  vote_count: upCountReducer,
});
