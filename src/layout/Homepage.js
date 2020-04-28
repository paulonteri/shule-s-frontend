import React from "react";
import Genders from "../components/students/analytics/Genders";
import NumberPerClass from "../components/students/analytics/NumberPerClass";
import EventsCalender from "../components/events/EventsCalender";
import NumberPerDormitory from "../components/students/analytics/NumberPerDormitory";

function Homepage() {
    return (
        <div className=" container-fluid">
            <div className="row">
                <div className="col-sm-4 mb-2">
                    <Genders />
                </div>
                <div className="col-sm-4 mb-2">
                    <NumberPerClass />
                </div>
                <div className="col-sm-4 mb-2">
                    <NumberPerDormitory />
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
