import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import useStudentAnalyticsGeneral from "../../../hooks/useStudentAnalyticsGeneral";
import { backgroundColor, hoverBackgroundColor } from "../../../layout/colors";
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
        display: true,
        position: "bottom",
        fullWidth: false,
        reverse: true
    };

    console.log(props.studentAnalytics);
    return (
        <div>
            <Doughnut width={100} height={50} data={data} legend={legendOpts} />
        </div>
    );
};

Gender.propTypes = {
    studentAnalytics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    studentAnalytics: state.studentAnalyticsReducer.studentAnalytics
});

export default connect(mapStateToProps)(Gender);
