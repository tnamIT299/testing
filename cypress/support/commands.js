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
Cypress.Commands.add("loginTest", () => {
  // Truy cập trang đăng nhập
  cy.visit("http://localhost:5173/login");

  // Nhập vào trường Username
  cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('annhien'); 
  // Nhập vào trường Password
  cy.get('input[name="password"]').should('be.visible').type("123456");
  cy.get('button[type="submit"]').click();
  cy.wait(500);

  // Kiểm tra đăng nhập thành công và điều hướng đến trang thêm hàng hóa
  cy.url().should("include", "/");
});
