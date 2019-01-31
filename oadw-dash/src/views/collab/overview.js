import React from "react";
import DataContainer from "../../components/data/DataContainer";
import TimeSeriesPlot from "../../components/data/TimeSeriesPlot";

import { Row, Col } from "reactstrap";

class CollabOverview extends React.Component {
  render() {
    return(
      <div>
        <Row>
          <Col md="6" lg="6" sm="12">
            <DataContainer>
              <TimeSeriesPlot />
            </DataContainer>
          </Col>
          <Col md="6" lg="6" sm="12">
            <DataContainer>
              <TimeSeriesPlot />
            </DataContainer>
          </Col>
        </Row>
        <Row>
          <Col md="12" lg="12" sm="12">
            <DataContainer>
              <TimeSeriesPlot />
            </DataContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CollabOverview;