import React from "react";
import { Row, Col } from "reactstrap";

class NavBar extends React.Component {
  render() {
    return(
      <Row style={{paddingBottom: "5px"}} className="oadw-nav">
        <Col lg="2" md="3" sm="12" className="logo" style={{padding: "0px"}}>
          <h2 style={{margin: "0px"}}>OADW Dash</h2>
        </Col>
        <Col lg="10" md="9" sm="12" style={{padding: "0px"}} ></Col>
      </Row>
    );
  }
}

export default NavBar;