import React from "react";

import TimeSeriesPlot from "../../components/plots/TimeSeriesPlot";

import {Query} from "react-apollo";
import gql from "graphql-tag";

import { Row, Col, Card, CardBody } from "reactstrap";

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
            if (loading) return (<div className="lds-ripple">loadddinnggg...</div>);
            if (data) {

              return(
                <div>
                  <Row>
                    <Col md="3" lg="3" sm="6" style={{margin: "0px", marginBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" style={{padding: "40px"}}>
                          <h1>{data.summary.numUsers}</h1>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="3" lg="3" sm="6" style={{margin: "0px", marginBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" style={{padding: "40px"}}>
                          <h1>{data.summary.numGroups}</h1>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6" lg="6" sm="6" style={{margin: "0px", marginBottom: "10px"}}>
                      <Card>
                        <CardBody className="text-center" style={{padding: "50px"}}>
                          <h4>Comming Soon: Page view data</h4>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" lg="6" sm="12" style={{margin: "0px", marginBottom: "10px"}}>
                      <Card>
                        <CardBody>
                          <TimeSeriesPlot color="green" name="total users" title="Number of Users Since Launch" x={data.summary.usersTimeSeries.dates} y={data.summary.usersTimeSeries.values}/>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6" lg="6" sm="12" style={{margin: "0px", marginBottom: "10px"}}>
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