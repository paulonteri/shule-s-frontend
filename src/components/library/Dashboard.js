import React, { Fragment, Component } from "react";

import BooksTable from "./BooksTable";

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
        <p>Library Dashboard</p>
        <BooksTable />
      </Fragment>
    );
  }
}
