# Ghi nhận sửa chữa TV2 — Chi tiết và roadmap

> Đọc nhanh: giữ engine sơ đồ và danh sách đệ quy của PR #2; đồng bộ theme TV1, sửa URL và dữ liệu, hoàn thiện bàn phím/mobile. [Kế hoạch và nghiệm thu chung](../../idea/ke-hoach-tich-hop-sua-loi.md).

## Đóng góp được giữ

Nguồn: PR #2, commit 78f4924b7aa5db0ef81b0aed0e92e5313b89beea. Giữ cấu trúc trang chi tiết, bộ chọn nhanh, engine node HTML/SVG, đo kích thước node và bố trí theo cột, đường Bezier, mở/thu nhánh, pan/zoom/căn vừa/fullscreen và danh sách details/summary đệ quy. Không thay roadmap bằng một danh sách phẳng.

## Những gì đã sửa hoặc thay thế

| Trước | Sau | Lý do | File liên quan |
|---|---|---|---|
| PR xóa research-data.json | Giữ nguyên JSON trên main | Engine cần dữ liệu này để chạy | data/research-data.json |
| Sửa trùng reset/style và trang khám phá của TV1 | Không lấy các bản trùng từ PR #2 | Chỉ có một nền và một trang khám phá | assets/css/reset.css, style.css, topics.css; topics/index.html |
| Query topic/name/lecturer, hướng dẫn topicId; không khớp thì về IDS | Dùng group/topic/email; sai/thiếu báo không tìm thấy | Không hiển thị nhầm đề tài | assets/js/data.js, assets/js/topic-detail.js |
| Bộ chọn nhanh tạo query riêng | Dùng topicUrl, tải lại theo URL đầy đủ | Đồng bộ URL và reset state khi đổi chủ đề | assets/js/topic-detail.js |
| Mọi link giảng viên dẫn trang mẫu | Link hồ sơ theo email | Mở đúng người hướng dẫn cho cả 37 chủ đề | assets/js/topic-detail.js |
| Màu slate/indigo riêng và thiếu token | Dùng token TV1, bổ sung token thiếu ở style chung | Sáng/tối thống nhất và không mất CSS | assets/css/topic-detail.css, assets/css/style.css |
| Mũi tên cha → con dễ hiểu sai thứ tự học | Mũi tên con → cha và giải thích rõ tiên quyết | Khớp nghĩa children đã thống nhất | assets/js/topic-detail.js, topics/detail/index.html |
| Drawer chưa quản lý focus/Escape đầy đủ | Dialog native, focus vào nút đóng, Escape trả focus | Thao tác bàn phím và chặn tương tác nền đúng | HTML/JS/CSS roadmap |
| Mọi màn hình mặc định mindmap | Mobile mặc định danh sách; vẫn chọn được sơ đồ | Đọc đầy đủ kiến thức trên màn hình nhỏ | assets/js/topic-detail.js |
| Wheel luôn preventDefault | Chỉ Ctrl + wheel zoom; cuộn thường giữ nguyên | Không chặn cuộn trang | assets/js/topic-detail.js |
| Fit giới hạn zoom tối thiểu 0.75 | Tính theo kích thước canvas, cho phép thu vừa cây lớn | Không cắt mất cây sâu | assets/js/topic-detail.js |
| Cây render lúc ẩn có kích thước đo chưa đúng | Đo lại khi chuyển về sơ đồ | Tránh dùng kích thước fallback từ view ẩn | assets/js/topic-detail.js |
| Nút mở nhánh mất focus sau render lại | Khôi phục focus về nút tương ứng | Tab/Enter không bị đứt luồng | assets/js/topic-detail.js |
| Nội dung subjects/outcome dựng bằng chuỗi HTML | DOM/textContent; bỏ môn học giả của root | Giữ đúng dữ liệu, tránh diễn giải HTML nguồn | assets/js/topic-detail.js |
| Hàm gốc thiếu param/returns ở JSDoc | Bổ sung chú thích và format | Đáp ứng quy chuẩn chất lượng code IE104 | assets/js/topic-detail.js |

## Quy ước tiếp tục làm

- Không thêm dữ liệu kiến thức hoặc môn học để lấp chỗ trống. Outcome thiếu phải ghi chưa bổ sung; subjects thiếu thì ẩn.
- Children là kiến thức chuẩn bị trước cha, không có liên kết cross-topic. Đệ quy không giới hạn số cấp ở code; bố cục cần thử cây sâu và tên dài.
- ID node chỉ tồn tại trong bộ nhớ UI, không thêm vào JSON nghiên cứu.
- Khi đổi chủ đề, URL là nguồn định danh. Không giữ state cây/pan/node của chủ đề trước và không dùng fallback IDS cho URL sai.
- Danh sách và sơ đồ cùng dữ liệu; không tạo hai bản nội dung riêng.
- JS được phép trong phiên bản tích hợp. Vẫn chỉ Vanilla, hàm đơn nhiệm và JSDoc; CSS trang không khai báo lại theme.

## Tự chạy và kiểm tra

Từ trang khám phá bấm một đề tài để có query đúng; không mở chi tiết không query rồi kỳ vọng ra IDS. Thử tất cả nhóm, chọn nhanh chủ đề khác, reload và Back/Forward. Mở nhánh, Enter trên node, Escape đóng dialog, thử +/−/căn vừa/toàn màn hình khi trình duyệt cho phép. Trên mobile thử danh sách, sau đó chuyển sang sơ đồ.

Đã so 37 trang với JSON và số keyword; thử fixture 9 cấp, tên dài, HTML trong dữ liệu, thiếu subjects, URL sai và dữ liệu lỗi. Không pageerror; axe desktop/mobile/dialog không phát hiện lỗi WCAG; HTML-Validate 0 lỗi. Lighthouse mobile: 92/100/100/100. Nu trực tuyến còn báo không tương thích dialog theo tài liệu chung; Firefox chưa được kiểm tra.
