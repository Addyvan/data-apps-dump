import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.createTableData = this.createTableData.bind(this);
  }

  createTableData() {
    var values = [];
    for (var key in this.props.data) {
      values.push({name: key, value: this.props.data[key]});
    }

    return values.sort( function(a, b) {return b.value - a.value} );
  }

  render() {
    var data = this.createTableData();
    if (this.props.maxRows) {
      data = data.slice(0, this.props.maxRows);
    }
    return(
      <Table style={{fontSize: "12px"}} responsive hover>
        <thead>
          {this.props.header.map((header) => (<th>{header}</th>))}
        </thead>
        <tbody>
          {data.map((row) => (<tr><th>{row.name}</th><td>{row.value}</td></tr>))}
        </tbody>
      </Table>
      
    );
  }
}

DataTable.propTypes = {
  header: PropTypes.array,
  data: PropTypes.object.isRequired,
  maxRows: PropTypes.any
}

export default DataTable;