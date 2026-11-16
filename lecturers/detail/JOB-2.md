> **Nhóm trưởng cập nhật sau Job 2 (17/11/2026):** Hộp chuyển chủ đề chỉ chứa đề tài cùng giảng viên, đóng được bằng nền tối và giữ nút Đóng khi cuộn. Footer năm trang chuyển sang thông tin dự án/trường. Đọc [lịch sử sửa chữa](../job2-sua-chua-tv2.md) để biết phần giữ lại, phần nhóm trưởng sửa và cách kiểm tra. Bản local chờ duyệt.

> **Cập nhật 17/11/2026 — Material:** Sơ đồ mặc định cả mobile; Danh sách là accordion một cấp với nội dung phẳng, con trước cha. Giữ token xanh UIT, theme sáng mặc định và lựa chọn đã lưu. Header trang chủ chỉ logo/theme. Quy tắc này thay các mô tả cũ tương ứng. Bản local chờ duyệt; xem bản ghi Job 2 và kế hoạch tổng.

> **Cập nhật 17/11/2026:** bản local 9cc27d6 luôn A–Z (bỏ chọn sắp xếp), nút nhóm không giãn, đổi chủ đề bằng dialog tìm kiếm, node có trợ giúp outcome, logo không nền trắng; mặc định sáng và giữ theme đã lưu. Quyết định này thay các mô tả cũ liên quan. Xem bản ghi job2-sua-chua được dẫn bên dưới. Chưa duyệt merge.

> Lịch sử bản ghép: [Job 2 — sửa chữa TV2](../job2-sua-chua-tv2.md). Chờ nhóm trưởng kiểm tra, chưa merge.

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

Trạng thái: CHƯA THỰC HIỆN.