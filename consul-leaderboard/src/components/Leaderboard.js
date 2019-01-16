import React from "react";
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

/**
 * A Leaderboard component to show stats for GCconsultation
 * @prop {object} Debates - An edge object returned from GraphQL
 * @prop {object} Proposals - An edge object returned from GraphQL
 * @prop {string} sort_filter - A string denoting how to create the leaderboard. Possible values: "activity", "most_beloved", "most_controversial" - default="activity"
 * @prop {string} contents_filter - A string denoting how to create the leaderboard. Possible values: "Debates", "Proposals", "both" - default="both"
 * @prop {string} time_filter - A string denoting the timeframe covered by the leaderboard. Possible values: "this_week", "all_time" - default="all_time"
 */
class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.munge = this.munge.bind(this);
  }

  munge() {
    var users = {};
  
    //munging for debates
    this.props.debates.map((edge) => { 
      var node = edge.node;
      var user = node.public_author.username;
      var num_debate_upvotes = node.cached_votes_up;
      var num_debate_downvotes = node.cached_votes_down;
      if (!(user in users)) {
        users[user] = {
          "Debates": 0,
          "Proposals": 0,
          "Comments": 0,
          "upvotes_Comments": 0,
          "downvotes_Comments":0,
          "upvotes_Debates": 0,
          "downvotes_Debates": 0,
          "upvotes_Proposals": 0
        };
      }
      if (this.props.sort_filter === "activity") {
        users[user].Debates += 1;
        users[user].upvotes_Debates += num_debate_upvotes;
        users[user].downvotes_Debates += num_debate_downvotes;
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
    //munging for Comments
    this.props.comments.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;
      var num_comment_upvotes = node.cached_votes_up;
      var num_comment_downvotes = node.cached_votes_down;
      if (!(user in users)) {
        users[user] = {
          "Debates": 0,
          "Proposals": 0,
          "Comments": 0,
          "upvotes_Comments": 0,
          "downvotes_Comments":0,
          "upvotes_Debates": 0,
          "downvotes_Debates": 0,
          "upvotes_Proposals": 0
        };
      }
      if (this.props.sort_filter === "activity") {
        users[user].Comments += 1;
        users[user].upvotes_Comments += num_comment_upvotes;
        users[user].downvotes_Comments += num_comment_downvotes;
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
    //munging for Proposals
    this.props.proposals.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;
      var num_proposal_upvotes = node.cached_votes_up;
      if (!(user in users)) {
        users[user] = {
          "Debates": 0,
          "Proposals": 0,
          "Comments": 0,
          "upvotes_Comments": 0,
          "downvotes_Comments":0,
          "upvotes_Debates": 0,
          "downvotes_Debates": 0,
          "upvotes_Proposals": 0
        };
      }
      if (this.props.sort_filter === "activity") {
        users[user].Proposals += 1;
        users[user].upvotes_Proposals += num_proposal_upvotes;
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
    

    return(users);    
  }

  createTable(users) {

    var values = [[],[],[],[],[],[],[],[],[]]

    for (var key in users) {
      values[0].push(key);
      values[1].push(users[key]["Debates"]);
      values[2].push(users[key]["Proposals"]);
      values[3].push(users[key]["Comments"]);
      values[4].push(users[key]["upvotes_Comments"]);
      values[5].push(users[key]["downvotes_Comments"]);
      values[6].push(users[key]["upvotes_Debates"]);
      values[7].push(users[key]["downvotes_Debates"]);
      values[8].push(users[key]["upvotes_Proposals"]);
    }

    var data = [{
      type: 'table',
      header: {
        values: [["Username"],["Debates"], ["Proposals"],["Comments"], ["Upvotes Recieved on Comments"], ["Downvotes Recieved on Comments"], ["Upvotes Recieved on Debates"], ["Downvotes Recieved on Debates"], ["Upvotes Recieved on Proposals"]],
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "008B8B"},
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
    console.log(users);
    var data = this.createTable(users);

    return(
      <Plot
        id = "table"
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
  Debates: PropTypes.array,
  Proposals: PropTypes.array,
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