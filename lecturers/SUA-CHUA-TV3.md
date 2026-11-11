# Ghi nhận sửa chữa TV3 — Danh bạ, hồ sơ và dữ liệu

> Bản hiện hành ngày 12/11/2026: thiết kế học thuật được nhóm trưởng duyệt. Nội dung tích hợp trước đó được giữ trong phần Lịch sử bên dưới.

## Thiết kế lại giao diện học thuật

### Phần được giữ

Giữ JSON giảng viên, tìm/lọc theo dữ liệu thật, email làm khóa nối, ảnh fallback, thông tin nghiên cứu có nguồn/ngày, chỉ số 0 thật và cách bỏ URL nguy hiểm. Không bổ sung hoặc xác minh học thuật lại dữ liệu.

### Trước → sau

| Trước | Sau | Lý do | File liên quan |
|---|---|---|---|
| Bộ lọc kéo thành biểu mẫu nhiều hàng desktop | Tìm kiếm, nhóm và thao tác trên một hàng desktop, mobile xếp dọc | Dùng không gian phù hợp màn hình | lecturers/index.html, lecturers.css |
| Nút Xem hồ sơ rộng hết thẻ | Link gọn cạnh số chủ đề, vùng bấm 44px | Thẻ nhẹ và bớt nút lặp nổi bật | lecturers.js, lecturers.css |
| Card và hồ sơ có khoảng cách/màu riêng | Dùng token chung, grid 3/2/1 cột và typography chung | Cùng một website với TV1/TV2 | Hai CSS riêng |
| H1 nằm tách khỏi avatar/email | H1 chuyển vào header hồ sơ, đúng một h1 | Nhóm thông tin cá nhân tự nhiên | lecturer-detail.js |
| Các mục thiếu dữ liệu tạo nhiều khối Chưa bổ sung | Một ghi chú ngắn; ẩn liên kết/chỉ số không có dữ liệu | Không tạo cảm giác hồ sơ rỗng lớn | lecturer-detail.js |
| Logic renderProfile gom nhiều phần | Tách header, giới thiệu, liên kết và chủ đề thành hàm riêng | Dễ giải thích và bảo trì | lecturer-detail.js |
| Chủ đề liên quan có HTML riêng | Gọi createTopicRow(entry,3), dùng chung hàng với khám phá | Cùng kiểu hiển thị và URL | lecturer-detail.js, data.js |
| Hồ sơ thay placeholder khi JSON tới | aria-busy và giải phóng trong finally | Hạn chế dịch chuyển và trạng thái tải bị kẹt | lecturers/detail/index.html, CSS/JS hồ sơ |

### Quy ước tiếp tục làm

Dữ liệu/schema không đổi. Nhóm luôn suy từ chủ đề theo email chuẩn hóa; không tự gán lĩnh vực. Component hàng thuộc TV1, TV3 gọi lại với heading cấp 3. Không khai báo token/header riêng. Nút Tìm/Enter và tìm trực tiếp cùng dùng renderLecturers; reset native xong mới render. Các khối tùy chọn chỉ có khi đủ dữ liệu, nguồn/ngày giữ nguyên, URL ngoài chỉ HTTP(S).

### Tự chạy và kết quả thực tế

Live Server → Giảng viên → hồ sơ. Tìm theo tên không dấu/email, đổi nhóm, Tìm/Enter, reset; mở chủ đề liên quan rồi quay lại. Thử hồ sơ thiếu thông tin, ảnh hỏng, chỉ số thiếu/0 và URL sai.

Đã mở đủ 16 hồ sơ: tên, một h1 và số chủ đề khớp email. Lưới 1/2/3 cột đúng ở mobile/tablet/desktop, tên/email không tràn. Tìm/lọc/Tìm/Enter/reset hoạt động. Fixture ảnh hỏng về chữ cái; chỉ hiện một giá trị 0 thật, không tạo 0 cho mục thiếu; javascript URL bị bỏ. Cả hai HTML nguồn hợp lệ theo công cụ cục bộ. Accessibility hai theme nằm trong 20 ca chung không vi phạm phát hiện.

