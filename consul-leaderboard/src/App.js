import React, { Component } from 'react';

import { Query } from "react-apollo";
import './css/App.css';
import './css/connext.scss';
import gql from "graphql-tag";

import Leaderboard from "./components/Leaderboard"

import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon
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
              public_author {
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
      edges {
        node {
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
    debates {
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
  comments {
    edges {
      node {
        public_author {
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

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setData = this.setData.bind(this);
    this.setSort = this.setSort.bind(this);
    this.getName = this.getName.bind(this);
    this.chooseQuery = this.chooseQuery.bind(this);

    this.state = {
      timeDropdownOpen: false,
      dataDropdownOpen: false,
      sortDropdownOpen: false,
      currentTime: "all_time",
      currentData: "both",
      currentSort: "activity"
    };
  }

  toggle(menuName) {
    switch(menuName) {
      case "time": this.setState(prevState => ({timeDropdownOpen: !prevState.timeDropdownOpen})); break;
      case "data": this.setState(prevState => ({dataDropdownOpen: !prevState.dataDropdownOpen})); break;
      case "sort": this.setState(prevState => ({sortDropdownOpen: !prevState.sortDropdownOpen})); break;
      default: break;
    }
  }

  setTime(value) {
    this.setState({
      currentTime: value
    });
  }

  setData(value) {
    this.setState({
      currentData: value
    });
  }

  setSort(value) {
    this.setState({
      currentSort: value
    });
  }

  getName(key) {
    var legend = {
      "all_time": "All time",
      "this_week": "This week",
      "debates": "Debates",
      "proposals": "Proposals",
      "both": "All",
      "activity": "Activity",
      "most_beloved": "Most Popular",
      "most_controversial": "Most Controversial"
    };
    return(legend[key]);
  }

  chooseQuery() {
    switch(this.state.currentData) {
      case "both": return QUERY_BOTH;
      case "debates": return QUERY_DATA_DEBATES;
      case "proposals": return QUERY_DATA_PROPOSALS;
      default: break;
    }
  }

  render () {
    return (
      <Container fluid>
        <Row>
          <Col md="8"></Col>
          <Col md="4">
            <Row>
              <InputGroupAddon addonType="prepend">When: </InputGroupAddon>
              <Dropdown isOpen={this.state.timeDropdownOpen} toggle={() => this.toggle("time")}>
                <DropdownToggle caret>
                  {this.getName(this.state.currentTime)}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.setTime("all_time")}>All time</DropdownItem>
                  <DropdownItem onClick={() => this.setTime("this_week")}>This week</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <InputGroupAddon addonType="prepend">Data: </InputGroupAddon>
              <Dropdown isOpen={this.state.dataDropdownOpen} toggle={() => this.toggle("data")}>
                <DropdownToggle caret>
                  {this.getName(this.state.currentData)}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.setData("both")}>All</DropdownItem>
                  <DropdownItem onClick={() => this.setData("debates")}>Debates</DropdownItem>
                  <DropdownItem onClick={() => this.setData("proposals")}>Proposals</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <InputGroupAddon addonType="prepend">Sort By: </InputGroupAddon>
              <Dropdown isOpen={this.state.sortDropdownOpen} toggle={() => this.toggle("sort")}>
                <DropdownToggle caret>
                  {this.getName(this.state.currentSort)}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.setSort("activity")}>Activity</DropdownItem>
                  <DropdownItem onClick={() => this.setSort("most_beloved")}>Most Popular</DropdownItem>
                  <DropdownItem onClick={() => this.setSort("most_controversial")}>Most Controversial</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
          </Col>
        </Row>
        <Query query={this.chooseQuery()}>
        {({ loading: loadingOne, error: errorOne, data: data }) => (
          <Query query={QUERY_COMMENTS}>
            {({ loading: loadingTwo, error: errorTwo, data: comments}) => {
              if (loadingOne || loadingTwo) return (<div className="lds-ripple"><div></div><div></div></div>);
              if (errorOne || errorTwo) return `Error!: ${errorOne}`;
              console.log(this.state);
              return( 
                <Row>
                  <Col md="12">
                    <Leaderboard
                      debates={(this.state.currentData === "both" || this.state.currentData === "debates") ? data.debates.edges : []}
                      proposals={(this.state.currentData === "both" || this.state.currentData === "proposals") ? data.proposals.edges : []} 
                      comments = {comments.comments.edges}
                      sort_filter= {this.state.currentSort}
                      contents_filter= {this.state.currentData}
                      time_filter= {this.state.currentTime}
                    />
                  </Col>
                </Row>
              )
            }}
          </Query>
        )}
      </Query>
    </Container>
    )
  }
}

export default App;
