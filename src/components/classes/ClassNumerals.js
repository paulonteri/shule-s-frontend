import React, { Component, Fragment } from "react";
import ClassNList from "./ClassNList";
import ClassNForm from "./ClassNForm";

export class ClassNumerals extends Component {
  render() {
    return (
      <Fragment>
        <div className="container card card-body shadow rounded mt-1 mb-1">
          <div className="row">
            <div className="col-md mb-2">
              <ClassNList />
            </div>
            <div className="col-md mb-2">
              <ClassNForm />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ClassNumerals;
