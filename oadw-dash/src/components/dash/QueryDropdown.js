import React from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class QueryDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      title: this.props.defaultTitle
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onClick(option) {
    this.setState({title: option.title});
    option.callback(option.value);
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.title}
        </DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: (data) => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: 250,
                  },
                };
              },
            },
          }}
        >
          {
            this.props.options.map((option) => {
              return(<DropdownItem key={option.value} onClick={() => this.onClick(option)}>{option.title}</DropdownItem>);
            })
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

/* each option:
  {
    title: string,
    callback: function 
  }
*/

QueryDropdown.propTypes = {
  defaultTitle: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
  })).isRequired
};

export default QueryDropdown;