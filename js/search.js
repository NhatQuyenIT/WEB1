// Trong tệp search.js

// Tìm kiếm theo tiêu đề và nội dung bài viết
function search() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    // Gọi API để lấy dữ liệu bài viết
    fetch("http://127.0.0.1:5503/index.html")
        .then(response => response.json())
        .then(articles => {
            // Lọc bài viết theo từ khóa tìm kiếm
            const filteredArticles = articles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.content.toLowerCase().includes(searchTerm)
            );

            // Hiển thị kết quả tìm kiếm
            displayResults(filteredArticles);
        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}

function displayResults(results) {
    const searchResultsList = document.getElementById("searchResults");
    // Xóa kết quả trước đó
    searchResultsList.innerHTML = "";

    // Hiển thị kết quả mới
    results.forEach(article => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${article.url}">${article.title}</a>`;
        searchResultsList.appendChild(listItem);
    });
}