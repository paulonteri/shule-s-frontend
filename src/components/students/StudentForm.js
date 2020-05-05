import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// TODO: add date constraints

// Disabled Time(DOB)
// current > moment().subtract(5,'years');

// Disabled Time(DOA)
// current > moment().
import Form from "antd/es/form";
import Input from "antd/es/input";
import DatePicker from "antd/es/date-picker";
import Button from "antd/es/button";
import Checkbox from "antd/es/checkbox";
import {
    UserOutlined,
    ManOutlined,
    WomanOutlined,
    PhoneOutlined,
    MailOutlined,
    MedicineBoxOutlined
} from "@ant-design/icons";

import { addStudent } from "../../actions/students/students";
import { getClasses } from "../../actions/classes/classes";
import { getDorms } from "../../actions/dormitories/dormitories";
const { TextArea } = Input;

////// COMPONENT START ///////////
export class StudentsForm extends Component {
    static propTypes = {
        addStudent: PropTypes.func.isRequired,
        getClasses: PropTypes.func.isRequired,
        classes: PropTypes.array.isRequired,
        dorms: PropTypes.array.isRequired,
        getDorms: PropTypes.func.isRequired
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.getClasses();
        this.props.getDorms();
    }

    state = {
        student_id: "",
        class_ns: "",
        dormitory: "",
        first_name: "",
        surname: "",
        other_name: "",
        father_alive: true,
        mother_alive: true,
        father_first_name: "",
        father_surname: "",
        father_email: "",
        father_phone: "",
        mother_first_name: "",
        mother_surname: "",
        mother_email: "",
        mother_phone: "",
        date_of_birth: "",
        gender: "",
        admission_date: "",
        is_enrolled: true,
        home_country: "",
        home_county: "",
        home_town: "",
        religion: "",
        health: ""
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

    handleCheck = event => {
        this.setState({ [event.target.name]: event.target.checked }); // handle checkboxes
    };

    handleDate = (dateString, id) => {
        this.setState({ [id]: dateString }); // handle date-picker
    };

    handleSubmit = e => {
        const {
            student_id,
            class_ns,
            dormitory,
            first_name,
            surname,
            other_name,
            father_alive,
            mother_alive,
            father_first_name,
            father_surname,
            father_email,
            father_phone,
            mother_first_name,
            mother_surname,
            mother_email,
            mother_phone,
            date_of_birth,
            gender,
            admission_date,
            is_enrolled,
            home_country,
            home_county,
            home_town,
            religion,
            health
        } = this.state; // get them from the state

        // student from above to the student const
        const student = {
            student_id: student_id,
            class_ns: class_ns,
            dormitory: dormitory,
            first_name,
            surname,
            other_name,
            father_alive,
            mother_alive,
            father_first_name,
            father_surname,
            father_email,
            father_phone,
            mother_first_name,
            mother_surname,
            mother_email,
            mother_phone,
            date_of_birth,
            gender,
            admission_date,
            is_enrolled,
            home_country,
            home_county,
            home_town,
            religion,
            health
        };

        // pass the student const to the action
        this.props.addStudent(student);

        // clear fields
        this.formRef.current.resetFields();
    };

    render() {
        return (
            <div className="card card-body shadow rounded container-fluid">
                <h5>Fill in a student's details</h5>
                <Form
                    onFinish={this.handleSubmit}
                    ref={this.formRef}
                    initialValues={{
                        mother_alive: true,
                        father_alive: true,
                        is_enrolled: true
                    }}
                >
                    {/* First Name */}
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the student's first name!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Student's first name"
                                    name="first_name"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Family Name */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the student's family name!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Family name"
                                    name="surname"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Other Name */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="other_name">
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Other name"
                                    name="other_name"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* date_of_birth  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="date_of_birth">
                                <DatePicker
                                    placeholder="Date of Birth"
                                    onChange={(date, dateString) =>
                                        this.handleDate(
                                            dateString,
                                            "date_of_birth"
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        {/* Student ID  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="student_id"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the student's identification number!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="Student ID"
                                    name="student_id"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Class */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="class_ns"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select the student's class!"
                                    }
                                ]}
                            >
                                <select
                                    className="custom-select custom-select-sm"
                                    name="class_ns"
                                    onChange={this.onChange}
                                >
                                    {/* first option  */}
                                    <option
                                        value=""
                                        className="text-sm-left font-weight-light"
                                    >
                                        Select Class
                                    </option>
                                    {/* other options  */}
                                    {/* get classes  */}
                                    {this.props.classes.map(my_class => (
                                        <option
                                            key={my_class.id}
                                            value={my_class.id}
                                        >
                                            {my_class.class_numeral}{" "}
                                            {my_class.stream}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>
                        </div>

                        {/* Dorm  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="dormitory">
                                <select
                                    className="custom-select custom-select-sm"
                                    name="dormitory"
                                    onChange={this.onChange}
                                >
                                    {/* first option  */}
                                    <option
                                        value=""
                                        className="text-sm-left font-weight-light"
                                    >
                                        Select Dormitory
                                    </option>
                                    {/* other options  */}
                                    {this.props.dorms.map(dorm => (
                                        <option key={dorm.id} value={dorm.id}>
                                            {dorm.dormitory_name}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>
                        </div>
                        {/* Gender */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the student's gender!"
                                    }
                                ]}
                            >
                                <select
                                    className="custom-select custom-select-sm"
                                    name="gender"
                                    onChange={this.onChange}
                                >
                                    <option
                                        value=""
                                        className="text-sm-left font-weight-light"
                                    >
                                        Gender
                                    </option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </Form.Item>
                        </div>
                    </div>

                    {/* ///////////////////// Location (Home) //////////////////////////////////////////////////////////////// */}
                    <div className="row">
                        {/* Country */}

                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="home_country">
                                <Input
                                    type="text"
                                    placeholder="Home Country"
                                    name="home_country"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* County */}

                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="home_county">
                                <Input
                                    type="text"
                                    placeholder="County/Province"
                                    name="home_county"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Town*/}

                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="home_town">
                                <Input
                                    type="text"
                                    placeholder="Town"
                                    name="home_town"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Religion */}

                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="religion">
                                <Input
                                    type="text"
                                    placeholder="Religion"
                                    name="religion"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <p className="text-weight-light">Parents</p>
                        </div>
                    </div>

                    {/* ////////////////////// Father /////////////////////////////////////////////////// */}
                    {/* Father First Name */}

                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="father_first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's first name!!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <ManOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Male guardian's first name"
                                    name="father_first_name"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Father Sir Name  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="father_surname"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's family name!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <ManOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Male guardian's surname"
                                    name="father_surname"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* father is alive */}

                        <div className="col-xl-2">
                            <Form.Item
                                name="father_alive"
                                valuePropName="checked"
                            >
                                <Checkbox
                                    onChange={this.handleCheck}
                                    name="father_alive"
                                >
                                    Father is alive
                                </Checkbox>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        {/* Father Phone  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="father_phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's phone number!!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <PhoneOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="number"
                                    min="99999999"
                                    step="1"
                                    placeholder=" Male guardian's phone number"
                                    name="father_phone"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Father Email  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="father_email"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's email!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="email"
                                    placeholder=" Male guardian's email"
                                    name="father_email"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    {/* //////////  Mother ////////////////  */}

                    {/* Mother First Name */}

                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="mother_first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the mother's/female guardian's first name!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <WomanOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Female guardian's first name"
                                    name="mother_first_name"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Mother's Sir Name */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="mother_surname"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's family name!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <WomanOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Female guardian's family name"
                                    name="mother_surname"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* mother is alive checkbox */}

                        <div className="col-xl-2">
                            <Form.Item
                                name="mother_alive"
                                valuePropName="checked"
                            >
                                <Checkbox
                                    onChange={this.handleCheck}
                                    name="mother_alive"
                                >
                                    Mother is alive
                                </Checkbox>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        {/* Mother Phone  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="mother_phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's phone number!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <PhoneOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="number"
                                    min="99999999"
                                    step="1"
                                    placeholder=" Female guardian's phone number"
                                    name="mother_phone"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>

                        {/* Mother Email  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="mother_email"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the father's/male guardian's email!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="email"
                                    placeholder=" Female guardian's email"
                                    name="mother_email"
                                    onChange={this.onChange}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    {/* Health  */}
                    <div className="row">
                        <div className="col">
                            <p className="text-weight-light">Health</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-9">
                            <Form.Item name="health">
                                <TextArea
                                    rows={3}
                                    placeholder="Any health issue"
                                    name="health"
                                    onChange={this.onChange}
                                    prefix={
                                        <MedicineBoxOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="row">
                        {/* student is enrolled */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item
                                name="is_enrolled"
                                valuePropName="checked"
                                initialValue="true"
                            >
                                <Checkbox
                                    onChange={this.handleCheck}
                                    name="is_enrolled"
                                >
                                    Student is Enrolled
                                </Checkbox>
                            </Form.Item>
                        </div>

                        {/* Date enrolled  */}
                        <div className="col-lg-3 col-sm-6">
                            <Form.Item name="admission_date">
                                <DatePicker
                                    placeholder="Date of Admission"
                                    showToday
                                    onChange={(date, dateString) =>
                                        this.handleDate(
                                            dateString,
                                            "admission_date"
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Student
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classes: state.classesReducer.classes,
    dorms: state.dormitoriesReducer.dormitories
});

export default connect(mapStateToProps, { addStudent, getClasses, getDorms })(
    StudentsForm
);
