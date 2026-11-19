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


## Nhóm trưởng cải thiện sau tích hợp Job 2 — hộp chuyển chủ đề và footer

Ngày 17/11/2026. Đây là chỉnh sửa của nhóm trưởng trên bản tích hợp, không ghi thành đóng góp mới của TV1. Bản nền `f6fc28f`; backup `backup/job-2-before-picker-footer-20261117`. Trạng thái: local/chờ duyệt; chưa push, merge hoặc deploy.

**Đóng góp giữ lại:** Sơ đồ/Danh sách, pan/zoom, panel kiến thức, tooltip, URL và nội dung roadmap.

| Trước | Sau | Lý do | File liên quan | Commit | Kiểm thử |
|---|---|---|---|---|---|
| Hộp chọn toàn cục; footer dẫn danh bạ | Hộp từ toàn bộ 37 chủ đề thành chủ đề cùng giảng viên qua email chuẩn hóa; thêm đóng backdrop, giữ thanh điều khiển khi cuộn, reset tìm kiếm/cuộn, nhãn Đang xem. | Phạm vi chuyển chủ đề rõ ràng; footer mô tả dự án | assets/js/topic-detail.js; assets/css/topic-detail.css; topics/detail/index.html | 01e7f10; 0e8efec | 37/37 chủ đề khớp danh sách theo giảng viên; alias/hoa/khoảng trắng đúng; tìm không dấu, rỗng, reset, Escape, click/tap ngoài và kéo từ trong ra ngoài đạt. |

Phần chung do nhóm trưởng sửa: footer trên cả năm trang và CSS chung; không sửa JSON/schema. Quy tắc mới thay yêu cầu cũ về hộp toàn bộ chủ đề và link footer. Giữ nguyên lịch sử ở trên.

Minh chứng trước/sau: thư mục `idea/minh-chung-giao-dien/picker-footer-20261117/` trong repo, gồm before-picker/after-picker-mobile/after-picker-desktop và before-home/after-home.

Tự kiểm tra: chạy HTTP tại repo, mở phần được giao, kiểm tra hai theme, thu nhỏ cửa sổ và footer. TV1 mở hộp, cuộn xuống cuối, thử đóng bằng nền tối/Escape/nút, tìm không dấu và xác nhận chỉ hiện đề tài cùng giảng viên. Giới hạn: Chrome headless và mô phỏng touch; chưa Firefox/thiết bị thật/W3C chính thức. Không dùng kết quả lịch sử thay cho nghiệm thu mới.


## Nhóm trưởng cùng agent UI/UX thiết kế lại — 17/11/2026

Đây là sửa đổi hậu tích hợp trên thành quả Job 2, không ghi thành đóng góp gốc của thành viên. Bản trước: 1775493; backup/job-2-before-ui-review-20261117.

**Giữ lại:** Sơ đồ mặc định; mọi tương tác pan/zoom/panel, danh sách phẳng và bộ chọn cùng giảng viên.

| Trước | Sau | Lý do | File | Commit/kiểm thử |
|---|---|---|---|---|
| Bề mặt và phân cấp chưa thống nhất | Header đề tài và vùng roadmap có bề mặt/độ nổi thống nhất; toolbar, accordion và picker dùng accent chung. | Làm rõ nhóm thông tin, tăng tính nhất quán | assets/css/topic-detail.css; assets/css/style.css | Chờ nhóm trưởng commit và nghiệm thu độc lập |

Trang chủ do nhóm trưởng quản lý đã có hero biên tập và minh họa HTML/CSS gốc; không đổi logic phần của thành viên. Các token mới dùng chung, không tự tạo palette khác. Tham khảo mục Đánh giá UI/UX trong kế hoạch tổng để biết phương pháp, mức ảnh hưởng và giới hạn.

