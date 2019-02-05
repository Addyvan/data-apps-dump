import React from "react";
import PropTypes from "prop-types";

import {
  Card, CardTitle, CardSubtitle, CardText, CardBody
} from "reactstrap";

class DataContainer extends React.Component {
  render() {
    console.log(this.props.children);
    return(
      <div>
        <Card>
          <CardBody>
            {(this.props.title) ? <CardTitle>{this.props.title}</CardTitle> : ""}
            {(this.props.subtitle) ? <CardSubtitle>{this.props.subtitle}</CardSubtitle> : ""}
            {(this.props.text) ? <CardText>{this.props.text}</CardText> : ""}
            {this.props.children}
          </CardBody>
        </Card>
      </div>
    );
  }
}

DataContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.any
};

export default DataContainer;