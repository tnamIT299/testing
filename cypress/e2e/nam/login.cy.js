describe('Kiểm tra đăng nhập', () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.visit('https://www.phptravels.net/login');
  });

  it('Không đăng nhập được do email và password không hợp lệ', () => {
    // Nhập thông tin không hợp lệ
    cy.get('#email').type('invalid@gmail.com');
    cy.get('#password').type('wrongpassword');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('Đăng nhập thành công do email và password hợp lệ', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('namthanhvnx911@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('#submitBTN').click();

    // Kiểm tra chuyển hướng tới trang chính
    cy.url().should('include', '/dashboard');
  });

  it('Không đăng nhập được do password không hợp lệ', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('namthanhvnx911@gmail.com');
    cy.get('#password').type('1234567890');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('Không đăng nhập được do email không hợp lệ', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('invalid@example.com');
    cy.get('#password').type('12345678');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('Không đăng nhập được do email để trống', () => {
    // Nhập thông tin hợp lệ
    cy.get('#password').type('12345678');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('Không đăng nhập được do password để trống', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('namthanhvnx911@gmail.com');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('Không đăng nhập được do email và password để trống', () => {
    // Nhấn nút đăng nhập mà không điền thông tin
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
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
