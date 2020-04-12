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
import {
    getExams,
    addExamResultsPerStudent,
    getExamResultsAll,
    getExamResultsPerStudent
} from "../../actions/examinations/examinations";
const { Option } = Select;

//

//

function AddExamResPerStudent(props) {
    // forms
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    // State
    const [student, setStudent] = useState(null);
    const [exam, setExam] = useState(null);

    // OnMount
    useEffect(() => {
        props.getExams();
        props.getStudents();
        props.getSubjects();
        getExamResults(student);
    }, []);

    // onChange
    useEffect(() => {
        getExamResults(student);
    }, [student]);

    // onChange
    useEffect(() => {
        if (props.uploadedExamResultsPerStudent === true) {
            getExamResults(student);
            form.resetFields();
        }
    }, [props.uploadedExamResultsPerStudent]);

    // OnSubmit
    const onFinish = results => {
        const subject_marks = [];
        for (let [key, value] of Object.entries(results)) {
            if (value !== undefined && value != null) {
                subject_marks.push({
                    subject_id: Number(key),
                    marks: Number(value)
                });
            }
        }

        const q = {
            exam: exam,
            student: student,
            subject_marks: subject_marks
        };
        props.addExamResultsPerStudent(q);
    };

    const onFinishFailed = () => {};

    //

    //

    return (
        <div
            className="card px-sm-5 shadow container-fluid"
            style={{ minHeight: "65vh" }}
        >
            <Form
                form={form2}
                name="student&exam"
                className="container mt-2"
                initialValues={{
                    remember: true
                }}
            >
                <div className=" text-center mt-1 row-sm">
                    <Form.Item name="exam">
                        <Select
                            showSearch
                            placeholder=" Select exam"
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
                    <Form.Item name="student">
                        <Select
                            showSearch
                            placeholder="Select student"
                            onChange={setStud}
                            optionFilterProp="search"
                            className="my-1"
                        >
                            {props.students.map(student_sel => (
                                <Option
                                    key={student_sel.student_id}
                                    value={student_sel.student_id}
                                    search={`${student_sel.student_id} ${student_sel.surname} ${student_sel.first_name}`}
                                >
                                    {student_sel.student_id}:{" "}
                                    {student_sel.surname}{" "}
                                    {student_sel.first_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
            <div className="row">
                <div className="col">
                    <Divider orientation="center">Record Marks</Divider>

                    {ShowSubjects()}
                </div>
                <div className="col align-content-center text-center">
                    <Divider orientation="center">Recorded Marks</Divider>

                    {showResults()}
                </div>
            </div>
        </div>
    );

    // Show Subject Inputs
    function ShowSubjectInputs() {
        if (student == null || exam == null) {
            return (
                <Empty
                    className="pt-2"
                    description={<span>Select Exam & Student</span>}
                />
            );
        } else {
            return (
                <Form
                    form={form}
                    name="studentresults"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="container-sm"
                >
                    {props.subjects.map(subject => {
                        return (
                            <div key={subject.id} className="row-sm pl-1">
                                <Form.Item
                                    key={subject.id}
                                    label={subject.name}
                                    name={subject.id}
                                    disabled={DisableInputs}
                                >
                                    <InputNumber
                                        name={subject.id}
                                        disabled={DisableInputs()}
                                        max={100}
                                        min={1}
                                        size="small"
                                    />
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
    }

    //

    //
    function setStud(i) {
        setStudent(i);
        props.getExamResultsPerStudent(i);
    }

    // ShowSubjects
    function ShowSubjects() {
        if (props.getSubjectsLoading) {
            return (
                <Fragment>
                    <Skeleton className="pl-1" active />
                    <Skeleton className="pl-1" active />
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

    // get ExamResults
    function getExamResults(student) {
        if (student !== null) {
            props.getExamResultsPerStudent(student);
        } else {
            return [];
        }
    }

    // getSubjectName
    function getSubjectName(i) {
        const sub = props.subjects.filter(subj => subj.id === i)[0];
        return sub.name;
    }

    //
    function showResults() {
        if (props.examResultsPerStudent != null) {
            const resultss = props.examResultsPerStudent.filter(
                res => res.exam === exam
            );

            const results = resultss[0];

            if (results != null && student != null) {
                const mks = results["subject_marks"];
                return (
                    <Fragment>
                        <Descriptions size="small" className="mb-2" bordered>
                            {mks.map(marks => {
                                return (
                                    <Descriptions.Item
                                        span={3}
                                        label={getSubjectName(marks.subject_id)}
                                    >
                                        {marks.marks}
                                    </Descriptions.Item>
                                );
                            })}
                        </Descriptions>
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <Empty
                            className="pt-2"
                            description={<span>No marks recorded yet</span>}
                        />
                    </Fragment>
                );
            }
        }
    }
}

AddExamResPerStudent.propTypes = {
    getExams: PropTypes.func.isRequired,
    exams: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    getSubjectsLoading: PropTypes.bool.isRequired,
    uploadingExamResultsPerStudent: PropTypes.bool.isRequired,
    uploadedExamResultsPerStudent: PropTypes.bool.isRequired,
    getExamResultsPerStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    getSubjectsLoading: state.subjectsReducer.getSubjectsLoading,
    subjects: state.subjectsReducer.subjects,
    exams: state.examinationsReducer.exams,
    students: state.studentsReducer.students,
    uploadingExamResultsPerStudent:
        state.examinationsReducer.uploadingExamResultsPerStudent,
    uploadedExamResultsPerStudent:
        state.examinationsReducer.uploadedExamResultsPerStudent,
    examResultsPerStudent: state.examinationsReducer.examResultsPerStudent,
    examResultsPerStudentLoading:
        state.examinationsReducer.examResultsPerStudentLoading
});

export default connect(mapStateToProps, {
    getSubjects,
    getStudents,
    getExams,
    addExamResultsPerStudent,
    getExamResultsAll,
    getExamResultsPerStudent
})(AddExamResPerStudent);
