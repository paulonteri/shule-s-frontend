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

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  onSubmit = e => {
    e.preventDefault();
    const { name, author, description } = this.state; // const name = state.name...  e.t.c
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
        <h4>Add Book Form</h4>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>
              <h6>Name</h6>
            </label>
            <input
              className="form-control"
              placeholder="Book Title"
              type="text"
              name="name"
              onChange={this.onChange} // call the onChange function
              value={name}
            />
            <small id="emailHelp" className="form-text text-muted">
              {" "}
              Enter Book Title
            </small>
          </div>

          <div className="form-group">
            <label>
              <h6>Author</h6>
            </label>
            <input
              className="form-control"
              placeholder="Book Author"
              type="author"
              name="author"
              onChange={this.onChange}
              value={author}
            />
          </div>

          <div className="form-group">
            <label>
              <h6>Description</h6>
            </label>
            <textarea
              className="form-control"
              placeholder="Short Book Description"
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
// null for mapStateToProps - we are not taking in the state
