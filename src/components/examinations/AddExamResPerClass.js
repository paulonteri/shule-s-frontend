import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSubjects } from "../../actions/subjects/subjects";
import { getStudents } from "../../actions/students/students";
import { getClasses } from "../../actions/classes/classes";
import {
    getExams,
    addExamResultsPerClass,
    getExamResultsAll,
    getExamResultsPerClassPerExam
} from "../../actions/examinations/examinations";
import InputNumber from "antd/es/input-number";
import Skeleton from "antd/es/skeleton";
import Descriptions from "antd/es/descriptions";
import Empty from "antd/es/empty";
import Select from "antd/es/select";
import Form from "antd/es/form";
import Divider from "antd/es/divider";
import Button from "antd/es/button";

const { Option } = Select;

//

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

    // On Change
    useEffect(() => {
        if (classs != null && subject != null) {
            FetchResults();
        }
    }, [classs, subject]);

    // On Change
    useEffect(() => {
        if (props.uploadedExamResultsPerClass === true) {
            FetchResults();
            form.resetFields();
        }
    }, [props.uploadedExamResultsPerClass]);

    // forms
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const studz = props.students;

    // OnSubmit
    const onFinish = results => {
        const student_marks = [];
        for (let [key, value] of Object.entries(results)) {
            if (value !== undefined && value != null) {
                student_marks.push({
                    student: Number(key),
                    marks: Number(value)
                });
            }
        }
        const q = {
            exam: exam,
            subject: subject,
            student_marks: student_marks
        };

        props.addExamResultsPerClass(q);
    };

    // show subject inputs
    function ShowStudentInputs() {
        if (Loading() === false) {
            if (subject == null || classs == null || exam == null) {
                return (
                    <Empty
                        className="py-2 my-2 mb-4"
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
                            onFinishFailed={onFinishFailed}
                        >
                            {props.students
                                .filter(x => x.class_ns === classs)
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
                                                disabled={
                                                    props.uploadingExamResultsPerClass
                                                }
                                            />
                                        </Form.Item>
                                    );
                                })}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={props.uploadingExamResultsPerClass}
                                >
                                    Submit Results
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col">
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
        <div
            className="card px-sm-5 shadow container-fluid"
            style={{ minHeight: "65vh" }}
        >
            <SelectExamClassSubject mt-1 />
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
        if (classs != null && subject != null) {
            props.getExamResultsPerClassPerExam(classs, subject);
        }
    }

    // results
    function ShowResults() {
        if (
            props.examResultsPerClassPerSubjectLoading === false &&
            SelectedDropDowns() === true &&
            props.examResultsPerClassPerSubject != null &&
            props.examResultsPerClassPerSubject.length !== 0
        ) {
            const the_results = props.examResultsPerClassPerSubject.find(
                x => x.exam === exam
            );

            if (the_results == null) {
                return (
                    <Empty
                        className="py-2 my-auto mb-4"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<span>No results recorded yet</span>}
                    />
                );
            } else {
                return (
                    <Descriptions size="small" className="mb-2" bordered>
                        {the_results["exam_results"].map(res => {
                            return (
                                <Descriptions.Item
                                    key={res.student_id}
                                    label={StudentName(res.student_id)}
                                    span={3}
                                >
                                    {res.marks}
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions>
                );
            }
        } else {
            return (
                <Empty
                    className="py-2 my-auto mb-4"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No results recorded yet</span>}
                />
            );
        }
    }

    // Loading
    function Loading() {
        return props.getSudentsLoading === true || props.examsLoading === true;
    }

    // Selected
    function SelectedDropDowns() {
        return !(exam == null && subject == null && classs == null);
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
