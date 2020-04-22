import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getClasses } from "../../actions/classes/classes";
import { getClassNumeral } from "../../actions/classes/classNumeral";
import { getStreams } from "../../actions/classes/stream";
import Form from "antd/es/form";
import Select from "antd/es/select";
import Button from "antd/es/button";

export const AddClassesForm = props => {
    const onFinish = values => {
        console.log("Success:", values);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Fragment>
            <Form
                name="add_classes"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Stream"
                    name="stream"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!"
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Class numeral"
                    name="class_numeral"
                    rules={[
                        {
                            required: true,
                            message: "Please select class numeral"
                        }
                    ]}
                >
                    {" "}
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    streams: state.streamsReducer.streams,
    classNumerals: state.classNumeralsReducer.classNumerals
});

export default connect(mapStateToProps, { getClasses })(AddClassesForm);
