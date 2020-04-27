import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "antd";
import { getStudents, deleteStudent } from "../../actions/students/students";
import { getClasses } from "../../actions/classes/classes";
import { getDorms } from "../../actions/dormitories/dormitories";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Column } = Table;

export class StudentTable extends Component {
    static propTypes = {
        student: PropTypes.array.isRequired,
        getStudents: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired,
        getClasses: PropTypes.func.isRequired,
        classes: PropTypes.array.isRequired,
        dorms: PropTypes.array.isRequired,
        getDorms: PropTypes.func.isRequired
    };

    state = {
        searchText: "",
        searchedColumn: ""
    };

    componentDidMount() {
        this.props.getStudents();
        this.props.getClasses();
        this.props.getDorms();
    }

    displayGender = genders => {
        if (genders === "m") {
            return <p>Male</p>;
        } else if (genders === "f") {
            return <p>Female</p>;
        }
    };

    displayClass = c => {
        const classes = this.props.classes;
        const cl = classes.filter(fc => fc.id === c);
        return cl.map(sch_class => (
            <p key={sch_class.id}>
                {sch_class.class_numeral} {sch_class.stream}
            </p>
        ));
    };

    displayDorm = dormitory => {
        const dormitories = this.props.dorms;
        const d = dormitories.filter(dm => dm.id === dormitory);
        return d.map(drm => <p key={drm.id}>{drm.dormitory_name}</p>);
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

    footerText = () => {
        if (this.state.searchText) {
            return "Search Results";
        }
        return `${this.props.student.length} Students`;
    };

    render() {
        return (
            <div className="table-responsive card card-body shadow rounded mb-1">
                <Table
                    dataSource={this.props.student}
                    rowKey="student_id"
                    bordered
                    size="small"
                    title={() => "Students"}
                    footer={() => this.footerText()}
                    style={{ minWidth: "700px" }}
                >
                    <Column
                        title="ID"
                        dataIndex="student_id"
                        key="student_id"
                        sorter={(a, b) => a.student_id - b.student_id}
                    />
                    <Column
                        title="First Name"
                        dataIndex="first_name"
                        key="first_name"
                        sorter={(a, b) =>
                            a.first_name.localeCompare(b.first_name)
                        }
                        {...this.getColumnSearchProps("first_name")}
                    />
                    <Column
                        title="Family Name"
                        dataIndex="surname"
                        key="surname"
                        sorter={(a, b) => a.surname.localeCompare(b.surname)}
                        {...this.getColumnSearchProps("surname")}
                    />
                    <Column
                        title="Class"
                        dataIndex="class_ns"
                        key="class_ns"
                        render={clas => this.displayClass(clas)}
                    />
                    <Column
                        title="Dormitory"
                        dataIndex="dormitory"
                        key="dormitory"
                        render={dorm => this.displayDorm(dorm)}
                    />
                    <Column
                        title="Gender"
                        dataIndex="gender"
                        key="gender"
                        render={gend => this.displayGender(gend)}
                    />
                    {/* ///// DELETE STUDENT ///// */}
                    {/* <Column
              title=""
              key="action"
              render={the_parameter => (
                <span>
                  <button
                    onClick={this.props.deleteStudent.bind(
                      this,
                      student.student_id
                    )}
                    className="btn btn-danger btn-sm float-right"
                  >
                    Delete
                  </button>
                </span>
              )}
            /> */}
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    student: state.studentsReducer.students,
    classes: state.classesReducer.classes,
    dorms: state.dormitoriesReducer.dormitories
});

export default connect(mapStateToProps, {
    getStudents,
    deleteStudent,
    getClasses,
    getDorms
})(StudentTable);
