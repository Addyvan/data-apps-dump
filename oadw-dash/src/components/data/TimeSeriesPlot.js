import React from "react";
import Plot from 'react-plotly.js';
import SizeMe  from "react-sizeme";

class TimeSeriesPlot extends React.Component {
  render() {
    return(
      <div>
        <Plot
          data={[
            {
              x: [0,1,2,3,4,5,6,7,8,9,10],
              y: [1,2,4,5,6,5,4,7,8,9,1],
              mode: 'lines'
            }
          ]}
          layout={{
            autosize: false,
            width: "100",
            height: "100",
            title: 'TimeSeriesPlot',
            margin: {
              t: 0,
              b: 0,
              l: 0,
              r: 0
            }
          }}
          config={{displayModeBar: false, responsive: true}}
        />
        </div>
    );
  }
}

export default TimeSeriesPlot;