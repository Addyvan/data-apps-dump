import React from "react";
import PropTypes from "prop-types";
import { NavItem, NavLink } from "reactstrap";

class SidebarNavItem extends React.Component {

  render() {
    return(
      <NavItem>
        <NavLink className="sidebar-navlink" href={this.props.path} active={window.location.pathname === this.props.path}>
          { (this.props.logo_path) ? <img style={{maxHeight: "20px"}} src={this.props.logo_path} alt={this.props.logo_path}/> : ""  }
          { "   " + this.props.text }
        </NavLink>
      </NavItem>
    );
  }

}

SidebarNavItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default SidebarNavItem;