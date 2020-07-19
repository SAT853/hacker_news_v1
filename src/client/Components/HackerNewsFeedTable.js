import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchData, hideNewsFeed } from "../redux/actions/fetchDataActions";
import Row from "./Row";
import Pageination from "./Pageination";
import VoteCountLineChart from "./VoteCountLineChart";
import Loader from "./Loader";

const HackerNewsFeedTable = ({ news_feeds, fetchData, hideNewsFeed }) => {
  const { hn_feeds } = news_feeds;
  const data = JSON.parse(JSON.stringify(news_feeds)).hn_feeds;

  const [page, setpage] = useState({
    start: 1,
    end: 20,
  });

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, [fetchData]);

  const nextPage = () => {
    const startpage = page.start + 20;
    const endPage = page.end + 20;
    setpage({
      start: startpage,
      end: endPage,
    });
    fetchData(startpage, endPage);
  };
  const prevPage = () => {
    if (page.start > 20) {
      const startpage = page.start > 21 ? page.start - 20 : 1;
      const endPage = page.end > 40 ? page.end - 20 : 20;
      setpage({
        start: startpage,
        end: endPage,
      });

      fetchData(startpage, endPage);
    }
  };

  const hideNews = (id) => {
    hideNewsFeed(hn_feeds, id);
  };

  return hn_feeds.length > 0 ? (
    <Container>
      <Table size='sm' hover striped='false'>
        <thead>
          <tr>
            <th>Comments</th>
            <th>VoteCount</th>
            <th>UpVote</th>
            <th>News Deatails</th>
          </tr>
        </thead>
        <tbody className='news-feeds-conatiner'>
          {hn_feeds.length > 0
            ? hn_feeds.map((item, i) => {
                return <Row key={i} item={item} hideNews={hideNews} />;
              })
            : null}
        </tbody>
      </Table>
      <Pageination prevPage={prevPage} nextPage={nextPage} page={page.end} />
      <div className='hr-line'></div>
      <VoteCountLineChart news={data} />
      <div className='hr-line'></div>
    </Container>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state) => {
  return {
    news_feeds: state.news,
  };
};

export default connect(mapStateToProps, { fetchData, hideNewsFeed })(
  HackerNewsFeedTable
);
