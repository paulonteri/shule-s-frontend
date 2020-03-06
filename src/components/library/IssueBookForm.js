import React, { Component } from "react";
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

export class IssueBookForm extends Component {
  static propTypes = {
    addBookIssued: PropTypes.func.isRequired,
    bookInstance: PropTypes.array.isRequired,
    getStudents: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  };

  state = {
    student: "",
    bookInstance: ""
  };

  componentDidMount() {
    this.props.getStudents();
    this.props.getBookInstance();
    this.props.getBooks();
  }

  onChangeAntD = (value, e) => {
    this.setState({ [e.props.name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, bookIssued) => {
      if (!err) {
        const { student, bookInstance } = this.state;

        const bookIssued = {
          student: student,
          book: bookInstance
        };

        this.props.addBookIssued(bookIssued);
        this.props.form.resetFields();
      }
    });
  };

  displayBookTitle = (bookInstID, bookInstBook) => {
    const books = this.props.books;
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

  render() {
    return (
      <div className="card card-body shadow rounded mt-1 mb-1">
        <h4>Issue Book Form</h4>
        <Form onFinish={this.onSubmit}>
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
              onChange={this.onChangeAntD}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              optionFilterProp="search"
            >
              {this.props.students.map(student_sel => (
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
              onChange={this.onChangeAntD}
              optionFilterProp="value"
              prefix={<BookOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            >
              {this.props.bookInstance.map(bookInst =>
                this.displayBookTitle(bookInst.id, bookInst.book)
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
}

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
