import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Statistic from "antd/es/statistic";

import useStudentAnalyticsGeneral from "../../../hooks/useStudentAnalyticsGeneral";
export const TotalStudents = props => {
    useStudentAnalyticsGeneral();

    return (
        <div
            className="container card shadow rounded pt-4 pb-5 pl-4"
            style={{ minHeight: "100%" }}
        >
            <Statistic
                title="Total Students enrolled"
                value={props.totalStudents}
            />
        </div>
    );
};

TotalStudents.propTypes = {
    totalStudents: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    totalStudents: state.studentAnalyticsReducer.studentAnalytics.total_students
});

export default connect(mapStateToProps)(TotalStudents);
