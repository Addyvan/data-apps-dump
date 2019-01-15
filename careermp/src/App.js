import React, { Component } from 'react';
import { Query } from "react-apollo";
import './css/App.css';
import './css/connext.scss';
import gql from "graphql-tag";

import Table from "./components/Table";
import Location from "./components/Location";
import BarChart from "./components/Bar";

import {
  Container,
  Row,
  Col
} from "reactstrap";

const QUERY_DATA = gql`
{
  missions {
    createdAt
    startDate
    completionDate
    deadlineDate
    department
    state
    glGroup
    jobType
    location
    security
    keySkills
    programArea
    roleType
    timeCommitment
    timeInterval
    english
    french
  }
}
`

class App extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
  }

  loadData(data) {
    this.setState({data: data});
  }

  render() {
    return (
      <Query query={QUERY_DATA}>
        {
        ({ loading, error, data }) => {
          if (loading) return (<div className="lds-ripple"><div></div><div></div></div>);
          if (error) return `Error!: ${error}`;
          if (data !== {}) {
            return (
              <Container className="App" fluid>
                <Row>
                  <Col md="6">
                    <Location data={data} />
                  </Col>
                  <Col md="6">
                    <BarChart data={data} />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Table data={data}/>
                  </Col>
                </Row>
              </Container>
            );
          }
        }
      }
    </Query>
    );
  }
}

export default App;
