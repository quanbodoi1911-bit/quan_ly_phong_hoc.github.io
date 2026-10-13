// THANH VIEN 1: DANG NHAP
document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var username = document.getElementById("username").value.trim();
            var password = document.getElementById("password").value;
            var role = document.getElementById("role").value;

            var loginPage = document.getElementById("loginPage");
            var app = document.getElementById("app");
            var loginError = document.getElementById("loginError");

            if (username === "admin" && password === "admin123") {
                loginError.textContent = "";

                loginPage.classList.add("hidden");
                app.classList.remove("hidden");

                document.getElementById("currentUser").textContent = username;
                document.getElementById("currentRole").textContent =
                    role === "admin" ? "Quản trị viên" : "Giảng viên";

            } else {
                loginError.textContent =
                    "Tên đăng nhập hoặc mật khẩu không đúng!";
            }
        });
    }
});

    // HIEN / AN MAT KHAU
    document.getElementById("showPassword").addEventListener("click", function() {

        // Lay o nhap mat khau
        var password = document.getElementById("password");

        // Chuyen doi giua hien mat khau va an mat khau
        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    });


    // DANG XUAT TAI KHOAN
    document.getElementById("logoutButton").addEventListener("click", function() {

        // An giao dien chinh, quay lai trang dang nhap
        document.getElementById("app").classList.add("hidden");
        document.getElementById("loginPage").classList.remove("hidden");

        // Xoa du lieu da nhap trong form
        document.getElementById("loginForm").reset();

        // Xoa thong bao loi
        document.getElementById("loginError").innerText = "";
    });


    // HO TRO QUEN MAT KHAU
    document.getElementById("forgotPassword").addEventListener("click", function(event) {
        event.preventDefault();

        // Hien thong bao huong dan nguoi dung
        alert("Vui lòng liên hệ quản trị viên để đặt lại mật khẩu.");
    });


    // ==================================================
    // THANH VIEN 1: SIDEBAR / CHUYEN TRANG
    // ==================================================

    // Lay danh sach cac muc menu
    document.querySelectorAll(".sidebar nav a").forEach(function(link) {

        // Xu ly khi nhan vao mot muc menu
        link.addEventListener("click", function(event) {
            event.preventDefault();

            // Lay ID trang can hien thi
            var page = this.getAttribute("data-page");

            // Goi ham chuyen trang
            showPage(page, this);
        });
    });


    // ==================================================
    // THANH VIEN 3: QUAN LY PHONG HOC
    // ==================================================

    // Hien form them phong hoc
    document.getElementById("addRoomButton").addEventListener("click", function() {

        document.getElementById("roomForm").classList.remove("hidden");
        document.getElementById("roomForm").reset();

        // Xoa chi so sua phong
        document.getElementById("roomEditIndex").value = "";

        // Cho phep nhap ma phong moi
        document.getElementById("roomCode").disabled = false;
    });


    // HUY THEM HOAC SUA PHONG
    document.getElementById("cancelRoomButton").addEventListener("click", function() {

        // An form va xoa du lieu nhap
        document.getElementById("roomForm").classList.add("hidden");
        document.getElementById("roomForm").reset();

        // Mo lai o nhap ma phong
        document.getElementById("roomCode").disabled = false;
    });


    // LUU THONG TIN PHONG HOC
    document.getElementById("roomForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Lay thong tin phong hoc tu form
        var ma = document.getElementById("roomCode").value.trim();
        var ten = document.getElementById("roomName").value.trim();
        var toa = document.getElementById("roomBuilding").value.trim();
        var sucChua = document.getElementById("roomCapacity").value;
        var thietBi = document.getElementById("roomEquipment").value.trim();
        var trangThai = document.getElementById("roomStatus").value;

        // Lay bang danh sach phong hoc
        var table = document.getElementById("roomTable");

        // Kiem tra dang them moi hay sua phong
        var editIndex = document.getElementById("roomEditIndex").value;

        if (editIndex === "") {

            // Kiem tra ma phong co bi trung hay khong
            var trung = false;

            for (var i = 0; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].innerText === ma) {
                    trung = true;
                    break;
                }
            }

            // Neu trung ma phong thi dung lai
            if (trung) {
                alert("Mã phòng đã tồn tại!");
                return;
            }

            // Them dong moi vao bang
            var row = table.insertRow();

            // Dien thong tin phong hoc vao dong
            taoDongPhong(row, ma, ten, toa, sucChua, thietBi, trangThai);

        } else {

            // Cap nhat thong tin phong dang sua
            var row = table.rows[editIndex];

            row.cells[0].innerText = ma;
            row.cells[1].innerText = ten;
            row.cells[2].innerText = toa;
            row.cells[3].innerText = sucChua;
            row.cells[4].innerText = thietBi;
            row.cells[5].innerText = trangThai;

            // Gan lai cac nut thao tac
            ganNutPhong(row);
        }

        // Cap nhat so lieu sau khi thay doi
        capNhatPhong();

        // Xoa form va dong form
        document.getElementById("roomForm").reset();
        document.getElementById("roomForm").classList.add("hidden");
        document.getElementById("roomEditIndex").value = "";
        document.getElementById("roomCode").disabled = false;
    });


    // TIM KIEM PHONG HOC
    document.getElementById("roomSearch").addEventListener("input", function() {

        // Lay tu khoa tim kiem
        var value = this.value.toLowerCase();

        // An cac dong khong chua tu khoa
        document.querySelectorAll("#roomTable tr").forEach(function(row) {
            row.style.display =
                row.innerText.toLowerCase().includes(value) ? "" : "none";
        });
    });


    // ==================================================
    // THANH VIEN 1: QUAN LY NGUOI DUNG
    // ==================================================

    // Hien form them nguoi dung
    document.getElementById("addUserButton").addEventListener("click", function() {
        document.getElementById("userForm").classList.remove("hidden");
        document.getElementById("userForm").reset();
    });


    // THEM NGUOI DUNG VAO DANH SACH
    document.getElementById("userForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Lay ten va vai tro nguoi dung
        var ten = document.getElementById("newUserName").value.trim();
        var vaiTro = document.getElementById("newUserRole").value;

        // Kiem tra ten nguoi dung
        if (ten === "") {
            alert("Vui lòng nhập tên người dùng!");
            return;
        }

        // Them nguoi dung vao bang
        var table = document.getElementById("userTable");
        var row = table.insertRow();

        // Dien thong tin nguoi dung
        row.insertCell().innerText = table.rows.length;
        row.insertCell().innerText = ten;
        row.insertCell().innerText = vaiTro;

        // Tao nut xoa nguoi dung
        var cell = row.insertCell();
        var button = document.createElement("button");

        button.innerText = "Xóa";
        button.className = "small red";

        // Xu ly khi nhan nut xoa
        button.onclick = function() {
            if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
                row.remove();

                // Cap nhat lai so thu tu
                capNhatNguoiDung();
            }
        };

        cell.appendChild(button);

        // Xoa va dong form
        this.reset();
        this.classList.add("hidden");
    });


    // ==================================================
    // THANH VIEN 4: LICH HOC
    // ==================================================

    // Chuyen sang thang truoc
    document.getElementById("prevMonth").addEventListener("click", function() {
        changeMonth(-1);
    });

    // Chuyen sang thang sau
    document.getElementById("nextMonth").addEventListener("click", function() {
        changeMonth(1);
    });


    // ==================================================
    // THANH VIEN 4: DAT PHONG
    // ==================================================

    // Xu ly khi nguoi dung gui yeu cau dat phong
    document.getElementById("bookingForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Lay thong tin dat phong
        var phong = document.getElementById("bookingRoom");
        var ngay = document.getElementById("bookingDate").value;
        var batDau = document.getElementById("startTime").value;
        var ketThuc = document.getElementById("endTime").value;
        var mucDich = document.getElementById("bookingPurpose").value;

        // Kiem tra thoi gian
        if (batDau >= ketThuc) {
            alert("Thời gian kết thúc phải sau thời gian bắt đầu!");
            return;
        }

        // Kiem tra danh sach phong
        if (phong.value === "") {
            alert("Vui lòng thêm phòng học trước khi đặt phòng!");
            return;
        }

        // Them yeu cau vao bang
        var table = document.getElementById("requestTable");
        var row = table.insertRow();

        row.insertCell().innerText = document.getElementById("currentUser").innerText;
        row.insertCell().innerText = phong.value;
        row.insertCell().innerText = ngay;
        row.insertCell().innerText = batDau + " - " + ketThuc;
        row.insertCell().innerText = mucDich;
        row.insertCell().innerText = "Chờ duyệt";
        row.insertCell().innerText = "Chưa xử lý";

        // Cap nhat thong ke yeu cau
        capNhatYeuCau();

        alert("Đã gửi yêu cầu đặt phòng thành công!");

        // Xoa du lieu form
        this.reset();
    });


    // LOC YEU CAU THEO TRANG THAI
    document.querySelectorAll(".requestFilter").forEach(function(button) {

        button.addEventListener("click", function() {

            // Lay trang thai can loc
            var trangThai = this.getAttribute("data-filter");

            // Hien cac dong co trang thai phu hop
            document.querySelectorAll("#requestTable tr").forEach(function(row) {
                row.style.display =
                    row.cells[5].innerText === trangThai ? "" : "none";
            });
        });
    });


    // KHOI TAO LICH VA CAP NHAT PHONG
    drawCalendar();
    capNhatPhong();
});


