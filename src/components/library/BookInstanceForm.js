import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input } from "antd";

import { addBookInstance } from "../../actions/library/books";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class BookForm extends Component {
  static propTypes = {
    addBookInstance: PropTypes.func.isRequired
  };

  state = {
    id: "",
    book: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  onSubmit = e => {
    e.preventDefault();

    const { id, book } = this.state;

    const bookInst = {
      id: id,
      book: book
    };

    this.props.addBookInstance(bookInst);

    this.setState({
      id: "",
      book: ""
    });
  };

  render() {
    const { id, book } = this.state;

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const idError = isFieldTouched("id") && getFieldError("id");
    const bookError = isFieldTouched("book") && getFieldError("book");

    return (
      <div className="card card-body shadow rounded mt-1 mb-4">
        <h4>Add Book Form</h4>
        <Form onSubmit={this.onSubmit}>
          {/* ID */}
          <Form.Item
            validateStatus={idError ? "error" : ""}
            help={idError || ""}
            label="ID"
          >
            {getFieldDecorator("id", {
              rules: [
                {
                  required: true,
                  message: "Please input the book's id!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="book" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Book ID"
                name="id"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* Book */}
          <Form.Item
            validateStatus={bookError ? "error" : ""}
            help={bookError || ""}
            label="Book"
          >
            {getFieldDecorator("book", {
              rules: [
                {
                  required: true,
                  message: "Please select the book!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Book"
                name="book"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Add Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

BookForm = Form.create({ name: "book form" })(BookForm);
export default connect(null, { addBookInstance })(BookForm);
