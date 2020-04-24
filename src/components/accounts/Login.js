import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SpinnerFull from "../common/SpinnerFull";
import Input from "antd/es/input";
import Form from "antd/es/form";
import Button from "antd/es/button";

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
            return <Redirect to="/" />;
        } else if (this.props.isLoading) {
            return <SpinnerFull info="Authenticating Credentials" />;
        }

        return (
            <div
                className="d-flex align-items-center justify-content-center container"
                style={{ height: "100%" }}
            >
                <div className=" card card-body shadow rounded    ">
                    <h4>Kindly login</h4>
                    <div>
                        <Form layout="vertical" onFinish={this.onSubmit}>
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
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
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
                                    prefix={
                                        <LockOutlined
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder=" Password"
                                    name="password"
                                    onChange={this.onChange}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.isLoading
});

export default connect(mapStateToProps, { login })(Login);
