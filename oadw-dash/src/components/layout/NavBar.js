import React from "react";
import { Row, Col } from "reactstrap";

import { I18n } from "react-i18next";

import LanguageToggle from "../design-system/LanguageToggle";

class NavBar extends React.Component {
  render() {
    return(
      <I18n ns={["translation"]}>
        {
          (t, { i18n }) => (
            <Row style={{paddingBottom: "5px", margin: "0px"}} className="oadw-nav">
              <Col lg="2" md="3" sm="12" className="logo" style={{padding: "0px"}}>
                <h1 style={{margin: "0px"}}>{t("title")} <div style={{fontSize: "9px"}}>(technical demonstration)</div></h1>
              </Col>
              <Col lg="10" md="9" sm="12" style={{padding: "5px"}} >
                <Row>
                  <Col lg="11" md="11" sm="10"></Col>
                  <Col lg="1" md="1" sm="2" >
                    <LanguageToggle i18n={ i18n }/>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }
      </I18n>
    );
  }
}

export default NavBar;