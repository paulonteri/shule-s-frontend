import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getClasses } from "../../actions/classes/classes";

export class classesList extends Component {
  static propTypes = {
    getClasses: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getClasses();
  }

  render() {
    return (
      <Fragment>
        {this.props.getClasses.map(my_class => (
          <li key={my_class.id}>
            {my_class.class_numeral} {my_class.stream}
          </li>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  classes: state.classesReducer.classes
});

export default connect(mapStateToProps, { getClasses })(classesList);
