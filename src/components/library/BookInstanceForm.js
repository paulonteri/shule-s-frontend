import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { addBookInstance, getBooks } from "../../actions/library/books";
import { getBooksNum } from "../../actions/library/analytics";

const Option = Select.Option;

function BookInstanceForm(props) {
    // OnMount
    useEffect(() => {
        props.getBooks();
        props.getBooksNum();
    }, []);

    const [form] = Form.useForm();

    // State
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            id: "",
            book: ""
        }
    );

    const onChange = e => {
        setState({ [e.target.name]: e.target.value });
    };

    const onChangeAntD = (value, e) => {
        setState({ [e.props.name]: value });
    };

    const onSubmit = e => {
        const { id, book } = state;

        const bookInst = {
            id: id,
            book: book
        };

        props.addBookInstance(bookInst);

        form.resetFields();
    };

    return (
        <div className="card card-body shadow rounded mt-1 mb-1">
            <h4>Add Book Form</h4>
            <Form
                onFinish={onSubmit}
                initialValues={{
                    remember: true
                }}
                form={form}
            >
                {/* Book */}
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Please select a book!"
                        }
                    ]}
                    name="book"
                >
                    <Select
                        showSearch
                        placeholder=" Select a book"
                        onChange={onChangeAntD}
                        optionFilterProp="search"
                    >
                        {props.books.map(book_sel => (
                            <Option
                                key={book_sel.id}
                                value={book_sel.id}
                                search={book_sel.title
                                    .concat(" ")
                                    .concat(book_sel.author)}
                                name="book"
                            >
                                {book_sel.title} by {book_sel.author}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* ID */}
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Please input the book's id!"
                        }
                    ]}
                    name="id"
                >
                    <Input
                        prefix={
                            <KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        type="text"
                        placeholder=" Add book's unique identifier"
                        name="id"
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

BookInstanceForm.propTypes = {
    addBookInstance: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    books: state.booksReducer.books
});

export default connect(mapStateToProps, {
    addBookInstance,
    getBooks,
    getBooksNum
})(BookInstanceForm);
