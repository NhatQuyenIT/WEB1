const searchInput = document.getElementById('search-inp');
const searchButton = document.getElementById('button-addon2');

// Xử lý sự kiện khi nhấn nút tìm kiếm
searchButton.addEventListener('click', function(){
    localStorage.setItem('searching', searchInput.value);
    window.location.href = 'index.html';
    //gọi hàm checkSearching để hiển thị sản phẩm tìm kiếm
});
