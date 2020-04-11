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
            //General
            if (error.msg.name) alert.error(error.msg.name.join());
            if (error.msg.id) alert.error(`ID: ${error.msg.id.join()}`);
            // Detail
            if (error.msg.detail) alert.error(error.msg.detail);
            // non_field_errors
            if (error.msg.non_field_errors)
                alert.error(
                    `${error.msg.non_field_errors.join()} Status:${
                        error.status
                    } `
                );
            // Books
            if (error.msg.book) alert.error(`Book: ${error.msg.book.join()}`);
            if (error.msg.author)
                alert.error(`Author: ${error.msg.author.join()}`);
            if (error.msg.description)
                alert.error(`Description: ${error.msg.description.join()}`);
            if (error.msg.title)
                alert.error(`Title: ${error.msg.title.join()}`);
            // Users
            if (error.msg.email)
                alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.username)
                alert.error(`Username: ${error.msg.username.join()}`);
            // Students
            if (error.msg.religion)
                alert.error(`Religion: ${error.msg.religion.join()}`);
        }
        if (message !== prevProps.message) {
            // Users
            if (message.registerUser) alert.info(message.registerUser);
            if (message.loginFail) alert.error(message.loginFail);
            // Classes
            if (message.addStream) alert.success(message.addStream);
            if (message.deleteStream) alert.error(message.deleteStream);
            if (message.addClassNumeral) alert.success(message.addClassNumeral);
            if (message.deleteClassNumeral)
                alert.error(message.deleteClassNumeral);
            // Students
            if (message.deleteStudent) alert.error(message.deleteStudent);
            if (message.addStudent) alert.success(message.addStudent);
            // Books
            if (message.bookIssued) alert.success(message.bookIssued);
            if (message.deleteBookIssued) alert.error(message.deleteBookIssued);
            if (message.deleteBook) alert.error(message.deleteBook);
            if (message.addBook) alert.success(message.addBook);
            if (message.deleteBookInstance)
                alert.error(message.deleteBookInstance);
            if (message.addBookInstance) alert.success(message.addBookInstance);
            // Permission & Groups
            if (message.deletePermission) alert.error(message.deletePermission);
            if (message.addPermission) alert.success(message.addPermission);
            if (message.deletePermissionGroup)
                alert.error(message.deletePermissionGroup);
            if (message.addPermissionGroup)
                alert.success(message.addPermissionGroup);
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
