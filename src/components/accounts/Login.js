import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

export class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  state = {
    username: "",
    password: ""
  };

  componentDidMount() {}

  onSubmit = e => {
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

    return (
      <div className=" card card-body shadow rounded container mt-5 ">
        <h4 className="align-self-center">Kindly login</h4>
        <div>
          <Form
            {...layout}
            onFinish={this.onSubmit}
            className="align-self-center"
          >
            {/* Username */}

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your  email!"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                placeholder=" Email"
                name="username"
                onChange={this.onChange}
              />
            </Form.Item>

            {/* Password */}

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input password!"
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                placeholder=" Password"
                name="password"
                onChange={this.onChange}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
