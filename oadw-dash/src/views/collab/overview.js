import React from "react";

import TimeSeriesPlot from "../../components/plots/TimeSeriesPlot";

import {Query} from "react-apollo";
import gql from "graphql-tag";

import { Row, Col, Card, CardBody, Spinner } from "reactstrap";

const SUMMARY_QUERY = gql`
{
  summary {
    numUsers
    numGroups
    usersTimeSeries {
      dates
      values
    }
    groupsTimeSeries {
      dates
      values
    }
  }
}
`

class CollabOverview extends React.Component {
  render() {
    return(
      <Query query={SUMMARY_QUERY} >
        {
          ({ loading, error, data }) => {
            if (loading) return (<Spinner color="primary" />);
            if (data) {

              return(
                <div>
                  <Row>
                    <Col md="12" lg="12" sm="12" className="text-center">
                      <h1>GCcollab Overview</h1>
                      <hr></hr>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" lg="3" sm="6" style={{margin: "0px", paddingBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" id="numUsers">
                          <h4>Total Number of Users</h4>
                          <h1>{data.summary.numUsers}</h1>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="3" lg="3" sm="6" style={{margin: "0px", paddingBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" id="numGroups">
                          <h4>Total Number of Groups</h4>
                          <h1>{data.summary.numGroups}</h1>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6" lg="6" sm="6" style={{margin: "0px", paddingBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" style={{padding: "50px"}}>
                          <h4>Coming Soon: Page view data + weekly data</h4> + might merge the two below plots
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" lg="6" sm="12" style={{margin: "0px", paddingBottom: "10px"}}>
                      <Card>
                        <CardBody>
                          <TimeSeriesPlot color="green" name="total users" title="Number of Users Since Launch" x={data.summary.usersTimeSeries.dates} y={data.summary.usersTimeSeries.values}/>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6" lg="6" sm="12" style={{margin: "0px", paddingBottom: "10px"}}>
                      <Card>
                        <CardBody>
                          <TimeSeriesPlot color="blue" name="total groups" title="Number of Groups Since Launch" x={data.summary.groupsTimeSeries.dates} y={data.summary.groupsTimeSeries.values} />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              );
            } 
          }
        }
      </Query>
    );
  }
}

export default CollabOverview;