import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
    getClassNumeral,
    deleteClassNumeral
} from "../../actions/classes/classNumeral";

export class ClassNList extends Component {
    static propTypes = {
        classNumerals: PropTypes.array.isRequired,
        getClassNumeral: PropTypes.func.isRequired,
        deleteClassNumeral: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getClassNumeral();
    }

    render() {
        return (
            <Fragment>
                <div className="card px-4 py-2 shadow h-100">
                    <div className="row">
                        <div className="col">
                            <h4>Class Numerals Available:</h4>
                        </div>
                    </div>
                    {this.props.classNumerals.map(classN => (
                        <div className="row my-1">
                            <div className="col">
                                <h5>
                                    <li key={classN.name}> {classN.name}</li>
                                </h5>
                            </div>
                            <div className="col ">
                                <button
                                    onClick={this.props.deleteClassNumeral.bind(
                                        this,
                                        classN.name
                                    )}
                                    className="btn btn-danger btn-sm float-right"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    classNumerals: state.classNumeralsReducer.classNumerals
});

export default connect(mapStateToProps, {
    getClassNumeral,
    deleteClassNumeral
})(ClassNList);
