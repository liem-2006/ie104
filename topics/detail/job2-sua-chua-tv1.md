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


## Góp ý nhóm trưởng và cải tiến ngày 17/11/2026

Trạng thái: đã sửa local tại **9cc27d6**, chờ nhóm trưởng kiểm tra; chưa push/merge/deploy. Mốc này bổ sung cho kết quả 16/11, không mặc nhiên dùng số Lighthouse cũ cho code mới.

| Yêu cầu/trước | Sau | Lý do và file |
|---|---|---|
| Logo có ô trắng | Bỏ background/padding trắng CSS; PNG vốn đã có alpha | assets/css/style.css, giữ logo gốc |
| Sắp xếp theo nguồn và select sắp xếp | Luôn A–Z tiếng Việt trước phân trang, bỏ select; giữ tìm kiếm và lọc nhóm | topics/index.html, assets/js/topics.js |
| Nút nhóm bị giãn, bo quá tròn | Chiều cao tự nhiên tối thiểu 44px, không giãn theo cha, bo 8px | assets/css/topics.css |
| Select chủ đề native kéo rộng, khó đọc tên dài | Dialog tìm kiếm, chia nhóm, A–Z trong nhóm; tên và giảng viên tách dòng | assets/js/topic-detail.js, assets/css/topic-detail.css |
| Phải mở panel mới xem outcome | Hover/focus node hoặc summary có tooltip outcome; panel vẫn giữ cho click/mobile | assets/js/topic-detail.js, assets/css/topic-detail.css |
| Theo màu hệ thống khi chưa lưu | Mặc định sáng; giữ lựa chọn thủ công đã lưu qua trang/reload | assets/js/theme.js, assets/css/style.css |

Phân công lịch sử: thay đổi khám phá thuộc phần TV3 Job 2; picker/tooltip thuộc TV1; logo/theme là nền chung nhóm trưởng, ảnh hưởng cả phần TV2. Agent tích hợp thực hiện theo góp ý nhóm trưởng, không ghi thành đóng góp PR gốc.

Kiểm thử mới Chrome headless: 20 ca responsive (Khám phá/Chi tiết × 5 độ rộng × 2 theme) không tràn ngang; A–Z lấy trước phân trang; bỏ select không gây runtime error; dialog có 37 link, tìm hoc sau còn 5, Escape đóng và trả focus; tooltip trả đúng outcome JSON; axe trên trang chi tiết và dialog mobile không vi phạm phát hiện; HTML nguồn khám phá 0 lỗi. OS tối + chưa lưu vẫn light; chọn dark rồi reload vẫn dark. Hai lần chạy thử automation trước bị timeout ở thao tác UI, không tính thành pass; đã thử lại phiên sạch và sửa Escape trong input search trước commit.

Ảnh mới: idea/minh-chung-giao-dien/job-2-integration/topic-picker-mobile.png và topics-az-mobile.png. Đã xem trực tiếp ảnh hộp chọn mobile. Chưa chạy lại Lighthouse/W3C hoặc kiểm tra thiết bị cảm ứng thật cho commit mới; số đo 16/11 chỉ là lịch sử.

Quy ước hiện hành thay thế phần cũ: luôn A–Z, không còn lựa chọn source/title; mặc định light thay vì theo hệ điều hành; đổi chủ đề dùng dialog thay select native. Giữ schema và URL. Không lấy yêu cầu lịch sử cũ để khôi phục các điều khiển đã bỏ.


## Đợt Material ngày 17/11/2026 — bản local chờ nhóm trưởng xem

TV1: Sơ đồ mặc định trên mọi thiết bị; thay cây lồng nhau bằng accordion một cấp và danh sách hậu thứ tự. Giữ các node trùng tên, đầu ra, môn học và tiên quyết trực tiếp.

| Trước | Sau | Lý do | File/commit | Kiểm thử |
|---|---|---|---|---|
| Giao diện trước Material | Token, trạng thái thao tác và bố cục đọc thống nhất | Dễ đọc, giảm khung lặp | `7c7f3ab`, `127ccbc`, `f9dca24`; CSS chung và phần roadmap | 50 bố cục, axe 5 trang, HTML 5 trang; chi tiết xem kế hoạch tổng |

Đây là thay đổi của người tích hợp, không ghi thành đóng góp mới của thành viên. Không sửa lịch sử Job 1. Quy tắc mới thay thế mặc định Danh sách mobile và danh sách cây lồng nhau.

Tự kiểm tra: chạy HTTP từ repo, mở phần được giao, thử sáng/tối, bàn phím và mobile; với roadmap mở cả hai tab, kiểm tra đầu ra và môn học. Chưa push/merge/deploy. Xem mục Material trong kế hoạch tổng để biết backup, ảnh và giới hạn kiểm thử.
