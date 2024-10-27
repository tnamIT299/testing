describe("Kiểm tra trường FirstName1", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

    it("TC01 : Kiểm thử khi FirstName1 hợp lệ", () => {
      /// Tìm thẻ "Car" dựa trên văn bản "Cars"
      cy.contains("a.nav-link", "Cars").click();

      // Tìm và lấy button "Book Now" đầu tiên
      cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

      // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
      Cypress.on("uncaught:exception", (err, runnable) => {
        if (err.message.includes("scrollHeight")) {
          // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
          return false;
        }
      });

      // Click on the second button to open the dropdown
      cy.get("button.btn.dropdown-toggle").eq(0).click();

      // Đảm bảo rằng dropdown được mở và hiển thị
      cy.get("div.dropdown-menu.show").should("be.visible");

      // Type "Viet Nam" into the search input
      cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

      // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
      cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
        "contain",
        "Viet Nam"
      );

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

      cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyen");
      cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

      cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
      cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

      cy.get("#gateway_pay_later").should("be.visible").check();

      cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
      cy.get('button[type="submit"]').click();
    });

  it("TC02 : Kiểm thử khi FirstName1 rỗng", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').clear();
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

    // Thử click vào trường input trước để focus vào nó
    cy.get('input[name="firstname_1"]').should("have.focus");
  });

  it("TC03 : Kiểm thử khi FirstName1 chứa ký tự đặc biệt", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyen@##@%#$@#$");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC04 : Kiểm thử khi FirstName1 chứa số", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyen116511");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC05 : Kiểm thử khi FirstName1 có độ dài ký tự > 50", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyen116511dfjndsjnkfdnfnadlfjldjlj5112141154884511a1d5f1ds51fdsf1d2");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC06 : Kiểm thử khi FirstName1 có độ dài ký tự < 2", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("N");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC07 : Kiểm thử khi FirstName1 bắt đầu bằng khoảng trắng", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type(" Nguyen");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC08 : Kiểm thử khi FirstName1 kết thúc bằng khoảng trắng", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyen ");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });

  it("TC09 : Kiểm thử khi FirstName1 chứa ký tự Unicode", () => {
    /// Tìm thẻ "Car" dựa trên văn bản "Cars"
    cy.contains("a.nav-link", "Cars").click();

    // Tìm và lấy button "Book Now" đầu tiên
    cy.get("button.btn.btn-outline-dark").contains("Book Now").first().click();

    // Bỏ qua lỗi uncaught exception liên quan đến 'scrollHeight'
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("scrollHeight")) {
        // Trả về false để ngăn chặn lỗi phá vỡ bài kiểm tra
        return false;
      }
    });

    // Click on the second button to open the dropdown
    cy.get("button.btn.dropdown-toggle").eq(0).click();

    // Đảm bảo rằng dropdown được mở và hiển thị
    cy.get("div.dropdown-menu.show").should("be.visible");

    // Type "Viet Nam" into the search input
    cy.get('input[type="search"]').eq(0).type("Viet Nam{enter}");

    // Kiểm tra lại rằng quốc gia "Viet Nam" đã được chọn
    cy.get("button.btn.dropdown-toggle .filter-option-inner-inner").should(
      "contain",
      "Viet Nam"
    );

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

    cy.get('input[name="firstname_1"]').should("be.visible").type("Nguyễn");
    cy.get('input[name="lastname_1"]').should("be.visible").type("Van A");

    cy.get('input[name="firstname_2"]').should("be.visible").type("Nguyen");
    cy.get('input[name="lastname_2"]').should("be.visible").type("Van B");

    cy.get("#gateway_pay_later").should("be.visible").check();

    cy.get("#agreechb").should("be.visible").check(); // Đánh dấu checkbox
    cy.get('button[type="submit"]').click();

  });


});
