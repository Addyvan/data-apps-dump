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
        var node = edge.node;
        var user = node.public_author.username;
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
          users[user].debates += 1;
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
        var node = edge.node;
        var user = node.public_author.username;
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
          users[user].proposals += 1;
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

    return(users);
    
  }

  createTable(users) {

    var values = [[],[],[],[],[],[],[],[],[]]

    for (var key in users) {
      values[0].push(key);
      values[1].push(users[key]["debates"]);
      values[2].push(users[key]["proposals"]);
      values[3].push(users[key]["comments"]);
      values[4].push(users[key]["upvotes_comments"]);
      values[5].push(users[key]["downvotes_comments"]);
      values[6].push(users[key]["upvotes_debates"]);
      values[7].push(users[key]["downvotes_debates"]);
      values[8].push(users[key]["upvotes_proposals"]);
    }

    var data = [{
      type: 'table',
      header: {
        values: [["username"],["debates"], ["proposals"],["comments"], ["upvotes_comments"], ["downvotes_comments"], ["upvotes_debates"], ["downvotes_debates"], ["upvotes_proposals"]],
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
    var users = this.munge();
    
    var data = this.createTable(users);

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