Ảnh: idea/minh-chung-giao-dien/ui-review-20261117/ (từ gốc repo). Tự kiểm tra bằng HTTP local, cả hai theme và desktop/mobile; thử lại luồng gốc. Chưa push/merge/deploy. Không coi tự đánh giá thẩm mỹ là kết quả nghiên cứu người dùng.

**Kết quả nhóm trưởng kiểm tra độc lập:** 50 tổ hợp responsive không tràn; axe 5 trang × sáng/tối không có vi phạm sau khi đợi transition ổn định; HTML Validate 5 nguồn không lỗi theo cấu hình hiện hành; không pageerror. Chưa Lighthouse mới/Firefox/thiết bị thật.


### Hoàn thiện từ phản biện: sơ đồ mobile dễ đọc — 17/11/2026

Nhóm trưởng sửa tiếp nhận xét còn lại sau khi sub-agent bị giới hạn sử dụng. Backup: `backup/job-2-before-mobile-map-20261117` tại `f6baab5`. Commit code `24e9db1`.

| Trước | Sau | Lý do | File | Kiểm thử |
|---|---|---|---|---|
| Tự căn toàn cây, mẫu 375px scale 0.405 làm chữ nhỏ | Tự đặt góc nhìn vào keyword đầu ở tỷ lệ tối đa 1 trên khung <768px; nút Căn vừa giữ toàn cảnh | Đọc và chạm node dễ hơn | assets/js/topic-detail.js; topics/detail/index.html | 37 chủ đề tại 375px scale 1, không tràn ngang/pageerror; Căn vừa vẫn ra scale tổng quan; chuyển tab đúng; desktop giữ căn vừa |

Bổ sung `setInitialMapView` chỉ điều phối transform sẵn có. Giữ thuật toán bố trí, cấu trúc node, pan/zoom, panel, dữ liệu, URL và thiết kế sub-agent. Đánh đổi được giải thích trong Cách xem lộ trình: mobile không thấy toàn cây ngay; kéo hoặc chọn Căn vừa để xem rộng hơn.

Axe mobile không vi phạm trong nhóm WCAG2A/AA,21AA; HTML Validate trang chi tiết 0 lỗi theo cấu hình hiện hành. Minh chứng `idea/minh-chung-giao-dien/ui-review-20261117/peer-fix-roadmap-mobile.png`. Chưa xác minh thiết bị thật/Firefox; không đo Lighthouse mới. Chưa push/merge/deploy. Đây là thay đổi nhóm trưởng, không ghi thành đóng góp của TV1.


## Nâng cấp UI/UX hậu tích hợp (REC-02/03/04/05/07/09/10/11/14/15 & vòng hoàn thiện) — 18/11/2026

Đây là cập nhật hậu tích hợp trên nhánh `review/job-2-combined` (`CODE_SHA`: `6f0d454`, backup trước sửa `backup/job-2-before-ui-upgrade-20261118` tại `f98c978`), không ghi thành đóng góp gốc của TV1/TV2.

