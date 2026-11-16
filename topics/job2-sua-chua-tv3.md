# Job 2 — Ghi nhận tích hợp và sửa chữa TV3

> **Bản local chờ nhóm trưởng kiểm tra, chưa duyệt/merge/push/deploy.** TV3 là người nhận Job 2; phần gốc Job 1 thuộc TV1. Đọc [nhiệm vụ](JOB-2.md) và [kế hoạch tổng](../idea/ke-hoach-tich-hop-sua-loi.md).

## Nguồn và đóng góp

PR [#7](https://github.com/liem-2006/ie104/pull/7), SHA a0dc22027cd7696d6e34820695b2baff058e195a. Nền integration/job-2: 741e5af. Nhập local tại c6d5364; không merge PR trên GitHub.

Đóng góp thành viên được giữ: Hướng dẫn tìm không dấu, nhãn nhóm, khối không có kết quả và nút reset, ảnh trước/sau do TV3 cung cấp.

Các sửa dưới đây do agent tích hợp thực hiện theo yêu cầu nhóm trưởng, không quy lại thành đóng góp gốc của TV.

## Thay đổi khi tích hợp

| Trước | Sau | Lý do | File liên quan | Commit code | Kiểm tra |
|---|---|---|---|---|---|
| PR #7 độc lập | Giữ nguyên code khám phá, kiểm thử cùng hai PR khác | Không sửa chỉ để tạo khác biệt | topics/index.html, assets/js/topics.js, assets/css/topics.css | c6d5364 | 12/12/12/1; axe không vi phạm |
| Email cũ có thể nằm trong URL | API chung ánh xạ sang email đúng | Liên kết xuyên trang nhất quán | assets/js/data.js | b5a7227 | Link chủ đề email cũ đúng |

## Nhật ký

| Ngày | Mốc | Trạng thái |
|---|---|---|
| 16/11/2026 | Xác nhận PR/SHA không đổi; nhập riêng đóng góp tại c6d5364 | Đã thực hiện local |
| 16/11/2026 | Sửa lỗi chung tại b5a7227; kiểm tra URL và responsive | Đã thực hiện; xem giới hạn bên dưới |
| Chưa có | Góp ý nhóm trưởng, sửa sau góp ý, duyệt và merge | Chưa thực hiện |

## Tự chạy và quy ước

Mở root repo bằng VS Code Live Server, vào index.html qua HTTP. Nhánh review/job-2-combined. Thử phần được giao, chuyển liên kết tới phần khác, theme sáng/tối và cửa sổ nhỏ. Không dùng file://. Link chủ đề dùng group/topic/email; hồ sơ dùng email; dùng module data.js thay vì tự ghép URL. Mobile roadmap mặc định danh sách. Không sửa schema hoặc xây backend. Token chung thuộc nhóm trưởng.

## Kết quả và giới hạn

Bản ghép mở đúng 37 chủ đề/16 hồ sơ; đủ 234 keyword trong DOM danh sách; 50 ca responsive không tràn ngang; năm trang axe WCAG A/AA không vi phạm phát hiện, HTML-Validate không lỗi cấu trúc. Đây là Chrome headless cục bộ ngày 16/11/2026, không xác nhận thiết bị thật. Chi tiết kết quả, Lighthouse và hạn chế cập nhật tại kế hoạch tổng.

Đã mở toàn bộ 37 sơ đồ trên desktop: tổng 271 node gồm 37 gốc và 234 keyword, không chồng node. Chưa xác minh cảm ứng thật, Firefox/Safari/screen reader hoặc W3C chính thức. Chưa có duyệt của nhóm trưởng. Không coi tài liệu này là cho phép merge.

Lighthouse 13.6.0 mobile, ba lượt/trang: Performance trung vị Trang vào 100, Khám phá 96, Roadmap 94, Danh bạ 97, Hồ sơ 95; Accessibility/Best Practices/SEO đều 100. Xem [số đo]( ../idea/minh-chung-giao-dien/job-2-integration/lighthouse-summary.json).
