// GUIDES:
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html
// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
const API_URL = Cypress.env("API_URL");

describe("Smoke Test", () => {
    it("Smoke Test", () => {
        cy.visit("/");
    });
});

// Authentication
describe("Login", () => {
    it("Must Login to access pages", () => {
        cy.visit("/#/students", {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
            },
        });
        cy.contains("Kindly login");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/login");
    });

    it("Login works", () => {
        cy.visit("/#/login", {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
            },
        });
    });

    it("Login elements", () => {
        cy.clearLocalStorage().then(() => {
            cy.get("#email");
            cy.get("#password");
            cy.get(".ant-btn");
        });
    });

    it("Login data submission", () => {
        cy.clearLocalStorage().then(() => {
            cy.server();
            // Check form
            cy.get("#email").clear();
            cy.get("#password").clear();
            cy.get("#email").type("janedoe@gmail.com");
            cy.get("#password").type("janedoe");
            cy.route("POST", API_URL + "/auth/login").as("attemptLogin");
            cy.get(".ant-btn").click();
            // Login action
            cy.wait("@attemptLogin").then((xhr) => {
                assert.equal(xhr.status, 200);
                assert.isNotNull(
                    xhr.response.body.data,
                    "Login API call has data"
                );
                cy.url().should("eq", Cypress.config().baseUrl + "/#/");
            });
        });
    });
});
