import React, { Fragment, Component, Suspense } from "react";
import Spinner from "../common/Spinner";

const BookInstanceForm = React.lazy(() => import("./BookInstanceForm"));
const BookInfoTable = React.lazy(() => import("./BookInfoTable"));
const BookInfoForm = React.lazy(() => import("./BookInfoForm"));

export class LibraryDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col">
            <Suspense fallback={<Spinner />}>
              <BookInfoTable />
            </Suspense>
          </div>

          <div className="col">
            <Suspense fallback={<Spinner />}>
              <BookInstanceForm />
            </Suspense>
            <Suspense fallback={<Spinner />}>
              <BookInfoForm />
            </Suspense>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LibraryDashboard;
