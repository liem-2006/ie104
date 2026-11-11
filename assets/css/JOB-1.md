# CSS — Phân công và bộ quy tắc dùng chung

## Yêu cầu giao diện hiện hành

> Cập nhật ngày 12/11/2026 theo quyết định thiết kế lại của nhóm trưởng. Phần này là yêu cầu áp dụng khi tiếp tục sửa code.

### Đầu vào và đầu ra

Đầu vào: HTML/JS hiện hành và quyết định giao diện học thuật trong [kế hoạch tổng](../../idea/ke-hoach-tich-hop-sua-loi.md). Đầu ra là các CSS thuần, dùng BEM/Flexbox/Grid/media queries; không framework, không build bắt buộc.

| File | Người phụ trách | Quy tắc hiện hành |
|---|---|---|
| reset.css | TV1 | Giữ reset hiện có, không đổi trong đợt thiết kế |
| style.css | TV1 | Token sáng/tối, typography, container/header/footer, form/button/badge/topic-row dùng chung |
| topics.css | TV1 | Scope #page-topics, danh sách rộng và phân trang |
| topic-detail.css | TV2 | Scope #page-topic-detail, metadata, canvas, danh sách sâu và dialog |
| lecturers.css | TV3 | Scope #page-lecturers, tìm/lọc cùng hàng desktop, grid 1/2/3 cột |
| lecturer-detail.css | TV3 | Scope #page-lecturer-detail, hồ sơ và danh sách chủ đề dùng lại component chung |

### Bộ quy tắc đã duyệt

- Container tối đa 1.200px; lề 16/24/32px tương ứng mobile/tablet/desktop. Breakpoint 768 và 1024px.
- Font hệ thống; body 16px/1,6; phụ 14px; h1 26px mobile, 32px desktop; tên thẻ 18px. Không ép cắt hoặc nối chữ để vừa khung.
- Spacing 4/8/12/16/24/32/48px; bo nút/input 8px, khối 12px. Giảm gradient/shadow, phân cấp bằng chữ/khoảng cách.
- Sáng: nền #F6F8FB, surface #FFFFFF, chữ #162536, phụ #526274, nhấn #165F9B với chữ trắng.
- Tối: nền #141A23, surface #1C2531, chữ #ECF2F8, phụ #ACB8C8, nhấn #8CC7FF với chữ #10263A.
- Chỉ style.css định nghĩa token. Theme có nút thủ công và fallback hệ thống; không bỏ một nhánh khi tinh gọn CSS.
- Header/footer thống nhất, nút có vùng bấm >=44px, focus rõ. Không đổi font/màu riêng cho từng TV.
- Hàng chủ đề là component chung trong style.css; CSS đặc thù trang phải có ID cha. Không che tràn trang bằng overflow-x:hidden; overflow:hidden của viewport sơ đồ là giới hạn canvas có chủ đích.
- Thứ tự nạp: reset.css → style.css → CSS trang. Không thêm CSS inline trong HTML; JS chỉ đặt hình học động của sơ đồ.

### Nghiệm thu

Kiểm tra trực tiếp ảnh ở 320/375/768/1024/1440px cả hai theme; heading/metadata/nút dài không tràn hoặc chồng. Kiểm tra tương phản, tab/focus, tên/email dài và cây sâu. Parser CSS không lỗi/không thiếu var; ghi kết quả đo thực tế trong kế hoạch chung và bản ghi của TV tương ứng.

## Lịch sử giao việc ban đầu

<details>
<summary>Mở bản giao việc cũ để đối chiếu; yêu cầu hiện hành ở trên được ưu tiên.</summary>

> **Bản giao việc ban đầu, lưu để đối chiếu.** Giới hạn chỉ HTML/CSS, chức năng disabled và một trang mẫu đã được thay thế bởi [kế hoạch tích hợp](../../idea/ke-hoach-tich-hop-sua-loi.md). Các quy định schema và code còn phù hợp vẫn được giữ.

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

</details>
