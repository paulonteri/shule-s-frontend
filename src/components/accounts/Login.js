import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth/auth";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SpinnerFull from "../common/SpinnerFull";
import Input from "antd/es/input";
import Form from "antd/es/form";
import Button from "antd/es/button";

export const Login = props => {
    const [form] = Form.useForm();

    const onFinish = e => {
        props.login(e.email, e.password);
    };

    useEffect(() => {
        form.setFieldsValue({
            email: "janedoe@gmail.com",
            password: "janedoe"
        });
    }, []);

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    } else if (props.isLoading) {
        return <SpinnerFull info=" Authenticating Credentials..." />;
    } else
        return (
            <div
                className="d-flex align-items-center justify-content-center container"
                style={{ height: "100%" }}
            >
                <div className=" card card-body shadow rounded    ">
                    <h4>Kindly login</h4>
                    <div>
                        <Form layout="vertical" form={form} onFinish={onFinish}>
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
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    isLoading: state.authReducer.isLoading
});

export default connect(mapStateToProps, { login })(Login);