| Trước (`f98c978`) | Sau (`6f0d454`) | Lý do | File | Kiểm thử |
|---|---|---|---|---|
| Root & Drawer badge đồng loạt tím `#8b5cf6`; nhãn `Môn học gợi ý tại UIT`; thiếu `#breadcrumb-current` | Root và badge đầu trang đồng bộ màu miền thật (`sec`/`data`/`nlp`), Drawer và thẻ dùng 3 cấp kiến thức trung tính (`Kiến thức cốt lõi`/`Kiến thức cơ sở`/`Nền tảng tiên quyết`), nhãn `Môn học gợi ý tham khảo`, breadcrumb hiện tên đề tài | Tách biệt ngữ nghĩa màu ngành và cấp kiến thức, tránh hiểu nhầm môn bắt buộc | `topics/detail/index.html`, `assets/css/topic-detail.css`, `assets/js/topic-detail.js`, `assets/css/style.css` | Ảnh `07`, `08`, `14`; axe Sáng/Tối + Drawer `0` vi phạm |
| Mobile `375×812` ẩn mất node gốc và mũi tên `marker-start`; node/toggle < 44px sau `scale`; `focusExpandedBranch` đẩy con ra ngoài mép phải; toolbar 3 hàng; `#mindmap-hint` còn hiện ở `Danh sách` | Lộ mép phải root + mũi tên cùng 5 trụ cột; kích thước unscaled `>= 58px` ở `<= 767px` đạt vùng chạm `>= 44px` (`0` overlap); tách `.mindmap-node__card` và nút `+N`/`−` (ẩn trên root); thêm `Kéo 2D`, CSS pseudo-fullscreen, toolbar mobile 2 hàng, `focusExpandedBranch` neo trọn nhánh con, ẩn `#mindmap-hint` trong `Danh sách` | Sửa đứt gãy thị giác mobile, tương tác pan/zoom 2D, A11y và vùng chạm | `topics/detail/index.html`, `assets/css/topic-detail.css`, `assets/js/topic-detail.js` | `qa_report.json`: `37/37` cây (`271` nodes) `0` overlap, `touch_targets: []`, `expandVisible.clippedRightOrLeft: 0`, `hintHiddenInCards: true`, ảnh `09`, `14` |
| GV có 1 đề tài vẫn mở modal `Chuyển chủ đề`; danh sách dùng từ `"keyword"`; thiếu disclaimer | Trạng thái tĩnh `"Giảng viên có 1 chủ đề trong danh mục"` (7/16 GV); đổi `"mục kiến thức"`; thêm disclaimer; chuẩn hóa `document.title` `\| UIT Discovery` | Bỏ thao tác thừa, minh bạch nguồn tham khảo | `topics/detail/index.html`, `assets/css/topic-detail.css`, `assets/js/topic-detail.js` | Ảnh `10`, `14`; `90/90` hàm JS đủ JSDoc `@param`/`@returns`; HTML `validator.nu` `0` lỗi (`1` info-warning `<dialog>`) |

**Minh chứng & Giới hạn:** `idea/minh-chung-giao-dien/ui-upgrade-20261118/` (`07`, `08`, `09`, `10`, `14`). Kiểm thử trên Chrome Headless CDP + `axe-core` + `validator.nu`; chưa chạy Lighthouse CLI (thiếu Node), Firefox hay thiết bị cảm ứng thật. Chưa push/merge.

### Vòng tinh gọn theo phong cách Tối giản (`c72acf8`) — 18/11/2026
- Làm phẳng `.topic-header` (viền đáy `1px`, bỏ bóng đổ), ẩn hoàn toàn `#topic-switcher-container` khi GV chỉ có 1 đề tài (`7/16` GV, thay cho `.topic-switcher__single`), nút chuyển đa đề tài rút thành `"Đề tài khác (N)"`.
- Giữ 3 sắc độ miền trên `#topic-group-badge` và `.mindmap-node--root`; đồng bộ viền `solid` cho node lá và badge cấp độ trung tính; thu gọn `.mindmap-toolbar` về nền sạch; dời lưu ý tham khảo xuống `.roadmap-footnote` cuối khối và rút gọn `#mindmap-hint`.
- Kết quả sau sửa: `37/37` cây (`271` nodes) `0` chồng lấn, `touch_targets: []` (`>= 44px` trên mobile), `axe_violations: []`, `responsive_50: []`, `hintHiddenInCards: true`, `expandVisible.clippedRightOrLeft: 0`, `90/90` hàm JS đủ JSDoc, HTML `validator.nu` `0` lỗi (`1` info-warning `<dialog>`). Minh chứng ảnh `07`, `08`, `09`, `10`, `14` đã cập nhật trong `idea/minh-chung-giao-dien/ui-upgrade-20261118/`.

