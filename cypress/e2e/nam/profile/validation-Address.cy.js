describe("Kiểm tra trường Address1", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("TC01 : Kiểm thử khi Address1 hợp lệ", () => {
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
    cy.get("#Address").clear().type("34/45/90-450 Le Van Viet");
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });

  it("TC02 : Kiểm thử khi Address1 rỗng", () => {
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
    cy.get("#Address").clear();
    cy.get('button[type="submit"]').click();

    // Get the validation message for the required field
    cy.get("#Address").then(($input) => {
      // Check for the validation message
      const validityState = $input[0].validationMessage;
      expect(validityState).to.equal("Please fill out this field.");
    });
  });

  it("TC03 : Kiểm thử khi Address1 có độ dài > 200 ký tự", () => {
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
    cy.get("#Address")
      .clear()
      .type(
        "Ngách 34/45/56/56/78/23/56/90-450-451/342/3456 Le Van Viet, Phường Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minhkáhdjkashdjkashkajshdaksjdhasjkdahsdkjashdaskdhakdjh3459sdfsdjfkhsdjfhjk45h34kj5j45h450238498sdfsdf"
      );
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });

  it("TC04 : Kiểm thử khi Address1 có khoảng trắng ở đầu", () => {
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
    cy.get("#Address")
      .clear()
      .type(
        " 34/45-450 Le Van Viet, Tang Nhon Phu Ward, District 9, Ho Chi Minh City"
      );
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });

  it("TC05 : Kiểm thử khi Address1 có khoảng trắng ở cuối", () => {
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
    cy.get("#Address")
      .clear()
      .type(
        "34/45-450 Le Van Viet, Tang Nhon Phu Ward, District 9, Ho Chi Minh City "
      );
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });


  it("TC06 : Kiểm thử khi Address1 có chứa kí tự Unicode", () => {
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
    cy.get("#Address")
      .clear()
      .type(
        "Ngách 34/45-450 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh"
      );
    cy.get('button[type="submit"]').click();

    //Kiểm tra thông báo thành công
    cy.contains("Information Updated").should("be.visible");
    cy.contains("Infromation has been updated successfully").should(
      "be.visible"
    );
  });
});
