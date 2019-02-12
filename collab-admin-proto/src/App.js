import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Container,
  Row,
  Col
} from "reactstrap";

import {
  UserDataProvider
} from "./dataproviders/DataProviders";

import UserCard from "./components/UserCard";

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <UserDataProvider id="cjrwj3mzn00270a09nfejtp6o" >
              <UserCard />
            </UserDataProvider>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
