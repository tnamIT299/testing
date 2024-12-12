describe("Kiểm tra Submit Your Visa Today", () => {
  let savedURL; // Khai báo biến lưu URL cho phần test tiếp theo

  beforeEach(() => {
    cy.login_Hao_Test();
    // Mở trang trước mỗi bài kiểm thử
    cy.visit("https://www.phptravels.net/visa");
  });

  it("Kiểm thử điều hướng tới trang Submission Form và lưu URL", () => {
    const from_country = "Viet Nam";
    const to_country = "China";
    let dateValue = "";

    // Logic nhập dữ liệu và xử lý như trước
    cy.get(".select2-selection--single").first().click();
    cy.get(".select2-search__field").type(from_country).wait(1000);
    cy.get(".select2-results__option").should("be.visible").first().click();

    cy.get(".select2-selection--single").eq(1).click();
    cy.get(".select2-search__field").type(to_country).wait(1000);
    cy.get(".select2-results__option").should("be.visible").first().click();

    cy.get("input#date")
      .invoke("val")
      .then((val) => {
        dateValue = val.replace(/[,\s]/g, "");
      });

    // Nhấp vào nút "Tìm kiếm" và lưu URL
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        cy.url().then((url) => {
          savedURL = url; // Lưu URL cho phần test tiếp theo
          cy.log("Lưu URL:", savedURL);
        });
      });
  });

  it("Kiểm thử điền đầy đủ thông tin về Visa", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    // Điền thông tin vào các trường
    cy.get('input[name="first_name"]').type("vo"); // Nhập First Name
    cy.get('input[name="last_name"]').type("hao"); // Nhập Last Name
    cy.get('input[name="email"]').eq(0).type("hao7ehoathanh@gmail.com"); // Nhập Email - chỉ định phần tử đầu tiên
    cy.get('input[name="phone"]').type("0839713378"); // Nhập Phone
    cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit
  });

  it("Kiểm thử nhập không hợp lệ cho First Name và Last Name", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    cy.get('input[name="first_name"]').type("123"); // Nhập First Name
    cy.get('input[name="last_name"]').type("!#@#"); // Nhập Last Name
    cy.get('input[name="email"]').eq(0).type("hao7ehoathanh@gmail.com"); // Nhập Email
    cy.get('input[name="phone"]').type("0839713378"); // Nhập Phone
    cy.get('select[name="entry_type"]').select("Single"); // Chọn Entry Type là "Single"
    cy.get('select[name="visa_type"]').select("Business Visa"); // Chọn Visa Type là "Business Visa"
    cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit
  });

  it("Kiểm thử định dạng Number Of Day < 0", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    // Điền thông tin vào các trường
    cy.get('input[name="first_name"]').type("vo"); // Nhập First Name
    cy.get('input[name="last_name"]').type("hao"); // Nhập Last Name
    cy.get('input[name="email"]').eq(0).type("hao7ehoathanh@gmail.com"); // Nhập Email - chỉ định phần tử đầu tiên
    cy.get('input[name="phone"]').type("0839713378"); // Nhập Phone

    // Xóa giá trị hiện tại trong trường Number Of Day và nhập giá trị âm
    cy.get('input[name="number_of_days"]').clear().type("-5"); // Xóa và Nhập giá trị âm cho Number Of Day
    cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit
  });

  it("Kiểm thử First Name, Last Name, Email, Phone không nhập", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    // Nhập các thông tin còn lại
    //cy.get('input[name="date"]').type("06-11-2024"); // Nhập Date
    cy.get('select[name="entry_type"]').select("Single"); // Chọn Entry Type là "Single"
    cy.get('select[name="visa_type"]').select("Business Visa"); // Chọn Visa Type là "Business Visa"
    cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit

    // Kiểm tra thông báo lỗi cho trường First Name
    cy.get('input[name="first_name"]').then(($input) => {
      // Lấy thông điệp xác thực từ trường
      const validityState = $input[0].validationMessage;
      // Kiểm tra rằng thông điệp xác thực là đúng
      expect(validityState).to.equal("Please fill out this field."); // Điều chỉnh thông điệp nếu cần
    });

    // Kiểm tra thông báo lỗi cho trường Last Name
    cy.get('input[name="last_name"]').then(($input) => {
      // Lấy thông điệp xác thực từ trường
      const validityState = $input[0].validationMessage;
      // Kiểm tra rằng thông điệp xác thực là đúng
      expect(validityState).to.equal("Please fill out this field."); // Điều chỉnh thông điệp nếu cần
    });

    // Kiểm tra thông báo lỗi cho trường Last Name
    cy.get('input[name="email"]').then(($input) => {
      // Lấy thông điệp xác thực từ trường
      const validityState = $input[0].validationMessage;
      // Kiểm tra rằng thông điệp xác thực là đúng
      expect(validityState).to.equal("Please fill out this field."); // Điều chỉnh thông điệp nếu cần
    });

    // Kiểm tra thông báo lỗi cho trường Last Name
    cy.get('input[name="phone"]').then(($input) => {
      // Lấy thông điệp xác thực từ trường
      const validityState = $input[0].validationMessage;
      // Kiểm tra rằng thông điệp xác thực là đúng
      expect(validityState).to.equal("Please fill out this field."); // Điều chỉnh thông điệp nếu cần
    });
  });

  it("Kiểm thử không nhập Notes", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    // Nhập thông tin không hợp lệ vào các trường
    cy.get('input[name="first_name"]').type("vo"); // Nhập First Name không hợp lệ (chỉ chứa số)
    cy.get('input[name="last_name"]').type("hao"); // Nhập Last Name hợp lệ
    cy.get('input[name="email"]').eq(0).type("hao7ehoathanh@gmail.com"); // Nhập Email không hợp lệ (không có phần @)
    cy.get('input[name="phone"]').type("0912314142"); // Nhập Phone không hợp lệ (chỉ chứa chữ)

    // Nhập các thông tin còn lại
    //cy.get('input[name="date"]').clear().type("01-11-2024"); // Nhập Date
    cy.get('select[name="entry_type"]').select("Single"); // Chọn Entry Type là "Single"
    cy.get('select[name="visa_type"]').select("Business Visa"); // Chọn Visa Type là "Business Visa"
    //cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit
  });

  it("Kiểm thử nhập không hợp lệ cho Email và Phone", () => {
    // Đảm bảo savedURL đã được thiết lập trước khi kiểm thử
    cy.wrap(null).then(() => {
      expect(savedURL).to.exist; // Kiểm tra rằng savedURL không undefined
      cy.visit(savedURL);
      cy.url().should("eq", savedURL);
      cy.log("Kiểm tra thành công URL:", savedURL);
    });

    // Nhập thông tin không hợp lệ vào các trường
    cy.get('input[name="first_name"]').type("vo"); // Nhập First Name không hợp lệ (chỉ chứa số)
    cy.get('input[name="last_name"]').type("hao"); // Nhập Last Name hợp lệ
    cy.get('input[name="email"]').eq(0).type("hao7ehoathanh"); // Nhập Email không hợp lệ (không có phần @)
    cy.get('input[name="phone"]').type("09123asd"); // Nhập Phone không hợp lệ (chỉ chứa chữ)

    // Nhập các thông tin còn lại
    //cy.get('input[name="date"]').clear().type("01-11-2024"); // Nhập Date
    cy.get('select[name="entry_type"]').select("Single"); // Chọn Entry Type là "Single"
    cy.get('select[name="visa_type"]').select("Business Visa"); // Chọn Visa Type là "Business Visa"
    cy.get('textarea[name="notes"]').type("Tour"); // Nhập nội dung vào trường Notes

    // Nhấp vào nút Submit
    cy.get("button#submit").click(); // Nhấp vào nút Submit
  });
});
