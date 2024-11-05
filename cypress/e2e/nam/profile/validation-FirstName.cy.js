describe("Kiểm tra trường FirstName", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("TC01 : Kiểm thử FirstName hợp lệ", () => {

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

  it("TC02 : Kiểm thử cập nhật thông tin người dùng KHÔNG thành công khi FirstName bỏ trống", () => {

    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu") // Adjust the selector if needed
      .contains("Profile")
      .click();

    // Add an assertion to verify that the Profile page is loaded
    cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

    cy.get("#First\\ Name").clear();
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

    // Get the validation message for the required field
    cy.get("#First\\ Name").then(($input) => {
      // Check for the validation message
      const validityState = $input[0].validationMessage;
      expect(validityState).to.equal("Please fill out this field.");
    });
  });

  // it("TC03 : Kiểm thử FirstName chứa kí tự đặc biệt", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type("Nguyen@##@%#$@#$");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC04 : Kiểm thử FirstName chứa số", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type("Nguyen116511");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC05 : Kiểm thử FirstName có độ dài kí tự > 50", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name")
  //     .clear()
  //     .type(
  //       "Nguyen116511dfjndsjnkfdnfnadlfjldjlj5112141154884511a1d5f1ds51fdsf1d2"
  //     );
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC06 : Kiểm thử FirstName có độ dài kí tự < 2", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type("N");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC07 : Kiểm thử FirstName bắt đầu bằng 1 khoảng trắng", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type(" Nguyen");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC08 : Kiểm thử FirstName kết thúc bằng 1 khoảng trắng", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type("Nguyen ");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();

  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });

  // it("TC09 : Kiểm thử FirstName có chứa dấu câu , kí tự Unicode", () => {

  //   // Click on the Account dropdown
  //   cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

  //   // Select the Profile option within the dropdown
  //   cy.get(".dropdown-menu") // Adjust the selector if needed
  //     .contains("Profile")
  //     .click();

  //   // Add an assertion to verify that the Profile page is loaded
  //   cy.url().should("include", "/profile"); // Replace '/profile' with the actual URL path

  //   cy.get("#First\\ Name").clear().type("Nguyễn");
  //   cy.get("#Last\\ Name").clear().type("Van A");
  //   cy.get("#Password").clear().type("12345678@@");

  //   // Click on the button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(0).click();

  //   // Select the <li> element that contains "Albania" (or any other country)
  //   cy.get("li a.dropdown-item").contains("Viet Nam").click();

  //   // Verify that the selected country is displayed in the button
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#Phone").clear().type("0918595475");

  //   // Click on the second button to open the dropdown
  //   cy.get("button.btn.dropdown-toggle").eq(1).click();

  //   // Đảm bảo rằng dropdown được mở và hiển thị
  //   cy.get("div.dropdown-menu.show").should("be.visible");

  //   // Type "Viet Nam" into the search input
  //   cy.get('input[type="search"]').eq(1).type("Viet Nam{enter}");

  //   // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
  //   cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
  //     "contain",
  //     "Viet Nam"
  //   );

  //   cy.get("#State").clear().type("Ho Chi Minh");
  //   cy.get("#City").clear().type("Ho Chi Minh");
  //   cy.get("#Address").clear().type("450 Le Van Viet");
  //   cy.get('button[type="submit"]').click();


  //   //Kiểm tra thông báo thành công
  //   cy.contains("Information Updated").should("be.visible");
  //   cy.contains("Infromation has been updated successfully").should(
  //     "be.visible"
  //   );
  // });
});
