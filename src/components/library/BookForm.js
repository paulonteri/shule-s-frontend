import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input } from "antd";

import { addBook } from "../../actions/library/books";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class BookForm extends Component {
  static propTypes = {
    addBook: PropTypes.func.isRequired
  };

  state = {
    title: "",
    author: "",
    description: "",
    summary: "",
    ISBN: "",
    type: "",
    subject: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, book) => {
      if (!err) {
        const {
          title,
          author,
          description,
          summary,
          ISBN,
          type,
          subject
        } = this.state;

        const book = {
          title: title,
          author: author,
          description: description,
          summary: summary,
          ISBN: ISBN,
          type: type,
          subject: subject
        };

        this.props.addBook(book);

        this.props.form.resetFields();
      }
    });
  };

  render() {
    const {
      title,
      author,
      description,
      summary,
      ISBN,
      type,
      subject
    } = this.state;

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const titleError = isFieldTouched("title") && getFieldError("title");
    const authorError = isFieldTouched("author") && getFieldError("author");

    return (
      <div className="card card-body shadow rounded mt-1 mb-4">
        <h4>Add Book Form</h4>
        <Form onSubmit={this.onSubmit}>
          {/* Title */}
          <Form.Item
            validateStatus={titleError ? "error" : ""}
            help={titleError || ""}
            label="Title"
          >
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Please input the book's title!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="book" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Book Title"
                name="title"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* Author */}
          <Form.Item
            validateStatus={authorError ? "error" : ""}
            help={authorError || ""}
            label="Author"
          >
            {getFieldDecorator("author", {
              rules: [
                {
                  required: true,
                  message: "Please input the book's author!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Book Author"
                name="author"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* ISBN */}
          <Form.Item label="ISBN">
            {getFieldDecorator("ISBN", {
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Input
                type="text"
                placeholder="Book ISBN"
                name="ISBN"
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <div className="row">
            {/* subject */}
            <div className="col-md-6">
              <Form.Item label="Subject">
                {getFieldDecorator("subject", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Book subject"
                    name="subject"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-6">
              {/* type */}
              <Form.Item label="Type">
                {getFieldDecorator("type", {
                  rules: [
                    {
                      required: false
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder="Book type"
                    name="type"
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </div>
          </div>
          {/* Description */}
          <Form.Item label="Description">
            {getFieldDecorator("description", {
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Input
                type="text"
                placeholder="Book Description"
                name="description"
                onChange={this.onChange}
              />
            )}
          </Form.Item>

          {/* summary */}
          <Form.Item label="Summary">
            {getFieldDecorator("summary", {
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Input
                type="text"
                placeholder="Book summary"
                name="summary"
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
export default connect(null, { addBook })(BookForm);
