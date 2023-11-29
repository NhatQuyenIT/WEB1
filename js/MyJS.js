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