### Vòng động hóa dữ liệu không fix cứng (`00ab17a`) — 18/11/2026
- Gắn sắc độ miền động `resolveGroupTone(group.id, groupIndex)` qua `data-domain-tone="1".."6"` trên `#topic-group-badge` và `#mindmap-viewport` trong `topic-detail.js` / `topic-detail.css` (bỏ ràng buộc `data-group="sec|data|nlp"`).
- Xử lý an toàn chủ đề `keywords: []`: `buildMindMapTree` + `setInitialMapView` căn giữa node gốc gọn trên mobile/desktop (`0` lỗi/tràn), `renderCardsView` hiển thị thông báo rõ trong `#roadmap-pillars-grid`.
- Kết quả sau sửa: `37/37` cây (`271` nodes `0` overlap) + test tổng hợp nhóm `"cv"` `keywords: []` (`data-domain-tone="4"`, `rootNodes: 1`), `90/90` hàm JS đủ JSDoc, `0` lỗi HTML `validator.nu` (`1` info-warning `<dialog>`). Minh chứng ảnh `07`, `08`, `09`, `10`, `14` đã cập nhật.
## Bổ sung hiện hành — sửa tương tác sau vòng 2, 19/11/2026

**Bổ sung tự căn vừa:** Sol 6.2 sửa, Astra 6 rà soát theo yêu cầu nhóm trưởng: góc nhìn ban đầu dùng bounding box toàn bộ node đang hiển thị, kể cả mobile, sau bước đo bố cục. Thay góc nhìn cũ chỉ nhánh đầu. Chuyển tab trong cùng chủ đề giữ vị trí/zoom người dùng; nút Căn vừa vẫn dùng được. Không mở tất cả nhánh tự động. Kết quả kiểm tra cập nhật tại mục cùng tên trong kế hoạch tổng.

**Phản hồi mới cùng ngày:** nhóm trưởng yêu cầu mặc định **Sơ đồ ở mọi kích thước**, thay mobile mặc định Danh sách của vòng 2. Sol 6.2 sửa bước khởi tạo, Astra 6 rà soát; Danh sách vẫn đóng tất cả nhánh mặc định. Khi tự thử, mở mới/reload/chuyển chủ đề phải thấy Sơ đồ, rồi chọn Danh sách để mở từng nhánh. Header trang chủ sửa riêng bởi nhóm trưởng, dùng lại responsive chung; không đổi header trang chi tiết.

Nhóm trưởng yêu cầu Sol 6.1 sửa, Astra 6 rà soát; đây là thay đổi sau tích hợp, không ghi thành đóng góp mới của TV1. Nền `3102ed2`, backup `backup/round2-before-interaction-fixes-20261119`; sửa local chưa commit.

| Trước | Sau | Lý do | File |
|---|---|---|---|
| Stage nhận hit cả vùng trống, cursor nút có thể ghi đè đang kéo | Hit vùng trống về viewport, node nhận click như cũ; dragging luôn dùng grabbing | Giữ phản hồi kéo rõ ràng | `assets/css/topic-detail.css` |
| Mục đầu tab Danh sách mở sẵn | Tất cả mục đóng khi dựng danh sách | Theo yêu cầu mới, thay quy tắc mở mục đầu | `assets/js/topic-detail.js` |
| Email là mailto | Email văn bản thường; liên kết tên/hồ sơ giữ nguyên | Không có chức năng email | `topics/detail/index.html`, `assets/js/topic-detail.js` |

Giữ cây dữ liệu, mở/thu sơ đồ, panel, tooltip, pan/zoom/fullscreen và mặc định view theo vòng 2. Tự kiểm tra qua HTTP: kéo vùng trống và qua node, thả chuột/ra ngoài; chuyển Danh sách, thử từng summary bằng chuột và Enter/Space; kiểm tra email không nhận Tab/click nhưng hồ sơ mở đúng. Kết quả kiểm thử và giới hạn mới xem mục “Sửa tương tác sau đánh giá vòng 2” trong [kế hoạch tổng](../../idea/ke-hoach-tich-hop-sua-loi.md). Lịch sử bên dưới giữ nguyên.
