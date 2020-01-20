import React, { Fragment, Component } from "react";

import BooksTable from "./BooksTable";
import BookForm from "./BookForm";

// export default function Dashboard() {
//   return (
//     <div>
//       <Fragment>
//         <p>The fuck!</p>
//         <Library />
//       </Fragment>
//     </div>
//   );
// }

export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <h1>Library Dashboard</h1>
        <BooksTable />
        <BookForm />
      </Fragment>
    );
  }
}
