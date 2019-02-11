import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../plots/DataTable";

class Skills extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.countSkills = this.countSkills.bind(this);
  }

  countSkills(mission, count) {
    mission["keySkills"].split(",").map((skill) => {
        if (count[skill]) {
          count[skill] += 1;
        } else {
          if (skill !== "")
            count[skill] = 1;
        }
        return true;
      }
    );
  }

  render() {
    var count = {};
    this.props.missions.map((mission) => {
      this.countSkills(mission, count);
      return true;
    });
    var output = "";
    if (this.props.missions.length < 1) {
      output = "";
    } else {
      output = count;
    }
    
    return(
      <div>
        <DataTable header={["Skill", "Count"]} maxRows={10} data={output}></DataTable>
      </div>
    );
  }
}

Skills.propTypes = {
  missions: PropTypes.array.isRequired
}

export default Skills;