import React, { Component, Fragment } from "react";
import StreamList from "./StreamList";
import StreamForm from "./StreamForm";
import ClassNForm from "./ClassNForm";
import ClassNList from "./ClassNList";
import ClassesList from "./ClassesList";

export class ClassesDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="container card card-body shadow rounded mt-1 mb-4">
          <div className="row">
            <div className="col-md mb-2">
              <ClassesList />
            </div>
          </div>
          <div className="row">
            <div className="col-md mb-2">
              <StreamList />
            </div>
            <div className="col-md mb-2">
              <StreamForm />
            </div>
          </div>
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

export default ClassesDashboard;
