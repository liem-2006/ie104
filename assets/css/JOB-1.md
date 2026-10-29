# Job 1 — Các file CSS trong thư mục này

Đọc [hợp đồng chung](../../idea/job-1-rules.md) và AGENTS.md. Đầu vào là HTML của từng trang và bộ token TV1 được nhóm trưởng duyệt. Đầu ra là các file CSS dưới đây, không tạo JavaScript.

| File | Người phụ trách | Yêu cầu |
|---|---|---|
| `reset.css` | TV1 | Reset nhỏ tự viết: box-sizing, margin cần thiết, font form, ảnh co giãn. Giữ focus bàn phím; không chép thư viện. |
| `style.css` | TV1 | Token màu sáng/tối, font, spacing theo hợp đồng; container, header/nav/footer, nút/link và thẻ chủ đề chung. Theme theo prefers-color-scheme, chưa có nút JS. |
| `topics.css` | TV1 | Scope #page-topics; ô tìm/lọc, grid thẻ, trạng thái rỗng. Đọc [task TV1](../../topics/JOB-1.md). |
| `topic-detail.css` | TV2 | Scope #page-topic-detail; TV2 tự thiết kế cây, thụt lề/đường nối, trạng thái mở/focus và bố cục thông tin. Đọc [task TV2](../../topics/detail/JOB-1.md). |
| `lecturers.css` | TV3 | Scope #page-lecturers; grid 16 thẻ, tên/email dài, ảnh hoặc fallback. Đọc [task TV3](../../lecturers/JOB-1.md). |
| `lecturer-detail.css` | TV3 | Scope #page-lecturer-detail; hồ sơ, nguồn/chỉ số nghiên cứu, danh sách chủ đề. Đọc [task hồ sơ](../../lecturers/detail/JOB-1.md). |

## Quy tắc và nghiệm thu

- Chỉ người phụ trách sửa file của mình. TV2/TV3 cần thay đổi CSS chung thì đề nghị TV1 và nhóm trưởng, không tự ghi đè.
- BEM, Flexbox/Grid, media queries thuần; CSS trang dùng token đã chốt, không tự tạo bảng màu/font riêng.
- Trang HTML nạp reset.css → style.css → CSS riêng. Không inline CSS, không selector toàn cục trong file riêng.
- Kiểm tra mobile/tablet/desktop theo hợp đồng, hai theme, focus, nội dung dài, cây sâu 5 cấp; không cắt nội dung để che lỗi tràn ngang.
- TV1 gửi PR nền chung trước; các thành viên hoàn thiện CSS riêng sau khi nền được duyệt. PR có ảnh và kết quả kiểm tra CSS.
