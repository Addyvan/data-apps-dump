import React from "react";
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

/**
 * A Leaderboard component to show stats for GCconsultation
 * @prop {object} debates - An edge object returned from GraphQL
 * @prop {object} proposals - An edge object returned from GraphQL
 * @prop {string} sort_filter - A string denoting how to create the leaderboard. Possible values: "activity", "most_beloved", "most_controversial" - default="activity"
 * @prop {string} contents_filter - A string denoting how to create the leaderboard. Possible values: "debates", "proposals", "both" - default="both"
 * @prop {string} time_filter - A string denoting the timeframe covered by the leaderboard. Possible values: "this_week", "all_time" - default="all_time"
 */
class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.munge = this.munge.bind(this);
  }

  munge() {
    console.log(this.props);
    var users = {};
    if (this.props.contents_filter === "both" || this.props.contents_filter === "debates") {
      this.props.debates.map((edge) => {
        console.log(edge);
        var user = edge.node.public_author.username;
        if (!(user in users)) {
          users[user] = {
            "debates": 0,
            "proposals": 0,
            "comments": 0,
            "upvotes_comments": 0,
            "downvotes_comments":0,
            "upvotes_debates": 0,
            "downvotes_debates": 0,
            "upvotes_proposals": 0
          };
        }
        if (this.props.sort_filter === "activity") {

          return true;
        }
        if (this.props.sort_filter === "most_beloved") {
          return true;
        }
        if (this.props.sort_filter === "most_controversial") {
          return true;
        }
        return false;
      });
    }
    if (this.props.contents_filter === "both" || this.props.contents_filter === "proposals") {
      this.props.proposals.map((edge) => {
        console.log(edge);
        var user = edge.node.public_author.username;
        if (!(user in users)) {
          users[user] = {
            "debates": 0,
            "proposals": 0,
            "comments": 0,
            "upvotes_comments": 0,
            "downvotes_comments":0,
            "upvotes_debates": 0,
            "downvotes_debates": 0,
            "upvotes_proposals": 0
          };
        }
        if (this.props.sort_filter === "activity") {

          return true;
        }
        if (this.props.sort_filter === "most_beloved") {
          return true;
        }
        if (this.props.sort_filter === "most_controversial") {
          return true;
        }
        return false;
        return true;
      });
    }
    
  }

  createTable() {
    var values = [
      ['Salaries', 'Office', 'Merchandise', 'Legal', 'TOTAL'],
      [1200000, 20000, 80000, 2000, 12120000],
      [1300000, 20000, 70000, 2000, 130902000],
      [1300000, 20000, 120000, 2000, 131222000],
      [1400000, 20000, 90000, 2000, 14102000]]

    var data = [{
      type: 'table',
      header: {
        values: [["EXPENSES"], ["Q1"],
            ["Q2"], ["Q3"], ["Q4"]],
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "grey"},
        font: {family: "Arial", size: 12, color: "white"}
      },
      cells: {
        values: values,
        align: "center",
        line: {color: "black", width: 1},
        font: {family: "Arial", size: 11, color: ["black"]}
      }
    }]

    return(data);
  }

  render() {
    this.munge();
    
    var data = this.createTable()

    return(
      <Plot
        data={data}
        layout={{
          autosize: false,
          width: this.props.size.width,
          height: "800",
          title: 'GCconsultation Leaderboard'
        }}
        config={{displayModeBar: false}}
      />
    );
  }
}

Leaderboard.propTypes = {
  debates: PropTypes.array,
  proposals: PropTypes.array,
  sort_filter: PropTypes.string,
  contents_filter: PropTypes.string,
  time_filter: PropTypes.string
};

Leaderboard.defaultProps = {
  sort_filter: "activity",
  contents_filter: "both",
  time_filter: "all_time"
};

export default sizeMe()(Leaderboard);