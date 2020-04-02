import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Divider,
  Form,
  InputNumber,
  Button,
  Select,
  Skeleton,
  Descriptions,
  Empty
} from "antd";
import { getSubjects } from "../../actions/subjects/subjects";
import { getStudents } from "../../actions/students/students";
import { getClasses } from "../../actions/classes/classes";
import {
  getExams,
  addExamResultsPerClass,
  getExamResultsAll,
  getExamResultsPerStudent //
} from "../../actions/examinations/examinations";
const { Option } = Select;

export const AddExamResPerClass = props => {
  // State
  const [subject, setSubject] = useState(null);
  const [exam, setExam] = useState(null);
  const [classs, setClass] = useState(null);

  // OnMount
  useEffect(() => {
    props.getClasses();
    props.getExams();
    props.getSubjects();
    props.getStudents();
  }, []);

  // forms
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  // OnSubmit
  const onFinish = results => {
    const student_marks = [];
    for (let [key, value] of Object.entries(results)) {
      if (value !== undefined && value != null) {
        student_marks.push({ student: Number(key), marks: Number(value) });
      }
    }
    const q = { exam: exam, subject: subject, student_marks: student_marks };

    console.log(q);
    form2.resetFields();
    form.resetFields();
    setExam(null);
    setSubject(null);
    setClass(null);
  };

  // show subject inputs
  function ShowStudentInputs() {
    if (subject == null || classs == null || exam == null) {
      return (
        <Empty
          className="pt-2"
          description={<span>Select Exam, Class & Subject </span>}
        />
      );
    }
    return (
      <Form
        form={form}
        name="student&marks"
        className="container mt-2"
        initialValues={{
          remember: true
        }}
        layout="inline"
        onFinish={onFinish}
      >
        {props.students
          .filter(x => (x.classns = classs))
          .map(stud => {
            return (
              <Form.Item
                name={stud.student_id}
                key={stud.student_id}
                label={`${stud.student_id} ${stud.surname} ${stud.first_name}`}
              >
                <InputNumber
                  name={stud.student_id}
                  max={100}
                  min={1}
                  size="small"
                />
              </Form.Item>
            );
          })}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={props.uploadingExamResultsPerclass}
          >
            Submit Results
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const onFinishFailed = () => {};

  return (
    <div className="card px-sm-5 shadow container">
      <SelectExamClassSubject />
      <ShowStudentInputs />
    </div>
  );

  //

  // Selectors
  function SelectExamClassSubject() {
    return (
      <Form
        form={form2}
        name="class&exam"
        className="container mt-2"
        initialValues={{
          remember: true
        }}
      >
        <div className="row mt-1 align-items-center">
          <div className="col-sm">
            <Form.Item name="exam">
              <Select
                showSearch
                placeholder="Select exam"
                onChange={setExam}
                optionFilterProp="search"
                className="mr-2 my-1"
                allowClear
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
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name="class">
              <Select
                showSearch
                placeholder="Select class"
                onChange={setClass}
                optionFilterProp="search"
                className="mr-2 my-1"
                allowClear
              >
                {props.classes.map(class_sel => (
                  <Option
                    key={class_sel.id}
                    value={class_sel.id}
                    name="class"
                    search={`${class_sel.class_numeral} ${class_sel.stream}`}
                  >
                    {`${class_sel.class_numeral} ${class_sel.stream}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item name="subject">
              <Select
                showSearch
                placeholder="Select subject"
                onChange={setSubject}
                optionFilterProp="search"
                className="mr-2 my-1"
                allowClear
              >
                {props.subjects.map(subject_sel => (
                  <Option
                    key={subject_sel.id}
                    value={subject_sel.id}
                    name="subject"
                    search={`${subject_sel.name}`}
                  >
                    {`${subject_sel.name}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
    );
  }
};

AddExamResPerClass.propTypes = {
  getExams: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  getSubjectsLoading: PropTypes.bool.isRequired,
  uploadingExamResultsPerclass: PropTypes.bool.isRequired,
  uploadedExamResultsPerClass: PropTypes.bool.isRequired,
  getExamResultsPerStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  getSubjectsLoading: state.subjectsReducer.getSubjectsLoading,
  subjects: state.subjectsReducer.subjects,
  exams: state.examinationsReducer.exams,
  students: state.studentsReducer.students,
  uploadingExamResultsPerclass:
    state.examinationsReducer.uploadingExamResultsPerclass,
  uploadedExamResultsPerClass:
    state.examinationsReducer.uploadedExamResultsPerClass,
  classes: state.classesReducer.classes
});

export default connect(mapStateToProps, {
  getSubjects,
  getStudents,
  getExams,
  getClasses,
  addExamResultsPerClass,
  getExamResultsAll,
  getExamResultsPerStudent //
})(AddExamResPerClass);
