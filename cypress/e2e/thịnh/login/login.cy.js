describe('Kiểm tra đăng nhập', () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.visit('https://www.phptravels.net/login');
  });


  it('TC1: Đăng nhập thành công do email ĐÚNG và password ĐÚNG', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phantanthinh1306@gmail.com');
    cy.get('#password').type('T1h2i3n4h5$');
    cy.get('#submitBTN').click();

    // Kiểm tra chuyển hướng tới trang chính
    cy.url().should('include', '/dashboard');
  });

  it('TC2: Không đăng nhập được do email ĐÚNG password SAI', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phantanthinh1306@gmail.com');
    cy.get('#password').type('abfji!#$%');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });


  it('TC3: Không đăng nhập được do email ĐÚNG password ĐỂ TRỐNG', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phantanthinh1306@gmail.com');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });


  it('TC4: Không đăng nhập được do email SAI và password ĐÚNG', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phantanthinh@gmail.com')
    cy.get('#password').type('T1h2i3n4h5$');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });

  it('TC5: Không đăng nhập được do email SAI ĐỊNH DẠNG và password ĐÚNG', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phantan')
    cy.get('#password').type('T1h2i3n4h5$');
    cy.get('#submitBTN').click();

     // Kiểm tra thông báo lỗi
     cy.log("Please include an '@' in the email address");
  });

  it('TC6: Không đăng nhập được do email ĐỂ TRỐNG và password ĐÚNG ', () => {
    // Nhập thông tin không hợp lệ
    cy.get('#password').type('T1h2i3n4h5$');
    cy.get('#submitBTN').click();

    // Kiểm tra thông báo lỗi
    cy.contains('Invalid Login').should('be.visible');
    cy.contains('Please check your emal and password').should('be.visible');
  });
  
  it('TC7: Đăng nhập thất bại do email SAI và password SAI ', () => {
    // Nhập thông tin hợp lệ
    cy.get('#email').type('phanthinh@gmail.com');
    cy.get('#password').type('a7f8f93n%*^');
    cy.get('#submitBTN').click();

     // Kiểm tra thông báo lỗi
     cy.contains('Invalid Login').should('be.visible');
     cy.contains('Please check your emal and password').should('be.visible');
  });

});
