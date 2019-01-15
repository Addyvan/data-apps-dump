import React from "react";
import Plot from 'react-plotly.js';
import sizeMe from "react-sizeme";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.munge = this.munge.bind(this);
  }

  munge(data) {
    var lat = [], lon = [], count = [], text = [];
    var coordinates = {
      "national_capital_region": {lat: 45.4215, lon: -75.6972, value: 0},
      "ontario": {lat: 51.2538, lon: -85.3232, value: 0},
      "quebec": {lat: 52.9399, lon: -73.5491, value: 0},
      "saskatchewan": {lat: 52.9399, lon: -106.4509, value: 0},
      "manitoba": {lat: 53.7609, lon: -98.8139, value: 0},
      "newfoundland_and_labrador": {lat: 53.1355, lon: 57.6604, value: 0},
      "british_columbia": {lat: 53.7267, lon: -127.6476, value: 0},
      "new_brunswick": {lat: 46.5653, lon: -66.4619, value: 0},
      "alberta": {lat: 53.9333, lon: -116.5765, value: 0},
      "nova_scotia": {lat: 44.6820, lon: -63.7443, value: 0},
      "Ontario": {lat: 51.2538, lon: -85.3232, value: 0},
      "Alberta": {lat: 53.9333, lon: -116.5765, value: 0},
      "prince_edward_island": {lat: -46.5107, lon: 63.4168, value: 0}
    };
    
    data.missions.map((row) => {
      coordinates[row["location"]].value += 1;
      return true;
    });

    coordinates["ontario"].value += coordinates["Ontario"].value;
    coordinates["alberta"].value += coordinates["Alberta"].value;
    delete coordinates["Alberta"];
    delete coordinates["Ontario"];

    for (var key in coordinates) {
      text.push(key + " : " + coordinates[key].value);
      count.push(coordinates[key].value / 10);
      lat.push(coordinates[key].lat);
      lon.push(coordinates[key].lon);
    }

    var output = {
      text: text,
      lat: lat,
      lon: lon,
      size: count
    };

    return(output);
  }

  render() {
    var dataobj = this.munge(this.props.data);
    return(
      <Plot
        data={[{
          type: 'scattergeo',
          lat: dataobj.lat,
          lon: dataobj.lon,
          hoverinfo: 'text',
          text: dataobj.text,
          marker: {
              size: dataobj.size,
              line: {
                  color: 'black',
                  width: 2
              }
          }
        }]}
        layout={{
          autosize: false,
          width: this.props.size.width,
          title: 'Career Marketplace Missions by Location',
          showlegend: false,
          geo: {
              scope: 'north america',
              showland: true,
              landcolor: 'rgb(217, 217, 217)',
              subunitwidth: 1,
              countrywidth: 1,
              subunitcolor: 'rgb(255,255,255)',
              countrycolor: 'rgb(255,255,255)'
          },
          margin: {
            t: 50,
            b: 0,
            l: 0,
            r: 0
          }
        }}
        config={{displayModeBar: false, responsive: true}}
      />
    );
  }
}

export default sizeMe()(Location);