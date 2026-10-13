// THANH VIEN 1: DANG NHAP / DANG XUAT (BAN DEMO, CHUA CO CSDL)
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;
    if (username === "admin" && password === "admin123") {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("appShell").classList.remove("hidden");
        document.getElementById("currentUser").innerText = role === "Admin" ? "Nguyễn Văn A" : "Giảng viên";
        document.querySelector(".profile small").innerText = role;
        document.getElementById("loginError").innerText = "";
    } else {
        document.getElementById("loginError").innerText = "Tên đăng nhập hoặc mật khẩu không đúng!";
    }
});
function logout() {
    document.getElementById("appShell").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("loginForm").reset();
    document.getElementById("loginError").innerText = "";
}


// THANH VIEN 1: HIEN / AN MAT KHAU VA HO TRO QUEN MAT KHAU
 document.getElementById("togglePassword").addEventListener("click", function() {
    var passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
 });
 document.getElementById("forgotPassword").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Vui lòng liên hệ quản trị viên để đặt lại mật khẩu.");
 });

// THANH VIEN 1: CHUYEN TRANG KHI NHAN MENU
function showPage(id, link) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
    document.querySelectorAll(".sidebar nav a").forEach(function(a) {
        a.classList.remove("active");
    });
    if (link) link.classList.add("active");
}

// THANH VIEN 3: THEM PHONG HOC
function addRoom() {
    var ma = prompt("Nhập mã phòng:");
    if (!ma) return;
    var ten = prompt("Nhập tên phòng:", "Phòng " + ma);
    var toa = prompt("Nhập tòa nhà:", "Tòa A");
    var sucChua = prompt("Nhập sức chứa:", "40");
    var table = document.querySelector("#roomTable tbody");
    var row = table.insertRow();
    row.innerHTML = "<td>" + ma + "</td><td>" + (ten || "") + "</td><td>" + (toa || "") +
        "</td><td>" + (sucChua || "0") + "</td><td>Máy chiếu</td><td><span class='tag green-tag'>Trống</span></td>" +
        "<td><button class='small' onclick='editRoom(this)'>Sửa</button> <button class='small red' onclick='deleteRoom(this)'>Xóa</button></td>";
}
// THANH VIEN 3: XOA PHONG; HAM CO THE DUNG CHUNG CHO BANG NGUOI DUNG
function deleteRoom(button) {
    if (confirm("Bạn có chắc muốn xóa dòng này?")) button.closest("tr").remove();
}
// THANH VIEN 3: SUA THONG TIN PHONG HOC
function editRoom(button) {
    var row = button.closest("tr");
    var tenMoi = prompt("Nhập tên mới:", row.cells[1].innerText);
    if (tenMoi) row.cells[1].innerText = tenMoi;
}
// THANH VIEN 3: TIM KIEM PHONG HOC
function filterRooms() {
    var value = document.getElementById("roomSearch").value.toLowerCase();
    document.querySelectorAll("#roomTable tbody tr").forEach(function(row) {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}
// THANH VIEN 5: DUYET YEU CAU DAT PHONG
function approveRequest(button) {
    button.closest("tr").cells[5].innerHTML = "<span class='tag green-tag'>Đã duyệt</span>";
    button.closest("tr").cells[6].innerHTML = "Đã xử lý";
}
// THANH VIEN 5: TU CHOI YEU CAU DAT PHONG
function rejectRequest(button) {
    button.closest("tr").cells[5].innerHTML = "<span class='tag red-tag'>Từ chối</span>";
    button.closest("tr").cells[6].innerHTML = "Đã xử lý";
}
// THANH VIEN 1: THEM NGUOI DUNG
function addUser() {
    var ten = prompt("Nhập họ tên người dùng:");
    if (!ten) return;
    var email = prompt("Nhập email:");
    var table = document.querySelector("#userTable tbody");
    var row = table.insertRow();
    row.innerHTML = "<td>U" + String(table.rows.length).padStart(3, "0") + "</td><td>" + ten +
        "</td><td>" + (email || "") + "</td><td>Giảng viên</td><td><button class='small red' onclick='deleteRoom(this)'>Xóa</button></td>";
}
// THANH VIEN 4: GUI FORM DAT PHONG
 document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Đã gửi yêu cầu đặt phòng! (Bản demo)");
    this.reset();
});
var month = 9, year = 2026;
// THANH VIEN 4: CHUYEN THANG TRONG LICH
function changeMonth(step) {
    month += step;
    if (month > 11) { month = 0; year++; }
    if (month < 0) { month = 11; year--; }
    drawCalendar();
}
// THANH VIEN 4: VE LICH THEO THANG
function drawCalendar() {
    var names = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    var grid = document.getElementById("calendarGrid");
    document.getElementById("monthTitle").innerText = "Tháng " + (month + 1) + ", " + year;
    grid.innerHTML = "";
    ["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","CN"].forEach(function(name) {
        grid.innerHTML += "<div class='day head'>" + name + "</div>";
    });
    var first = new Date(year, month, 1).getDay();
    var offset = (first + 6) % 7;
    var total = new Date(year, month + 1, 0).getDate();
    for (var i = 0; i < offset; i++) grid.innerHTML += "<div class='day'></div>";
    for (var d = 1; d <= total; d++) {
        var event = "";
        if (d === 6) event = "<div class='event'>A101<br>08:00 - 10:00</div>";
        if (d === 12) event = "<div class='event'>B202<br>13:00 - 15:00</div>";
        if (d === 20) event = "<div class='event'>C301<br>15:00 - 17:00</div>";
        grid.innerHTML += "<div class='day'>" + d + event + "</div>";
    }
}
drawCalendar();
