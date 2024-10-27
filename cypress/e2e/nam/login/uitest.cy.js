describe('Kiểm tra đăng nhập', () => {
    beforeEach(() => {
      // Mở trang trước mỗi bài kiểm thử
      cy.visit('https://www.phptravels.net/login');
    });
  
  //UI TEST
  it('Kiểm thử giao diện login có đủ input (Email, Password) và button Click hay không?', () => {
    // Kiểm tra sự tồn tại của input và button
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

    it('Đăng nhập thành công dùng phím Enter', () => {
      // Nhấn nút Enter
      cy.get('#email').type('namthanhvnx911@gmail.com');
      cy.get('#password').type('12345678{enter}');
  
      // Kiểm tra chuyển hướng tới trang chính
      cy.url().should('include', '/dashboard');
    });
  
    it('Đăng nhập thành công và reload lại trang', () => {
      // Nhấn nút Enter
      cy.get('#email').type('namthanhvnx911@gmail.com');
      cy.get('#password').type('12345678');
      cy.get('#submitBTN').click();
  
      // Kiểm tra chuyển hướng tới trang chính
      cy.url().should('include', '/dashboard');
      cy.reload(); 
    });
  
    it('Đăng nhập thành công và quay trở về trang trước rồi quay về trang sau', () => {
      // Nhấn nút Enter
      cy.get('#email').type('namthanhvnx911@gmail.com');
      cy.get('#password').type('12345678');
      cy.get('#submitBTN').click();
  
      // Kiểm tra chuyển hướng tới trang chính
      cy.url().should('include', '/dashboard');
      cy.go('back');
      cy.go('forward'); 
    });
  
    it('Xác nhận thông báo reset mật khẩu ở trang Login', () => {
      // Tạo stub cho alert
      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alert'); // Tạo stub cho hàm alert
      });
  
      // Giả lập phản hồi với status là true
      cy.intercept('POST', '/api/forget-password', {
          statusCode: 200,
          body: { status: true } // Giả lập phản hồi
      });
  
      // Nhấn nút Reset Password
      cy.get('label').contains('Reset Password').click();
      cy.get('#reset_mail').type('namthanhvnx911@gmail.com');
      cy.get('button').contains('Reset Email').click();
  
      // Kiểm tra alert
      cy.get('@alert').should('have.been.calledWith', 'Your password has been reset please check your mailbox');
  });
  
  });
  