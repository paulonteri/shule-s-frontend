import React from "react";
import { Calendar } from "antd/es/calendar";

function EventsCalender() {
    return (
        <div className="site-calendar-demo-card">
            <Calendar
                fullscreen={false}
                //  onPanelChange={onPanelChange}
            />
        </div>
    );
}

export default EventsCalender;
