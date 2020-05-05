import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Polar } from "react-chartjs-2";
import useStudentAnalyticsGeneral from "../../../hooks/useStudentAnalyticsGeneral";
import { backgroundColor, hoverBackgroundColor } from "../../../layout/colors";

export const NumberPerDormitory = props => {
    useStudentAnalyticsGeneral();
    const [dormitories, setDormitories] = useState(null);
    const [totals, setTotals] = useState(null);

    useEffect(() => {
        if (props.studentsPerDormitory != undefined) {
            setDormitories(
                props.studentsPerDormitory.map(
                    dm => `${dm.dormitory__dormitory_name}`
                )
            );
            setTotals(props.studentsPerDormitory.map(dm => dm.Total));
        }
    }, [props.studentsPerDormitory]);

    const data = {
        labels: dormitories,
        datasets: [
            {
                data: totals,
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
            <Polar width={100} height={50} data={data} legend={legendOpts} />
            <p>Students per dormitory</p>
        </div>
    );
};

NumberPerDormitory.propTypes = {
    studentsPerDormitory: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    studentsPerDormitory:
        state.studentAnalyticsReducer.studentAnalytics.dormitory
});

export default connect(mapStateToProps)(NumberPerDormitory);
