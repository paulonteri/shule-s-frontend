import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Select } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import {
    addBookIssued,
    getBookInstance,
    getBooks
} from "../../actions/library/books";
import { getStudents } from "../../actions/students/students";
const Option = Select.Option;

function IssueBookForm(props) {
    // State
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            student: "",
            bookInstance: ""
        }
    );

    // OnMount
    useEffect(() => {
        props.getStudents();
        props.getBookInstance();
        props.getBooks();
    }, []);

    const [form] = Form.useForm();

    const onChangeAntD = (value, e) => {
        setState({ [e.props.name]: value });
    };

    const onSubmit = e => {
        const { student, bookInstance } = state;

        const bookIssued = {
            student: student,
            book: bookInstance
        };

        props.addBookIssued(bookIssued);
        form.resetFields();
    };

    const displayBookTitle = (bookInstID, bookInstBook) => {
        const books = props.books;
        const b = books.filter(books => books.id === bookInstBook);

        return b.map(b => (
            <Option
                key={bookInstID}
                value={bookInstID}
                name="bookInstance"
                id={b.title}
            >
                {" "}
                {/* {b.map(b => b.title)}  */}
                {bookInstID}: {b.title} by {b.author}
            </Option>
        ));
    };

    return (
        <div className="card card-body shadow rounded mt-1 mb-1">
            <h4>Issue Book Form</h4>
            <Form
                onFinish={onSubmit}
                initialValues={{
                    remember: true
                }}
                form={form}
            >
                {/* student */}
                <Form.Item
                    name="student"
                    rules={[
                        {
                            required: true,
                            message: "Please select the student!"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder=" Select a student"
                        onChange={onChangeAntD}
                        prefix={
                            <UserOutlined
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                        optionFilterProp="search"
                    >
                        {props.students.map(student_sel => (
                            <Option
                                key={student_sel.student_id}
                                value={student_sel.student_id}
                                name="student"
                                search={`${student_sel.student_id} ${student_sel.surname} ${student_sel.first_name}`}
                            >
                                {student_sel.student_id}: {student_sel.surname}{" "}
                                {student_sel.first_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Book Instance */}
                <Form.Item
                    name="bookInstance"
                    rules={[
                        {
                            required: true,
                            message: "Please select a book!"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a book using its ID"
                        onChange={onChangeAntD}
                        optionFilterProp="value"
                        prefix={
                            <BookOutlined
                                style={{ color: "rgba(0,0,0,.25)" }}
                            />
                        }
                    >
                        {props.bookInstance.map(bookInst =>
                            displayBookTitle(bookInst.id, bookInst.book)
                        )}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Issue Book
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

IssueBookForm.propTypes = {
    addBookIssued: PropTypes.func.isRequired,
    bookInstance: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    students: state.studentsReducer.students,
    bookInstance: state.booksReducer.bookInstances,
    books: state.booksReducer.books
});

export default connect(mapStateToProps, {
    getBookInstance,
    getStudents,
    addBookIssued,
    getBooks
})(IssueBookForm);
