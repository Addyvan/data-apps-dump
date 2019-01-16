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
    
    this.munge = this.munge.bind(this);
    this.popularity_score = this.popularity_score.bind(this);
    this.controversial_score = this.controversial_score.bind(this);
    this.activity_score = this.activity_score.bind(this);
    this.sortData = this.sortData.bind(this);
    this.createTable = this.createTable.bind(this);
  }

  munge() {
    var users = {};
    var empty_user = () => ({
      "Debates": 0,
      "Proposals": 0,
      "Comments": 0,
      "upvotes_Comments": 0,
      "downvotes_Comments":0,
      "upvotes_Debates": 0,
      "downvotes_Debates": 0,
      "upvotes_Proposals": 0
    });
  
    //munging for debates
    this.props.debates.map((edge) => { 
      var node = edge.node;
      var user = node.public_author.username;
      var num_debate_upvotes = node.cached_votes_up;
      var num_debate_downvotes = node.cached_votes_down;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet
      
      users[user].Debates += 1;
      users[user].upvotes_Debates += num_debate_upvotes;
      users[user].downvotes_Debates += num_debate_downvotes;

      return true;
    });
    //munging for Comments
    this.props.comments.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet

      if ( this.props.data_filter === "both" || (this.props.data_filter === "debates" && node.commentable_type === "Debate") || (this.props.data_filter === "proposals" && node.commentable_type === "Proposal")) {
        users[user].Comments += 1;
        users[user].upvotes_Comments += node.cached_votes_up;
        users[user].downvotes_Comments += node.cached_votes_down;
      }

      return true;
    });
    //munging for Proposals
    this.props.proposals.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;
      var num_proposal_upvotes = node.cached_votes_up;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet
      
      users[user].Proposals += 1;
      users[user].upvotes_Proposals += num_proposal_upvotes;

      return true;
    });
    
    var users_array = [];

    for (var key in users) {
      var temp = users[key];
      temp["username"] = key;
      users_array.push(temp);
    }

    return(users_array); 
  }

  popularity_score(user) {
    var total_upvotes = user["upvotes_Comments"] + user["upvotes_Debates"] + user["upvotes_Proposals"];
    var total_downvotes = user["downvotes_Comments"] + user["downvotes_Debates"];
    user["score"] = total_upvotes - total_downvotes;
    return(user);
  }

  controversial_score(user) {
    var total_upvotes = user["upvotes_Comments"] + user["upvotes_Debates"] + user["upvotes_Proposals"];
    var total_downvotes = user["downvotes_Comments"] + user["downvotes_Debates"];
    user["score"] = (total_upvotes + total_downvotes)/(total_upvotes/total_downvotes);
    return(user);
  }

  activity_score(user) {
    user["score"] = (user["Debates"] + user["Proposals"])*2 + user["Comments"];
    return(user);
  }

  sortData(users_array) {

    var score_fn;

    switch(this.props.sort_filter) {
      case "activity": score_fn = this.activity_score; break;
      case "most_beloved": score_fn = this.popularity_score; break;
      case "most_controversial": score_fn = this.controversial_score; break;
      default: break;
    }

    users_array.map((user, index) => {
      users_array[index] = score_fn(user);
    });

    var compare = (user_a, user_b) => {

      if (user_a["score"] >= user_b["score"]) return -1;
      else return 1;

    }

    users_array = users_array.sort(compare);

    return(users_array);

  }

  createTable(users_array) {

    users_array = this.sortData(users_array);

    var values = [[],[]];

    users_array.map((user) => {
      values[0].push(user.username);
      values[1].push(user.score);
      return true;
    });


    /*
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
  */
    var data = [{
      type: 'table',
      header: {
        values: [["Username"],[this.props.sort_filter]],
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
    var users_array = this.munge();
    
    var data = this.createTable(users_array);

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
  data_filter: PropTypes.string,
  time_filter: PropTypes.string
};

Leaderboard.defaultProps = {
  sort_filter: "activity",
  data_filter: "both",
  time_filter: "all_time"
};

export default sizeMe()(Leaderboard);