// ==================================================
// THANH VIEN 1: HAM CHUYEN TRANG
// ==================================================

function showPage(id, link) {

    // An tat ca cac trang
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.add("hidden");
    });

    // Hien trang duoc chon
    var page = document.getElementById(id);

    if (page) {
        page.classList.remove("hidden");
    }

    // Xoa trang thai active cua cac muc menu
    document.querySelectorAll(".sidebar nav a").forEach(function(a) {
        a.classList.remove("active");
    });

    // Danh dau muc menu dang duoc chon
    if (link) {
        link.classList.add("active");
    }
}


// ==================================================
// THANH VIEN 3: CAC HAM QUAN LY PHONG HOC
// ==================================================

// Tao mot dong phong hoc
function taoDongPhong(row, ma, ten, toa, sucChua, thietBi, trangThai) {

    row.insertCell().innerText = ma;
    row.insertCell().innerText = ten;
    row.insertCell().innerText = toa;
    row.insertCell().innerText = sucChua;
    row.insertCell().innerText = thietBi;
    row.insertCell().innerText = trangThai;

    // Them cac nut sua va xoa
    ganNutPhong(row);
}


// Gan nut sua va xoa vao dong phong
function ganNutPhong(row) {

    var cell = row.cells[6];
    cell.innerHTML = "";

    // Tao nut sua phong
    var sua = document.createElement("button");
    sua.innerText = "Sửa";
    sua.className = "small";

    sua.onclick = function() {
        suaPhong(row);
    };

    // Tao nut xoa phong
    var xoa = document.createElement("button");
    xoa.innerText = "Xóa";
    xoa.className = "small red";

    xoa.onclick = function() {
        if (confirm("Bạn có chắc muốn xóa phòng này?")) {
            row.remove();

            // Cap nhat du lieu sau khi xoa
            capNhatPhong();
        }
    };

    cell.appendChild(sua);
    cell.appendChild(document.createTextNode(" "));
    cell.appendChild(xoa);
}


