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
 */
class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.munge = this.munge.bind(this);
  }



  munge() {
    this.props.debates.map((node) => {
      console.log(node);
      return true;
    });
    this.props.proposals.map((node) => {
      console.log(node);
      return true;
    });
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
  debates: PropTypes.object,
  proposals: PropTypes.object,
  sort_filter: PropTypes.string,
  contents_filter: PropTypes.string
};

Leaderboard.defaultProps = {
  filter: "activity"
};

export default sizeMe()(Leaderboard);