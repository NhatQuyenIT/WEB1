function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
    } else {
        console.error("Trình duyệt không hỗ trợ định vị địa lý.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Đoạn mã ở đây để sử dụng latitude và longitude mà không hiển thị thông báo
    console.log("Vị trí của bạn là: " + latitude + ", " + longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("Người dùng từ chối yêu cầu định vị địa lý.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Thông tin vị trí không khả dụng.");
            break;
        case error.TIMEOUT:
            console.error("Yêu cầu lấy vị trí đã quá thời gian.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("Đã xảy ra lỗi không xác định.");
            break;
    }
}

// JavaScript Document
/*USER*/
function showform() {
    var userform = document.getElementById('user');
    userform.style.display = 'block';
}

function closeform() {
    var userform = document.getElementById('user');
    userform.style.display = 'none';
}

function showSignUp() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

document.getElementById('signupform').addEventListener('submit', createUser);
document.getElementById('loginform').addEventListener('submit', login);

function createUser(e) {
    e.preventDefault();
    var fullname = document.getElementById('fullname');
    var address = document.getElementById('address');
    var phone = document.getElementById('phone');
    var username = document.getElementById('usernameSignUp');
    var password = document.getElementById('passwordSignUp');
    var password2 = document.getElementById('passwordSignUp2');
    var flag = true;
    if (!fullname.value) {
        document.getElementById('fullnameerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('fullnameerror').style.display = 'none';
    }
    if (!address.value) {
        document.getElementById('addresserror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('addresserror').style.display = 'none';
    }
    if (!phone.value) {
        document.getElementById('phoneerror').style.display = 'block';
        flag = false;
    } else {
        if (isNaN(Number(phone.value))) {
            document.getElementById('phoneerror').style.display = 'block';
            document.getElementById('phoneerror').innerHTML = 'Số điện thoại không hợp lệ';
            flag = false;
        } else {
            if (Number(phone.value) < 100000000 || Number(phone.value) > 999999999) {
                document.getElementById('phoneerror').style.display = 'block';
                document.getElementById('phoneerror').innerHTML = 'Số điện thoại không đúng';
                flag = false;
            } else {
                document.getElementById('phoneerror').style.display = 'none';
            }
        }
    }
    if (!username.value) {
        document.getElementById('usererror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('usererror').style.display = 'none';
    }
    if (!password.value) {
        document.getElementById('passworderror').style.display = 'block';
        flag = false;
    } else {
        if (password.value.length < 8) {
            document.getElementById('passworderror').style.display = 'block';
            document.getElementById('passworderror').innerHTML = 'Mật khẩu phải trên 8 ký tự';
            flag = false;
        } else {
            document.getElementById('passworderror').style.display = 'none';
        }
    }
    if (password2.value != password.value) {
        document.getElementById('password2error').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('password2error').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var d = new Date();
    var datesignup = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var user = {
        username: username.value,
        password: password.value,
        fullname: fullname.value,
        address: address.value,
        phone: phone.value,
        datesignup: datesignup
    };
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (user.username == userArray[i].username) {
            document.getElementById('usererror').style.display = 'block';
            document.getElementById('usererror').innerHTML = 'Tên đăng nhập đã có người sử dụng';
            username.focus();
            return false;
        }
    }
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
    customAlert('Bạn đã đăng ký thành công!', 'success');
    showLogin();
}

function login(e) {
    e.preventDefault();
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;
    var flag = true;
    if (!username) {
        document.getElementById('usernameerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('usernameerror').style.display = 'none';
    }
    if (!password) {
        document.getElementById('passwordloginerror').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('passwordloginerror').style.display = 'none';
    }
    if (flag == false) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username) {
            if (password == userArray[i].password) {
                closeform();
                localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
                updateUIAfterLogin(); // Thêm hàm này để cập nhật giao diện
                return true;
            }
        }
    }
    document.getElementById('passwordloginerror').style.display = 'block';
    document.getElementById('passwordloginerror').innerHTML = 'Sai thông tin đăng nhập';
    return false;
}
function updateUIAfterLogin() {
    var user = JSON.parse(localStorage.getItem('userlogin'));
    var s = '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'index.html\')">LOGOUT</button></li>' +
        '<li><button onClick="location.href=\'cart.html\'"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Giỏ hàng</button></li>';
    document.querySelector('#nav .topnav ul.right').innerHTML = s;
}
window.onload = function () {
    checklogin(); // Thêm dòng này để kiểm tra đăng nhập khi tải trang
    // ... (Các dòng mã khác)
}

function logout(url) {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href = url;
}

function checklogin() {
    if (localStorage.getItem('userlogin')) {
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var s = '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'index.html\')">LOGOUT</button></li>' +
            '<li><button onClick="location.href=\'cart.html\'"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Giỏ hàng</button></li>';
        document.querySelector('#nav .topnav ul.right').innerHTML = s;
    }
}

function checklogin2() {
    if (localStorage.getItem('userlogin')) {
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var s = '<li><button>' + user.fullname + '</button><button id="btnlogout" onClick="logout(\'index.html\')">LOGOUT</button></li>' +
            '<li><button onClick="location.href=\'cart.html\'"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Giỏ hàng</button></li>';
        document.querySelector('#nav .topnav ul.right').innerHTML = s;
    }
}

/*END USER*/

/*CUSTOM ALERT BOX*/
function customAlert(message, type) {
    if (type == 'success') {
        document.getElementById("customalert").style.backgroundColor = '#4CAF50';
    }
    if (type == 'warning') {
        document.getElementById("customalert").style.backgroundColor = '#f44336';
    }
    document.getElementById("customalert").innerHTML = message;
    var x = document.getElementById("customalert");
    x.className = "show";
    setTimeout(function () {
        x.className = x.classList.remove("show");
    }, 3500);
}
function searchProduct() {
    var input, filter, cards, cardContainer, title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("productTabsContent");
    cards = cardContainer.getElementsByClassName("card");

    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
