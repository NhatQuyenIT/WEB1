document.addEventListener('DOMContentLoaded', function () {
    var priceElements = document.querySelectorAll(".price");
  
    priceElements.forEach(function (priceElement) {
        priceElement.addEventListener('click', function () {
            priceElement.classList.toggle('active');
        });
    });
});
    