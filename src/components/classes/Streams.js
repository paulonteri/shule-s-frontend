import React, { Component, Fragment } from "react";
import StreamList from "./StreamList";
import StreamForm from "./StreamForm";

export class Streams extends Component {
    render() {
        return (
            <Fragment>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md mb-2">
                            <StreamList />
                        </div>
                        <div className="col-md mb-2">
                            <StreamForm />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Streams;