Ảnh: [danh bạ desktop](../idea/minh-chung-giao-dien/giang-vien-desktop.png), [hồ sơ mobile tối](../idea/minh-chung-giao-dien/ho-so-mobile-toi.png). Lighthouse và giới hạn: [kế hoạch chung](../idea/ke-hoach-tich-hop-sua-loi.md#giao-dien-hoc-thuat).

Commit triển khai: 0c94920; bổ sung nút submit ngữ nghĩa: dcb925f.

## Lịch sử tích hợp trước thiết kế lại

<details>
<summary>Mở bản ghi tích hợp cũ để đối chiếu.</summary>

> Đọc nhanh: giữ JSON 16 giảng viên và bố cục card/hồ sơ của PR #1; render động theo email và dùng theme TV1. File này bao quát cả hai trang và dữ liệu. [Kế hoạch và nghiệm thu chung](../idea/ke-hoach-tich-hop-sua-loi.md).

## Đóng góp được giữ

Nguồn: PR #1, commit 292c4aa00bad124ca1d25f6ff10ffabb513581cb. Giữ nguyên lecturers.json, danh mục 16 người, schema thông tin tùy chọn và thông tin nghiên cứu đã có; giữ bố cục card, avatar, hồ sơ, chỉ số và chủ đề liên quan. Không thu thập thêm hoặc khẳng định đã xác minh lại các chỉ số học thuật.

## Những gì đã sửa hoặc thay thế

| Trước | Sau | Lý do | File liên quan |
|---|---|---|---|
| :root fallback trong mỗi CSS ghi đè màu/font/spacing | Chỉ tham chiếu token chung TV1 | CSS tải sau không đổi theme toàn trang | assets/css/lecturers.css, lecturer-detail.css |
| Mỗi trang định dạng lại header/nav/footer/container | Cùng shell và CSS nền TV1 | Điều hướng và khoảng cách thống nhất | lecturers/index.html, lecturers/detail/index.html |
| HTML viết sẵn 16 card và một hồ sơ mẫu | Fetch JSON, render danh bạ và mọi hồ sơ theo email | Không dẫn người khác về hồ sơ mẫu | assets/js/lecturers.js, lecturer-detail.js |
| Tìm kiếm disabled, onsubmit inline | Tìm kiếm tên/email không dấu, lọc nhóm, reset; sự kiện trong JS | Tính năng thực và đúng quy chuẩn code | HTML/JS danh bạ |
| Tên nhóm tự viết khác nguồn | Nhóm suy ra từ chủ đề, tên lấy group.name | Khớp 3 nhóm của dữ liệu nghiên cứu | assets/js/lecturers.js |
| Danh sách chủ đề viết sẵn ở hồ sơ mẫu | Lọc toàn bộ chủ đề theo email | Đúng số lượng và đúng giảng viên | assets/js/lecturer-detail.js |
| Link chủ đề mẫu, các chủ đề khác chưa mở được | Mỗi chủ đề có link group/topic/email | Nối đủ hồ sơ → roadmap | assets/js/data.js, lecturer-detail.js |
| Trạng thái thông tin thiếu còn tĩnh | Fallback avatar/chưa bổ sung, ẩn chỉ số thiếu | Không tạo ảnh/chỉ số giả | assets/js/data.js, lecturer-detail.js |
| URL ảnh/liên kết chưa có lớp kiểm tra chung | HTTP(S) và fallback lỗi ảnh; bỏ URL không an toàn | Dữ liệu tùy chọn không phá UI | assets/js/data.js |
| Số 0 có thể bị coi là dữ liệu thiếu nếu dùng điều kiện truthy | Kiểm tra kiểu number và >=0 | Giữ số 0 thật, không sinh số 0 giả | assets/js/lecturer-detail.js |

## Quy ước tiếp tục làm

- Email trim/chữ thường là khóa nối. Không thêm ID giảng viên và không lưu bản danh sách chủ đề riêng trong lecturers.json.
- name/email bắt buộc; profile/photo/researchProfiles/metrics tùy chọn theo schema data/JOB-1.md.
- Thiếu dữ liệu thì bỏ trường, hiển thị chưa bổ sung hoặc ẩn khối; không điền placeholder thành thông tin thật.
- Chỉ số chỉ hiển thị khi có nguồn và ngày; hiện giao diện giữ nguồn đã cung cấp, không tuyên bố xác minh học thuật.
- CSS scope #page-lecturers hoặc #page-lecturer-detail. Không tự khai báo :root hoặc định dạng lại shell chung.
- Mọi hồ sơ mở qua lecturerUrl(email); link đề tài qua topicUrl(group,topic). Không dùng link mẫu cho toàn bộ danh bạ.

## Tự chạy và kiểm tra

Chạy Live Server từ root, mở lecturers/index.html. Thử tên/email không dấu, nhóm sec/data/nlp, reset và không có kết quả. Mở nhiều giảng viên khác nhau; tên/email và danh sách chủ đề phải đổi đúng. Thử một hồ sơ chỉ có name/email và hồ sơ có chỉ số; xem nguồn/ngày. Thử email sai và email viết hoa trong URL.

Đã kiểm tra 16 hồ sơ với tên và số chủ đề đúng nguồn; lọc sec cho 4 giảng viên; thử ảnh URL lỗi, URL javascript, chỉ số 0 và thiếu chỉ số bằng fixture tạm. Không sửa dữ liệu thật để tạo ca thử. HTML-Validate 0 lỗi, axe không phát hiện lỗi WCAG ở hai theme và mobile. Lighthouse mobile: danh bạ 97/100/100/100; hồ sơ 93/100/100/100. Giới hạn W3C và trình duyệt xem tài liệu chung.

</details>
