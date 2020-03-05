import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { IdcardOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

export class AppSider extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
      >
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <div className="mt-3 mb-3"></div>
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
              {" "}
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/students/table">Student List</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/students/add">Add Student</Link>
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
              <Link to="/library">Library</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/library/issuebookform">Issue Book</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/library/bookinfoform">Add Book</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/library/bookinstanceform">Add Book Instance</Link>
            </Menu.Item>
            <Menu.Item key="233">
              <Link to="/library/bookinfotable">Book Table</Link>
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
              {" "}
              <Link to="/classes">Classes</Link>
            </Menu.Item>
            <Menu.Item key="10">
              {" "}
              <Link to="/classes/streams">Streams</Link>
            </Menu.Item>
            <Menu.Item key="11">
              {" "}
              <Link to="/classes/classnumerals">Class Numerals</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default AppSider;
