import React, { Fragment, Component } from "react";

import BooksTable from "./BooksTable";
import BookForm from "./BookForm";

export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <BooksTable />
        <BookForm />
      </Fragment>
    );
  }
}
