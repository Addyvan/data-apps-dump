import React from "react";

import { Nav } from "reactstrap";
import SidebarNavItem from "./Sidebar/SidebarNavItem";
import GCconsulation from "../../assets/logos/GCconsultation.png";
import All from "../../assets/logos/All.png";
import GCcollab from "../../assets/logos/GCcollab.png";

class SideBar extends React.Component {
  render() {
    return(
      <Nav vertical>
        <SidebarNavItem logo_path={All} text="Overview" path="/overview" />
        <SidebarNavItem logo_path={GCcollab} text="GCcollab" path="/collab" />
        <SidebarNavItem logo_path={GCconsulation} text="GCconsultation" path="/consul" />
      </Nav>
    );
  }
}

export default SideBar;