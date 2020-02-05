import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input } from "antd";
import { Redirect } from "react-router-dom";

import { login } from "../../actions/auth/auth";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  state = { confirmDirty: false };

  // Blur for passwords
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"></Redirect>;
    }

    const { username, password } = this.state;

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const usernameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");

    return (
      <div className=" card card-body shadow rounded mt-1 mb-4 container">
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

Login = Form.create({ name: "login user" })(Login);

export default connect(mapStateToProps, { login })(Login);
