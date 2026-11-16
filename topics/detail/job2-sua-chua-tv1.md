# Job 2 — Ghi nhận tích hợp và sửa chữa TV1

> **Bản local chờ nhóm trưởng kiểm tra, chưa duyệt/merge/push/deploy.** TV1 là người nhận Job 2; phần gốc Job 1 thuộc TV2. Đọc [nhiệm vụ](JOB-2.md) và [kế hoạch tổng](../../idea/ke-hoach-tich-hop-sua-loi.md).

## Nguồn và đóng góp

PR [#8](https://github.com/liem-2006/ie104/pull/8), SHA 48c857ec41157ca67775b0365cd67a3933ad57ba. Nền integration/job-2: 741e5af. Nhập local tại 16bf421; không merge PR trên GitHub.

Đóng góp thành viên được giữ: Pointer Events, zoom theo điểm neo, giữ tỷ lệ khi mở nhánh, thao tác fullscreen.

Các sửa dưới đây do agent tích hợp thực hiện theo yêu cầu nhóm trưởng, không quy lại thành đóng góp gốc của TV.

## Thay đổi khi tích hợp

| Trước | Sau | Lý do | File liên quan | Commit code | Kiểm tra |
|---|---|---|---|---|---|
| Mobile mở Sơ đồ | Mặc định Danh sách, vẫn chọn Sơ đồ | Theo nhiệm vụ đã giao, dễ đọc màn hình nhỏ | assets/js/topic-detail.js | b5a7227 | 375px: list=true |
| Tự cuộn khi tải, debug trên window | Bỏ auto-scroll và debug, bỏ listener liên quan | Giữ ngữ cảnh tên đề tài; tránh API debug runtime | assets/js/topic-detail.js | b5a7227 | scrollY=0, debug=false |

## Nhật ký

| Ngày | Mốc | Trạng thái |
|---|---|---|
| 16/11/2026 | Xác nhận PR/SHA không đổi; nhập riêng đóng góp tại 16bf421 | Đã thực hiện local |
| 16/11/2026 | Sửa lỗi chung tại b5a7227; kiểm tra URL và responsive | Đã thực hiện; xem giới hạn bên dưới |
| Chưa có | Góp ý nhóm trưởng, sửa sau góp ý, duyệt và merge | Chưa thực hiện |

## Tự chạy và quy ước

Mở root repo bằng VS Code Live Server, vào index.html qua HTTP. Nhánh review/job-2-combined. Thử phần được giao, chuyển liên kết tới phần khác, theme sáng/tối và cửa sổ nhỏ. Không dùng file://. Link chủ đề dùng group/topic/email; hồ sơ dùng email; dùng module data.js thay vì tự ghép URL. Mobile roadmap mặc định danh sách. Không sửa schema hoặc xây backend. Token chung thuộc nhóm trưởng.

## Kết quả và giới hạn

Bản ghép mở đúng 37 chủ đề/16 hồ sơ; đủ 234 keyword trong DOM danh sách; 50 ca responsive không tràn ngang; năm trang axe WCAG A/AA không vi phạm phát hiện, HTML-Validate không lỗi cấu trúc. Đây là Chrome headless cục bộ ngày 16/11/2026, không xác nhận thiết bị thật. Chi tiết kết quả, Lighthouse và hạn chế cập nhật tại kế hoạch tổng.

Đã mở toàn bộ 37 sơ đồ trên desktop: tổng 271 node gồm 37 gốc và 234 keyword, không chồng node. Chưa xác minh cảm ứng thật, Firefox/Safari/screen reader hoặc W3C chính thức. Chưa có duyệt của nhóm trưởng. Không coi tài liệu này là cho phép merge.

Lighthouse 13.6.0 mobile, ba lượt/trang: Performance trung vị Trang vào 100, Khám phá 96, Roadmap 94, Danh bạ 97, Hồ sơ 95; Accessibility/Best Practices/SEO đều 100. Xem [số đo]( ../../idea/minh-chung-giao-dien/job-2-integration/lighthouse-summary.json).
