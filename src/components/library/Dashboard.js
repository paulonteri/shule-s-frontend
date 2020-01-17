import React, { Fragment } from "react";

import BooksList from "./BooksList";
import { AddBookForm } from "./AddBookForm";

export default function Dashboard() {
  return (
    <Fragment>
      <BooksList />
      <AddBookForm />
    </Fragment>
  );
}
