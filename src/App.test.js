import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
/// <reference types="cypress" />
import "cypress-react-selector";
import { mount } from "cypress-react-unit-test";

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

it("renders without crashing", () => {
    cy.stub(window, "fetch")
        .withArgs("http://myapi.com/products")
        .resolves({
            json: cy.stub().resolves({
                products: [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" }
                ]
            })
        });
    // mount the react component
    mount(<ProductsList />);
    cy.contains("First item").should("be.visible");
    cy.get(".product").should("have.length", 2);

    // use cypress-react-selector
    cy.waitForReact(1000, "#cypress-root");
    cy.react("ProductsContainer").should("have.class", "product-container");
    cy.react("AProduct").should("have.length", 2);
    cy.react("AProduct", { name: "Second item" })
        .should("be.visible")
        .and("have.text", "Second item");
    cy.getReact("AProduct", { name: "Second item" })
        .getProps()
        .should("have.property", "name");
    cy.getReact("AProduct", { name: "First item" })
        .getProps("name")
        .should("eq", "First item");
    cy.getReact("AProduct", { name: "Second item" })
        .getCurrentState()
        .should("not.empty");
});
