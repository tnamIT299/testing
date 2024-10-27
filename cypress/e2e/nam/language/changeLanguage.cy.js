describe("Kiểm tra giao diện khi thay đổi ngôn ngữ", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("Test case 1 : Màn hình trang chủ thay đổi sang tiếng Anh", () => {
    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    
    cy.get(".dropdown-menu") // Adjust the selector if needed
      .contains("English")
      .click();

    cy.reload();
  });

  it("Test case 2 : Màn hình trang chủ thay đổi sang tiếng Ả Rập", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    
    cy.get(".dropdown-menu").contains("Arabic").click();
    cy.reload();
  });

  it("Test case 3 : Màn hình trang chủ thay đổi sang tiếng Thổ Nhĩ Kì", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    
    cy.get(".dropdown-menu").contains("Turkish").click();
    cy.reload();
  });

  it("Test case 4 : Màn hình trang chủ thay đổi sang tiếng Nga", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    
    cy.get(".dropdown-menu").contains("Russian").click();
    cy.reload();
  });

  it("Test case 5 : Màn hình trang chủ thay đổi sang tiếng Pháp", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

   
    cy.get(".dropdown-menu").contains("French").click();
    cy.reload();
  });

  it("Test case 6 : Màn hình trang chủ thay đổi sang tiếng Trung", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    
    cy.get(".dropdown-menu").contains("Chinese").click();
    cy.reload();
  });

  it("Test case 7 : Màn hình trang chủ thay đổi sang tiếng Đức", () => {
    // Click on the English dropdown
    cy.get("a.nav-link.dropdown-toggle")
      .contains("English") // Tìm thẻ chứa "English"
      .click(); // Nhấn vào thẻ

    cy.get(".dropdown-menu").contains("Germany").click();
    cy.reload();
  });
});
