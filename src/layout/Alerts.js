import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.author) alert.error(`Author: ${error.msg.author.join()}`);
      if (error.msg.description)
        alert.error(`Description: ${error.msg.description.join()}`);
    }
    if (message !== prevProps.message) {
      if (message.deleteBook) alert.error(message.deleteBook);
      if (message.addBook) alert.success(message.addBook);
      if (message.addStream) alert.success(message.addStream);
      if (message.deleteStream) alert.error(message.deleteStream);
      if (message.deleteStudent) alert.error(message.deleteStudent);
    }
  }

  render() {
    return <Fragment></Fragment>;
  }
}

// get errors from the state
const mapStateToProps = state => ({
  error: state.errorsReducer,
  message: state.messagesReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
