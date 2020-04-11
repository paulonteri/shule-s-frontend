import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getClasses } from "../../actions/classes/classes";

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
            <Fragment>
                <div>
                    {this.props.classes.map(my_class => (
                        <li key={my_class.id}>
                            {my_class.class_numeral} {my_class.stream}
                        </li>
                    ))}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    classes: state.classesReducer.classes
});

export default connect(mapStateToProps, { getClasses })(ClassesList);
