import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BackBtn from "../components/common/BackBtn";
import { logout } from "../actions/auth/auth";

export class AppHeader extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md ">
        <div className="mt-1">
          <BackBtn />
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <div className="container mt-2">
            <div className="row float-right">
              <div className="col">
                <h4>School Name</h4>
              </div>
              <div className="row">
                <div className="col ">
                  <h4 className="text-muted">
                    School Motto.......................
                  </h4>
                </div>
              </div>
              <div className="row">
                <button className="btn btn-light " onClick={this.props.logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, { logout })(AppHeader);
