# Job 2 — TV2: phần hồ sơ giảng viên

> Git Job 2: clone fork cá nhân → fetch upstream → tạo nhánh task riêng từ upstream/integration/job-2 → push lên origin → PR về liem-2006/ie104:integration/job-2. Xem [hướng dẫn clone mới hoặc dùng repo có sẵn](../../CONTRIBUTING.md). Không viết trực tiếp trên nhánh chung.


> Đây là phần thứ hai của [task TV2](../JOB-2.md). Cùng một PR gửi vào integration/job-2, lấy upstream/integration/job-2 làm nền; cùng quy tắc và checklist; ghi kết quả tập trung tại task TV2, không tạo báo cáo riêng.

## Đầu vào và file đích

Đọc [ghi nhận sửa chữa TV3](../SUA-CHUA-TV3.md) và phần yêu cầu chức năng trong [JOB-1.md](JOB-1.md). Hai JSON hiện có là đầu vào chỉ đọc, email là khóa nối.

Được sửa lecturers/detail/index.html, assets/css/lecturer-detail.css (scope #page-lecturer-detail), assets/js/lecturer-detail.js và tài liệu này. Đường dẫn tính từ root repo.

## Công việc và đầu ra

- Rà phần đầu avatar/tên/đơn vị/email, giới thiệu, nghiên cứu và chủ đề; cải thiện khả năng đọc trên mobile/desktop theo IE106, code tuân IE104.
- Giữ style hiện tại và component chung. Không sửa data.js, theme.js, style.css, dữ liệu hoặc header/footer chung; gửi đề xuất cho nhóm trưởng nếu cần.
- Render đủ 16 hồ sơ theo email; giữ nguồn/ngày chỉ số và giá trị 0 có thật. Không tự thêm thông tin, không tạo khối trống lớn.
- Giữ đúng một h1, tiêu đề mục h2 và chủ đề h3. Link chủ đề đúng group/topic/email; không dùng tên chủ đề đơn lẻ để xác định bản ghi.
- Thử ảnh hỏng/thiếu, trường tùy chọn thiếu, URL sai, email chuẩn hóa, reload/Back/Forward, bàn phím, hai theme và năm kích thước theo task chung.
- Bàn giao code, ảnh trước/sau và kết quả trong lecturers/JOB-2.md; TV3 góp ý, nhóm trưởng merge.

Trạng thái: ĐÃ HOÀN THÀNH. Kết quả nghiệm thu tập trung tại [lecturers/JOB-2.md](../JOB-2.md).