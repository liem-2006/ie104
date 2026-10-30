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
