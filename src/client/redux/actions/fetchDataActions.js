import { FETCH_DATE, VOTE_COUNT_INCREMENT, IS_DATA_LOADING } from "./type";
import moment from "moment";
import axios from "axios";
import "regenerator-runtime/runtime";
export const dispatchNewsFeed = (data) => {
  return {
    type: FETCH_DATE,
    payload: data,
  };
};

export const isDataLoading = () => {
  return {
    type: IS_DATA_LOADING,
  };
};

export const fetchData = (start = 1, end = 20) => async (dispatch) => {
  const newdfeeds = [];
  for (let i = start; i <= end; i++) {
    const URL = `https://hn.algolia.com/api/v1/items/${i}`;
    await axios
      .get(URL)
      .then(({ data }) => {
        if (data.title !== null) {
          const id = data.id;
          const title = data.title;
          const commentsCount = data.children.length;
          const vote_count = data.points;
          const url = data.url;
          const author = data.author;
          const created_at = moment(data.created_at).format("L");

          const local_storage = JSON.parse(localStorage.getItem(`items${id}`));
          const local_vote_count =
            local_storage !== null ? local_storage.vote_count : 0;

          const hide_status =
            local_storage !== null && local_storage.hide && local_storage.hide
              ? true
              : false;
          if (!hide_status) {
            const result = {
              id,
              title,
              commentsCount,
              vote_count,
              url,
              author,
              created_at,
            };
            newdfeeds.push(result);
            localStorage.setItem(`items${id}`, JSON.stringify(result));
            dispatch(dispatchNewsFeed(newdfeeds));
          }
        }
      })
      .catch((err) => {});
  }
  dispatch(isDataLoading());
};

export const dispatchVoteCount = (count) => {
  return {
    type: VOTE_COUNT_INCREMENT,
    payload: count,
  };
};

export const upVoteCountIncrement = (vote) => (dispatch) => {
  dispatch(dispatchVoteCount(vote));
};

export const hideNewsFeed = (news, id) => (dispatch) => {
  if (news != null) {
    if (news !== undefined) {
      let index = news.findIndex((el) => el.id === id);
      const item = news[index];
      news.splice(index, 1);

      const hide_results = {
        id: item.id,
        title: item.title,
        commentsCount: item.commentsCount,
        vote_count: item.vote_count,
        url: item.url,
        author: item.author,
        created_at: item.created_at,
        hide: true,
      };

      localStorage.setItem(`items${id}`, hide_results);
      dispatch(dispatchNewsFeed(news));
    }
  }
};
