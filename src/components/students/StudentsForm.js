import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Icon, Input, Button, Checkbox, DatePicker } from "antd";

import { addStudent } from "../../actions/students/students";
import { getClasses } from "../../actions/classes/classes";
import { getDorms } from "../../actions/dormitories/dormitories";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

////// COMPONENT START ///////////
export class StudentsForm extends Component {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
    getClasses: PropTypes.func.isRequired,
    classes: PropTypes.array.isRequired,
    dorms: PropTypes.array.isRequired,
    getDorms: PropTypes.func.isRequired
  };

  componentDidMount() {}

  componentDidMount() {
    this.props.form.validateFields(); // To disable submit button at the beginning.
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
    e.preventDefault();
    this.props.form.validateFields((err, student) => {
      if (!err) {
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

        // student from the staate to the student const
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
        console.log(student);
        this.props.addStudent(student);

        // empty the fields    // Commented out to allow testing
        // this.setState({
        //   student_id: "",
        //   class_ns: "",
        //   dormitory: "",
        //   first_name: "",
        //   surname: "",
        //   other_name: "",
        //   father_alive: true,
        //   mother_alive: true,
        //   father_first_name: "",
        //   father_surname: "",
        //   father_email: "",
        //   father_phone: "",
        //   mother_first_name: "",
        //   mother_surname: "",
        //   mother_email: "",
        //   mother_phone: "",
        //   date_of_birth: "",
        //   gender: "",
        //   admission_date: "",
        //   is_enrolled: true,
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

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    ////////////////////////////////    ERRORS     //////////////////////////////////////////////////////
    // Left blank error
    // Only show error after a field is touched and left blank
    const genderError = isFieldTouched("gender") && getFieldError("gender");
    const first_nameError =
      isFieldTouched("first_name") && getFieldError("first_name");
    const surnameError = isFieldTouched("surname") && getFieldError("surname");
    const student_idError =
      isFieldTouched("student_id") && getFieldError("student_id");
    const class_nsError = isFieldTouched("class") && getFieldError("class");
    const father_first_nameError =
      isFieldTouched("father_first_name") && getFieldError("father_first_name");
    const father_surnameError =
      isFieldTouched("father_surname") && getFieldError("father_surname");
    const mother_first_nameError =
      isFieldTouched("mother_first_name") && getFieldError("mother_first_name");
    const mother_surnameError =
      isFieldTouched("mother_surname") && getFieldError("mother_surname");
    const father_phoneError =
      isFieldTouched("father_phone") && getFieldError("father_phone");
    const father_emailError =
      isFieldTouched("father_email") && getFieldError("father_email");
    const mother_phoneError =
      isFieldTouched("mother_phone") && getFieldError("mother_phone");
    const mother_emailError =
      isFieldTouched("mother_email") && getFieldError("mother_email");

    return (
      <div className=" card card-body shadow rounded mt-1 mb-4 container">
        <h5>Fill in a student's details</h5>
        <Form onSubmit={this.handleSubmit}>
          {/* First Name */}
          <div className="row">
            <div className="col-lg-3">
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

            {/* Family Name */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={surnameError ? "error" : ""}
                help={surnameError || ""}
              >
                {getFieldDecorator("surname", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the student's family name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Family name"
                    name="surname"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Other Name */}
            <div className="col-lg-3">
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

            {/* date_of_birth  */}
            <div className="col-lg-3">
              <Form.Item>
                {getFieldDecorator("date_of_birth", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <DatePicker
                    placeholder="Date of Birth"
                    onChange={(date, dateString) =>
                      this.handleDate(dateString, "date_of_birth")
                    }
                  />
                )}
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* Student ID  */}
            <div className="col-lg-3">
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
            <div className="col-lg-3">
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
                    {/* get classes  */}
                    {this.props.classes.map(my_class => (
                      <option key={my_class.id} value={my_class.id}>
                        {my_class.class_numeral} {my_class.stream}
                      </option>
                    ))}
                  </select>
                )}
              </Form.Item>
            </div>

            {/* Dorm  */}
            <div className="col-lg-3">
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
                    {this.props.dorms.map(dorm => (
                      <option key={dorm.id} value={dorm.id}>
                        {dorm.dormitory_name}
                      </option>
                    ))}
                  </select>
                )}
              </Form.Item>
            </div>
            {/* Gender */}
            <div className="col-lg-3">
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

          {/* ///////////////////// Location (Home) //////////////////////////////////////////////////////////////// */}
          <div className="row">
            {/* Country */}

            <div className="col-lg-3">
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

            <div className="col-lg-3">
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

            <div className="col-lg-3">
              <Form.Item>
                {getFieldDecorator("home_town", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Town"
                    name="home_town"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Religion */}

            <div className="col-lg-3">
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
          </div>

          <div className="row">
            <div className="col">
              <p className="text-weight-light">Parents</p>
            </div>
          </div>

          {/* ////////////////////// Father /////////////////////////////////////////////////// */}
          {/* Father First Name */}

          <div className="row">
            <div className="col-lg-3">
              <Form.Item
                validateStatus={father_first_nameError ? "error" : ""}
                help={father_first_nameError || ""}
              >
                {getFieldDecorator("father_first_name", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the father's/male guardian's first name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="man" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Male guardian's first name"
                    name="father_first_name"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Father Sir Name  */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={father_surnameError ? "error" : ""}
                help={father_surnameError || ""}
              >
                {getFieldDecorator("father_surname", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the father's/male guardian's family name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="man" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Male guardian's family name"
                    name="father_surname"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* father is alive */}

            <div className="col-xl-2">
              <Form.Item name="father_alive">
                {getFieldDecorator("father_alive", {
                  valuePropName: "checked",
                  initialValue: true
                })(
                  <Checkbox onChange={this.handleCheck} name="father_alive">
                    Father is alive
                  </Checkbox>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* Father Phone  */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={father_phoneError ? "error" : ""}
                help={father_phoneError || ""}
              >
                {getFieldDecorator("father_phone", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the father's/male guardian's phone number!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="number"
                    min="99999999"
                    step="1"
                    placeholder=" Male guardian's phone number"
                    name="father_phone"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Father Email  */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={father_emailError ? "error" : ""}
                help={father_emailError || ""}
              >
                {getFieldDecorator("father_email", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the father's/male guardian's email address!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="email"
                    placeholder=" Male guardian's email"
                    name="father_email"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>
          </div>

          {/* //////////  Mother ////////////////  */}

          {/* Mother First Name */}

          <div className="row">
            <div className="col-lg-3">
              <Form.Item
                validateStatus={mother_first_nameError ? "error" : ""}
                help={mother_first_nameError || ""}
              >
                {getFieldDecorator("mother_first_name", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the mother's/female guardian's first name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="woman" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Female guardian's first name"
                    name="mother_first_name"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Mother's Sir Name */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={mother_surnameError ? "error" : ""}
                help={mother_surnameError || ""}
              >
                {getFieldDecorator("mother_surname", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the mother's/female guardian's family name!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="woman" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="text"
                    placeholder=" Female guardian's family name"
                    name="mother_surname"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* mother is alive checkbox */}

            <div className="col-xl-2">
              <Form.Item name="mother_alive">
                {getFieldDecorator("mother_alive", {
                  valuePropName: "checked",
                  initialValue: true
                })(
                  <Checkbox onChange={this.handleCheck} name="mother_alive">
                    Mother is alive
                  </Checkbox>
                )}
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* Mother Phone  */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={mother_phoneError ? "error" : ""}
                help={mother_phoneError || ""}
              >
                {getFieldDecorator("mother_phone", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the mother's/female guardian's phone number!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="number"
                    min="99999999"
                    step="1"
                    placeholder=" Female guardian's phone number"
                    name="mother_phone"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            {/* Mother Email  */}
            <div className="col-lg-3">
              <Form.Item
                validateStatus={mother_emailError ? "error" : ""}
                help={mother_emailError || ""}
              >
                {getFieldDecorator("mother_email", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please input the mother's/female guardian's email address!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="email"
                    placeholder=" Female guardian's email"
                    name="mother_email"
                    onChange={this.onChange}
                  />
                )}
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
              <Form.Item>
                {getFieldDecorator("health", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Any health issue"
                    name="health"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>
          </div>

          <div className="row">
            {/* student is enrolled */}
            <div className="col-lg-3">
              <Form.Item>
                {getFieldDecorator("is_enrolled", {
                  valuePropName: "checked",
                  initialValue: true
                })(
                  <Checkbox onChange={this.handleCheck} name="is_enrolled">
                    Student is Enrolled
                  </Checkbox>
                )}
              </Form.Item>
            </div>

            {/* Date enrolled  */}
            <div className="col-lg-3">
              <Form.Item>
                {getFieldDecorator("admission_date", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <DatePicker
                    placeholder="Date of Admission"
                    onChange={(date, dateString) =>
                      this.handleDate(dateString, "admission_date")
                    }
                  />
                )}
              </Form.Item>
            </div>
          </div>

          {/* /////////////////////////////////////////// END OF FORM /////////////////////////////////////////////////////////// */}
          {/* Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              //   disabled={hasErrors(getFieldsError())}
            >
              Log in
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

StudentsForm = Form.create({ name: "add_student" })(StudentsForm);
export default connect(mapStateToProps, { addStudent, getClasses, getDorms })(
  StudentsForm
);
