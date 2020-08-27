const SERVER_URL = "http://localhost:8000";
const API_URL = SERVER_URL + "/api/v2.0";

describe("Smoke Test", () => {
    it("Smoke Test", () => {
        cy.visit("/");
    });
});

describe("Login", () => {
    it("Must Login to access pages", () => {
        cy.visit("/#/students", {
            onBeforeLoad: win => {
                win.sessionStorage.clear();
            }
        });
        cy.contains("Kindly login");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/login");
    });

    it("Login Page works", () => {
        cy.visit("/#/login", {
            onBeforeLoad: win => {
                win.sessionStorage.clear();
            }
        });
    });

    it("Login Page elements", () => {
        cy.clearLocalStorage().then(() => {
            cy.get("#email");
            cy.get("#password");
            cy.get(".ant-btn");
        });
    });

    it("Login data submission", () => {
        cy.clearLocalStorage().then(() => {
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
        cy.route("GET", API_URL + "/students/students/").as("getStudents");
        cy.route("GET", API_URL + "/academics/classes").as("getClasses");
        cy.route("GET", API_URL + "/dormitories").as("getDormitories");
    });

    it("Dashboard", () => {
        cy.visit("/#/students");
        cy.get(":nth-child(1) > .container");
        cy.get(":nth-child(2) > .container");
        cy.get(":nth-child(3) > .container");
        cy.get(".col > .container-fluid");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students");
    });

    it("Student Add Page", () => {
        cy.visit("/#/students/add");
        cy.get("#first_name");
        cy.get("h5");
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/add");
    });

    it("Student Table Page", () => {
        cy.visit("/#/students/table");
        cy.get(".table-responsive");
        cy.wait("@getStudents").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Students API call has data"
            );
        });
        cy.wait("@getClasses").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Classes API call has data"
            );
        });
        cy.wait("@getDormitories").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "Dormitories API call has data"
            );
        });
        cy.url().should("eq", Cypress.config().baseUrl + "/#/students/table");
    });
});

describe("Library", () => {
    beforeEach(() => {
        cy.server();
        cy.route("GET", API_URL + "/library/books").as("getBooks");
        cy.route("GET", API_URL + "/library/booksnum").as("getBooksNum");
        cy.route("GET", API_URL + "/academics/subject").as("getSubjects");
    });

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
        cy.wait("@getBooks").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(xhr.response.body.data, "Books API call has data");
        });
        cy.wait("@getBooksNum").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "BooksNum API call has data"
            );
        });
        cy.wait("@getSubjects").then(xhr => {
            assert.equal(xhr.status, 200);
            assert.isNotNull(
                xhr.response.body.data,
                "getSubjects API call has data"
            );
        });
        cy.url().should("eq", Cypress.config().baseUrl + "/#/library");
    });
});
