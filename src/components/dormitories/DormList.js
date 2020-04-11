import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getDorms } from "../../actions/dormitories/dormitories";

export class DormList extends Component {
    static propTypes = {
        dorms: PropTypes.array.isRequired,
        getDorms: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getDorms();
    }

    render() {
        return (
            <Fragment>
                <div className="card px-4 py-2 shadow h-100">
                    {this.props.dorms.map(dorm => (
                        <li key={dorm.id}>{dorm.dormitory_name}</li>
                    ))}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    dorms: state.dormitoriesReducer.dormitories
});

export default connect(mapStateToProps, { getDorms })(DormList);