// Dua thong tin phong len form de sua
function suaPhong(row) {

    document.getElementById("roomCode").value = row.cells[0].innerText;
    document.getElementById("roomName").value = row.cells[1].innerText;
    document.getElementById("roomBuilding").value = row.cells[2].innerText;
    document.getElementById("roomCapacity").value = row.cells[3].innerText;
    document.getElementById("roomEquipment").value = row.cells[4].innerText;
    document.getElementById("roomStatus").value = row.cells[5].innerText;

    // Luu vi tri dong dang sua
    document.getElementById("roomEditIndex").value = row.rowIndex;

    // Khong cho sua ma phong
    document.getElementById("roomCode").disabled = true;

    // Hien form sua
    document.getElementById("roomForm").classList.remove("hidden");
}


// Cap nhat danh sach phong va bao cao
function capNhatPhong() {

    var table = document.getElementById("roomTable");

    // Cap nhat tong so phong
    document.getElementById("totalRooms").innerText = table.rows.length;
    document.getElementById("reportTotalRooms").innerText = table.rows.length;

    // Cap nhat danh sach phong trong form dat phong
    var bookingRoom = document.getElementById("bookingRoom");
    var phongDangChon = bookingRoom.value;

    bookingRoom.innerHTML = "";

    for (var i = 0; i < table.rows.length; i++) {

        var row = table.rows[i];

        // Chi hien thi phong dang trong
        if (row.cells[5].innerText === "Trống") {

            var option = document.createElement("option");
            option.value = row.cells[0].innerText;
            option.text = row.cells[0].innerText + " - " + row.cells[1].innerText;

            bookingRoom.appendChild(option);
        }
    }

    // Giu lai phong da chon neu phong van con trong
    if (phongDangChon) {
        bookingRoom.value = phongDangChon;
    }

    // Cap nhat bang bao cao
    var reportTable = document.getElementById("reportTable");
    reportTable.innerHTML = "";

    for (var j = 0; j < table.rows.length; j++) {

        var r = table.rows[j];
        var newRow = reportTable.insertRow();

        newRow.insertCell().innerText = r.cells[0].innerText;
        newRow.insertCell().innerText = r.cells[1].innerText;
        newRow.insertCell().innerText = r.cells[3].innerText;
        newRow.insertCell().innerText = r.cells[5].innerText;
    }
}


