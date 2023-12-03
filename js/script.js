const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginForm = document.querySelector('.form-box.login form');

const users = [
    { username: 'admin', email: 'contact.admin@sgu.edu.vn', password: 'admin@12345' },
    // Thêm các thông tin đăng nhập khác nếu cần thiết
];

function showRegisterForm() {
    wrapper.classList.add('active');
}

function showLoginForm() {
    wrapper.classList.remove('active');
}

function showPopup() {
    wrapper.classList.add('active-popup');
}

function hidePopup() {
    wrapper.classList.remove('active-popup');
}

function loginUser(email, password) {
    // Kiểm tra thông tin đăng nhập
    const user = users.find(u => u.email === email && u.password === password);
    return user;
}

if (registerLink) {
    registerLink.addEventListener('click', showRegisterForm);
}

if (loginLink) {
    loginLink.addEventListener('click', showLoginForm);
}

if (btnPopup) {
    btnPopup.addEventListener('click', showPopup);
}

if (iconClose) {
    iconClose.addEventListener('click', hidePopup);
}

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Lấy thông tin từ form
        const emailInput = this.querySelector('input[type="email"]');
        const passwordInput = this.querySelector('input[type="password"]');
        const email = emailInput.value;
        const password = passwordInput.value;

        // Kiểm tra thông tin đăng nhập
        const user = loginUser(email, password);

        if (user) {

            // Sử dụng hàm để hiển thị cảnh báo
            customAlert('Bạn đã đăng nhập thành công!', 'success');
            // Đăng nhập thành công, chuyển hướng sang trang admin1.html
            window.location.href = 'admin1.html';
        } else {
            // Hiển thị thông báo đăng nhập không thành công
            customAlert('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập!', 'warning');
        }
    });
}
// Hàm hiển thị cảnh báo tùy chỉnh
function customAlert(message, type) {
    var customAlertDiv = document.getElementById("customalert");

    // Xác định màu sắc dựa trên kiểu
    switch (type) {
        case 'success':
            customAlertDiv.style.backgroundColor = '#4CAF50';
            break;
        case 'warning':
            customAlertDiv.style.backgroundColor = '#f44336';
            break;
        default:
            // Mặc định cho các kiểu khác
            customAlertDiv.style.backgroundColor = '#333';
    }

    // Thiết lập nội dung và hiển thị
    customAlertDiv.innerHTML = message;
    customAlertDiv.classList.add("show");

    // Tự động ẩn cảnh báo sau 3.5 giây (3500 milliseconds)
    setTimeout(function () {
        customAlertDiv.classList.remove("show");
    }, 3500);
}
