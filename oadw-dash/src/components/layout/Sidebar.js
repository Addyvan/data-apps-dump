import React from "react";

import { Nav, DropdownItem } from "reactstrap";
import SidebarNavItem from "./Sidebar/SidebarNavItem";
import GCconsulation from "../../assets/logos/GCconsultation.png";
import All from "../../assets/logos/All.png";
import GCcollab from "../../assets/logos/GCcollab.png";

class SideBar extends React.Component {
  render() {
    return(
      <Nav style={{marginTop: "30px"}} vertical>
        <SidebarNavItem logo_path={All} text="Overview" path="/overview" />
        <DropdownItem divider></DropdownItem>
        <DropdownItem header>OADW</DropdownItem>
        <SidebarNavItem logo_path={GCconsulation} text="GCconsultation" path="/consul" />
        <DropdownItem divider></DropdownItem>
        <DropdownItem header>Legacy Tools</DropdownItem>
        <SidebarNavItem logo_path={GCcollab} text="GCcollab" path="/collab" />
      </Nav>
    );
  }
}

export default SideBar;