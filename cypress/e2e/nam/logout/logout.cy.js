describe("Kiểm tra giao diện khi đăng xuất", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.login_Nam_Test();
  });

  it("TC01: Kiểm thử giao diện khi đăng xuất khỏi web bằng DropdownList Account", () => {
    // Click on the Account dropdown
    cy.get("a.nav-link.dropdown-toggle").contains("Account").click();

    // Select the Profile option within the dropdown
    cy.get(".dropdown-menu") // Adjust the selector if needed
      .contains("Logout")
      .click();

    // Kiểm tra thông báo lỗi
    cy.contains("Logout Successful").should("be.visible");
    cy.contains("You have been logout successfully").should("be.visible");
  });

  it("TC02: Kiểm thử giao diện khi đăng xuất khỏi web bằng Thanh Toolbar", () => {
    cy.get("a.py-2.fadeout.btn.btn-outline-dark") 
      .contains("Logout") // Tìm thẻ chứa "Logout
      .click(); // Nhấn vào thẻ

    // Kiểm tra thông báo lỗi
    cy.contains("Logout Successful").should("be.visible");
    cy.contains("You have been logout successfully").should("be.visible");
  });
});
