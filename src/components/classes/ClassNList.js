import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getClassNumeral } from "../../actions/classes/classNumeral";

import List from "antd/es/list";

export class ClassNList extends Component {
    static propTypes = {
        classNumerals: PropTypes.array.isRequired,
        getClassNumeral: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getClassNumeral();
    }

    render() {
        return (
            <div
                style={{ height: "100%", maxHeight: "33vh" }}
                className="table-responsive card card-body shadow rounded mb-1"
            >
                <List
                    size="small"
                    header={<div>Class Numerals</div>}
                    dataSource={this.props.classNumerals}
                    renderItem={classN => (
                        <List.Item key={classN.name}>{classN.name}</List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classNumerals: state.classNumeralsReducer.classNumerals
});

export default connect(mapStateToProps, {
    getClassNumeral
})(ClassNList);
