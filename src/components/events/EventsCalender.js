import React from "react";
import Calendar from "antd/es/calendar";
import Typography from "antd/es/typography";

function EventsCalender() {
    return (
        <div className="container-fluid card shadow rounded">
            <Typography.Title level={3} className="mt-2 ml-2">
                School Events
            </Typography.Title>
            <Calendar
                fullscreen={false}
                //  onPanelChange={onPanelChange}
            />
        </div>
    );
}

export default EventsCalender;
