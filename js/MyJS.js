<script>
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("Trình duyệt không hỗ trợ định vị địa lý.");
            }
        }

        function showPosition(position) {
            alert("Vị trí của bạn là: " + position.coords.latitude + ", " + position.coords.longitude);
        }

        // Gọi hàm để lấy vị trí khi trang được tải
        getLocation();
    </script>