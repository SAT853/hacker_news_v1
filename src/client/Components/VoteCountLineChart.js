import React from "react";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VoteCountLineChart = ({ news }) => {
  const renderChart = (items) => {
    const data = [];

    for (let i = 0; i < items.length; i++) {
      const id = items[i].id;

      const local_storage = JSON.parse(localStorage.getItem(`items${id}`));
      const vote_count =
        local_storage !== null ? local_storage["vote_count"] : 0;
      const votes = vote_count;

      const item = {
        id,
        votes,
      };
      data.push(item);
    }

    return (
      <ResponsiveContainer width='100%' height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='0 0' stroke='#eee' vertical={false} />
          <XAxis dataKey='id' tick={{ fontSize: 12 }} />
          <YAxis
            label={{
              value: "Votes",
              position: "insideLeft",
              angle: -90,
              fontSize: "12",
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Line type='monotone' dataKey='votes' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div id='chart'>
      <p>UpVoteCount</p>
      {renderChart(news)}
      <p>ID</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    vote_count: state.vote_count,
  };
};

export default connect(mapStateToProps, null)(VoteCountLineChart);
