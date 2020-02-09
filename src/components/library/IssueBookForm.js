import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input, Select } from "antd";
const Option = Select.Option;

import { addBookIssued, getBookInstance } from "../../actions/library/books";
import { getStudents } from "../../actions/students/students";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class IssueBookForm extends Component {
  static propTypes = {
    addBookIssued: PropTypes.func.isRequired,
    getStudents: PropTypes.func.isRequired,
    bookInstance: PropTypes.array.isRequired,
    students: PropTypes.array.isRequired
  };

  state = {
    student: "",
    bookInstance: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
    this.props.getStudents();
    this.props.getBookInstance();
  }

  onChangeAntD = (value, e) => {
    this.setState({ [e.props.name]: value });
    console.log(value);
    console.log(e);
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

  render() {
    const { student, bookInstance } = this.state;

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const studentError = isFieldTouched("student") && getFieldError("student");
    const bookInstanceError =
      isFieldTouched("bookInstance") && getFieldError("bookInstance");

    return (
      <div className="card card-body shadow rounded mt-1 mb-4">
        <h4>Issue Book Form</h4>
        <Form onSubmit={this.onSubmit}>
          {/* student */}
          <Form.Item
            validateStatus={studentError ? "error" : ""}
            help={studentError || ""}
            label="student"
          >
            {getFieldDecorator("student", {
              rules: [
                {
                  required: true,
                  message: "Please select the student!"
                }
              ]
            })(
              <Select
                showSearch
                placeholder="Select a student"
                onChange={this.onChangeAntD}
              >
                {this.props.students.map(student_sel => (
                  <Option
                    key={student_sel.student_id}
                    value={student_sel.student_id}
                    name="student"
                  >
                    {student_sel.student_id}: {student_sel.surname}{" "}
                    {student_sel.first_name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          {/* Book Instance */}
          <Form.Item
            validateStatus={bookInstanceError ? "error" : ""}
            help={bookInstanceError || ""}
            label="Book"
          >
            {getFieldDecorator("bookInstance", {
              rules: [
                {
                  required: true,
                  message: "Please select the book instance!"
                }
              ]
            })(
              <Select
                showSearch
                placeholder="Select a book instance"
                onChange={this.onChangeAntD}
              >
                {this.props.bookInstance.map(book_sel => (
                  <Option
                    key={book_sel.id}
                    value={book_sel.id}
                    name="bookInstance"
                  >
                    {book_sel.id}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
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
  bookInstance: state.booksReducer.bookInstances
});

IssueBookForm = Form.create({ name: "Issue book form" })(IssueBookForm);
export default connect(mapStateToProps, {
  getBookInstance,
  getStudents,
  addBookIssued
})(IssueBookForm);
