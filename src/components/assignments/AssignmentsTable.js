import React, { useEffect, useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Table,
    Popconfirm,
    Typography,
    Input,
    Button,
    Skeleton,
    Empty
} from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
    getAssignments,
    patchAssignment,
    deleteAssignment
} from "../../actions/assignments/assignments";
const { Column } = Table;
const { Text } = Typography;

export const AssignmentsTable = props => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    // onMount
    useEffect(() => {
        props.getAssignments();
    }, []);

    let searchInput;

    return (
        <Fragment>
            {props.assignmentsLoading ? <Loading /> : <Content />}
        </Fragment>
    );

    function Content() {
        return (
            <Fragment>
                {props.assignments.length > 1 ? (
                    <DetailTable />
                ) : (
                    <div
                        className="card mt-3 pt-5 px-sm-5 shadow container-fluid"
                        style={{ minHeight: "65vh" }}
                    >
                        <Empty
                            description={<span>Add assignments first</span>}
                        />
                    </div>
                )}
            </Fragment>
        );
    }

    function DetailTable() {
        return (
            <div className="table-responsive card card-body shadow rounded mb-1">
                <Table
                    dataSource={props.assignments}
                    bordered
                    title={() => "Assignments Table"}
                    size="small"
                    pagination={{ pageSize: 9 }}
                    scroll={{ x: 900 }}
                >
                    <Column
                        title="Title"
                        dataIndex="name"
                        key="name"
                        fixed="left"
                        width={150}
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                        {...searchFunction("name")}
                    />
                    <Column
                        title="Time Added"
                        key="time_added"
                        ellipsis="true"
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
                        {...searchFunction("description")}
                    />
                    <Column
                        title="Starting Time"
                        key="time_starts"
                        ellipsis="true"
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
                                        <Text type="danger">Delete</Text>
                                    </a>
                                </Popconfirm>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }

    function Loading() {
        return (
            <div
                className="card mt-3 px-sm-5 shadow container-fluid"
                style={{ minHeight: "65vh" }}
            >
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </div>
        );
    }

    function searchFunction(dataIndex) {
        const getColumnSearchProps = dataIndex => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: "block"
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: filtered => (
                <SearchOutlined
                    style={{ color: filtered ? "#1890ff" : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.select());
                }
            },
            render: text =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: "#ffc069",
                            padding: 0
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                )
        });

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = clearFilters => {
            clearFilters();
            setSearchText("");
        };

        return getColumnSearchProps(dataIndex);
    }
};

AssignmentsTable.propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignments: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
    patchAssignment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    assignments: state.assignmentsReducer.assignments,
    assignmentsLoading: state.assignmentsReducer.assignmentsLoading
});

export default connect(mapStateToProps, {
    getAssignments,
    deleteAssignment,
    patchAssignment
})(AssignmentsTable);
