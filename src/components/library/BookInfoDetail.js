import React, { Component, Fragment, useEffect } from "react";
import { connect } from "react-redux"; // In order to use redux
import PropTypes from "prop-types";
import { getBooks, deleteBook } from "../../actions/library/books";
import { Descriptions } from "antd";

function BookInfoDetail(props) {
    // OnMount
    useEffect(() => {
        props.getBooks();
    }, []);

    return (
        <div className="card p-2 shadow">
            <Descriptions
                bordered
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
            >
                <Descriptions.Item label="Title" span={3}>
                    {props.books.title}
                </Descriptions.Item>
                <Descriptions.Item label="Author" span={3}>
                    {props.books.author}
                </Descriptions.Item>
                <Descriptions.Item label="Subject" span={1}>
                    {props.books.subject}
                </Descriptions.Item>
                <Descriptions.Item label="Type" span={1}>
                    {props.books.type}
                </Descriptions.Item>
                <Descriptions.Item label="ISBN" span={1}>
                    {props.books.ISBN}
                </Descriptions.Item>

                <Descriptions.Item label="Summary" span={3}>
                    {props.books.summary}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}

BookInfoDetail.propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const book_id = parseInt(ownProps.match.params.book_id);

    return {
        books: state.booksReducer.books.find(books => books.id === book_id)
    };
};

export default connect(mapStateToProps, { getBooks, deleteBook })(
    BookInfoDetail
);
