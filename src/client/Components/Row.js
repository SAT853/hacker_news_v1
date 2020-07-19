import React from "react";
import { setUrl } from "../utils/formate";
import { connect } from "react-redux";
import { upVoteCountIncrement } from "../redux/actions/fetchDataActions";
const Row = ({ item, vote_count, upVoteCountIncrement, hideNews }) => {
  const upVoteCount = (item) => {
    const { id, title, author, posted_at, url, commentsCount } = item;
    const { title: ls_title, vote_count } = JSON.parse(
      localStorage.getItem(`items${id}`)
    );

    if (title === ls_title) {
      const newVoteCount = vote_count + 1;

      const item = {
        id,
        title,
        author,
        posted_at,
        url,
        vote_count: newVoteCount,
        commentsCount,
      };
      localStorage.setItem(`items${id}`, JSON.stringify(item));
      upVoteCountIncrement(item);
    }
  };

  const voteCountRender = ({ id }) => {
    let votes;
    const vote = JSON.parse(JSON.stringify(vote_count)).vote_count;
    if (id === vote.id) {
      votes = vote.vote_count;
    } else {
      const local_storage = JSON.parse(localStorage.getItem(`items${id}`));
      const vote_count = local_storage !== null ? local_storage.vote_count : 0;
      votes = vote_count;
    }
    return votes;
  };

  return (
    <tr className='news-feed-item'>
      <td>{item.commentsCount}</td>
      <td>{voteCountRender(item)}</td>
      <td>
        <span className='votearrow' onClick={() => upVoteCount(item)}></span>
      </td>
      <td>
        <div className='news-details-container'>
          <span className='title'>{item.title}</span>
          <small>
            <a
              href={item.url}
              className='news-url'
              target='_blank'
              rel='noopener noreferrer'
            >
              ({setUrl(item.url)})
            </a>
          </small>
          <span className='news-url'>by</span>
          <small className='news-author'>{item.author}</small>
          <span className='news-time'>{item.created_at}</span>
          <div className='hide-btn'>
            <small className='bracket'>[</small>
            <span className='btn-hide' onClick={() => hideNews(item.id)}>
              hide
            </span>
            <small className='bracket'>]</small>
          </div>
        </div>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    vote_count: state.vote_count,
  };
};

export default connect(mapStateToProps, { upVoteCountIncrement })(Row);
