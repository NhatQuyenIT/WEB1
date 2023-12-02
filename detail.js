document.addEventListener('DOMContentLoaded', function () {
    var priceElements = document.querySelectorAll(".price");

    priceElements.forEach(function (priceElement) {
        priceElement.addEventListener('click', function () {
            priceElement.classList.toggle('active');
        });
    });

    var cartIcon = document.querySelector("#cart-icon");
    var cart = document.querySelector(".cart");
    var closeCart = document.querySelector("#close-cart");

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    if (document.readyState == "loading") {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {
        var removeCartButtons = document.querySelectorAll(".cart-remove");
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener("click", removeCartItem);
        }

        var quantityInputs = document.querySelectorAll(".cart-quantity");
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged);
        }

        var addCart = document.querySelectorAll(".add-cart");
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }

        document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);
    }

    function buyButtonClicked() {
        alert("Đơn hàng của bạn đã được đặt");
        var cartContent = document.querySelector(".cart-content");
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
    }

    function addCartClicked(event) {
        var button = event.target;
        var shopProduct = button.closest(".card");
        var title = shopProduct.querySelector(".product-title").innerText;
        var price = shopProduct.querySelector(".price").innerText;
        var productImg = shopProduct.querySelector(".pro").src;
        addProductToCart(title, price, productImg);
        updateTotal();
    }

    function addProductToCart(title, price, productImg) {
        var cartItems = document.querySelector(".cart-content");
        var cartItemsNames = cartItems.querySelectorAll(".cart-product-title");

        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText === title) {
                alert("Bạn đã thêm sản phẩm này vào giỏ hàng");
                return;
            }
        }

        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-image">
            <div class="detail-box">
                <div class="cart-product-title"><span style="font-size: 0.8rem;">${title}</span></div>
                <div class="cart-price">${formatMoney(price)}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
        `;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.appendChild(cartShopBox);

        cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
        cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    }

    function updateTotal() {
        var cartContent = document.querySelector(".cart-content");
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var total = 0;
    
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.querySelector(".cart-price");
            var quantityElement = cartBox.querySelector(".cart-quantity");
    
            // Lấy textContent thay vì innerText để lấy toàn bộ nội dung văn bản
            var priceText = priceElement.textContent.trim();
    
            // Tách bỏ ký tự "đ" và thay thế dấu phẩy
            var price = parseFloat(priceText.replace("đ", "").replace(/\./g, "").replace(",", "."));
    
            var quantity = parseInt(quantityElement.value);
            total += price * quantity;
        }
    
        var totalFormatted = formatMoney(total);
        document.querySelector(".total-price").innerText = totalFormatted;
    }
    
    function formatMoney(number) {
        // Sử dụng định dạng tiền tệ 'vi-VN' với đồng (VND)
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
});
