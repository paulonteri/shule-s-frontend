import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudentAnalytics } from "../../actions/students/analytics/students";
import { Doughnut } from "react-chartjs-2";

export const Gender = props => {
    useEffect(() => {
        props.getStudentAnalytics();
    }, []);

    const data = {
        labels: ["Female", "Male"],
        datasets: [
            {
                data: [
                    props.studentAnalytics.female,
                    props.studentAnalytics.male
                ],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"]
            }
        ]
    };

    console.log(props.studentAnalytics);
    return (
        <div>
            {props.studentAnalytics.female}
            <Doughnut width={100} height={50} data={data} />
        </div>
    );
};

Gender.propTypes = {
    getStudentAnalytics: PropTypes.func.isRequired,
    studentAnalytics: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    studentAnalytics: state.studentAnalyticsReducer.studentAnalytics
});

export default connect(mapStateToProps, { getStudentAnalytics })(Gender);
