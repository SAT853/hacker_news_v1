import React from "react";

const Pageination = ({ prevPage, nextPage, page }) => {
  return (
    <div className='pageination'>
      <div className='pageination-btn'>
        <span
          // className='prev-btn'
          className={page > 22 ? "prev-btn" : "prev-btn-hide"}
          onClick={prevPage}
        >
          Previous
        </span>{" "}
        <span>|</span>{" "}
        <span className='next-btn' onClick={nextPage}>
          Next
        </span>
      </div>
    </div>
  );
};

export default Pageination;
