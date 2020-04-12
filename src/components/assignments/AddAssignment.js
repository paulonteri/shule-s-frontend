import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Form, Button, DatePicker, Input, Upload } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 15
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 15
    }
};

function AddAssignment(props) {
    // state
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    // forms
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    // OnSubmit
    const onFinishDetails = assignment => {
        console.log(assignment);
    };

    const onFinishFailedDetails = () => {};

    // OnSubmit
    const onFinishFiles = assignment => {
        console.log(assignment);
        console.log(file1);
        console.log("Files");
    };

    const onFinishFailedFiles = () => {};

    return (
        <div>
            <p>Form</p>
            <div className=" container ">
                <AddAssignmentDetails />
                <AssignmentFiles />
            </div>
        </div>
    );

    function AddAssignmentDetails() {
        return (
            <Form
                form={form}
                {...layout}
                name="assignment_details"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinishDetails}
                onFinishFailed={onFinishFailedDetails}
            >
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Time Issued" name="time_issued">
                    <DatePicker
                        placeholder="Time Issued"
                        showTime
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <Form.Item label="Time Required" name="time_required">
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
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

    //

    // // // //

    //

    // BEFORE UPLOAD
    function beforeUpload(docFile, name) {
        switch (name) {
            case "file1":
                setFile1(docFile);
                console.log("FIle 1");
                break;
            case "file2":
                setFile2(docFile);
                break;
            case "file3":
                setFile3(docFile);
                break;
            default:
                console.log("Def");
        }
        return false;
    }

    function AssignmentFiles() {
        return (
            <Form
                form={form2}
                {...layout}
                name="assignment_files"
                initialValues={{
                    remember: true
                }}
                onFinish={onFinishFiles}
                onFinishFailed={onFinishFailedFiles}
            >
                <Form.Item  name="file1">
                    <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={e => beforeUpload(e, "file1")}
                    >
                        {false ? <p>Upload</p> : <UploadButton />}
                    </Upload>
                </Form.Item>
                <Form.Item  name="file2">
                    <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={e => beforeUpload(e, "file2")}
                    >
                        {false ? <p>Upload</p> : <UploadButton />}
                    </Upload>
                </Form.Item><Form.Item  name="file3">
                <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={e => beforeUpload(e, "file3")}
                >
                    {false ? <p>Upload</p> : <UploadButton />}
                </Upload>
            </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    function UploadButton() {
        return (
            <Fragment>
                {false ? (
                    <LoadingOutlined style={{ fontSize: "25px" }} />
                ) : (
                    <Fragment>
                        <UploadOutlined style={{ fontSize: "20px" }} />
                        <div className="ant-upload-text">
                            <p className="font-weight-light">Upload</p>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

AddAssignment.propTypes = {
    prop: PropTypes
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddAssignment);
