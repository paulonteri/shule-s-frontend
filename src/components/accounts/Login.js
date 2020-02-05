import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input } from "antd";
import { Link } from "react-router-dom";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class Login extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  state = {
    username: "",

    password: ""
  };

  state = { confirmDirty: false };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
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
        <Form onSubmit={this.handleSubmit}>
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
              Register
            </Button>
          </Form.Item>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

Login = Form.create({ name: "login" })(Login);

export default connect(mapStateToProps)(Login);
