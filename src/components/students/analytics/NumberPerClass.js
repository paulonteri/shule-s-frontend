import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Polar } from "react-chartjs-2";
import useStudentAnalyticsGeneral from "../../../hooks/useStudentAnalyticsGeneral";
import { backgroundColor, hoverBackgroundColor } from "../../../layout/colors";

export const NumberPerClass = props => {
    useStudentAnalyticsGeneral();
    const [classes, setClasses] = useState(null);
    const [totals, setTotals] = useState(null);

    useEffect(() => {
        if (props.studentsPerClass != undefined) {
            setClasses(
                props.studentsPerClass.map(
                    cl => `${cl.class_ns__class_numeral} ${cl.class_ns__stream}`
                )
            );
            setTotals(props.studentsPerClass.map(cl => cl.Total));
        }
    }, [props.studentsPerClass]);

    const data = {
        labels: classes,
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
            <p>Students per class</p>
        </div>
    );
};

NumberPerClass.propTypes = {
    studentsPerClass: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    studentsPerClass:
        state.studentAnalyticsReducer.studentAnalytics.students_per_class
});

export default connect(mapStateToProps)(NumberPerClass);