// ==================================================
// THANH VIEN 1: CAP NHAT DANH SACH NGUOI DUNG
// ==================================================

function capNhatNguoiDung() {

    var table = document.getElementById("userTable");

    // Danh lai so thu tu sau khi xoa
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1;
    }
}


// ==================================================
// THANH VIEN 5: QUAN LY YEU CAU DAT PHONG
// ==================================================

function capNhatYeuCau() {

    var table = document.getElementById("requestTable");

    // Dem tong so yeu cau va tung trang thai
    var tong = table.rows.length;
    var choDuyet = 0;
    var daDuyet = 0;
    var tuChoi = 0;

    for (var i = 0; i < table.rows.length; i++) {

        var trangThai = table.rows[i].cells[5].innerText;

        if (trangThai === "Chờ duyệt") choDuyet++;
        if (trangThai === "Đã duyệt") daDuyet++;
        if (trangThai === "Từ chối") tuChoi++;
    }

    // Cap nhat so lieu tren Dashboard va Bao cao
    document.getElementById("pendingCount").innerText = choDuyet;
    document.getElementById("reportTotalRequests").innerText = tong;
    document.getElementById("reportApproved").innerText = daDuyet;
    document.getElementById("reportRejected").innerText = tuChoi;
}


// ==================================================
// THANH VIEN 4: LICH HOC
// ==================================================

// Khoi tao thang 10 nam 2026 (month bat dau tu 0)
var month = 9;
var year = 2026;


// Chuyen thang truoc hoac thang sau
function changeMonth(step) {

    month += step;

    // Neu qua thang 12 thi sang nam moi
    if (month > 11) {
        month = 0;
        year++;
    }

    // Neu lui truoc thang 1 thi ve nam truoc
    if (month < 0) {
        month = 11;
        year--;
    }

    // Ve lai lich theo thang moi
    drawCalendar();
}


// Ve lich theo thang hien tai
function drawCalendar() {

    var grid = document.getElementById("calendarGrid");
    var title = document.getElementById("calendarTitle");

    if (!grid || !title) return;

    // Ten cac ngay trong tuan
    var names = [
        "Thứ 2", "Thứ 3", "Thứ 4",
        "Thứ 5", "Thứ 6", "Thứ 7", "CN"
    ];

    // Hien thi tieu de lich
    title.innerText = "Lịch sử dụng phòng - Tháng " +
        (month + 1) + ", " + year;

    grid.innerHTML = "";

    // Tao hang tieu de cac ngay
    names.forEach(function(name) {

        var head = document.createElement("div");
        head.className = "day head";
        head.innerText = name;

        grid.appendChild(head);
    });

    // Xac dinh ngay dau tien va so ngay trong thang
    var first = new Date(year, month, 1).getDay();
    var offset = (first + 6) % 7;
    var total = new Date(year, month + 1, 0).getDate();

    // Tao cac o trong truoc ngay dau thang
    for (var i = 0; i < offset; i++) {

        var empty = document.createElement("div");
        empty.className = "day";

        grid.appendChild(empty);
    }

    // Tao cac o ngay trong thang
    for (var d = 1; d <= total; d++) {

        var day = document.createElement("div");
        day.className = "day";
        day.innerText = d;

        grid.appendChild(day);
    }
}
```
