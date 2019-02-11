import React from "react";
import PropTypes from "prop-types";

import {Card, CardText, CardBody, CardTitle, CardSubtitle, Badge, Fade, Button  } from "reactstrap";

class Mission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingDescription: false
    };

    this.renderHtml = this.renderHtml.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  renderHtml() {
    return ({__html: this.props.description});
  }

  toggleDescription() {
    this.setState({
      showingDescription: !this.state.showingDescription
    });
  }

  render() {
    return(
      <Card>
        <CardBody>
          <CardTitle>{this.props.title.substring(0, 30)} {(this.props.title.length > 30) ? "..." : ""}</CardTitle>
          {(this.props.department.length > 1) ? <CardSubtitle className="mission-subtitle" ><b>Dept:  </b>{this.props.department}</CardSubtitle> : ""}
          {(this.props.location.length > 1) ? <CardSubtitle className="mission-subtitle" ><b>Location:  </b>{this.props.location}</CardSubtitle> : ""}
          

          <CardSubtitle className="mission-subtitle" >
            {
              this.props.keySkills.split(",").map((skill) => (
                <Badge color="primary" pill>{skill}</Badge>
              ))
            }
          </CardSubtitle>

          <CardText>
            {(this.props.description.length > 1) ? 
              <div>
              <Button color="link" onClick={this.toggleDescription}>{(this.state.showingDescription) ? "Hide Description" : "Show Description"}</Button>
              <div dangerouslySetInnerHTML={this.renderHtml()} style={{display: (this.state.showingDescription) ? "block" : "none"}}></div>
              </div>
              :
              <div></div>
            }
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

Mission.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  completionDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keySkills: PropTypes.string.isRequired
};

export default Mission;