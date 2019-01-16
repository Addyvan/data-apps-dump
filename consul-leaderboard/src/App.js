import React, { Component } from 'react';

import { Query } from "react-apollo";
import './css/App.css';
import './css/connext.scss';
import gql from "graphql-tag";

import Table from "./components/Leaderboard"

import {
  Container,
  Row,
  Col
} from "reactstrap";

const QUERY_DATA = gql`
{
  debates {
   	edges {
    	node {
        public_created_at
        cached_votes_down
        cached_votes_up
        public_author {
          username
        }
        
      }
  	}
  }
}
`
const QUERY_DATA_DEBATES = gql`
{
  debates{
    edges {
      node {
        public_created_at
        public_author {
          username
        }
        comments_count
        comments {
          edges {
            node {
              public_author{
                username
              }
              cached_votes_up
              cached_votes_down
              cached_votes_total
            }
          }
        }
        cached_votes_up
        cached_votes_down
        cached_votes_total
      }
    }
  }
}
`
const QUERY_DATA_PROPOSALS = gql`
{
  proposals {
    edges{
      node{
        public_created_at
        public_author{
          username
        }
        comments_count
        comments {
          edges {
            node{
              public_author{
                username
              }
              cached_votes_up
              cached_votes_down
              cached_votes_total
            }
          }
        }
        cached_votes_up
      }
    }
  }
}
`

class App extends Component {
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
                    <Table data={data.debates.edges}></Table>;
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
