import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addClass } from "../../actions/classes/classes";
import { getClassNumeral } from "../../actions/classes/classNumeral";
import { getStreams } from "../../actions/classes/stream";
import Form from "antd/es/form";
import Select from "antd/es/select";
import Button from "antd/es/button";
import Divider from "antd/es/divider"; // TODO: Add other class fields

export const AddClassesForm = props => {
    // On Change
    useEffect(() => {
        props.getClassNumeral();
        props.getStreams();
    }, []);

    // forms
    const [form] = Form.useForm();

    const onFinish = values => {
        props.addClass(values);
        form.resetFields();
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="table-responsive card card-body shadow rounded mb-1">
            <Divider orientation="left">Add Classes</Divider>
            <Form
                name="add_classes"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    name="class_numeral"
                    rules={[
                        {
                            required: true,
                            message: "Please select class numeral"
                        }
                    ]}
                >
                    <Select placeholder="Select Class Numeral">
                        {props.classNumerals.map(cl_n => {
                            return (
                                <Select.Option value={cl_n.name}>
                                    {cl_n.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="stream"
                    rules={[
                        {
                            required: true,
                            message: "Please select stream"
                        }
                    ]}
                >
                    <Select placeholder="Select Stream">
                        {props.streams.map(cl_n => {
                            return (
                                <Select.Option value={cl_n.name}>
                                    {cl_n.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

AddClassesForm.propTypes = {
    addClass: PropTypes.func.isRequired,
    getClassNumeral: PropTypes.func.isRequired,
    getStreams: PropTypes.func.isRequired,
    streams: PropTypes.array.isRequired,
    classNumerals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    streams: state.streamsReducer.streams,
    classNumerals: state.classNumeralsReducer.classNumerals
});

export default connect(mapStateToProps, {
    addClass,
    getClassNumeral,
    getStreams
})(AddClassesForm);
