import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

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
        return (
            <div className=" card card-body shadow rounded mt-1 mb-4 container-fluid">
                <h5>Add users</h5>
                <Form onFinish={this.onSubmit} layout="vertical">
                    {/* Username */}

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!"
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
                            placeholder=" Username"
                            name="username"
                            onChange={this.onChange}
                        />
                    </Form.Item>

                    {/* Email */}

                    <Form.Item
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]}
                    >
                        <Input
                            prefix={
                                <MailOutlined
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="text"
                            placeholder=" Email"
                            name="email"
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
                            },
                            {
                                validator: this.validateToNextPassword
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

                    {/* Password 2 */}

                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: "Please input password!"
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            // type="text"
                            placeholder=" Confirm password"
                            name="password2"
                            onBlur={this.handleConfirmBlur}
                            onChange={this.onChange}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register User
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { register })(Register);
