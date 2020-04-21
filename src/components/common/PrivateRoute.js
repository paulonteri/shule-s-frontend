import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SpinnerFull from "./SpinnerFull";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else if (isAuthenticated === false) {
                    return <Redirect to="/login" />;
                } else {
                    return (
                        <div>
                            <SpinnerFull info="Establishing a secure connection..." />
                        </div>
                    );
                }
            }}
        />
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
