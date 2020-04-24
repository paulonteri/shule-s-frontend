import React, { Suspense, useState, Fragment } from "react";
import Spinner from "../components/common/Spinner";
import Layout from "antd/es/layout";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const MainContent = React.lazy(() => import("./MainContent"));
const SideContent = React.lazy(() => import("./SideContent"));
const AppFooter = React.lazy(() => import("./AppFooter"));

function Dashboard() {
    // State
    const [collapsed, setCollapsed] = useState(false);
    const [broken, setBroken] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const onClick = () => {
        switch (broken) {
            case true:
                setCollapsed(true);
                break;
            default:
                return {};
        }
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="md"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    switch (broken) {
                        case true:
                            setBroken(true);
                            setCollapsed(true);

                            break;
                        case false:
                            setBroken(false);
                            setCollapsed(false);
                            break;
                    }
                }}
            >
                <Suspense fallback={<Spinner />}>
                    <SideContent onClickFunc={onClick} />
                </Suspense>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        padding: 0,
                        backgroundColor: "white"
                    }}
                >
                    <div className="pt-0 pl-2">
                        {collapsed ? (
                            <MenuUnfoldOutlined
                                className="trigger"
                                onClick={toggle}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "18px"
                                }}
                            />
                        ) : (
                            <MenuFoldOutlined
                                className="trigger"
                                onClick={toggle}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "18px"
                                }}
                            />
                        )}
                    </div>
                </Header>

                <Content className="mt-lg-3 mt-md-2 mt-1 px-xl-3 px-lg-2 px-1">
                    <Suspense fallback={<Spinner />}>
                        <MainContent />
                    </Suspense>
                </Content>
                <Suspense fallback={<Spinner />}>
                    <AppFooter />
                </Suspense>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
