# TV3 — Hồ sơ giảng viên

## Yêu cầu giao diện hiện hành

> Cập nhật ngày 12/11/2026 theo quyết định thiết kế lại của nhóm trưởng. Phần này là yêu cầu áp dụng khi tiếp tục sửa code.

### Mục tiêu, đầu vào và file đích

Phần này thuộc [task TV3](../JOB-1.md), dùng data/lecturers.json và data/research-data.json; không chỉ làm một hồ sơ mẫu. URL nhận email, tìm và nối qua email trim/chữ thường.

File đích: `index.html` tại đây, `assets/css/lecturer-detail.css` và `assets/js/lecturer-detail.js` tính từ root repo. Đầu ra là mọi hồ sơ đúng dữ liệu, cùng bộ màu/font/container với TV1.

### Nội dung và quy tắc

- H1 tên giảng viên nằm cùng phần đầu với avatar, đơn vị nếu có và mailto. Giữ đúng một h1 kể cả sau render động hoặc báo lỗi.
- Giới thiệu ngắn; hướng nghiên cứu, hồ sơ ngoài và chỉ số chỉ dựng khi có dữ liệu. Không tạo nhiều khối Chưa bổ sung trống lớn.
- Giữ nguồn/ngày của chỉ số; thiếu không thành 0. Avatar thiếu/hỏng về chữ cái; link ngoài được kiểm tra an toàn.
- Danh sách chủ đề dùng createTopicRow(entry,3) từ assets/js/data.js và topicUrl; heading mục là h2, tên chủ đề là h3.
- Giữ aria-busy và thông báo tải; finally luôn giải phóng sau render/thất bại. URL sai hiển thị Không tìm thấy, không chuyển sang giảng viên mẫu.
- Dùng CSS scope #page-lecturer-detail. Không sửa schema, dữ liệu hoặc màu/header chung.

### Nghiệm thu và tự kiểm tra

Mở trực tiếp bằng email, reload, Back/Forward, liên kết sang roadmap và quay lại danh bạ. Thử đủ 16 người, email viết hoa/khoảng trắng, URL sai, thiếu ảnh/tiểu sử/chỉ số; 320px và 1440px, hai theme. Báo cáo thay đổi và kết quả chung đặt tại [SUA-CHUA-TV3.md](../SUA-CHUA-TV3.md), không tạo bản ghi TV3 thứ hai.

## Lịch sử giao việc ban đầu

<details>
<summary>Mở bản giao việc cũ để đối chiếu; yêu cầu hiện hành ở trên được ưu tiên.</summary>

> **Bản giao việc ban đầu, lưu để đối chiếu.** Giới hạn chỉ HTML/CSS, chức năng disabled và một trang mẫu đã được thay thế bởi [kế hoạch tích hợp](../../idea/ke-hoach-tich-hop-sua-loi.md). Các quy định schema và code còn phù hợp vẫn được giữ.

# TV3 — HTML hồ sơ giảng viên

## Đầu vào và phạm vi

Đọc [task TV3](../JOB-1.md), [schema giảng viên](../../data/JOB-1.md) và [quy tắc chung](../../idea/job-1-rules.md). Dùng giảng viên mẫu camnt@uit.edu.vn; tên/email và chủ đề lấy từ data/research-data.json, thông tin bổ sung từ data/lecturers.json.

## File cần tạo tại đây: index.html

- Body có id page-lecturer-detail; lang=vi, UTF-8, viewport, title, một h1 là tên giảng viên.
- Sao chép header/footer mẫu TV1, chỉnh đường dẫn và menu hiện hành. Nạp ../../assets/css/reset.css, style.css, lecturer-detail.css.
- Link về danh bạ: ../index.html. Email dùng mailto.
- Hiển thị tên, email; ảnh có alt nếu có, thiếu ảnh dùng chữ cái/tên.
- Đơn vị, giới thiệu, lĩnh vực, liên kết nghiên cứu và chỉ số chỉ hiển thị khi có dữ liệu. Chỉ số kèm nguồn/ngày/phạm vi; thiếu dữ liệu không hiển thị số 0 giả.
- Danh sách chủ đề lấy đúng theo email; chủ đề mẫu IDS liên kết ../../topics/detail/index.html, những chủ đề khác ghi chưa có trang mẫu.
- Đường dẫn ảnh trong JSON tính từ gốc repo; ở trang này thêm ../../. Link ngoài mở tab mới có rel="noopener noreferrer".
- Chưa fetch, JS, nút liên hệ gửi tự động hay dữ liệu bịa. Không tạo trang riêng cho từng giảng viên ở Job 1.

## Đầu ra và nghiệm thu

Một trang HTML mẫu đầy đủ, liên kết đúng khi tích hợp, dùng CSS do TV3 viết theo [task CSS](../../assets/css/JOB-1.md). Thử trạng thái có/không ảnh và chỉ số khi có dữ liệu đã xác minh; nếu chưa có thì thử fallback và ghi giới hạn, không bịa dữ liệu để đạt checklist. Thử email dài, bàn phím, mobile/desktop và hai theme. PR ghi minh chứng cùng kết quả kiểm tra HTML. Không sửa file của TV1/TV2.

</details>
