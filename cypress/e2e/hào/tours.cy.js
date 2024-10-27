describe("Kiểm tra find best tours", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.visit("https://www.phptravels.net/tours");
  });

  it("Kiểm tra tất cả điều kiện hợp lệ", () => {
    const city = "Berlin"; // Khai báo thành phố
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 2; // Biến lưu trữ số lượng người lớn
    const children = 1; // Biến lưu trữ số lượng trẻ em

    // Nhập thành phố vào ô nhập liệu của Select2
    cy.get(".select2-selection--single").click(); // Mở dropdown

    // Tìm kiếm thành phố
    cy.get(".select2-search__field").type(city).wait(1000); // Đợi một chút để danh sách thành phố có thể load

    // Chờ cho các tùy chọn thành phố hiển thị và chọn tùy chọn đầu tiên
    cy.get(".select2-results__option")
      .should("be.visible")
      .first() // Nhấp vào tùy chọn đầu tiên
      .click(); // Chọn thành phố

    // Lấy giá trị của trường date
    cy.get("input#date")
      .invoke("val")
      .then((val) => {
        dateValue = val; // Gán giá trị ngày vào biến
        cy.log("Ngày lấy được:", dateValue);
      });

    // Nhấp vào dropdown cho số lượng hành khách
    cy.get(".travellers").click(); // Mở dropdown để chỉnh sửa số lượng hành khách

    // Nhập số lượng người lớn
    cy.get("#tours_adults")
      .should("be.visible") // Đảm bảo rằng trường input nhìn thấy
      .clear() // Xóa giá trị cũ nếu có
      .type(adults.toString()); // Nhập số lượng người lớn

    // Nhập số lượng trẻ em
    cy.get("#tours_child")
      .should("be.visible") // Đảm bảo rằng trường input nhìn thấy
      .clear() // Xóa giá trị cũ nếu có
      .type(children.toString()); // Nhập số lượng trẻ em

    // Nhấp vào nút "Tìm kiếm"
    cy.get('button[type="submit"]').click();
  });
});
