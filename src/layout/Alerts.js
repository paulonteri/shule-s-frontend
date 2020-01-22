import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.author) alert.error(`Author: ${error.msg.author.join()}`);
      if (error.msg.description)
        alert.error(`Description: ${error.msg.description.join()}`);
    }
  }

  render() {
    return <Fragment></Fragment>;
  }
}

// get errors from the state
const mapStateToProps = state => ({
  error: state.errorsReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
