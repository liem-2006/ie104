# Ghi nhận sửa chữa TV3 — Danh bạ, hồ sơ và dữ liệu

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
