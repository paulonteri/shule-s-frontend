import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStream } from "../../actions/classes/stream";

export class StreamForm extends Component {
  state = { name: "" };

  static propTypes = {
    addStream: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const stream = { name };
    this.props.addStream(stream);
    this.setState({ name: "" });
  };

  render() {
    const { name } = this.state; // pull out of the state
    return (
      <div className="card px-4 py-2 shadow rounded h-100">
        <h3>Add Streams</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Stream</label>

            <input
              className="form-control"
              placeholder="Enter stream"
              type="text"
              name="name"
              onChange={this.onChange} // call the onChange function & update the state
              value={name}
            />
            <small id="emailHelp" className="form-text text-muted">
              {" "}
              Enter Stream. Eg: East, Blue, e.t.c
            </small>
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

export default connect(null, { addStream })(StreamForm);
// null for mapStateToProps - we are not taking in the state