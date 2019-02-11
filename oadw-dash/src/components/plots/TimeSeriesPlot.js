import React from "react";
import Plot from 'react-plotly.js';
import sizeMe  from "react-sizeme";
import PropTypes from "prop-types";

class TimeSeriesPlot extends React.Component {
  render() {
    return(
      <div>
        <Plot
          data={[
            {
              x: this.props.x,
              y: this.props.y,
              type: "scatter",
              mode: "lines",
              name: this.props.name,
              line: {color: this.props.color}
            }
          ]}
          layout={{
            autosize: false,
            title: this.props.title,
            width: this.props.size.width,
            xaxis: {
              autorange: true,
              range: [this.props.x[0], this.props.x[this.props.x.length-1]],
              rangeselector: {buttons: [
                  {
                    count: 1,
                    label: '1m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {
                    count: 6,
                    label: '6m',
                    step: 'month',
                    stepmode: 'backward'
                  },
                  {step: 'all'}
                ]},
              rangeslider: {range: [this.props.x[0], this.props.x[this.props.x.length-1]]},
              type: 'date'
            },
            yaxis: {
              autorange: true,
              type: 'linear'
            },
            margin: {
              t: 0,
              b: 0,
              l: 30,
              r: 30
            }
          }}
          config={{displayModeBar: false, responsive: true}}
        />
        </div>
    );
  }
}

TimeSeriesPlot.propTypes = {
  title: PropTypes.string.isRequired,
  x: PropTypes.array.isRequired,
  y: PropTypes.array.isRequired
};

export default sizeMe()(TimeSeriesPlot);