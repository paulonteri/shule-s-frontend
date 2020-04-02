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
  getExamResultsPerClassPerExam
} from "../../actions/examinations/examinations";
const { Option } = Select;

//

const layout = {
  labelCol: {
    span: 4.5
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 4.5,
    span: 16
  }
};

//

export const AddExamResPerClass = props => {
  // State
  const [subject, setSubject] = useState(null);
  const [exam, setExam] = useState(null);
  const [classs, setClass] = useState(null);
  const [fetchresults, setFetchResults] = useState(false);

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

  const studz = props.students;

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
    props.addExamResultsPerClass(q);

    form2.resetFields();
    form.resetFields();
    setExam(null);
    setSubject(null);
    setClass(null);
    setFetchResults(false);
  };

  // show subject inputs
  function ShowStudentInputs() {
    if (Loading() == false) {
      if (subject == null || classs == null || exam == null) {
        return (
          <Empty
            className="pt-2"
            description={<span>Select Exam, Class & Subject </span>}
          />
        );
      }
      return (
        <div className="row">
          <div className="col">
            <Divider orientation="left">Record Marks</Divider>
            <Form
              form={form}
              name="student&marks"
              className="container mt-2"
              initialValues={{
                remember: true
              }}
              layout="vertical"
              onFinish={onFinish}
            >
              {props.students
                .filter(x => (x.classns = classs))
                .map(stud => {
                  return (
                    <Form.Item
                      name={stud.student_id}
                      key={stud.student_id}
                      label={`${stud.student_id}: ${stud.surname} ${stud.first_name}`}
                    >
                      <InputNumber
                        disabled={Loading()}
                        name={stud.student_id}
                        max={100}
                        min={1}
                        size="small"
                        disabled={props.uploadingExamResultsPerClass}
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
          </div>
          <div className="col">
            {FetchResults()}
            <Divider orientation="center">Recorded Marks</Divider>
            {ShowResults()}
          </div>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Skeleton className="pl-1" active />
          <Skeleton className="pl-1" active />
        </Fragment>
      );
    }
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
                disabled={Loading()}
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
                disabled={Loading()}
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
                disabled={Loading()}
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

  // Fetch exam results
  function FetchResults() {
    if (fetchresults == false) {
      props.getExamResultsPerClassPerExam(classs, exam);
      setFetchResults(true);
    }
  }

  // results
  function ShowResults() {
    if (
      props.examResultsPerClassPerSubjectLoading === false &&
      SelectedDropDowns() === true &&
      props.examResultsPerClassPerSubject != null &&
      props.examResultsPerClassPerSubject.length != 0
    ) {
      return (
        <Descriptions size="small" className="mb-2" bordered>
          {props.examResultsPerClassPerSubject
            .filter(x => (x.exam = exam))[0]
            ["exam_results"].map(res => {
              return (
                <Descriptions.Item label={StudentName(res.student_id)} span={3}>
                  {res.marks}
                </Descriptions.Item>
              );
            })}
        </Descriptions>
      );
    }
  }

  // Loading
  function Loading() {
    if (
      props.getSudentsLoading == true ||
      props.uploadingExamResultsPerClass == true ||
      props.examsLoading == true
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Selected
  function SelectedDropDowns() {
    if (exam == null && subject == null && classs == null) {
      return false;
    } else {
      return true;
    }
  }

  // Student Name
  function StudentName(s) {
    const pupil = studz.filter(y => y.student_id === s)[0];
    return `${pupil.student_id}: ${pupil.surname} ${pupil.first_name}`;
  }
};

AddExamResPerClass.propTypes = {
  getExams: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  getSubjectsLoading: PropTypes.bool.isRequired,
  uploadingExamResultsPerclass: PropTypes.bool.isRequired,
  uploadedExamResultsPerClass: PropTypes.bool.isRequired,
  getExamResultsPerClassPerExam: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  getSubjectsLoading: state.subjectsReducer.getSubjectsLoading,
  subjects: state.subjectsReducer.subjects,
  exams: state.examinationsReducer.exams,
  students: state.studentsReducer.students,
  getSudentsLoading: state.studentsReducer.getSudentsLoading,
  uploadingExamResultsPerClass:
    state.examinationsReducer.uploadingExamResultsPerClass,
  uploadedExamResultsPerClass:
    state.examinationsReducer.uploadedExamResultsPerClass,
  classes: state.classesReducer.classes,
  examsLoading: state.examinationsReducer.examsLoading,
  examResultsPerClassPerSubjectLoading:
    state.examinationsReducer.examResultsPerClassPerSubjectLoading,
  examResultsPerClassPerSubject:
    state.examinationsReducer.examResultsPerClassPerSubject
});

export default connect(mapStateToProps, {
  getSubjects,
  getStudents,
  getExams,
  getClasses,
  addExamResultsPerClass,
  getExamResultsAll,
  getExamResultsPerClassPerExam //
})(AddExamResPerClass);
