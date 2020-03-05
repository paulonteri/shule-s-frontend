import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";

import { addBook } from "../../actions/library/books";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class BookInfoForm extends Component {
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

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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
    return (
      <div className="card card-body shadow rounded mt-1 mb-1">
        <h4>Add Book Form</h4>
        <Form
          onFinish={this.onSubmit}
          initialValues={{
            remember: true
          }}
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
              prefix={<BookOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder=" Book Title"
              name="title"
              onChange={this.onChange}
            />
          </Form.Item>

          {/* Author */}
          <Form.Item
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the book's Author!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="text"
              placeholder=" Book Author"
              name="author"
              onChange={this.onChange}
            />
          </Form.Item>

          {/* ISBN */}
          <Form.Item
            label="ISBN"
            label="Title"
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
              onChange={this.onChange}
            />
          </Form.Item>
          <div className="row">
            {/* subject */}
            <div className="col-md-6">
              <Form.Item
                label="Subject"
                rules={[
                  {
                    required: false
                  }
                ]}
              >
                <Input
                  type="text"
                  placeholder="Book subject"
                  name="subject"
                  onChange={this.onChange}
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              {/* type */}
              <Form.Item
                label="Type"
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
                  onChange={this.onChange}
                />
              </Form.Item>
            </div>
          </div>
          {/* Description */}
          <Form.Item
            label="Description"
            rules={[
              {
                required: false
              }
            ]}
          >
            <Input
              type="text"
              placeholder="Book Description"
              name="description"
              onChange={this.onChange}
            />
          </Form.Item>

          {/* summary */}
          <Form.Item
            label="Summary"
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
              onChange={this.onChange}
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
}

export default connect(null, { addBook })(BookInfoForm);
