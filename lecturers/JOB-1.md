# TV3 — Dữ liệu giảng viên, danh bạ và hồ sơ

Đọc `../idea/job-1-rules.md`, AGENTS.md và skill. Task bao gồm `lecturers/detail/`; không được sửa dữ liệu nghiên cứu hoặc CSS chung của TV1.

## Đầu vào / đầu ra

Đầu vào: `data/research-data.json` (16 email giảng viên duy nhất), schema tại data/JOB-1.md, mẫu header/footer và theme được duyệt. Đầu ra: danh mục JSON giảng viên và hai trang HTML/CSS responsive; hồ sơ mẫu dùng `camnt@uit.edu.vn`.

## File được tạo

| File tính từ gốc repo | Nội dung và giới hạn |
|---|---|
| `data/lecturers.json` | Đủ 16 giảng viên, lọc trùng theo email; giữ tên/email từ nguồn. Thông tin mở rộng tùy chọn, có nguồn và ngày xác minh. |
| `lecturers/index.html` | Body `page-lecturers`; h1, tìm tên có label/disabled và ghi chú chặng JS; 16 thẻ tên, email, ảnh nếu có, nhóm liên quan suy từ chủ đề. Chỉ GV mẫu có link chi tiết. |
| `lecturers/detail/index.html` | Body `page-lecturer-detail`; tên/email, ảnh nếu có, thông tin cơ bản và nghiên cứu có nguồn, danh sách chủ đề liên quan từ JSON nghiên cứu theo email. Link chủ đề mẫu và quay lại. |
| `assets/css/lecturers.css` | Scope `#page-lecturers`; grid danh bạ, thẻ và trạng thái thiếu ảnh; sử dụng token chung. |
| `assets/css/lecturer-detail.css` | Scope `#page-lecturer-detail`; thông tin cá nhân, liên kết nghiên cứu, chỉ số và danh sách chủ đề, co giãn trên mobile. |
| `assets/images/lecturers/<ten-file>.jpg` hoặc `.png`, `.webp` | Tùy chọn, chỉ khi được phép sử dụng; ghi nguồn ảnh trong JSON. Không lấy ảnh người trùng tên hoặc dùng ảnh AI thay chân dung thật. |

## Hướng dẫn tại thư mục đích

- [Schema và nhiệm vụ JSON](../data/JOB-1.md): bản định nghĩa schema duy nhất, đặt cạnh lecturers.json.
- [HTML hồ sơ chi tiết](detail/JOB-1.md).
- [Phân công từng file CSS](../assets/css/JOB-1.md).
- [Ảnh giảng viên](../assets/images/lecturers/JOB-1.md).

## Phạm vi thu thập

Ưu tiên danh mục 16 tên/email và hoàn thiện thông tin mở rộng đã xác minh cho hồ sơ mẫu. Không bắt buộc đủ ảnh/chỉ số cho mọi người; không để việc thu thập làm chậm giao diện. Chưa có dữ liệu thì hiển thị “Chưa cập nhật” ở phần tương ứng hoặc ẩn khối; không biến thiếu số liệu thành thành tích bằng 0. Không mở rộng sang giảng viên ngoài danh sách.

Job 1 điền HTML tĩnh theo JSON, chưa fetch/render hoặc tìm kiếm bằng JS. Mỗi nguồn nghiên cứu mở tab mới dùng rel="noopener noreferrer". Đối chiếu tên/email, cú pháp JSON, ngày ISO, số nguyên, nguồn/ảnh và link chủ đề trước khi bàn giao.

## Nghiệm thu

Đủ 16 email duy nhất, đúng dữ liệu nghiên cứu; trường tùy chọn xử lý được khi thiếu. Hai trang dùng chung theme/header/footer, không tràn nội dung email dài; link mẫu đúng và không dẫn mọi giảng viên vào hồ sơ mẫu. PR có ảnh mobile/desktop hai theme, nguồn cho dữ liệu bổ sung và kiểm tra HTML/CSS/JSON.
