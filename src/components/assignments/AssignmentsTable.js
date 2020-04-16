import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Popconfirm, Typography } from "antd";
import moment from "moment";

import {
    getAssignments,
    patchAssignment,
    deleteAssignment
} from "../../actions/assignments/assignments";

const { Column, ColumnGroup } = Table;
const { Text, Paragraph } = Typography;

export const AssignmentsTable = props => {
    // onMount
    useEffect(() => {
        props.getAssignments();
    }, []);

    return (
        <div style={{ minHeight: "100vh" }}>
            <div className="table-responsive card card-body shadow rounded mb-1">
                <Table
                    dataSource={props.assignments}
                    bordered
                    title={() => "Assignments Table"}
                    footer={() => "Assignments"}
                    size="small"
                    pagination={{ pageSize: 11 }}
                >
                    <Column title="Title" dataIndex="name" key="name" />
                    <Column
                        title="Time Added"
                        key="time_added"
                        defaultSortOrder="descend"
                        sorter={(a, b) =>
                            new Date(a.time_added) - new Date(b.time_added)
                        }
                        render={record => (
                            <span>
                                <a style={{ marginRight: 16 }}>
                                    {moment(record.time_added).calendar()}
                                </a>
                            </span>
                        )}
                    />
                    <Column
                        title="Description"
                        key="description"
                        ellipsis="true"
                        dataIndex="description"
                    />
                    <Column
                        title="Starting Time"
                        key="time_starts"
                        sorter={(a, b) =>
                            new Date(a.time_starts) - new Date(b.time_starts)
                        }
                        render={record => (
                            <span>
                                <a style={{ marginRight: 16 }}>
                                    {moment(record.time_starts).calendar()}
                                </a>
                            </span>
                        )}
                    />

                    <Column
                        title="Action"
                        key="action"
                        width={65}
                        render={(text, record) => (
                            <span>
                                <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                        props.deleteAssignment(record.id)
                                    }
                                >
                                    <a>
                                        {" "}
                                        <Text type="danger">Delete</Text>
                                    </a>
                                </Popconfirm>
                            </span>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

AssignmentsTable.propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignments: PropTypes.func.isRequired,
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
