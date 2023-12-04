checkSearching();
// Hàm checkSearching
function checkSearching() {
    fetch(productApi)
    .then((response) => response.json())
    .then((products) => {
        let searchingData = localStorage.getItem('searching');
        
        if (searchingData){
            var container = document.getElementById('body');
            var htmls = ' ';
            var filteredProducts = products.filter((element) =>
            element.name.toLowerCase().indexOf(searchingData.toLocaleLowerCase()) >= 0
            );

            filteredProducts.forEach((element) => {
                if (element.status === 'Enabled'){
                    htmls +=
                    ` <div class = "col-sm-3 col-6" id="item-${element.id}" onmouseover="addHoverEffect(this)" onmouseout="removeHoverEffect(this)"
                    onclick  = "transferPage(${element.id})">
                    <img class = "mb-3" src="${element.img.url}" alt="">
                    <p class = "mb-1 font-weight-bold title text-center">${element.name}</p>
                    <span class = "star item-start">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <p class = "font-weight-bold text-center">${element.price}</p>
                    </div>
                    `;
                }
            });
            container.innerHTML = htmls;
            localStorage.removeItem("searching");
        }        
    });
}
