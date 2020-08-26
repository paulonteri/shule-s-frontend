const SERVER_URL = "http://localhost:8000";
const API_URL = SERVER_URL + "/api/v2.0";

describe("Home Page", () => {
    it("Home Page works", () => {
        cy.visit("/");
    });
});

describe("Login", () => {
    it("Login Page works", () => {
        cy.visit("/#/login");
    });
    it("Login Page elements", () => {
        cy.window().then(win => {
            win.sessionStorage.clear();
            cy.clearLocalStorage();
            cy.get("#email");
            cy.get("#password");
            cy.get(".ant-btn");
        });
    });

    it("Login data submission", () => {
        cy.window().then(win => {
            win.sessionStorage.clear();
            cy.clearLocalStorage();
            cy.server();

            cy.get("#email").clear();
            cy.get("#password").clear();
            cy.get("#email").type("janedoe@gmail.com");
            cy.get("#password").type("janedoe");
            cy.route("POST", API_URL + "/auth/login").as("attemptLogin");
            cy.get(".ant-btn").click();

            cy.wait("@attemptLogin").then(xhr => {
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

describe("Student", () => {
    beforeEach(() => {
        cy.server();
    });

    it("Student Home", () => {
        cy.visit("/#/students");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students");
    });
    it("Student Add", () => {
        cy.visit("/#/students/add");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/add");
    });
    it("Student View", () => {
        cy.visit("/#/students/table");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/table");
    });
});
