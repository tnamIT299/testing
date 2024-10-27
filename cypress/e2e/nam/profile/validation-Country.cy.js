describe("Kiểm tra trường Country", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("TC01 : Kiểm thử khi Country hợp lệ", () => {

    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu") // Adjust the selector if needed
      .contains("Profile")
      .click();

    // Add an assertion to verify that the Profile page is loaded
    cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

    cy.get("#First\\ Name").clear().type("Nguyen");
    cy.get("#Last\\ Name").clear().type("Van A");
    cy.get("#Password").clear().type("12345678@@");

    // Click on the button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Select the <li> element that contains "Albania" (or any other country)
    cy.get("li a.dropdown-item").contains("Viet Nam").click();

    // Verify that the selected country is displayed in the button
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

    cy.get("#Phone").clear().type("0918595475");

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(1).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

    cy.get("#State").clear().type("Ho Chi Minh");
    cy.get("#City").clear().type("Ho Chi Minh");
    cy.get("#Address").clear().type("450 Le Van Viet");
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });

  it("TC02 : Kiểm thử khi Country rỗng", () => {

    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu") // Adjust the selector if needed
      .contains("Profile")
      .click();

    // Add an assertion to verify that the Profile page is loaded
    cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

    cy.get("#First\\ Name").clear().type("Nguyen");
    cy.get("#Last\\ Name").clear().type("Van A");
    cy.get("#Password").clear().type("12345678@@");

    // Click on the button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Select the <li> element that contains "Albania" (or any other country)
    cy.get("li a.dropdown-item").contains("Viet Nam").click();

    // Verify that the selected country is displayed in the button
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

    cy.get("#Phone").clear().type("0918595475");

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(1).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(1).type("Select Country{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Select Country"
    );

    cy.get("#State").clear().type("Ho Chi Minh");
    cy.get("#City").clear().type("Ho Chi Minh");
    cy.get("#Address").clear().type("450 Le Van Viet");
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
