import React, { Fragment, Component } from "react";

import BookInfoTable from "./BookInfoTable";
import BookInfoForm from "./BookInfoForm";

export class LibraryDashboard extends Component {
  render() {
    return (
      <Fragment>
        <BookInfoTable />
        <BookInfoForm />
      </Fragment>
    );
  }
}

export default LibraryDashboard;
