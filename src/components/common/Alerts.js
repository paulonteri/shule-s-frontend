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
      if (error.msg.non_field_errors)
        alert.error(
          `${error.msg.non_field_errors.join()} Status:${error.status} `
        );
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.username)
        alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.name) alert.error(error.msg.name.join());
    }
    if (message !== prevProps.message) {
      if (message.deleteBook) alert.error(message.deleteBook);
      if (message.addBook) alert.success(message.addBook);
      if (message.addStream) alert.success(message.addStream);
      if (message.deleteStream) alert.error(message.deleteStream);
      if (message.addClassNumeral) alert.success(message.addClassNumeral);
      if (message.deleteClassNumeral) alert.error(message.deleteClassNumeral);
      if (message.deleteStudent) alert.error(message.deleteStudent);
      if (message.addStudent) alert.success(message.addStudent);
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
