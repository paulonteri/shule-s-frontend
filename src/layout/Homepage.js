import React from "react";
import Genders from "../components/students/analytics/Genders";
import NumberPerClass from "../components/students/analytics/NumberPerClass";
import EventsCalender from "../components/events/EventsCalender";
import TotalStudents from "../components/students/analytics/TotalStudents";

function Homepage() {
    return (
        <div className=" container">
            <div className="d-flex mb-2 row">
                <div
                    className="col"
                    style={{ flexGrow: 0.7, alignItems: "stretch" }}
                >
                    <TotalStudents />
                </div>
                <div className="col">
                    <Genders />
                </div>

                <div className="col">
                    <NumberPerClass />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <EventsCalender />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
