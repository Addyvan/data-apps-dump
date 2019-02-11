import React from "react";
import Plot from 'react-plotly.js';
import sizeMe  from "react-sizeme";
import PropTypes from "prop-types";

class DonutPlot extends React.Component {
  render() {
    return(
      <div>
        <Plot
          data={[
            {
              values: this.props.values,
              labels: this.props.labels,
              type: "pie",
              hole: .4,
              mode: "lines",
              line: {color: this.props.color}, 
              showlegend: true
            }
          ]}
          layout={{
            autosize: false,
            title: this.props.title,
            width: this.props.size.width,
		        legend: {
              xanchor: 'center', 
              x: 0.5,
              "orientation": "h"
            },
            margin: {
              t: 50,
              b: 50,
              l: 50,
              r: 50
            }
          }}
          config={{displayModeBar: false, responsive: true}}
        />
        </div>
    );
  }
}

DonutPlot.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default sizeMe()(DonutPlot);