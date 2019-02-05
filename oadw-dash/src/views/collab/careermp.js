import React from "react";

import QueryDropdown from "../../components/dash/QueryDropdown";

import Skills from "../../components/gccollab/careermp/Skills";

import { Row, Col, Label, Card, CardBody } from "reactstrap";

import {Query} from "react-apollo";
import gql from "graphql-tag";

class CollabCareerMP extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      department: "ALL",
      roleType: "BOTH",
      location: "ALL",
      programArea: "ALL",
      query: gql`

          query OptionalQueryName(
            $department: DepartmentEnum,
            $location: MissionLocationEnum,
            $programArea: MissionProgramAreaEnum,
            $roleType: MissionRoleTypeEnum
            ){
            missions(
              department: $department
              location: $location
              programArea: $programArea
              roleType: $roleType
            ) {
              department
              keySkills
            }
          }

      `,
      department_query: gql`
      {
        enumMetaData(enum: DEPARTMENT)
      }
      `,
      location_query: gql`
      {
        enumMetaData(enum: MISSION_LOCATION)
      }
      `,
      role_type_query: gql`
      {
        enumMetaData(enum: MISSION_ROLE_TYPE)
      }
      `,
      program_area_query: gql`
      {
        enumMetaData(enum: MISSION_PROGRAM_AREA)
      }
      `,

    }

    this.setDepartment = this.setDepartment.bind(this);
    this.setRoleType = this.setRoleType.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setProgramArea = this.setProgramArea.bind(this);
  }


  setDepartment(DEPARTMENT) {
    this.setState({department: DEPARTMENT});
  }

  setRoleType(MISSION_ROLE_TYPE) {
    this.setState({roleType: MISSION_ROLE_TYPE});
  }

  setLocation(MISSION_LOCATION) {
    this.setState({location: MISSION_LOCATION});
  }

  setProgramArea(MISSION_PROGRAM_AREA) {
    this.setState({programArea: MISSION_PROGRAM_AREA});
  }
  
  render() {
    return(
      <div>
      <Row>
        <Col md="3" lg="3" sm="12">
          <Label>Department:</Label>
          <Query query={this.state.department_query} >
            {
              ({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple">loadddinnggg...</div>);
                if (data) {
                  var options = [];
                  data.enumMetaData.map((option) => {
                    options.push({
                      title: option, 
                      value: option, 
                      callback: this.setDepartment
                    });
                    return true;
                  });
                  return(
                    <QueryDropdown defaultTitle="ALL" options={options}/>
                  );
                } else {
                  return(<div>loading...</div>);
                }
            }
            }
          </Query>
        </Col>
        <Col md="3" lg="3" sm="12">
          <Label>Role Type:</Label>
          <Query query={this.state.role_type_query} >
            {
              ({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple" />);
                if (data) {
                  var options = [];
                  data.enumMetaData.map((option) => {
                    options.push({
                      title: option, 
                      value: option, 
                      callback: this.setRoleType
                    });
                    return true;
                  });
                  return(
                    <QueryDropdown defaultTitle="BOTH" options={options}/>
                  );
                } else {
                  return(<div>loading...</div>);
                }
            }
            }
          </Query>
        </Col>
        <Col md="3" lg="3" sm="12">
          <Label>Location:</Label>
          <Query query={this.state.location_query} >
            {
              ({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple" />);
                if (data) {
                  var options = [];
                  data.enumMetaData.map((option) => {
                    options.push({
                      title: option, 
                      value: option, 
                      callback: this.setLocation
                    });
                    return true;
                  });
                  return(
                    <QueryDropdown defaultTitle="ALL" options={options}/>
                  );
                } else {
                  return(<div>loading...</div>);
                }
            }
            }
          </Query>
        </Col>
        <Col md="3" lg="3" sm="12">
          <Label>Program Area:</Label>
          <Query query={this.state.program_area_query} >
            {
              ({ loading, error, data }) => {
                if (loading) return (<div className="lds-ripple" />);
                if (data) {
                  var options = [];
                  data.enumMetaData.map((option) => {
                    options.push({
                      title: option, 
                      value: option, 
                      callback: this.setProgramArea
                    });
                    return true;
                  });
                  return(
                    <QueryDropdown defaultTitle="ALL" options={options}/>
                  );
                } else {
                  return(<div>loading...</div>);
                }
            }
            }
          </Query>
        </Col>
        </Row>
        <hr></hr>
        <Query query={this.state.query} variables={{
          department: this.state.department ,
          roleType: this.state.roleType,
          location: this.state.location,
          programArea: this.state.programArea
        }} >
          {
            ({ loading, error, data }) => {
              if (loading) return (<div className="lds-ripple" />);
              if (data) {
                
                return(
                  <Row>
                    <Col md="4" lg="4" sm="6">
                      <Card>
                        <CardBody>
                          <h4 className="text-center">Top 10 Skills</h4>
                          <Skills missions={data.missions} />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                );
              }
              if (error) {
                console.log(error);
              }
            }
          }
        </Query>
      </div>
    );
  }
}

export default CollabCareerMP;