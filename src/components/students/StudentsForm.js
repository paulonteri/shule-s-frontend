import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button } from "antd";

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

    // Left blank error
    // Only show error after a field is touched and left blank
    const first_nameError =
      isFieldTouched("first_name") && getFieldError("first_name");
    const sir_nameError =
      isFieldTouched("last_name") && getFieldError("last_name");

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* First Name */}
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder=" Student's first name"
              name="first_name"
              onChange={this.onChange}
            />
          )}
        </Form.Item>

        {/* Sir Name */}
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder=" Student's sir name"
              name="sir_name"
              onChange={this.onChange}
            />
          )}
        </Form.Item>

        {/* Other Name */}
        <Form.Item>
          {getFieldDecorator("other_name", {
            rules: [
              {
                required: false
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder=" Student's other name"
              name="other_name"
              onChange={this.onChange}
            />
          )}
        </Form.Item>

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
    );
  }
}

StudentsForm = Form.create({ name: "add_student" })(StudentsForm);
export default connect(null, { addStudent })(StudentsForm);
