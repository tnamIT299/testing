describe('Kiểm tra tìm kiếm Hotels', () => {
    beforeEach(() => {
        // Mở trang trước mỗi bài kiểm thử
        cy.visit('https://www.phptravels.net/login');
      });
      it('TC5: Đăng nhập thất bại do email SAI ĐỊNH DẠNG và password ĐÚNG', () => {
        // Nhập thông tin hợp lệ
        cy.get('#email').type('tanthinh1974$&%^');
        cy.get('#password').type('T1h2i3n4h5$');
        cy.get('#submitBTN').click();
    
        // Kiểm tra chuyển hướng tới trang chính
        cy.log("Please include an '@' in the email address");
      });

    
});
