import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import StudentsList from "./StudentsList";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        <StudentsList />
        <div className="container">
          <div className="row">
            <div className="mx-2">
              <Link to="/library">
                <button className="btn btn-primary">Library</button>
              </Link>
            </div>
            <div className="mx-2">
              <Link to="/classes">
                <button className="btn btn-primary">Classes</button>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Students;
