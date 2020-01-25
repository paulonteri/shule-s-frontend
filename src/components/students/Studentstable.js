import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getStudents } from "../../actions/students/students";

export class Studentstable extends Component {
  static propTypes = {
    students: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudents();
  }
  render() {
    return (
      <Fragment>
        {/* <tbody>
          {this.props.students.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.email}</td>
              <td>{book.message}</td>
              <td>
                <button
                  onClick={this.props.deletebook.bind(this, book.id)}
                  className="btn btn-danger btn-sm"
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  students: state.studentsReducer.students
});

export default connect(mapStateToProps, { getStudents })(Studentstable);
