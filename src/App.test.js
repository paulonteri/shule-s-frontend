import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";

it("<App /> shallow renders without crashing", () => {
    shallow(<App />);
});

it("<App /> renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});

it("<App /> loading screen", () => {
    const { getByText } = render(<App />);
    expect(
        getByText("Establishing a secure connection...")
    ).toBeInTheDocument();
});
