import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getStreams, deleteStream } from "../../actions/classes/stream";

export class StreamList extends Component {
  static propTypes = {
    streams: PropTypes.array.isRequired,
    getStreams: PropTypes.func.isRequired,
    deleteStream: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    return (
      <Fragment>
        <div className="card px-4 py-2 shadow h-100">
          <div className="row">
            <div className="col">
              <h4>Streams Available:</h4>
            </div>
          </div>
          {this.props.streams.map(str => (
            <div className="row my-1">
              <div className="col">
                <h5>
                  <li key={str.name}> {str.name}</li>
                </h5>
              </div>
              <div className="col ">
                <button
                  onClick={this.props.deleteStream.bind(this, str.name)}
                  className="btn btn-danger btn-sm float-right"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streamsReducer.streams
});

export default connect(mapStateToProps, { getStreams, deleteStream })(
  StreamList
);
