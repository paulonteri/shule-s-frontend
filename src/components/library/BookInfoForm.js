import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { addBook } from "../../actions/library/books";
import { getSubjects } from "../../actions/subjects/subjects";
const { Option } = Select;

function BookInfoForm(props) {
    // OnMount
    useEffect(() => {
        props.getSubjects();
    }, []);

    const [form] = Form.useForm();

    // State
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            title: "",
            author: "",
            summary: "",
            ISBN: "",
            type: "",
            subject: ""
        }
    );

    const onChange = e => setState({ [e.target.name]: e.target.value });

    const onChangeAntD = (value, e) => {
        setState({ [e.props.name]: value });
    };

    const onSubmit = e => {
        const { title, author, summary, ISBN, type, subject } = state;

        const book = {
            title: title,
            author: author,
            summary: summary,
            ISBN: ISBN,
            type: type,
            subject: subject
        };

        props.addBook(book);

        form.resetFields();
    };

    return (
        <div className="card card-body shadow  mt-1 mb-1">
            <h4>Add Book Title Form</h4>
            <Form
                onFinish={onSubmit}
                initialValues={{
                    remember: true
                }}
                form={form}
                layout="vertical"
            >
                {/* Title */}
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please input the book's title!"
                        }
                    ]}
                >
                    <Input
                        prefix={
                            <BookOutlined
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        type="text"
                        placeholder=" Book Title"
                        name="title"
                        onChange={onChange}
                    />
                </Form.Item>

                {/* Author */}
                <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: "Please input the book's Author!"
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
                        placeholder=" Book Author"
                        name="author"
                        onChange={onChange}
                    />
                </Form.Item>

                {/* ISBN */}
                <Form.Item
                    label="ISBN"
                    name="ISBN"
                    rules={[
                        {
                            required: false
                        }
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Book ISBN"
                        name="ISBN"
                        onChange={onChange}
                    />
                </Form.Item>

                <div className="row">
                    {/* subject */}
                    <div className="col-md-6">
                        <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[
                                {
                                    required: false
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Book subject"
                                optionFilterProp="value"
                                onChange={onChangeAntD}
                            >
                                {props.subjects.map(subject => (
                                    <Option
                                        name="subject"
                                        value={subject.id}
                                        key={subject.id}
                                    >
                                        {" "}
                                        {subject.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="col-md-6">
                        {/* type */}
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: false
                                }
                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Book type"
                                name="type"
                                onChange={onChange}
                            />
                        </Form.Item>
                    </div>
                </div>

                {/* summary */}
                <Form.Item
                    label="Summary"
                    name="summary"
                    rules={[
                        {
                            required: false
                        }
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Book summary"
                        name="summary"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Book
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

BookInfoForm.propTypes = {
    addBook: PropTypes.func.isRequired,
    getSubjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    subjects: state.subjectsReducer.subjects
});

export default connect(mapStateToProps, { addBook, getSubjects })(BookInfoForm);
