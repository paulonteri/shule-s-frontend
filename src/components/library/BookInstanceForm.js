import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Icon, Input, Select } from "antd";
import { addBookInstance, getBooks } from "../../actions/library/books";

const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class BookInstanceForm extends Component {
  static propTypes = {
    addBookInstance: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  };

  state = {
    id: "",
    book: ""
  };

  componentDidMount() {
    this.props.form.validateFields();
    this.props.getBooks();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  onChangeAntD = (value, e) => {
    this.setState({ [e.props.name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, bookInst) => {
      if (!err) {
        const { id, book } = this.state;

        const bookInst = {
          id: id,
          book: book
        };

        this.props.addBookInstance(bookInst);

        this.props.form.resetFields();
      }
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
      <div className="card card-body shadow rounded mt-1 mb-1">
        <h4>Add Book Form</h4>
        <Form onSubmit={this.onSubmit}>
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
              <Select
                showSearch
                placeholder=" Select a book"
                onChange={this.onChangeAntD}
              >
                {this.props.books.map(book_sel => (
                  <Option key={book_sel.id} value={book_sel.id} name="book">
                    {book_sel.title} by {book_sel.author}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

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
                  <Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="text"
                placeholder=" Add book's unique identifier"
                name="id"
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

const mapStateToProps = state => ({
  books: state.booksReducer.books
});

BookInstanceForm = Form.create({ name: "book form" })(BookInstanceForm);
export default connect(mapStateToProps, { addBookInstance, getBooks })(
  BookInstanceForm
);
