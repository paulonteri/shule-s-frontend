import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getStudents, deleteStudent } from "../../actions/students/students";
import { getDorms } from "../../actions/dormitories/dormitories";

export class StudentTable extends Component {
  static propTypes = {
    student: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    dorms: PropTypes.array.isRequired,
    getDorms: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStudents();
    this.props.getDorms();
  }

  displayGender = genders => {
    if (genders == "m") {
      return <p>Male</p>;
    } else {
      return <p>Female</p>;
    }
  };

  displayDorm = dormitory => {
    const dormitories = this.props.dorms;
    const d = dormitories.filter(dm => dm.id == dormitory);
    return <p>{d.map(drm => drm.dormitory_name)}</p>;
  };

  render() {
    return (
      <Fragment>
        <p>Student Table</p>
        <div className="table-responsive card card-body shadow rounded mb-4">
          <h4>Student List</h4>
          <Table
            dataSource={this.props.student}
            rowKey="student_id"
            bordered
            // title={() => "Books"}
            footer={() => "List of Students"}
            pagination={{ pageSize: 20 }}
          >
            <Column title="ID" dataIndex="student_id" key="student_id" />
            <Column
              title="First Name"
              dataIndex="first_name"
              key="first_name"
            />
            <Column title="Family Name" dataIndex="surname" key="surname" />
            <Column title="Class" dataIndex="class_ns" key="class_ns" />
            <Column
              title="Dormitory"
              dataIndex="dormitory"
              key="dormitory"
              render={dorm => this.displayDorm(dorm)}
            />
            <Column
              title="Gender"
              dataIndex="gender"
              key="gender"
              render={gend => this.displayGender(gend)}
            />
            {/* ///// DELETE STUDENT ///// */}
            {/* <Column
              title=""
              key="action"
              render={the_parameter => (
                <span>
                  <button
                    onClick={this.props.deleteStudent.bind(
                      this,
                      student.student_id
                    )}
                    className="btn btn-danger btn-sm float-right"
                  >
                    Delete
                  </button>
                </span>
              )}
            /> */}
          </Table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  student: state.studentsReducer.students,
  dorms: state.dormitoriesReducer.dormitories
});

export default connect(mapStateToProps, {
  getStudents,
  deleteStudent,
  getDorms
})(StudentTable);
