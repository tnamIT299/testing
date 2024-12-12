// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// COMMAND FOR TESTING ADD NEW GOODS
Cypress.Commands.add("login_Nam_Test", () => {
  // Truy cập trang đăng nhập
  cy.visit("https://www.phptravels.net/login");

  cy.get("#email").type("namthanhvnx911@gmail.com");
  cy.get("#password").type("12345678@@");
  cy.get("#submitBTN").click();

  // Kiểm tra chuyển hướng tới trang chính
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("login_Hao_Test", () => {
  // Truy cập trang đăng nhập
  cy.visit("https://www.phptravels.net/login");

  cy.get("#email").type("hao7ehoathanh@gmail.com");
  cy.get("#password").type("1234567890");
  cy.get("#submitBTN").click();

  // Kiểm tra chuyển hướng tới trang chính
  cy.url().should("include", "/dashboard");
});
