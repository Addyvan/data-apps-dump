import React from "react";
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.munge = this.munge.bind(this);

  }

  munge(data) {
    var columns = [];
    var keys = [];
    for (var key in data.missions[0]) {
      if (key !== "__typename") {
        keys.push(key);
        columns.push([key]);
      }
    }
    data.missions.map((row, index) => {
      for (var i = 0; i < keys.length; i++) {
        columns[i].push(row[keys[i]]);
      }
      return true;
    });

    var headerValues = [];
    keys.map((key) => {headerValues.push([key]); return true;});
    return({
      headerValues: headerValues,
      values: columns
    });
  }

  render() {
    var dataobj = this.munge(this.props.data);
    var headerColor = "grey";
    var rowEvenColor = "lightgrey";
    var rowOddColor = "white";
    return(
      <Plot
        data={[{
          type: 'table',
          header: {
            values: dataobj.headerValues,
            align: "center",
            line: {width: 1, color: 'black'},
            fill: {color: headerColor},
            font: {family: "Arial", size: 12, color: "white"}
          },
          cells: {
            values: dataobj.values,
            align: "center",
            line: {color: "black", width: 1},
            fill: {color: [[rowOddColor,rowEvenColor,rowOddColor,
                      rowEvenColor,rowOddColor]]},
            font: {family: "Arial", size: 11, color: ["black"]}
          }
        }]}
        layout={{
          autosize: false,
          width: this.props.size.width,
          height: "800",
          title: 'GCcollab Career Marketplace raw data'
        }}
        config={{displayModeBar: false}}
      />
    );
  }
}

export default sizeMe()(Table);