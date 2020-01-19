import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // In order to use redux
import PropTypes from "prop-types"; // we are gonna have some properties (prop)

import { Table, Divider, Tag } from "antd";
const { Column } = Table;

import { getBooks } from "../../actions/library/books";

// const data = books;

//

export class BooksTable extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    return (
      <Fragment>
        <p>BooksTable</p>
        <Table dataSource={this.props.books} rowKey="id">
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Title" dataIndex="name" key="name" />
          <Column title="Author" dataIndex="author" key="author" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <span>
                <a>Edit {record.lastName}</a>
                <Divider type="vertical" />
                <a>Delete</a>
              </span>
            )}
          />
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.booksReducer.books,
  data: state.booksReducer.books
});

export default connect(mapStateToProps, { getBooks })(BooksTable);

git commit -m "Added and implemented ant.design table functonality in library(BooksTable.js)"


// LOOP

{/* <tbody>
{this.props.books.map(book => (
  <tr key={book.id}>
    <td>{book.id}</td>
    <td>{book.name}</td>
    <td>{book.email}</td>
    <td>{book.message}</td>
    <td>
      <button
        onClick={this.props.deletebook.bind(this, book.id)}
        className="btn btn-danger btn-sm"
      >
        {" "}
        Delete
      </button>
    </td>
  </tr>
))}
</tbody> */}