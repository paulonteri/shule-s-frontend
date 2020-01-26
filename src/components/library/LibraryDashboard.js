import React, { Fragment, Component } from "react";

import BooksTable from "./BooksTable";
import BookForm from "./BookForm";

export class LibraryDashboard extends Component {
  render() {
    return (
      <Fragment>
        <BooksTable />
        <BookForm />
      </Fragment>
    );
  }
}

export default LibraryDashboard;
