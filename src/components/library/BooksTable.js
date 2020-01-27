import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // In order to use redux
import PropTypes from "prop-types"; // we are gonna have some properties (prop)

import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getBooks, deleteBook } from "../../actions/library/books";

export class BooksTable extends Component {
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
        <div className="table-responsive card card-body shadow rounded mb-4">
          <h3>Book List</h3>
          <Table
            dataSource={this.props.books}
            rowKey="id"
            bordered
            // title={() => "Books"}
            footer={() => "List of Books"}
            pagination={{ pageSize: 20 }}
          >
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Title" dataIndex="name" key="name" />
            <Column title="Author" dataIndex="author" key="author" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column
              title=""
              key="action"
              render={the_parameter => (
                <span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.props.deleteBook.bind(this, the_parameter.id)}
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

export default connect(mapStateToProps, { getBooks, deleteBook })(BooksTable);

// LOOP
{
  /* <tbody>
{this.props.books.map(book => (
  <tr key={book.id}>
    <td>{book.id}</td>
    <td>{book.name}</td>
    <td>{book.email}</td>
    <td>{book.message}</td>
    <td>
      <button
        onClick={this.props.deletebook.bind(this, book.id)} className="btn btn-danger btn-sm">
        {" "}
        Delete
      </button>
    </td>
  </tr>
))}
</tbody> */
}
