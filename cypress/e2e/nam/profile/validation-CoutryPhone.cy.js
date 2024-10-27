describe("Kiểm tra trường CountryPhone", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("TC01: Kiểm thử khi CountryPhone hợp lệ", () => {

    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu").contains("Profile").click();

    // Add an assertion to verify that the Profile page is loaded
    cy.url().should("include", "/profile");

    // Fill in the form fields, leaving the CountryPhone field empty
    cy.get("#First\\ Name").clear().type("Nguyen");
    cy.get("#Last\\ Name").clear().type("Van A");
    cy.get("#Password").clear().type("12345678@@");

    // Click on the button to open the first dropdown and select a country
    cy.get("button.btn.dropdown-toggle").eq(0).click();
    cy.get("li a.dropdown-item").contains("Viet Nam").click();

    // Verify that the selected country is displayed in the button
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

    cy.get("#Phone").clear().type("0918595475");

    // Leave the "CountryPhone" dropdown unselected (still showing "Select Country")
    cy.get("button.btn.dropdown-toggle").eq(1).click();

    // Ensure the dropdown is open and visible
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Close the dropdown without selecting an item
    cy.get("body").click();

    // Fill in the other form fields
    cy.get("#State").clear().type("Ho Chi Minh");
    cy.get("#City").clear().type("Ho Chi Minh");
    cy.get("#Address").clear().type("450 Le Van Viet");

    // Attempt to submit the form
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });

  it("TC02: Kiểm thử  khi CountryPhone bỏ trống", () => {

    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu").contains("Profile").click();

    // Add an assertion to verify that the Profile page is loaded
    cy.url().should("include", "/profile");

    // Fill in the form fields, leaving the CountryPhone field empty
    cy.get("#First\\ Name").clear().type("Nguyen");
    cy.get("#Last\\ Name").clear().type("Van A");
    cy.get("#Password").clear().type("12345678");

    // Click on the button to open the first dropdown and select a country
    cy.get("button.btn.dropdown-toggle").eq(0).click();
    cy.get("li a.dropdown-item").contains("Select Country").click();

    // Verify that the selected country is displayed in the button
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Select Country"
    );

    cy.get("#Phone").clear().type("0918595475");

    // Leave the "CountryPhone" dropdown unselected (still showing "Select Country")
    cy.get("button.btn.dropdown-toggle").eq(1).click();

    // Ensure the dropdown is open and visible
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Close the dropdown without selecting an item
    cy.get("body").click();

    // Fill in the other form fields
    cy.get("#State").clear().type("Ho Chi Minh");
    cy.get("#City").clear().type("Ho Chi Minh");
    cy.get("#Address").clear().type("450 Le Van Viet");

    // Attempt to submit the form
    cy.get('button[type="submit"]').click();

    //Kiểm thử xác nhận hiện thông báo lựa chọn từ dropdownlist
    cy.get('button[title="Select Country"]').then(($dropdown) => {
      if ($dropdown.hasClass("bs-invalid")) {
        cy.log("Please select an item in the list");
      }
      // Optionally add an assertion to confirm the invalid state
      expect($dropdown).to.have.class("bs-invalid");
    });
  });
});
