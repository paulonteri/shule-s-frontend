import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getStudents } from "../../actions/students/students";

export class StudentsList extends Component {
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
        <ul>
          <h3>Students List</h3>
          {this.props.students.map(stud => (
            // fuction with the variable stud
            // function (stud) { return stud.id
            <li key={stud.student_id}>
              {" "}
              {stud.student_id} {stud.first_name} {stud.sir_name}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  students: state.studentsReducer.students
});

export default connect(mapStateToProps, { getStudents })(StudentsList);

{
  /* <table className="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    {this.props.students.map(student => (
      <tr key={student.student_id}>
        <td>{student.student_id}</td>
      </tr>
    ))}
  </tbody>
  </table> */
}

{
  /* <tbody>
          {this.props.students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.message}</td>
              <td>
                <button
                  onClick={this.props.deletestudent.bind(this, student.id)}
                  className="btn btn-danger btn-sm"
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */
}
