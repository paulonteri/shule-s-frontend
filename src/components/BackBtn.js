import React from "react";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";

const BackBtn = ({ history }) => (
  <Icon
    type="arrow-left"
    style={{ fontSize: "20px" }}
    onClick={history.goBack}

  />
);

export default withRouter(BackBtn);
