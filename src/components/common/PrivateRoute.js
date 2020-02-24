import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isLoading) {
          return <Spinner />;
        } else if (auth.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
