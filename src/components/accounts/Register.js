import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Icon, Input, Button } from "antd";

import { register } from "../../actions/auth/auth";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired
  };

  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  state = { confirmDirty: false };

  componentDidMount() {
    this.props.form.validateFields();
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;
    const newUser = { email, username, password };
    this.props.register(newUser);
    this.props.form.resetFields();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("The passwords should match!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const emailError = isFieldTouched("email") && getFieldError("email");
    const usernameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    const password2Error =
      isFieldTouched("password2") && getFieldError("password2");

    return (
      <div className=" card card-body shadow rounded mt-1 mb-4 container">
        <h5>Add users</h5>
        <Form onSubmit={this.onSubmit}>
          {/* Username */}

          <Form.Item
            validateStatus={usernameError ? "error" : ""}
            help={usernameError || ""}
            label="Username"
          >
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input the username!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Username"
                name="username"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* Email */}

          <Form.Item
            validateStatus={emailError ? "error" : ""}
            help={emailError || ""}
            label="Email"
          >
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input email!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Email"
                name="email"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* Password */}

          <Form.Item
            validateStatus={passwordError ? "error" : ""}
            help={passwordError || ""}
            label="Password"
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Password"
                name="password"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* Password 2 */}

          <Form.Item
            validateStatus={password2Error ? "error" : ""}
            help={password2Error || ""}
            label="Confirm Password"
          >
            {getFieldDecorator("password2", {
              rules: [
                {
                  required: true,
                  message: "Please input confirm password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                // type="text"
                placeholder=" Confirm password"
                name="password2"
                onBlur={this.handleConfirmBlur}
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Register User
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

Register = Form.create({ name: "register" })(Register);

export default connect(mapStateToProps, { register })(Register);
