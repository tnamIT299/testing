describe("Kiểm tra đăng nhập", () => {
    beforeEach(() => {
      // Mở trang trước mỗi bài kiểm thử
      cy.login_Nam_Test();
    });
  
      it("TC01 : Kiểm thử giao diện hiển thị thông tin người dùng", () => {
  
        // Click on the Account dropdown
        cy.get("a.nav-link.dropdown-toggle").contains("Account").click();
  
        // Select the Profile option within the dropdown
        cy.get(".dropdown-menu") // Adjust the selector if needed
          .contains("Profile")
          .click();
  
        // Add an assertion to verify that the Profile page is loaded
        cy.url().should("include", "/profile");
      });
  
    
  });
  