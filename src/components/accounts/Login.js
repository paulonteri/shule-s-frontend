import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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
      <div className=" card card-body shadow rounded container mt-5 mx-auto">
        <h4>Kindly login</h4>
        <Form layout="vertical" onFinish={this.onSubmit}>
          <div className="col">
            <div className="row">
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
            </div>

            {/* Password */}
            <div className="row">
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
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
