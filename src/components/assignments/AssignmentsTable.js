import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getAssignments,
    patchAssignment,
    deleteAssignment
} from "../../actions/assignments/assignments";

export const AssignmentsTable = props => {
    // onMount
    useEffect(() => {
        props.getAssignments();
    }, []);

    return (
        <div>
            <p>Assignments Table</p>
        </div>
    );
};

AssignmentsTable.propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignment: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
    patchAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    assignments: state.assignmentsReducer.assignments
});

export default connect(mapStateToProps, {
    getAssignments,
    deleteAssignment,
    patchAssignment
})(AssignmentsTable);
