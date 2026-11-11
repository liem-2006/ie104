# Job 1 — Hợp đồng phiên bản tích hợp

> Quyết định nhóm trưởng: giữ JavaScript hữu ích và tích hợp các PR. [Kế hoạch sửa lỗi và nghiệm thu](ke-hoach-tich-hop-sua-loi.md) thay thế các giới hạn chỉ HTML/CSS, filter disabled và trang chi tiết mẫu của Job 1 ban đầu.

## Quyền sở hữu và giao diện

TV1 phụ trách reset/style chung và khám phá; TV2 chi tiết/roadmap; TV3 danh bạ/hồ sơ/dữ liệu giảng viên. Nhóm trưởng đã giao tích hợp liên phần trên nhánh riêng. Các task tiếp theo phải chỉ rõ phạm vi, không tự ghi đè phần người khác. Header/footer là một mẫu chung được lặp trong HTML, chỉnh đường dẫn đúng độ sâu. Thứ tự CSS reset → style → CSS trang.

Chỉ HTML5/CSS3/JavaScript thuần, không framework/template. BEM, CSS scoped theo ID trang, font hệ thống. Style chung là nơi duy nhất định nghĩa token. Theme theo prefers-color-scheme; mobile dưới 768px, tablet 768–1023px, desktop từ 1024px. Thử 320/375/768/1024/1440px; không che tràn bằng overflow-x:hidden. Một h1/trang, focus rõ, label/alt đầy đủ. JS đơn nhiệm, JSDoc, khởi tạo DOMContentLoaded.

## Dữ liệu và liên kết

Fetch JSON cục bộ qua HTTP; dùng assets/js/data.js để đọc dữ liệu, đối chiếu email và tạo URL. Không đổi schema nghiên cứu hoặc thêm ID. Toàn bộ 37 chủ đề và 16 hồ sơ hoạt động, không dẫn tất cả về mẫu IDS/giảng viên mẫu. Children là tiên quyết của cha; không có quan hệ cross-topic. subjects và thông tin hồ sơ mở rộng là tùy chọn. Không tạo dữ liệu giả để lấp chỗ trống.

## Kiểm tra và bàn giao

Duy trì luồng khám phá → chủ đề → giảng viên → chủ đề liên quan. Kiểm tra URL sai, tải dữ liệu lỗi, không kết quả, tên dài, cây sâu, bàn phím và hai theme. Chạy root và subpath /ie104/. PR ghi thay đổi, cách thử và giới hạn đã biết. Đọc bản ghi sửa chữa của từng TV đặt cạnh phần code trước khi sửa tiếp.

Các JOB-1.md cũ là lịch sử phạm vi ban đầu. Quy định schema còn dùng theo data/JOB-1.md; phần cấm JavaScript/giới hạn trang mẫu đã được hợp đồng hiện hành này thay thế. Chủ repo duyệt và merge, thành viên không có quyền ghi repo chính.
