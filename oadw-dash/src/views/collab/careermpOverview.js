import React from "react";

import DonutPlot from "../../components/plots/DonutPlot";
import BarPlot from "../../components/plots/BarPlot";
import Skills from "../../components/gccollab/careermp/Skills";

import { Row, Col, Card, CardBody, Spinner } from "reactstrap";

import {Query} from "react-apollo";
import gql from "graphql-tag";

const MISSIONS_QUERY = gql`
{
  missions {
    security
    roleType
    programArea
    location
    keySkills
  }
}
`;

class CollabCareerMPOverview extends React.Component {
  render() {
    return(
      <Query query={MISSIONS_QUERY} >
      {
        ({ loading, error, data }) => {
          if (loading) return (<Spinner color="primary" />);
          if (data) {

            var programAreaLabels = [], programAreaValues = [];

            var securityLabels = [], securityValues = [];

            var numOffering = 0;
            var numSeeking = 0;
            var numNeither = 0;

            data.missions.map((mission) => {
              if (mission.roleType === "offering")
                numOffering += 1;
              else if (mission.roleType === "seeking")
                numSeeking += 1;
              else 
                numNeither += 1;
              
              if (!programAreaLabels.includes(mission["programArea"])) {
                programAreaLabels.push(mission["programArea"]);
                programAreaValues.push(1);
              } else {
                programAreaValues[programAreaLabels.indexOf(mission["programArea"])] += 1;
              }

              if (!securityLabels.includes(mission["security"])) {
                securityLabels.push(mission["security"]);
                securityValues.push(1);
              } else {
                securityValues[securityLabels.indexOf(mission["security"])] += 1;
              }
              
              return true;
            })

            // Sort the programArea data to show top 10
            var list = [];
            for (var j = 0; j < programAreaValues.length; j++) 
                list.push({'value': programAreaValues[j], 'label': programAreaLabels[j]});

            list.sort(function(a, b) {
                return b.value - a.value;
            });

            for (var k = 0; k < list.length; k++) {
              programAreaValues[k] = list[k].value;
              programAreaLabels[k] = list[k].label;
            }

            return(
              <div>
                <Row>
                  <Col md="6" lg="6" sm="12" style={{padding: "10px"}}>
                    <Card>
                      <CardBody>
                        <BarPlot title="Top 10 Program Areas" values={programAreaValues.splice(0,10)} labels={programAreaLabels.splice(0,10)} />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" lg="6" sm="12">
                    <Row>
                      <Col md="6" lg="6" sm="12" style={{padding: "10px"}}>
                        <Card>
                          <CardBody>
                            <DonutPlot title="Security Level" values={securityValues} labels={securityLabels} />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="6" lg="6" sm="12" style={{padding: "10px"}}>
                        <Card>
                          <CardBody>
                            <DonutPlot title="Role Type" values={[numOffering, numSeeking, numNeither]} labels={["offering", "seeking", "not specified"]} />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="4" lg="4" sm="12">
                    <Card>
                      <CardBody>
                        <h4 className="text-center">Top 10 Skills Listed</h4>
                        <Skills missions={data.missions} />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            );
          }
        }
      }
      </Query>
    )
  }
}

export default CollabCareerMPOverview;