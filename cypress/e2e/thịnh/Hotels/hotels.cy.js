describe('Kiểm tra tìm kiếm Hotels', () => {
    beforeEach(() => {
        // Mở trang trước mỗi bài kiểm thử
        cy.visit('https://www.phptravels.net/hotels');
    });

    // TC1 : Tìm kiếm thành công với các trường hợp lệ 
    it('TC1: Tìm kiếm thành công với các trường hợp lệ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
    });


    // TC2 : Tìm kiếm thất bại vì số người tối đa trong 1 phòng lớn hơn 4
    it('TC2 : Tìm kiếm thất bại vì số người tối đa trong 1 phòng lớn hơn 4', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 5, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();

        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

    // TC3 : Tìm kiếm thất bại vì số phòng lớn hơn số người
    it('TC3 : Tìm kiếm thất bại vì số phòng lớn hơn số người', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 4, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();

        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

    // TC4 : Tìm kiếm thất bại vì nhập số trẻ em nhỏ hơn 0
    it('TC4 : Tìm kiếm thất bại vì nhập số trẻ em nhỏ hơn 0', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 1, children = -3;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();

        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
    // TC5 : Tìm kiếm thất bại vì trường trẻ em để trống
    it('TC5 : Tìm kiếm thất bại vì trường trẻ em để trống', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 2

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear();

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();

        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
     // TC6 : Tìm kiếm thất bại vì Childs nhập kí tự 
     it('TC6: Tìm kiếm thành công với các trường hợp lệ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 2, children = "abc23";

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });


    // TC7 : Tìm kiếm thất bại vì Adults bằng 0 
    it('TC7: Tìm kiếm thất bại vì Adults bằng 0', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 0, children = 0;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });


    // TC8 : Tìm kiếm thất bại vì Adults nhỏ hơn 0 
    it('TC8: Tìm kiếm thất bại vì Adults nhỏ hơn 0', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = -3, children = 0;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

     // TC9 : Tìm kiếm thất bại vì Adults để trống 
     it('TC9: Tìm kiếm thất bại vì Adults để trống ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, children = 2;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear();
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
    // TC10 : Tìm kiếm thất bại vì Adults nhập kí tự
    it('TC10: Tìm kiếm thất bại vì Adults nhập kí tự ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = "abc", children = 2;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

    // TC11 : Tìm kiếm thất bại vì Rooms bằng 0 
    it('TC11: Tìm kiếm thất bại vì Rooms bằng 0', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 0, adults = 2, children = 0;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });


    // TC12 : Tìm kiếm thất bại vì Rooms nhỏ hơn 0 
    it('TC12: Tìm kiếm thất bại vì Rooms nhỏ hơn 0', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = -3, adults = 1, children = 0;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

     // TC13 : Tìm kiếm thất bại vì Rooms để trống 
     it('TC13: Tìm kiếm thất bại vì Rooms để trống ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", adults = 3, children = 2;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear();
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
    // TC14 : Tìm kiếm thất bại vì Rooms nhập kí tự
    it('TC14: Tìm kiếm thất bại vì Rooms nhập kí tự ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = "rakj", adults = 1, children = 2;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
     // TC15 : Tìm kiếm thất bại vì ngày Ckeckout bằng ngày Checkin
     it('TC15: Tìm kiếm thất bại vì ngày Ckeckout bằng ngày Checkin ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "05-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

     // TC16 : Tìm kiếm thất bại vì ngày Ckeckout nhỏ hơn ngày Checkin
     it('TC16: Tìm kiếm thất bại vì ngày Ckeckout nhỏ hơn ngày Checkin ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "03-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
     // TC17 : Tìm kiếm thất bại vì ngày Ckeckout để trống
     it('TC17: Tìm kiếm thất bại vì ngày Ckeckout để trống ', () => {
        const city = "Phuket", Checkin = "05-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear();
        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
    // TC18 : Tìm kiếm thất bại vì ngày Ckeckout nhập đinh dạng không hợp lệ
    it('TC18: Tìm kiếm thất bại vì ngày Ckeckout nhập đinh dạng không hợp lệ ', () => {
        const city = "Phuket", Checkin = "05-11-2024", Checkout = "abcdh125*&$", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });



    // TC19 : Tìm kiếm thất bại vì ngày Checkin nhỏ hơn ngày hiện tại
    it('TC19 : Tìm kiếm thất bại vì ngày Checkin nhỏ hơn ngày hiện tại ', () => {
        const city = "Phuket", Checkin = "02-11-2024", Checkout = "05-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
     // TC20 : Tìm kiếm thất bại vì ngày Ckeckin để trống
     it('TC20: Tìm kiếm thất bại vì ngày Ckeckin để trống ', () => {
        const city = "Phuket", Checkout = "05-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear();
        cy.get("input#checkout").clear().type(Checkout);
        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });
    // TC21 : Tìm kiếm thất bại vì ngày Ckeckin nhập đinh dạng không hợp lệ
    it('TC21: Tìm kiếm thất bại vì ngày Ckeckin nhập đinh dạng không hợp lệ ', () => {
        const city = "Phuket", Checkin = "puad138", Checkout = "05-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.contains('No more data').should('be.visible');
        cy.contains('No more data to load').should('be.visible');
    });

    // TC22 : Tìm kiếm thất bại vì địa điểm để trống
    it('TC22 : Tìm kiếm thất bại vì địa điểm để trống ', () => {
        const Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").clear().wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.log("Please select an item in the list");
    });
    
     // TC23 : Tìm kiếm thất bại vì địa điểm nhập sai
     it('TC23 : Tìm kiếm thất bại vì địa điểm nhập sai ', () => {
        const city="Phukkket", Checkin = "05-11-2024", Checkout = "07-11-2024", rooms = 1, adults = 2, children = 1;

        // Nhập thành phố và chọn tùy chọn đầu tiên
        cy.get(".select2-selection--single").click();
        cy.get(".select2-search__field").clear().type(city).wait(1000);
        cy.get(".select2-results__option").first().click();

        // Nhập ngày Checkin và Checkout
        cy.get("input#checkin").clear().type(Checkin);
        cy.get("input#checkout").clear().type(Checkout);

        // Nhập số lượng phòng, người lớn và trẻ em
        cy.get(".travellers").click();
        cy.get("#hotels_rooms").clear().type(rooms.toString());
        cy.get("#hotels_adults").clear().type(adults.toString());
        cy.get("#hotels_childs").clear().type(children.toString());

        // Nhấp vào nút "Tìm kiếm"
        cy.get('button[type="submit"]').click();
        // Kiểm tra thông báo lỗi
        cy.log("Please select an item in the list");
    });


});