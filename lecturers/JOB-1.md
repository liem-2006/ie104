# TV3 — Danh bạ và hồ sơ giảng viên

## Yêu cầu giao diện hiện hành

> Cập nhật ngày 12/11/2026 theo quyết định thiết kế lại của nhóm trưởng. Phần này là yêu cầu áp dụng khi tiếp tục sửa code.

### Mục tiêu và đầu vào

Danh bạ và hồ sơ phải cùng phong cách tra cứu với trang khám phá. Đầu vào: 16 giảng viên trong data/lecturers.json, các chủ đề trong data/research-data.json, email làm khóa nối, token/header của TV1. Đọc [hợp đồng chung](../idea/job-1-rules.md), AGENTS.md và skill IE104.

### Phạm vi và đầu ra

| File | Trách nhiệm |
|---|---|
| `lecturers/index.html`, `assets/css/lecturers.css`, `assets/js/lecturers.js` | Tìm tên/email, lọc nhóm suy từ chủ đề thực, reset; desktop cùng hàng, mobile xếp dọc; grid 3/2/1 cột |
| `lecturers/detail/index.html`, `assets/css/lecturer-detail.css`, `assets/js/lecturer-detail.js` | Hồ sơ động đúng email, avatar/tên/đơn vị/email, phần nghiên cứu tùy chọn và chủ đề liên quan |

Không thu thập thêm thông tin/ảnh trong đợt giao diện này. Không sửa JSON, schema, CSS chung hoặc URL.

### Quy tắc bắt buộc

- Card ưu tiên tên/email/nhóm. Xem hồ sơ là link gọn có vùng bấm ít nhất 44px, không kéo nút hết chiều ngang.
- Tìm trực tiếp khi nhập; form vẫn có nút Tìm và submit được xử lý trong JS. Reset dùng hành vi native rồi render sau reset.
- Nhóm lấy từ chủ đề theo email chuẩn hóa, không tự gán. Mọi người trong JSON đều mở được hồ sơ, URL sai không fallback người mẫu.
- Hồ sơ có đúng một h1 ở phần đầu; nguồn/ngày của thông tin và chỉ số được giữ. Thiếu dữ liệu chỉ dùng ghi chú ngắn hoặc ẩn khối tùy chọn.
- 0 thật vẫn hiện; thiếu không thành 0. Ảnh lỗi/thiếu về chữ cái; URL ngoài chỉ HTTP(S), có rel an toàn.
- Chủ đề liên quan gọi createTopicRow từ module chung với heading cấp 3; không copy một phiên bản component khác.
- CSS riêng scope theo #page-lecturers hoặc #page-lecturer-detail, không khai báo :root/header dùng chung riêng.

### Nghiệm thu và tự kiểm tra

Mở bằng Live Server từ root. Tìm tên không dấu/email, lọc nhóm, reset, Enter/nút Tìm. Mở đủ 16 hồ sơ, đối chiếu số chủ đề theo email; thử người thiếu thông tin/ảnh/chỉ số, link hỏng và dữ liệu rỗng. Kiểm tra lưới 1/2/3 cột, hai theme, 320/375/768/1024/1440px; tên/email dài không làm tràn.

Đọc thêm [task hồ sơ](detail/JOB-1.md) và [ghi nhận TV3](SUA-CHUA-TV3.md); TV3 chỉ có một bản ghi sửa chữa bao quát cả hai màn hình.

## Lịch sử giao việc ban đầu

<details>
<summary>Mở bản giao việc cũ để đối chiếu; yêu cầu hiện hành ở trên được ưu tiên.</summary>

> **Bản giao việc ban đầu, lưu để đối chiếu.** Giới hạn chỉ HTML/CSS, chức năng disabled và một trang mẫu đã được thay thế bởi [kế hoạch tích hợp](../idea/ke-hoach-tich-hop-sua-loi.md). Các quy định schema và code còn phù hợp vẫn được giữ.

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

</details>
