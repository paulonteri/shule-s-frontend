const API_URL = Cypress.env("API_URL");

// Authentication
describe("Login", () => {
    it("Login data submission", () => {
        cy.clearLocalStorage().then(() => {
            cy.server();
            cy.visit("/#/login", {
                onBeforeLoad: (win) => {
                    win.sessionStorage.clear();
                },
            });
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
        });

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
