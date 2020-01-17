import React, { Component } from "react";
import { PageHeader } from "antd";

export class Header extends Component {
  render() {
    return (
      <div>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          onBack={() => null}
          title="Library Title"
          subTitle="This is the library subtitle"
        />
      </div>
    );
  }
}

export default Header;
