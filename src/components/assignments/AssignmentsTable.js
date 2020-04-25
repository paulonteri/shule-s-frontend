import React, { Component, Fragment } from "react";
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

export class AssignmentsTable extends Component {
    componentDidMount() {
        this.props.getAssignments();
    }

    static propTypes = {
        assignments: PropTypes.array.isRequired,
        getAssignments: PropTypes.func.isRequired,
        deleteAssignment: PropTypes.func.isRequired,
        patchAssignment: PropTypes.func.isRequired
    };

    state = {
        searchText: "",
        searchedColumn: ""
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined
                style={{ color: filtered ? "var(--light-theme)" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "var(--light-theme)",
                        padding: 0
                    }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    Content() {
        return (
            <Fragment>
                {this.props.assignments.length > 1 ? (
                    this.DetailTable()
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

    DetailTable() {
        return (
            <div className="table-responsive card card-body shadow rounded mb-1">
                <Table
                    dataSource={this.props.assignments}
                    bordered
                    title={() => "Assignments Table"}
                    size="small"
                    rowKey="id"
                    style={{ minWidth: "650px" }}
                    footer={() =>
                        `${this.props.assignments.length} Assignments Issued`
                    }
                >
                    <Column
                        title="Title"
                        dataIndex="name"
                        key="name"
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                        {...this.getColumnSearchProps("name")}
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
                        {...this.getColumnSearchProps("description")}
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
                        render={(text, record) => (
                            <span>
                                <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                        this.props.deleteAssignment(record.id)
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

    Loading = () => {
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
    };

    render() {
        return (
            <Fragment>
                {this.props.assignmentsLoading
                    ? this.Loading()
                    : this.Content()}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    assignments: state.assignmentsReducer.assignments,
    assignmentsLoading: state.assignmentsReducer.assignmentsLoading
});

export default connect(mapStateToProps, {
    getAssignments,
    deleteAssignment,
    patchAssignment
})(AssignmentsTable);
