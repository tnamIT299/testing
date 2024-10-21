describe("Kiểm tra book tour", () => {
    beforeEach(() => {
      // Mở trang trước mỗi bài kiểm thử
      cy.visit("https://www.phptravels.net/tours");
    });
  
    it("Kiểm tra nhấp vào liên kết View More của thẻ tour", () => {
      const adults = 1;
      const children = 0;
      const date = '24-10-2024';
      let city;
      let country;
  
      // Mở dropdown để chọn thành phố
      cy.get('.select2-selection--single').click(); // Nhấp để mở dropdown
  
      // Chọn thành phố Berlin từ danh sách
      cy.get('#select2-tours_city-results') // Lấy danh sách thành phố
        .contains('Berlin') // Tìm mục "Berlin"
        .click(); // Nhấp vào mục "Berlin"
  
      // Lấy tên thành phố và quốc gia từ phần tử HTML
      cy.get('#select2-tours_city-container') // Lấy phần tử chứa tên thành phố và quốc gia
        .invoke('attr', 'title') // Lấy thuộc tính title từ phần tử
        .then((title) => {
          // Kiểm tra nếu title có giá trị
          if (title) {
            const parts = title.split(','); // Tách theo dấu phẩy
            city = parts[0]; // Lấy thành phố
            country = parts[1]; // Lấy quốc gia
  
            // In ra tên thành phố và quốc gia
            cy.log('Tên thành phố:', city);
            cy.log('Tên quốc gia:', country);
          } else {
            // Nếu title không có giá trị, thông báo lỗi
            throw new Error('Không tìm thấy thuộc tính title');
          }
        })
        .then(() => {
          // Tăng số lượng Adults
          // cy.get("#tours_adults").parents(".qty-box").find(".qtyInc").click(); // Tăng số lượng người lớn
  
          // Tăng số lượng Childs
          // cy.get("#tours_child").parents(".qty-box").find(".qtyInc").click(); // Tăng số lượng trẻ em
  
          // Nhấp vào nút "Tìm kiếm" với type là submit
          cy.get('button[type="submit"]').click(); // Nhấp vào nút Tìm kiếm
  
          // Kiểm tra xem URL có chứa thông tin đúng hay không
          cy.url().should('include', `/tours/${city}/${country}/${date}/${adults}/${children}/`);
        });
    });
  });
  