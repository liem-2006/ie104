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

TV3: Thành phần chung có trạng thái Material; giữ A–Z và 12 chủ đề/trang. Header trang chủ được nhóm trưởng thu gọn, các trang trong giữ menu.

| Trước | Sau | Lý do | File/commit | Kiểm thử |
|---|---|---|---|---|
| Giao diện trước Material | Token, trạng thái thao tác và bố cục đọc thống nhất | Dễ đọc, giảm khung lặp | `7c7f3ab`, `127ccbc`, `f9dca24`; CSS chung và phần roadmap | 50 bố cục, axe 5 trang, HTML 5 trang; chi tiết xem kế hoạch tổng |

Đây là thay đổi của người tích hợp, không ghi thành đóng góp mới của thành viên. Không sửa lịch sử Job 1. Quy tắc mới thay thế mặc định Danh sách mobile và danh sách cây lồng nhau.

Tự kiểm tra: chạy HTTP từ repo, mở phần được giao, thử sáng/tối, bàn phím và mobile; với roadmap mở cả hai tab, kiểm tra đầu ra và môn học. Chưa push/merge/deploy. Xem mục Material trong kế hoạch tổng để biết backup, ảnh và giới hạn kiểm thử.


## Nhóm trưởng cải thiện sau tích hợp Job 2 — hộp chuyển chủ đề và footer

Ngày 17/11/2026. Đây là chỉnh sửa của nhóm trưởng trên bản tích hợp, không ghi thành đóng góp mới của TV3. Bản nền `f6fc28f`; backup `backup/job-2-before-picker-footer-20261117`. Trạng thái: local/chờ duyệt; chưa push, merge hoặc deploy.

**Đóng góp giữ lại:** Tìm kiếm, lọc nhóm, A–Z và phân trang 12 chủ đề; logic không thay đổi.

| Trước | Sau | Lý do | File liên quan | Commit | Kiểm thử |
|---|---|---|---|---|---|
| Hộp chọn toàn cục; footer dẫn danh bạ | Footer khám phá bỏ liên kết Giảng viên hướng dẫn, dùng nội dung nhận diện dự án thống nhất. | Phạm vi chuyển chủ đề rõ ràng; footer mô tả dự án | topics/index.html; assets/css/style.css | 0e8efec | HTML và axe trang khám phá không phát hiện lỗi; footer responsive không tràn. |

Phần chung do nhóm trưởng sửa: footer trên cả năm trang và CSS chung; không sửa JSON/schema. Quy tắc mới thay yêu cầu cũ về hộp toàn bộ chủ đề và link footer. Giữ nguyên lịch sử ở trên.

Minh chứng trước/sau: thư mục `idea/minh-chung-giao-dien/picker-footer-20261117/` trong repo, gồm before-picker/after-picker-mobile/after-picker-desktop và before-home/after-home.

Tự kiểm tra: chạy HTTP tại repo, mở phần được giao, kiểm tra hai theme, thu nhỏ cửa sổ và footer. TV1 mở hộp, cuộn xuống cuối, thử đóng bằng nền tối/Escape/nút, tìm không dấu và xác nhận chỉ hiện đề tài cùng giảng viên. Giới hạn: Chrome headless và mô phỏng touch; chưa Firefox/thiết bị thật/W3C chính thức. Không dùng kết quả lịch sử thay cho nghiệm thu mới.


## Nhóm trưởng cùng agent UI/UX thiết kế lại — 17/11/2026

Đây là sửa đổi hậu tích hợp trên thành quả Job 2, không ghi thành đóng góp gốc của thành viên. Bản trước: 1775493; backup/job-2-before-ui-review-20261117.

**Giữ lại:** Tìm không dấu, nhóm OR, A–Z và phân trang 12 mục.

| Trước | Sau | Lý do | File | Commit/kiểm thử |
|---|---|---|---|---|
| Bề mặt và phân cấp chưa thống nhất | Tìm/lọc được gom trong surface, kết quả giữ dạng hàng với hover nhẹ và tiêu đề dễ đọc. | Làm rõ nhóm thông tin, tăng tính nhất quán | assets/css/topics.css; assets/css/style.css | Chờ nhóm trưởng commit và nghiệm thu độc lập |

Trang chủ do nhóm trưởng quản lý đã có hero biên tập và minh họa HTML/CSS gốc; không đổi logic phần của thành viên. Các token mới dùng chung, không tự tạo palette khác. Tham khảo mục Đánh giá UI/UX trong kế hoạch tổng để biết phương pháp, mức ảnh hưởng và giới hạn.

Ảnh: idea/minh-chung-giao-dien/ui-review-20261117/ (từ gốc repo). Tự kiểm tra bằng HTTP local, cả hai theme và desktop/mobile; thử lại luồng gốc. Chưa push/merge/deploy. Không coi tự đánh giá thẩm mỹ là kết quả nghiên cứu người dùng.

**Kết quả nhóm trưởng kiểm tra độc lập:** 50 tổ hợp responsive không tràn; axe 5 trang × sáng/tối không có vi phạm sau khi đợi transition ổn định; HTML Validate 5 nguồn không lỗi theo cấu hình hiện hành; không pageerror. Chưa Lighthouse mới/Firefox/thiết bị thật.
