import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // In order to use redux
import PropTypes from "prop-types"; // we are gonna have some properties (prop)

import { getBooks } from "../../actions/library/books";

export class library extends Component {
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
        <h2>Leads List</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  books: state.booksReducer.books
});

export default connect(mapStateToProps, { getBooks })(library);
