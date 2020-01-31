import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getStudents, deleteStudent } from "../../actions/students/students";

export class StudentsList extends Component {
  static propTypes = {
    students: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudents();
  }
  render() {
    return (
      <Fragment>
        <div className="card px-4 py-2 shadow h-75">
          <div className="row">
            <div className="col">
              <h4>Student List:</h4>
            </div>
          </div>
          {this.props.students.map(stud => (
            <div className="row my-1">
              <div className="col">
                <h5>
                  <li key={stud.student_id}>
                    {" "}
                    {stud.student_id} {stud.first_name} {stud.surname}
                  </li>
                </h5>
              </div>
              <div className="col ">
                <button
                  onClick={this.props.deleteStudent.bind(this, stud.student_id)}
                  className="btn btn-danger btn-sm float-right"
                >
                  Delete Student
                </button>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  students: state.studentsReducer.students
});

export default connect(mapStateToProps, { getStudents, deleteStudent })(
  StudentsList
);

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
