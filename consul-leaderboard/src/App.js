import React, { Component } from 'react';

import { Query } from "react-apollo";
import './css/App.css';
import './css/connext.scss';
import gql from "graphql-tag";

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
                    {
                      data.debates.edges.map((node) => {
                        console.log(node);
                        return(<div>{node.node["public_author"]["username"]}</div>)
                      })
                    }
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
