import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getClasses } from "../../actions/classes/classes";

import List from "antd/es/list";

export class ClassesList extends Component {
    static propTypes = {
        getClasses: PropTypes.func.isRequired,
        classes: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getClasses();
    }

    render() {
        return (
            <div
                style={{ height: "100%", maxHeight: "39vh" }}
                className="table-responsive card card-body shadow rounded mb-1"
            >
                <List
                    size="small"
                    header={<div>Classes</div>}
                    dataSource={this.props.classes}
                    renderItem={my_class => (
                        <List.Item key={my_class.id}>
                            {my_class.class_numeral} {my_class.stream}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classes: state.classesReducer.classes
});

export default connect(mapStateToProps, { getClasses })(ClassesList);
