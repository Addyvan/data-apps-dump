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
      var debate_created_at = node.public_created_at;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet
      
      if (this.props.time_filter === 'this_week'){
        function parseDate () {
          return new Date(debate_created_at.slice(0,4), debate_created_at.slice(5,7)-1, debate_created_at.slice(8,10));
        } 
        function datediff(first, second) {
          // Take the difference between the dates and divide by milliseconds per day.
          // Round to nearest whole number to deal with DST.
          return Math.round((second-first)/(1000*60*60*24));
        }
        var today = new Date();
        if (datediff(parseDate (), today) > -1 && datediff(parseDate(), today) < 8){
          users[user].Debates += 1;
          users[user].upvotes_Debates += num_debate_upvotes;
          users[user].downvotes_Debates += num_debate_downvotes;
        }
      }
      if (this.props.time_filter === 'all_time'){
        users[user].Debates += 1;
        users[user].upvotes_Debates += num_debate_upvotes;
        users[user].downvotes_Debates += num_debate_downvotes;
      }
      return true;
    });
    //munging for Comments
    this.props.comments.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;
      var comment_created_at = node.public_created_at;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet

      if ( this.props.data_filter === "both" || (this.props.data_filter === "debates" && node.commentable_type === "Debate") || (this.props.data_filter === "proposals" && node.commentable_type === "Proposal")) {
        if (this.props.time_filter === 'this_week'){
          function parseDate () {
            return new Date(comment_created_at.slice(0,4), comment_created_at.slice(5,7)-1, comment_created_at.slice(8,10));
          } 
          function datediff(first, second) {
            // Take the difference between the dates and divide by milliseconds per day.
            // Round to nearest whole number to deal with DST.
            return Math.round((second-first)/(1000*60*60*24));
          }
          var today = new Date();
          if (datediff(parseDate (), today) > -1 && datediff(parseDate(), today) < 8){
            users[user].Comments += 1;
            users[user].upvotes_Comments += node.cached_votes_up;
            users[user].downvotes_Comments += node.cached_votes_down;
          }
        }
        if (this.props.time_filter === 'all_time'){
          users[user].Comments += 1;
          users[user].upvotes_Comments += node.cached_votes_up;
          users[user].downvotes_Comments += node.cached_votes_down;
        }
      }

      return true;
    });
    //munging for Proposals
    this.props.proposals.map((edge) => {
      var node = edge.node;
      var user = node.public_author.username;
      var num_proposal_upvotes = node.cached_votes_up;
      var proposal_created_at = node.public_created_at;

      if (!(user in users)) users[user] = empty_user(); // If there is no data for this user yet
      
      if (this.props.time_filter === 'this_week'){
        function parseDate () {
          return new Date(proposal_created_at.slice(0,4), proposal_created_at.slice(5,7)-1, proposal_created_at.slice(8,10));
        } 
        function datediff(first, second) {
          // Take the difference between the dates and divide by milliseconds per day.
          // Round to nearest whole number to deal with DST.
          return Math.round((second-first)/(1000*60*60*24));
        }
        var today = new Date();
        if (datediff(parseDate (), today) > -1 && datediff(parseDate(), today) < 8){
          users[user].Proposals += 1;
          users[user].upvotes_Proposals += num_proposal_upvotes;
        }
      }
      if (this.props.time_filter === 'all_time'){
        users[user].Proposals += 1;
        users[user].upvotes_Proposals += num_proposal_upvotes;
      }

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
    if (total_upvotes < 1) total_upvotes = 1;
    if (total_downvotes < 1) total_downvotes = 1;
    user["score"] = (total_upvotes + total_downvotes)/(total_upvotes / total_downvotes);
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

    function getName(key) {
      var legend = {
        "all_time": "All time",
        "this_week": "This week",
        "debates": "Debates",
        "proposals": "Proposals",
        "both": "All",
        "activity": "Activity Score",
        "most_beloved": "Popularity Score",
        "most_controversial": "Controversy Score"
      };
      return(legend[key]);
    }

    users_array = this.sortData(users_array);

    if (this.props.sort_filter === "activity") {

      var values = [[],[],[],[]]; if (this.props.data_filter === "both") values.push([]); //ignore this spaghetti
      var header_values = [["Username"],[getName(this.props.sort_filter)],["Comments"]];
      if (this.props.data_filter === "both") {
        header_values.push(["Debates"]);
        header_values.push(["Proposals"]);
      } else {
        if (this.props.data_filter === "debates")
          header_values.push(["Debates"]);
        else
          header_values.push(["Proposals"]);
      }
        
      users_array.map((user) => {
        values[0].push(user.username);
        values[1].push(user.score);
        if (this.props.data_filter === "both") {
          values[2].push(user["Comments"]);
          values[3].push(user["Debates"]);
          values[4].push(user["Proposals"]);
        } else {
          values[2].push(user["Comments"]);
          if (this.props.data_filter === "debates")
            values[3].push(user["Debates"]);
          else
            values[3].push(user["Proposals"]);
        }
        
        return true;
      });
    }

    if (this.props.sort_filter === "most_beloved" || this.props.sort_filter === "most_controversial") {
      var values = [[],[],[],[]];
      var header_values = [["Username"],[getName(this.props.sort_filter)], ["Upvotes on Comments"],["Downvotes on Comments"]];

      if (this.props.data_filter === "both") {
        values.push([]);values.push([]);values.push([]);
        header_values.push(["Upvotes on Debates"]);
        header_values.push(["Downvotes on Debates"]);
        header_values.push(["Upvotes on Proposals"]);
      } else {
        if (this.props.data_filter === "debates") {
          values.push([]);values.push([]);
          header_values.push(["Upvotes on Debates"]);
          header_values.push(["Downvotes on Debates"]);
        } else {
            header_values.push(["Upvotes on Proposals"]);
            values.push([]);
          }
      }

      users_array.map((user) => {
        values[0].push(user.username);
        values[1].push(user.score);
        values[2].push(user.upvotes_Comments);
        values[3].push(user.downvotes_Comments);
        if (this.props.data_filter === "both") {
          values[4].push(user["upvotes_Debates"]);
          values[5].push(user["downvotes_Debates"]);
          values[6].push(user["upvotes_Proposals"]);
        } else {
          if (this.props.data_filter === "debates") {
            values[4].push(user["upvotes_Debates"]);
            values[5].push(user["downvotes_Debates"]);
          }
          else
            values[4].push(user["upvotes_Proposals"]);
          
        }
        return true;
      });
    } 

    var data = [{
      type: 'table',
      header: {
        values: header_values,
        align: "center",
        line: {width: 1, color: 'black'},
        fill: {color: "467B8D"},
        font: {family: "Rubik, sans-serif", size: 12, color: "white"}
      },
      cells: {
        values: values,
        align: "center",
        line: {color: "black", width: 1},
        font: {family: "Rubik, sans-serif", size: 11, color: ["black"]}
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
          font: {
            family: "Rubik, sans-serif"
          },
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