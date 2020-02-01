import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStudents, deleteStudent } from "../../actions/students/students";

export class StudentsTable extends Component {
  static propTypes = {
    student: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  student: state.studentsReducer.students
});

export default connect(mapStateToProps, { getStudents, deleteStudent })(
  StudentsTable
);
