import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import {
    Divider,
    Form,
    InputNumber,
    Button,
    DatePicker,
    Skeleton,
    Descriptions,
    Empty,
    Input
} from "antd";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function AddAssignment() {
    // forms
    const [form] = Form.useForm();

    // OnSubmit
    const onFinish = () => {};

    const onFinishFailed = () => {};

    return (
        <div>
            <p>Form</p>
            <AddAssignmentDetails />
        </div>
    );

    function AddAssignmentDetails() {
        return (
            <Form
                form={form}
                name="assignment_details"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="name">
                    <Input />
                </Form.Item>
                <Form.Item name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="time_issued">
                    <DatePicker
                        placeholder="Date of Birth"
                        showTime
                        defaultValue={moment()}
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <Form.Item name="time_required">
                    <DatePicker
                        placeholder="Time Required"
                        showTime
                        defaultPickerValue={moment().endOf("minute")}
                        renderExtraFooter={() =>
                            "Select deadline for collection"
                        }
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                    />
                </Form.Item>
            </Form>
        );
    }

    // disabled Dates
    function disabledDate(current) {
        return current < moment().startOf("day");
    }

    // get a range of numbers
    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    // disabledTime
    function disabledDateTime(current) {
        const curr_time = moment()
            .endOf("minute")
            .add(10, "m");
        const startHour = curr_time.hours();
        const startMinute = curr_time.minute();
        return {
            disabledHours: () => range(0, startHour),
            disabledMinutes: () => range(0, startMinute)
        };
    }
}

AddAssignment.propTypes = {
    prop: PropTypes
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddAssignment);
