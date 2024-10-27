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

  it("Kiểm tra Search by City không hợp lệ", () => {
    const city = "123Vietnam"; // Khai báo thành phố không hợp lệ
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 2; // Biến lưu trữ số lượng người lớn
    const children = 1; // Biến lưu trữ số lượng trẻ em

    // Nhập thành phố vào ô nhập liệu của Select2
    cy.get(".select2-selection--single").click(); // Mở dropdown

    // Tìm kiếm thành phố
    cy.get(".select2-search__field").type(city).wait(1000); // Đợi một chút để danh sách thành phố có thể load

    // Kiểm tra nếu không có kết quả nào hiển thị cho thành phố không hợp lệ
    cy.get(".select2-results__option")
      .should("be.visible")
      .then((options) => {
        if (options.length === 0) {
          cy.log("Không có kết quả tìm kiếm cho thành phố không hợp lệ");

          // Kiểm tra xem hệ thống có hiển thị thông báo lỗi cho city không hợp lệ không
          cy.get(".error-message") // Giả sử hệ thống hiển thị thông báo lỗi
            .should("be.visible")
            .and("contain", "Không tìm thấy thành phố phù hợp");
        } else {
          // Chọn tùy chọn đầu tiên nếu có kết quả hiển thị
          cy.get(".select2-results__option").first().click(); // Chọn thành phố
        }
      });

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

    // Kiểm tra nếu thành phố được chọn là không hợp lệ thì không thực hiện tìm kiếm
    cy.get(".select2-selection__rendered").then(($rendered) => {
      const selectedCity = $rendered.text().trim(); // Lấy text của thành phố đã chọn
      if (selectedCity !== city) {
        cy.log(
          "Không có thành phố hợp lệ được chọn, không thực hiện tìm kiếm."
        );
      } else {
        // Nếu thành phố hợp lệ, nhấp vào nút tìm kiếm
        cy.get('button[type="submit"]').click();
      }
    });
  });

  it("Kiểm tra Date không hợp lệ (ngày trước thời gian hiện tại)", () => {
    const city = "Berlin"; // Khai báo thành phố
    const invalidDate = "24-10-2024"; // Ngày không hợp lệ (trước thời gian hiện tại)
    const adults = 2; // Biến lưu trữ số lượng người lớn
    const children = 1; // Biến lưu trữ số lượng trẻ em

    // Lấy ngày hiện tại
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần +1
    const year = today.getFullYear();
    const currentDate = `${day}-${month}-${year}`; // Định dạng DD-MM-YYYY

    // So sánh với ngày không hợp lệ (invalidDate)
    if (new Date(year, month - 1, day) > new Date(2024, 9, 24)) {
      cy.log("Ngày không hợp lệ vì trước ngày hiện tại");
    } else {
      // Nhập thành phố vào ô nhập liệu của Select2
      cy.get(".select2-selection--single").click(); // Mở dropdown

      // Tìm kiếm thành phố
      cy.get(".select2-search__field").type(city).wait(1000); // Đợi một chút để danh sách thành phố có thể load

      // Chờ cho các tùy chọn thành phố hiển thị và chọn tùy chọn đầu tiên
      cy.get(".select2-results__option")
        .should("be.visible")
        .first() // Nhấp vào tùy chọn đầu tiên
        .click(); // Chọn thành phố

      // Nhập ngày vào trường date
      cy.get("input#date")
        .should("be.visible") // Đảm bảo rằng trường input nhìn thấy
        .invoke("removeAttr", "readonly") // Loại bỏ thuộc tính readonly
        .click() // Click để kích hoạt date picker
        .type("{selectall}{backspace}") // Xóa tất cả giá trị hiện tại
        .type(invalidDate) // Nhập giá trị ngày mới theo định dạng DD-MM-YYYY
        .should("have.value", invalidDate); // Đảm bảo giá trị ngày đã nhập là đúng

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

      // Kiểm tra xem hệ thống có hiển thị lỗi không cho phép chọn ngày trước thời gian hiện tại
      cy.get("input#date").then(($input) => {
        const inputDate = $input.val();
        if (new Date(inputDate.split("-").reverse().join("-")) < today) {
          cy.log("Không được phép chọn ngày trước thời gian hiện tại.");
          cy.get(".error-message") // Giả sử hệ thống hiển thị thông báo lỗi
            .should("contain", "Ngày không hợp lệ");
        } else {
          cy.log("Ngày hợp lệ.");
        }
      });
    }
  });

  it("Kiểm tra Travellers vượt quá giới hạn", () => {
    const city = "Berlin"; // Khai báo thành phố
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const maxAdults = 12; // Số lượng người lớn tối đa
    const maxChildren = 12; // Số lượng trẻ em tối đa

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

    // Tăng số lượng người lớn lên đến giá trị tối đa
    for (let i = 0; i <= maxAdults; i++) {
      cy.get("#tours_adults")
        .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
        .find(".qtyInc")
        .should("be.visible")
        .click(); // Nhấp vào nút tăng người lớn
    }

    // Kiểm tra giá trị người lớn đã đạt tối đa
    cy.get("#tours_adults").should("have.value", maxAdults.toString()); // Giá trị người lớn phải bằng 12

    // Nhấn tiếp nút tăng và kiểm tra không vượt quá giới hạn
    cy.get("#tours_adults")
      .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
      .find(".qtyInc")
      .click();
    cy.get("#tours_adults").should("have.value", maxAdults.toString()); // Đảm bảo rằng giá trị không vượt quá 12

    // Tăng số lượng trẻ em lên đến giá trị tối đa
    for (let i = 0; i <= maxChildren; i++) {
      cy.get("#tours_child")
        .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
        .find(".qtyInc")
        .should("be.visible")
        .click(); // Nhấp vào nút tăng trẻ em
    }

    // Kiểm tra giá trị trẻ em đã đạt tối đa
    cy.get("#tours_child").should("have.value", maxChildren.toString()); // Giá trị trẻ em phải bằng 12

    // Nhấn tiếp nút tăng và kiểm tra không vượt quá giới hạn
    cy.get("#tours_child")
      .parents(".qty-box") // Tìm phần tử cha chứa nút tăng
      .find(".qtyInc")
      .click();
    cy.get("#tours_child").should("have.value", maxChildren.toString()); // Đảm bảo rằng giá trị không vượt quá 12

    // Nhấp vào nút "Tìm kiếm"
    cy.get('button[type="submit"]').click();
  });

  it("Kiểm tra Không chọn Date", () => {
    const city = "Berlin"; // Khai báo thành phố
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

    // Nhấp vào nút "Tìm kiếm" mà không chọn ngày
    cy.get('button[type="submit"]').click();
  });

  it("Kiểm tra Số lượng Travellers không hợp lệ (dưới 1)", () => {
    const city = "Berlin"; // Khai báo thành phố
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 0; // Biến lưu trữ số lượng người lớn
    const children = 0; // Biến lưu trữ số lượng trẻ em

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

  it("Kiểm tra nhập City hợp lệ nhưng không có tour", () => {
    const city = "Ho Chi Minh"; // Khai báo thành phố
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

  it("Kiểm tra để trống City", () => {
    const city = ""; // Khai báo thành phố để trống
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 2; // Biến lưu trữ số lượng người lớn
    const children = 1; // Biến lưu trữ số lượng trẻ em

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

    // Nhấp vào nút "Tìm kiếm" mà không chọn thành phố
    cy.get('button[type="submit"]').click();
    cy.log("Please select an item in the list");
  });

  it("Kiểm tra nhập thành phố hợp lệ và chọn ngày hiện tại", () => {
    const city = "Berlin"; // Khai báo thành phố
    const adults = 2; // Biến lưu trữ số lượng người lớn
    const children = 1; // Biến lưu trữ số lượng trẻ em

    // Lấy ngày hiện tại
    const today = new Date(); // Tạo đối tượng Date với thời gian hiện tại
    const day = today.getDate(); // Lấy ngày
    const month = today.getMonth() + 1; // Lấy tháng (0-11, nên cần +1)
    const year = today.getFullYear(); // Lấy năm

    // Nhập thành phố vào ô nhập liệu của Select2
    cy.get(".select2-selection--single").click(); // Mở dropdown

    // Tìm kiếm thành phố
    cy.get(".select2-search__field").type(city).wait(1000); // Đợi một chút để danh sách thành phố có thể load

    // Chờ cho các tùy chọn thành phố hiển thị và chọn tùy chọn đầu tiên
    cy.get(".select2-results__option")
      .should("be.visible")
      .first() // Nhấp vào tùy chọn đầu tiên
      .click(); // Chọn thành phố

    // Mở date picker
    cy.get("input#date")
      .should("be.visible") // Đảm bảo rằng trường input nhìn thấy
      .click(); // Mở date picker

    // Chọn ngày hiện tại trong date picker
    cy.get(".datepicker") // Thay đổi selector cho date picker nếu cần
      .contains(day)
      .click(); // Nhấp vào ngày hiện tại

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

  it("Kiểm tra chọn số lượng khách là -1 người lớn và 12 trẻ em", () => {
    const city = "Berlin"; // Khai báo thành phố
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 0; // Biến lưu trữ số lượng người lớn
    const children = 12; // Biến lưu trữ số lượng trẻ em

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

    // Nhấn nút trừ cho số lượng người lớn
    cy.get(".qtyDec") // Chọn nút trừ
      .first() // Lấy nút trừ đầu tiên cho người lớn
      .click(); // Nhấp vào nút trừ

    // Nhập số lượng trẻ em
    cy.get("#tours_child")
      .should("be.visible") // Đảm bảo rằng trường input nhìn thấy
      .clear() // Xóa giá trị cũ nếu có
      .type(children.toString()); // Nhập số lượng trẻ em

    // Nhấp vào nút "Tìm kiếm"
    cy.get('button[type="submit"]').click();
  });

  it("Kiểm tra chọn số lượng khách từ bàn phím vượt quá giới hạn", () => {
    const city = "Berlin"; // Khai báo thành phố
    let dateValue; // Biến lưu trữ giá trị ngày từ input
    const adults = 20; // Biến lưu trữ số lượng người lớn
    const children = 30; // Biến lưu trữ số lượng trẻ em

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
