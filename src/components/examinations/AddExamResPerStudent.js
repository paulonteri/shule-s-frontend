import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider, Form, InputNumber, Button, Select, Skeleton } from "antd";

import { getSubjects } from "../../actions/subjects/subjects";
import { getStudents } from "../../actions/students/students";
import {
  getExams,
  addExamResultsPerStudent,
  getExamResultsAll
} from "../../actions/examinations/examinations";
const { Option } = Select;

function AddExamResPerStudent(props) {
  // State
  const [student, setStudent] = useState(null);
  const [exam, setExam] = useState(null);

  // OnMount
  useEffect(() => {
    console.log(CheckStudentExam());
    console.log(props);
    props.getExams();
    props.getStudents();
    props.getSubjects();
  }, []);

  // OnSubmit
  const onFinish = results => {
    const subject_marks = [];
    for (let [key, value] of Object.entries(results)) {
      if (value !== undefined) {
        subject_marks.push({ subject_id: Number(key), marks: Number(value) });
      }
    }

    const q = { exam: exam, student: student, subject_marks: subject_marks };
    props.addExamResultsPerStudent(q);
  };

  const onFinishFailed = () => {};

  // Show Subject Inputs
  function ShowSubjectInputs() {
    return (
      <Form
        name="studentresults"
        initialValues={{
          remember: true
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="container-sm"
      >
        {props.subjects.map(subject => {
          return (
            <div key={subject.id} className="row-sm">
              <Form.Item
                key={subject.id}
                label={subject.name}
                name={subject.id}
                disabled={DisableInputs}
              >
                <InputNumber disabled={DisableInputs()} max={100} min={1} />
              </Form.Item>
            </div>
          );
        })}
        <div className="row-sm">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={CheckStudentExam()}
              loading={props.uploadingExamResultsPerStudent}
            >
              Submit Results
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }

  return (
    <div className="card px-sm-5 shadow container">
      <Form
        name="student&exam"
        initialValues={{
          remember: true
        }}
        className="container my-2"
      >
        <div className="row-sm">
          <Select
            showSearch
            placeholder=" Select exam"
            onChange={setExam}
            optionFilterProp="search"
            className="mr-2 my-1"
          >
            {props.exams.map(exam_sel => (
              <Option
                key={exam_sel.id}
                value={exam_sel.id}
                name="exam"
                search={`${exam_sel.name}`}
              >
                {exam_sel.name}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            placeholder=" Select student"
            onChange={setStudent}
            optionFilterProp="search"
            className="my-1"
          >
            {props.students.map(student_sel => (
              <Option
                key={student_sel.student_id}
                value={student_sel.student_id}
                name="student"
                search={`${student_sel.student_id} ${student_sel.surname} ${student_sel.first_name}`}
              >
                {student_sel.student_id}: {student_sel.surname}{" "}
                {student_sel.first_name}
              </Option>
            ))}
          </Select>
        </div>
      </Form>
      <div className="row">
        <div className="col">
          <Divider orientation="left">Record Marks</Divider>
        </div>

        {ShowSubjects()}
      </div>
    </div>
  );

  // ShowSubjects
  function ShowSubjects() {
    if (props.getSubjectsLoading) {
      return (
        <Fragment>
          <Skeleton active />
          <Skeleton active />
        </Fragment>
      );
    } else {
      return ShowSubjectInputs();
    }
  }

  // Check if student and exam have been selected
  function CheckStudentExam() {
    if (student == null || exam == null) {
      return true;
    } else {
      return false;
    }
  }

  // Disable Inputs
  function DisableInputs() {
    if (props.uploadingExamResultsPerStudent || CheckStudentExam()) {
      return true;
    } else {
      return false;
    }
  }
}

AddExamResPerStudent.propTypes = {
  getExams: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  getSubjectsLoading: PropTypes.bool.isRequired,
  uploadingExamResultsPerStudent: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  getSubjectsLoading: state.subjectsReducer.getSubjectsLoading,
  subjects: state.subjectsReducer.subjects,
  exams: state.examinationsReducer.exams,
  students: state.studentsReducer.students,
  uploadingExamResultsPerStudent:
    state.examinationsReducer.uploadingExamResultsPerStudent
});

export default connect(mapStateToProps, {
  getSubjects,
  getStudents,
  getExams,
  addExamResultsPerStudent,
  getExamResultsAll
})(AddExamResPerStudent);
