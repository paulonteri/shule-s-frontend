import React, { Component } from "react";
import BackBtn from "../components/common/BackBtn";

export class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md ">
        <div className="mt-1">
          <BackBtn />
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <div className="container mt-2">
            <div className="row float-right">
              <div className="col">
                <h4>School Name</h4>
              </div>
              <div className="row">
                <div className="col ">
                  <h4 className="text-muted">
                    School Motto.......................
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default AppHeader;
