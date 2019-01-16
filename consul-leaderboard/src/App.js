import React, { Component } from 'react';

import { Query } from "react-apollo";
import './css/App.css';
import './css/connext.scss';
import gql from "graphql-tag";

import Leaderboard from "./components/Leaderboard"

import {
  Container,
  Row,
  Col
} from "reactstrap";


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

const QUERY_BOTH = gql`
{  
  proposals: 
    proposals {
      edges{
        node{
          public_created_at
          public_author{
            username
          }
          comments_count
          cached_votes_up
        }
      }
    }
	
  debates: 
    debates{
      edges {
        node {
          public_created_at
          public_author {
            username
          }
          comments_count
          cached_votes_up
          cached_votes_down
          cached_votes_total
        }
      }
    }
}
`
const QUERY_COMMENTS = gql`
{ 
  comments{
    edges{
      node{
        public_author{
          username
        }
        commentable_type
        cached_votes_up
        cached_votes_down
      }
    }
  }
}
`

class App extends Component {
  render () {
    return (
      <Query query={QUERY_BOTH}>
      {({ loading: loadingOne, error: errorOne, data: both }) => (
        <Query query={QUERY_COMMENTS}>
          {({ loading: loadingTwo, error: errorTwo, data: comments}) => {
            if (loadingOne || loadingTwo) return (<div className="lds-ripple"><div></div><div></div></div>);
            if (errorOne || errorTwo) return `Error!: ${errorOne}`;
            return( 
              <Container className="App" fluid>
                  <Row>
                    <Col md="12">
                      <Leaderboard debates={both.debates.edges} proposals={both.proposals.edges} comments = {comments.comments.edges}></Leaderboard>;
                    </Col>
                  </Row>
              </Container>
            )
          }}
        </Query>
      )}
    </Query>
    )
  }
  // render() {
  //   return (
  //     <Query query={QUERY_BOTH}>
  //       {
  //       ({ loading, error, data, comments }) => {
  //         if (loading) return (<div className="lds-ripple"><div></div><div></div></div>);
  //         if (error) return `Error!: ${error}`;
  //         if (data !== {}) {          
  //           return (
  //             <Container className="App" fluid>
  //               <Row>
  //                 <Col md="12">
  //                   <Leaderboard debates={data.debates.edges} proposals={data.proposals.edges}></Leaderboard>;
  //                 </Col>
  //               </Row>
  //             </Container>
  //           );
  //         }
  //       }
  //     }
  //   </Query>
  //   );
  // }
}

export default App;
