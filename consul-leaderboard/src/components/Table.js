import React from "react";
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.munge = this.munge.bind(this);
  }

  munge(data) {
    console.log(data);
  }

  render() {
    this.munge(this.props.data);
    
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

export default sizeMe()(Table);