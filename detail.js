document.addEventListener('DOMContentLoaded', function () {
    var priceElements = document.querySelectorAll(".price");
  
    priceElements.forEach(function (priceElement) {
        priceElement.addEventListener('click', function () {
            priceElement.classList.toggle('active');
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");
  
    cartIcon.onclick = () => {
      cart.classList.add("active");
    };
  
    closeCart.onclick = () => {
      cart.classList.remove("active");
    };
  });

  if (document.readyState == "loading" ) {
    document.addEventListener('DOMContentLoaded',ready)
  }
  else {
        ready();
  }
  function ready() {
    var removeCartButtons=document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;i <removeCartButtons.length;i++) {
        var button=removeCartButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for(var i=0;i<quantityInputs.length;i++) {
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    // add to cart
    var addCart= document.getElementsByClassName("add-cart");
    for(var i=0;i< addCart.length;i++) {
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    //buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
  }
  // buy button
  function buyButtonClicked() {
    alert("Đơn hàng của bạn đã được đặt");
    var cartContent=document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
  }
  // quantity changes
  function quantityChanged(event) {
    var input=event.target;
    if(isNaN(input.value) || input.value <=0 ) {
        input.value=1;
    }
    updateTotal();
  }

  // remove item form cart
  function removeCartItem(event) {
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  } 
  // add to cart 
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement.parentElement; // fixed typo in variable name
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
  }
  
  function addProductToCart(title,price,productImg) {   
    var cartShopBox=document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems=document.getElementsByClassName("cart-content");
    var cartItemsNames=cartItems.getElementsByClassName("cart-product-title");
    for(var i=0;i< cartItemsNames.length;i++) {
        alert("Bạn đã thêm sản phẩm này vào giỏ hàng");
        return;
    }
  
  }
  var cartBoxContent='<img src="${productImg}" alt="" class="cart-image"><div class="detail-box"><div class="cart-product-title"><span style="font-size: 0.8rem;">${title}</span></div><div class="cart-price">${price}</div><input type="number" value="1" class="cart-quantity"></div><i class="fa-solid fa-trash cart-remove"></i>';
  cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);

  // update total
  function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("đ",""));
        var quantity = parseInt(quantityElement.value);
        total = total + (price * quantity);
    }
    document.getElementsByClassName("total-price")[0].innerText =  + formatMoney(total);
}

// Hàm định dạng số thành chuỗi tiền Việt Nam
function formatMoney(number) {
    var parts = number.toFixed(3).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".") + " ₫";
}


// let cartIcon=document.querySelector("#cart-icon");
// let cart=document.querySelector(".cart");
// let closeCart=document.querySelector("#close-cart");
// cartIcon.onclick = () => {
//     cart.classList.add("active");
// };
// closeCart.onclick=() => {
//     cart.classList.remove("active");
// };

// if(document.readyState == "loading") {
//     document.addEventListener("DOMContentLoaded",ready);
// }
// else {
//     ready();
// }
// // làm function 
// function ready() {
//     // remove items from cart 
//     var removeCartButtons=document.getElementsByClassName("cart-remove");
//     console.log(removeCartButtons);
//     for(var i=0;i <removeCartButtons.length;i++) {
//         var button=removeCartButtons[i];
//         button.addEventListener("click",removeCartItem);
//     }
//     // Quantity changes
//     var quantityInputs=document.getElementsByClassName("cart-quantity");
//     for(var i=0;i <quantityInputs.length;i++)  {
//         var input=quantityInputs[i];
//         input.addEventListener("change",quantityChanged);
//     }
//     // add to cart
//     var addCart=document.getElementsByClassName("add-cart");
//     for (var i=0;i<addCart.length;i++) {
//         var button=addCart[i];
//         button.addEventListener("click",addCartClicked);
//     }
// }

// // remove items from cart
// function removeCartItem(event) {
//    var buttonClicked=event.target;
//    buttonClicked.parentElement.remove(); 
//    updateTotal();
// }
// // Quantity changes
// function quantityChanged(event) {
//     var input =event.target;
//     if (isNaN(input.value) || input.value <=0) {
//         input.value=1;
//     }
//     updateTotal();
// }
// // add to cart
// function addCartClicked(event) {
//     var button = event.target;
//     var shopProducts = button.parentElement;
//     var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
//     var price = shopProducts.getElementsByClassName("price")[0].innerText;
//     var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
//     addProductToCart(title, price, productImg);
//     updateTotal();
// }

// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement("div");
//     cartShopBox.classList.add("cart-box");
//     var cartItems = document.querySelector(".cart-content"); // Sử dụng querySelector thay vì getElementsByClassName
//     var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

//     // Lặp qua các tên sản phẩm trong giỏ hàng
//     for (var i = 0; i < cartItemsNames.length; i++) {
//             alert("Bạn đã thêm sản phẩm này vào giỏ hàng");  
//     }
// }
// var cartBoxContent=""
// // update total
// function updateTotal() {
//     var cartContent=document.getElementsByClassName("cart-content")[0];
//     var cartBoxes = cartContent.getElementsByClassName("cart-box");
//     var total=0;
//     for(var i=0;i< cartBoxes.length;i++) {
//         var cartBox=cartBoxes[i];
//         var priceElement=cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
//         var price=parseFloat(priceElement.innerText.replace("đ",""));
//         var quantity=quantityElement.value;
//         total= total+(price * quantity);
//         // if price contain some cents value
//         total=Math.round(total * 100)/100;
//         document.getElementsByClassName("total-price")[0].innerText=total+"đ";
//     }
// }