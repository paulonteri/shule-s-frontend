import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import useStudentAnalyticsGeneral from "../../hooks/useStudentAnalyticsGeneral";
import { backgroundColor, hoverBackgroundColor } from "../../layout/colors";

export const Test = props => {
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
    console.log(classes, totals);

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
        display: true,
        position: "bottom",
        fullWidth: false,
        reverse: true
    };

    return (
        <div>
            <Doughnut width={100} height={50} data={data} legend={legendOpts} />
        </div>
    );
};

Test.propTypes = {
    studentsPerClass: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    studentsPerClass:
        state.studentAnalyticsReducer.studentAnalytics.students_per_class
});

export default connect(mapStateToProps)(Test);
