import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";


import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const DefaultLayout = ({ children, noNavbar, noFooter }) => (
  <Container id="main" className="flex-grow-1" fluid>
      {!noNavbar && <NavBar />}
    <Row style={{height: "100%"}}>
      <Col
        lg="2"
        md="3"
        sm="12"
        style={{padding: "0px"}}
        className="flex-grow-1"
      >
        <Sidebar />
      </Col>
      <Col
        lg="10"
        md="9"
        sm="12"
        className="flex-grow-1 content"
      >
        {children}
        {!noFooter && <Footer />}
      </Col>
    </Row>
  </Container>
);

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;