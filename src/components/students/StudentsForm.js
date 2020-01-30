import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Icon, Input, Button, Select } from "antd";

import { addStudent } from "../../actions/students/students";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class StudentsForm extends Component {
  state = {
    student_id: "",
    class_ns: "",
    dormitory: "",
    first_name: "",
    sir_name: "",
    other_name: "",
    father_alive: "",
    mother_alive: "",
    father_first_name: "",
    father_sir_name: "",
    father_email: "",
    father_phone: "",
    mother_first_name: "",
    mother_sir_name: "",
    mother_email: "",
    mother_phone: "",
    date_of_birth: "",
    gender: "",
    admission_date: "",
    is_enrolled: "",
    home_country: "",
    home_county: "",
    home_town: "",
    religion: "",
    health: ""
  };

  static propTypes = {
    addStudent: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  componentDidMount() {
    this.props.form.validateFields(); // To disable submit button at the beginning.
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, student) => {
      if (!err) {
        // console.log("Received student of form: ", student);
        const {
          student_id,
          class_ns,
          dormitory,
          first_name,
          sir_name,
          other_name,
          father_alive,
          mother_alive,
          father_first_name,
          father_sir_name,
          father_email,
          father_phone,
          mother_first_name,
          mother_sir_name,
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

        // student from the staate to the student const
        const student = {
          student_id: student_id,
          class_ns: class_ns,
          dormitory: dormitory,
          first_name,
          sir_name,
          other_name,
          father_alive,
          mother_alive,
          father_first_name,
          father_sir_name,
          father_email,
          father_phone,
          mother_first_name,
          mother_sir_name,
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
        console.log(student);
        this.props.addStudent(student);

        // empty the fields    // Commented out to allow testing
        // this.setState({
        //   student_id: "",
        //   class_ns: "",
        //   dormitory: "",
        //   first_name: "",
        //   sir_name: "",
        //   other_name: "",
        //   father_alive: "",
        //   mother_alive: "",
        //   father_first_name: "",
        //   father_sir_name: "",
        //   father_email: "",
        //   father_phone: "",
        //   mother_first_name: "",
        //   mother_sir_name: "",
        //   mother_email: "",
        //   mother_phone: "",
        //   date_of_birth: "",
        //   gender: "",
        //   admission_date: "",
        //   is_enrolled: "",
        //   home_country: "",
        //   home_county: "",
        //   home_town: "",
        //   religion: "",
        //   health: ""
        // });
      }
    });
  };

  render() {
    const {
      student_id,
      class_ns,
      dormitory,
      first_name,
      sir_name,
      other_name,
      father_alive,
      mother_alive,
      father_first_name,
      father_sir_name,
      father_email,
      father_phone,
      mother_first_name,
      mother_sir_name,
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

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // ERRORS
    // Left blank error
    // Only show error after a field is touched and left blank
    const genderError = isFieldTouched("gender") && getFieldError("gender");
    const first_nameError =
      isFieldTouched("first_name") && getFieldError("first_name");
    const sir_nameError =
      isFieldTouched("sir_name") && getFieldError("sir_name");
    const student_idError =
      isFieldTouched("student_id") && getFieldError("student_id");
    const class_nsError = isFieldTouched("class") && getFieldError("class");

    return (
      <div className=" card card-body shadow rounded mt-1 mb-4 container">
        <h5>Fill in a student's details</h5>
        <Form onSubmit={this.handleSubmit}>
          {/* First Name */}
          <div className="row">
            <div className="col-md-3">
              <Form.Item
                validateStatus={first_nameError ? "error" : ""}
                help={first_nameError || ""}
              >
                {getFieldDecorator("first_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the student's first name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Student's first name"
                    name="first_name"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Sir Name */}
            <div className="col-md-3">
              <Form.Item
                validateStatus={sir_nameError ? "error" : ""}
                help={sir_nameError || ""}
              >
                {getFieldDecorator("sir_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the student's sir name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Sir name"
                    name="sir_name"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Other Name */}
            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("other_name", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Other name"
                    name="other_name"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Gender */}
            <div className="col-md-2">
              <Form.Item
                validateStatus={genderError ? "error" : ""}
                help={genderError || ""}
              >
                {getFieldDecorator("gender", {
                  rules: [
                    {
                      required: true,
                      message: "Please select student's gender!"
                    }
                  ]
                })(
                  <select
                    className="custom-select custom-select-sm"
                    name="gender"
                    onChange={this.onChange}
                  >
                    <option value="" className="text-sm-left font-weight-light">
                      Gender
                    </option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                  </select>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            {/* class  */}
            <div className="col-md-3">
              <Form.Item
                validateStatus={student_idError ? "error" : ""}
                help={student_idError || ""}
              >
                {getFieldDecorator("student_id", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the student's identification number!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Student ID"
                    name="student_id"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Class */}
            <div className="col-md-3">
              <Form.Item
                validateStatus={class_nsError ? "error" : ""}
                help={class_nsError || ""}
              >
                {getFieldDecorator("class_ns", {
                  rules: [
                    {
                      required: true,
                      message: "Please select student's class!"
                    }
                  ]
                })(
                  <select
                    className="custom-select custom-select-sm"
                    name="class_ns"
                    onChange={this.onChange}
                  >
                    <option value="" className="text-sm-left font-weight-light">
                      Select Class
                    </option>
                    <option value="n">North</option>
                    <option value="s">South</option>
                  </select>
                )}
              </Form.Item>
            </div>

            {/* Dorm  */}
            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("dormitory", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <select
                    className="custom-select custom-select-sm"
                    name="dormitory"
                    onChange={this.onChange}
                  >
                    <option value="" className="text-sm-left font-weight-light">
                      Select Dormitory
                    </option>
                    <option value="oy">Oyugi</option>
                    <option value="kal">Kalonzo</option>
                  </select>
                )}
              </Form.Item>
            </div>
          </div>

          {/* Location (Home)  */}
          <div className="row">
            {/* Country */}

            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("home_country", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Home Country"
                    name="home_country"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* County */}

            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("home_county", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="County/Province"
                    name="home_county"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Town*/}

            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("home_city", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Town"
                    name="home_city"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Religion */}

            <div className="col-md-3">
              <Form.Item>
                {getFieldDecorator("religion", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Religion"
                    name="religion"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            <hr />
          </div>

          {/* /////////////////////////////////////////// END OF FORM /////////////////////////////////////////////////////////// */}
          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

StudentsForm = Form.create({ name: "add_student" })(StudentsForm);
export default connect(null, { addStudent })(StudentsForm);
