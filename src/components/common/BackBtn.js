import React from "react";
import { withRouter } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackBtn = ({ history }) => (
    <ArrowLeftOutlined style={{ fontSize: "20px" }} onClick={history.goBack} />
);

export default withRouter(BackBtn);
