
let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith("listCart="));

    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split("=")[1]);
    }
}

function addCartToHTML() {
    let listCartHTML = document.querySelector(".returnCart .list");
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector(".totalQuantity");
    let totalPriceHTML = document.querySelector(".totalPrice");

    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart) {
        listCart.forEach(product => {
            if (product) {
                let newP = document.createElement("div");
                newP.classList.add("item");

                newP.innerHTML = `<img src="${product.image}" alt="">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">${formatMoney(product.price)}đ/1 sản phẩm</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">${formatMoney(product.price * product.quantity)}đ</div>`;

                listCartHTML.appendChild(newP);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + product.price * product.quantity;
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = formatMoney(totalPrice);
}

function formatMoney(number) {
    // Sử dụng định dạng tiền tệ 'vi-VN' với đồng (VND)
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

document.getElementById("btnBuy").addEventListener("click", function () {
    // Cập nhật thông tin giỏ hàng
    checkCart();
    addCartToHTML();

    // Chuyển hướng đến trang checkout.html và truyền thông tin giỏ hàng qua URL
    window.location.href = "checkout.html?cart=" + encodeURIComponent(JSON.stringify(listCart));
});
