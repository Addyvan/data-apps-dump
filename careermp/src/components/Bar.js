import React from "react";
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.munge = this.munge.bind(this);
  }

  munge(data) {
    var names = [], values = [];
    
    data.missions.map((row) => {
      if (!names.includes(row["programArea"])) {
        names.push(row["programArea"]);
        values.push(1);
      } else {
        values[names.indexOf(row["programArea"])] += 1;
      }
      return true;
    });

    

    var output = {
      names: names,
      values: values
    };
    console.log(output);
    return(output);
  }

  render() {
    var dataobj = this.munge(this.props.data);
    return(
      <Plot
        data={[
          {
            x: dataobj.names,
            y: dataobj.values,
            type: 'bar'
          }
        ]}
        layout={{
          autosize: false,
          width: this.props.size.width,
          title: 'Career Marketplace Missions by Program Area',
          margin: {
            t: 50,
            b: 50,
            l: 25,
            r: 25
          }
        }}
        config={{displayModeBar: false, responsive: true}}
      />
    );
  }
}

export default sizeMe()(BarChart);