import React, { Suspense } from "react";
import Spinner from "../common/Spinner";
const StreamList = React.lazy(() => import("./StreamList"));
const StreamForm = React.lazy(() => import("./StreamForm"));
const ClassNList = React.lazy(() => import("./ClassNList"));
const ClassNForm = React.lazy(() => import("./ClassNForm"));
const AddClassesForm = React.lazy(() => import("./AddClassesForm"));
const ClassesList = React.lazy(() => import("./ClassesList"));

const ClassesDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <ClassesList />
                    </Suspense>
                </div>
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <AddClassesForm />
                    </Suspense>
                </div>
            </div>
            <div className="row">
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <StreamList />
                    </Suspense>
                </div>
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <StreamForm />
                    </Suspense>
                </div>
            </div>
            <div className="row">
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <ClassNList />
                    </Suspense>
                </div>
                <div className="col-md mb-2">
                    <Suspense fallback={<Spinner />}>
                        <ClassNForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default ClassesDashboard;
