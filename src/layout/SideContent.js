import React, { Fragment } from "react";
import { connect } from "react-redux";
import Menu from "antd/es/menu";
import Link from "react-router-dom/es/Link";
import {
    IdcardOutlined,
    ReadOutlined,
    TeamOutlined,
    FileProtectOutlined,
    FormOutlined
} from "@ant-design/icons";
const { SubMenu } = Menu;

export const SideContent = props => {
    return (
        <Fragment>
            <div className="logo mt-2 ml-3 pl-1 pt-2 ">
                <Link onClick={props.onClickFunc} to="/">
                    <h3 style={{ color: "grey" }}>School</h3>
                </Link>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={["1"]}
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <IdcardOutlined />
                            <span> Students </span>
                        </span>
                    }
                >
                    <Menu.Item key="1">
                        <Link onClick={props.onClickFunc} to="/students">
                            Students
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link onClick={props.onClickFunc} to="/students/table">
                            Student List
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link onClick={props.onClickFunc} to="/students/add">
                            Add Student
                        </Link>
                    </Menu.Item>
                </SubMenu>

                {/* Library SubMenu */}
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <ReadOutlined />
                            <span> Library </span>
                        </span>
                    }
                >
                    <Menu.Item key="5">
                        <Link onClick={props.onClickFunc} to="/library">
                            Library
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link
                            onClick={props.onClickFunc}
                            to="/library/issuebookform"
                        >
                            Issue Book
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link
                            onClick={props.onClickFunc}
                            to="/library/bookinfoform"
                        >
                            Add Book
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link
                            onClick={props.onClickFunc}
                            to="/library/bookinstanceform"
                        >
                            Add Book Instance
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="233">
                        <Link
                            onClick={props.onClickFunc}
                            to="/library/bookinfotable"
                        >
                            Book Table
                        </Link>
                    </Menu.Item>
                </SubMenu>

                {/* classes SubMenu */}
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <TeamOutlined />
                            <span> Classes </span>
                        </span>
                    }
                >
                    <Menu.Item key="9">
                        <Link onClick={props.onClickFunc} to="/classes">
                            Classes
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Link onClick={props.onClickFunc} to="/classes/streams">
                            Streams
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Link
                            onClick={props.onClickFunc}
                            to="/classes/classnumerals"
                        >
                            Class Numerals
                        </Link>
                    </Menu.Item>
                </SubMenu>
                {/* examinations SubMenu */}
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <FileProtectOutlined />
                            <span> Examinations </span>
                        </span>
                    }
                >
                    <Menu.Item key="12">
                        <Link
                            onClick={props.onClickFunc}
                            to="/examinations/results/add/student"
                        >
                            Add Student Results
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="13">
                        <Link
                            onClick={props.onClickFunc}
                            to="/examinations/results/add/class"
                        >
                            Add Class Results
                        </Link>
                    </Menu.Item>
                </SubMenu>
                {/* assignments SubMenu */}
                <SubMenu
                    key="sub5"
                    title={
                        <span>
                            <FormOutlined />
                            <span> Assignments </span>
                        </span>
                    }
                >
                    <Menu.Item key="51">
                        <Link onClick={props.onClickFunc} to="/assignments/add">
                            Issue Assignment
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="52">
                        <Link onClick={props.onClickFunc} to="/assignments/all">
                            All Assignments
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Fragment>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideContent);
