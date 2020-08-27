// GUIDES:
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html
// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
const SERVER_URL = "http://localhost:8000";
const API_URL = SERVER_URL + "/api/v2.0";

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

// Library Data
describe("Library", () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", API_URL + "/library/books").as("getBooks");
        cy.route("GET", API_URL + "/library/booksnum").as("getBooksNum");
        cy.route("GET", API_URL + "/academics/subject").as("getSubjects");
        cy.route("GET", API_URL + "/students/students/").as("getStudents");
        cy.route("POST", API_URL + "/library/booksissued/").as("addIssueBook");
    });

    //Library Dasboard
    it("Dashboard", () => {
        cy.visit("/#/library");
        // analytics cards
        cy.get(
            ":nth-child(1) > .ant-card > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title"
        );
        // book list table
        cy.get(".table-responsive > h4");
        // Add book form
        cy.get(".rounded > h4");
        // Add book title form
        cy.get(":nth-child(2) > h4");
        // At least one book in the table
        cy.get('[data-row-key="1"] > :nth-child(1) > a');

        // API Calls
        cy.wait("@getBooks").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(xhr.response.body.data, "Books API call has data");
        });
        cy.wait("@getBooksNum").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "BooksNum API call has data"
            );
        });
        cy.wait("@getSubjects").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "getSubjects API call has data"
            );
        });
        //
        cy.url().should("eq", Cypress.config().baseUrl + "/#/library");
    });

    it("Issue Book", () => {
        cy.visit("/#/library/issuebookform");
        // check if form
        cy.get(".ant-btn");
        cy.get(
            ":nth-child(1) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector"
        );
        cy.get(
            ":nth-child(2) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector"
        );
        cy.contains("Issue Book Form");

        // API Calls
        cy.wait("@getStudents").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Students API call has data"
            );
        });
        // Fill Form
        cy.get("#student").click();
        cy.get(
            ".ant-select-item-option-active > .ant-select-item-option-content"
        ).click();
        cy.get("#bookInstance").click();
        cy.get(
            ".ant-select-item-option-active > .ant-select-item-option-content"
        )
            .last()
            .click();
        // Submit Form Data
        cy.get(".ant-btn").click();
        cy.wait("@addIssueBook").then((xhr) => {
            assert.equal(xhr.status, 201);
        });
        //
        cy.url().should(
            "eq",
            Cypress.config().baseUrl + "/#/library/issuebookform"
        );
    });

    it("Add Book", () => {
        cy.visit("/#/library/bookinfoform");
        // check if form
        cy.contains("Add Book Title Form");
        cy.get("#title");
        cy.get("#author");
        cy.get("#summary");
        cy.get(".ant-btn");
        // API Calls
        cy.wait("@getSubjects").then((xhr) => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Subjects API call has data"
            );
        });
        //
        cy.url().should(
            "eq",
            Cypress.config().baseUrl + "/#/library/bookinfoform"
        );
    });
});
