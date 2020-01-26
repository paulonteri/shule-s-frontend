import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBook } from "../../actions/library/books";

export class BookForm extends Component {
  state = {
    name: "",
    author: "",
    description: ""
  };

  static propTypes = {
    addBook: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, author, description } = this.state;
    const book = {
      // the values in the state to the book const
      name: name,
      author: author,
      description: description
    };
    this.props.addBook(book); // pass the book const to the addBook action
    this.setState({
      name: "",
      author: "",
      description: ""
    });
  };

  render() {
    const { name, author, description } = this.state;
    return (
      <div className="card card-body shadow rounded mt-1 mb-4">
        <h2>Add Book Form</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange} // call the onChange function
              value={name}
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              className="form-control"
              type="author"
              name="author"
              onChange={this.onChange}
              value={author}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addBook })(BookForm);
