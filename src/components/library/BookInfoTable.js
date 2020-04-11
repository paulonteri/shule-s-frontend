import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // In order to use redux
import PropTypes from "prop-types"; // we are gonna have some properties (prop)
import { Table } from "antd";
import { getBooks, deleteBook } from "../../actions/library/books";
import { Link } from "react-router-dom";
const { Column } = Table;

export class BookInfoTable extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        getBooks: PropTypes.func.isRequired,
        deleteBook: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getBooks();
    }

    render() {
        return (
            <Fragment>
                <div className="table-responsive card card-body shadow  mb-1">
                    <h4>Book List</h4>
                    <Table
                        dataSource={this.props.books}
                        rowKey="id"
                        bordered
                        // title={() => "Books"}
                        footer={() => "List of Books"}
                        pagination={{ pageSize: 10 }}
                    >
                        <Column
                            title="Title"
                            key="title"
                            render={parameter => (
                                <Link
                                    to={
                                        "/library/bookinfodetail/" +
                                        parameter.id
                                    }
                                >
                                    {parameter.title}
                                </Link>
                            )}
                        />
                        <Column
                            title="Author"
                            dataIndex="author"
                            key="author"
                        />
                        <Column
                            title="Summary"
                            dataIndex="summary"
                            key="summary"
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={the_parameter => (
                                <span>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={this.props.deleteBook.bind(
                                            this,
                                            the_parameter.id
                                        )}
                                    >
                                        Delete
                                    </button>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    books: state.booksReducer.books
});

export default connect(mapStateToProps, { getBooks, deleteBook })(
    BookInfoTable
);
