const API_URL = Cypress.env("API_URL");

// Authentication
describe("Login", () => {
    it("Login data submission", () => {
        cy.visit("/#/login", {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
            },
        });
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

// Student Data
describe("Student", () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", API_URL + "/students/students/").as("getStudents");
        cy.route("GET", API_URL + "/academics/classes").as("getClasses");
        cy.route("GET", API_URL + "/dormitories").as("getDormitories");
    });

    it("Dashboard", () => {
        cy.visit("/#/students");
        // Analytics cards
        cy.get(":nth-child(1) > .container");
        cy.get(":nth-child(2) > .container");
        cy.get(":nth-child(3) > .container");
        cy.contains("Total students");
        cy.contains("Students per class");
        cy.contains("Students per dormitory");
        // Calender
        cy.get(".col > .container-fluid");
        cy.contains("School Events");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students");
    });

    it("Student Add", () => {
        cy.visit("/#/students/add");
        cy.get("#first_name");
        cy.get("h5");
        cy.wait("@getClasses").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Classes API call has data"
            );
        });
        cy.wait("@getDormitories").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Dormitories API call has data"
            );
        });
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/add");
    });

    it("Student Table", () => {
        cy.visit("/#/students/table");
        cy.get(".table-responsive");
        // API Calls
        cy.wait("@getStudents").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Students API call has data"
            );
        });
        cy.wait("@getClasses").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Classes API call has data"
            );
        });
        cy.wait("@getDormitories").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Dormitories API call has data"
            );
        });
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/table");
    });
});
