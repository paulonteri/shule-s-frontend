import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import useStudentAnalyticsGeneral from "../../../hooks/useStudentAnalyticsGeneral";
import { backgroundColor, hoverBackgroundColor } from "../../../layout/colors";
import Statistic from "antd/es/statistic";
export const Gender = props => {
    useStudentAnalyticsGeneral();

    const data = {
        labels: ["Female", "Male"],
        datasets: [
            {
                data: [
                    props.studentAnalytics.female,
                    props.studentAnalytics.male
                ],
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor
            }
        ]
    };

    const legendOpts = {
        display: false,
        position: "bottom",
        fullWidth: false,
        reverse: true
    };

    return (
        <div className="container card shadow rounded py-1 mx-o">
            <Doughnut width={100} height={50} data={data} legend={legendOpts} />
            <p>Total students: {props.totalStudents}</p>
        </div>
    );
};

Gender.propTypes = {
    studentAnalytics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    studentAnalytics: state.studentAnalyticsReducer.studentAnalytics,
    totalStudents: state.studentAnalyticsReducer.studentAnalytics.total_students
});

export default connect(mapStateToProps)(Gender);
