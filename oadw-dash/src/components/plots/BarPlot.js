import React from "react";
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";
import PropTypes from "prop-types";

class BarPlot extends React.Component {
  render() {
    
    return(
      <Plot
        data={[
          {
            x: this.props.labels,
            y: this.props.values,
            type: 'bar'
          }
        ]}
        layout={{
          autosize: false,
          width: this.props.size.width,
          title: this.props.title,
          margin: {
            t: 25,
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

BarPlot.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired
};

export default sizeMe()(BarPlot);