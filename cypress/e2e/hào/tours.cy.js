describe("Kiểm tra book tour", () => {
  beforeEach(() => {
    // Mở trang trước mỗi bài kiểm thử
    cy.visit("https://www.phptravels.net/tours");
  });

  it("Kiểm tra nhấp vào liên kết View More của thẻ tour và kiểm tra giá trị ngày", () => {
    let city;
    let country;
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    let adults; // Biến lưu trữ số lượng người lớn
    let children; // Biến lưu trữ số lượng trẻ em

    // Mở dropdown để chọn thành phố
    cy.get(".select2-selection--single").click(); // Nhấp để mở dropdown

    // Chọn thành phố Berlin từ danh sách
    cy.get("#select2-tours_city-results").contains("Berlin").click();

    // Lấy tên thành phố và quốc gia
    cy.get("#select2-tours_city-container")
      .invoke("text")
      .then((text) => {
        const trimmedText = text.trim();
        const parts = trimmedText.split(" ");

        city = parts[0];
        country = parts.slice(1).join(" ");

        expect(city).to.equal("Berlin");
        expect(country).to.include("Germany");

        cy.log("Tên thành phố:", city);
        cy.log("Tên quốc gia:", country);
      })
      .then(() => {
        // Lấy giá trị của trường date
        cy.get("input#date")
          .invoke("val")
          .then((val) => {
            dateValue = val; // Gán giá trị ngày vào biến

            cy.log("Ngày lấy được:", dateValue);
          });
      })
      .then(() => {
        // Mở dropdown để điều chỉnh số lượng người lớn
        cy.get(".travellers").click(); // Nhấp vào dropdown để mở

        // Lấy số lượng người lớn hiện tại
        cy.get("#tours_adults")
          .invoke("val")
          .then((val) => {
            adults = parseInt(val, 10); // Chuyển đổi giá trị thành số nguyên
            cy.log("Số lượng người lớn hiện tại:", adults);

            // Tăng số lượng người lớn 3 lần
            for (let i = 0; i < 3; i++) {
              cy.get("#tours_adults")
                .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
                .find(".qtyInc") // Tìm nút tăng
                .click(); // Nhấp vào nút tăng
            }

            // Kiểm tra giá trị sau khi tăng
            cy.get("#tours_adults").should(
              "have.value",
              (adults + 3).toString()
            ); // Giá trị người lớn tăng lên
          });

        // Lấy số lượng trẻ em hiện tại
        cy.get("#tours_child")
          .invoke("val")
          .then((val) => {
            children = parseInt(val, 10); // Chuyển đổi giá trị thành số nguyên
            cy.log("Số lượng trẻ em hiện tại:", children);

            // Tăng số lượng trẻ em 2 lần
            for (let i = 0; i < 2; i++) {
              cy.get("#tours_child")
                .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
                .find(".qtyInc") // Tìm nút tăng
                .click(); // Nhấp vào nút tăng
            }

            // Kiểm tra giá trị sau khi tăng
            cy.get("#tours_child").should(
              "have.value",
              (children + 2).toString()
            ); // Giá trị trẻ em tăng lên
          });
      })
      .then(() => {
        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();

        // Kiểm tra URL
        cy.url().should(
          "include",
          `/tours/${city}/${city.toLowerCase()}/${dateValue}/${adults + 3}/${
            children + 2
          }/`
        );
      });
  });
});
