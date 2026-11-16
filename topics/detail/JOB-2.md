> **Cập nhật 17/11/2026 — Material:** Sơ đồ mặc định cả mobile; Danh sách là accordion một cấp với nội dung phẳng, con trước cha. Giữ token xanh UIT, theme sáng mặc định và lựa chọn đã lưu. Header trang chủ chỉ logo/theme. Quy tắc này thay các mô tả cũ tương ứng. Bản local chờ duyệt; xem bản ghi Job 2 và kế hoạch tổng.

> **Cập nhật 17/11/2026:** bản local 9cc27d6 luôn A–Z (bỏ chọn sắp xếp), nút nhóm không giãn, đổi chủ đề bằng dialog tìm kiếm, node có trợ giúp outcome, logo không nền trắng; mặc định sáng và giữ theme đã lưu. Quyết định này thay các mô tả cũ liên quan. Xem bản ghi job2-sua-chua được dẫn bên dưới. Chưa duyệt merge.

> **Bản ghép Job 2 đang chờ nhóm trưởng kiểm tra.** Đọc [lịch sử tích hợp và sửa chữa](job2-sua-chua-tv1.md) để phân biệt bài PR của thành viên với thay đổi sau tích hợp. Chưa merge.

# Job 2 — TV1: kiểm tra chéo và nâng cấp chi tiết/roadmap

> Git Job 2: clone fork cá nhân → fetch upstream → tạo nhánh task riêng từ upstream/integration/job-2 → push lên origin → PR về liem-2006/ie104:integration/job-2. Xem [hướng dẫn clone mới hoặc dùng repo có sẵn](../../CONTRIBUTING.md). Không viết trực tiếp trên nhánh chung.


> Người thực hiện: TV1. Phần gốc: TV2. Không có hạn bàn giao cố định. PR #4 đã merge vào main. Nhánh làm nền và nhận PR Job 2 là integration/job-2.

## Mục tiêu, đầu vào và phạm vi

Giúp sinh viên đọc kiến thức nền, hiểu quan hệ con học trước cha và thao tác cây dễ dàng trên mobile/desktop. Đọc [sửa chữa TV2](SUA-CHUA-TV2.md), [yêu cầu chức năng](JOB-1.md), [đóng góp](../../CONTRIBUTING.md) và [nghiệm thu nền](../../idea/ke-hoach-tich-hop-sua-loi.md).

Đầu vào: data/research-data.json, URL group/topic/email, engine roadmap hiện tại, token chung. Đường dẫn dưới đây tính từ root repo.

| File được sửa | Công việc |
|---|---|
| topics/detail/index.html | Phân cấp tiêu đề/metadata, công cụ chọn chủ đề, toolbar, hướng dẫn và panel |
| assets/css/topic-detail.css | Bố cục responsive, cây/danh sách/panel; scope #page-topic-detail |
| assets/js/topic-detail.js | Tương tác giao diện trong trang, bảo toàn thuật toán và dữ liệu |
| topics/detail/JOB-2.md | Ghi nhận kết quả Job 2 của TV1 |

## Công việc và kiểm tra riêng

- Đánh giá cách người mới tìm outcome, mở nhánh, chuyển Sơ đồ/Danh sách và trở lại chủ đề/giảng viên. Ưu tiên cải thiện điểm khó dùng có minh chứng.
- Giữ đệ quy mọi cấp children, outcome và subjects tùy chọn, không thêm kiến thức hay quan hệ cross-topic. Mobile mặc định danh sách; vẫn mở được sơ đồ.
- Giữ mở/thu nhánh, pan/zoom/fit/fullscreen, quickselect và panel bàn phím. Pan/zoom chỉ cập nhật transform; không viết lại engine để đổi style.
- Fit theo node thực, khoảng đệm 40px và không tự phóng lớn hơn 1; canvas không làm toàn trang tràn hoặc cản cuộn mobile.
- Kiểm tra đủ 37 chủ đề; mở toàn bộ cây không mất/chồng node. Thử tên dài, cây sâu, subjects có/không, mở/thu nhanh, chuyển chủ đề và chuyển view.
- Thử Enter/Space mở node, Escape đóng panel và trả focus; URL sai không trả chủ đề mẫu.
- Tác giả TV2 góp ý PR của TV1 trước khi nhóm trưởng quyết định merge.
## Quy trình và ràng buộc chung

1. PR #4 đã merge. Đồng bộ upstream/integration/job-2 và tạo nhánh Job 2 mới theo CONTRIBUTING.md; không dùng nhánh PR Job 1 cũ.
2. Đọc AGENTS.md, skill IE104, idea/README.md, kế hoạch tích hợp và bản ghi sửa chữa được dẫn ở trên. Chạy website qua HTTP; không dùng file://.
3. Trước khi sửa, ghi vấn đề thực tế: màn hình/kích thước/theme, bước tái hiện, ảnh trước sửa, ảnh hưởng người dùng và giải pháp dự kiến. Không sửa chỉ để tạo khác biệt.
4. Vận dụng kiến thức thiết kế giao diện IE106 đã học: phân cấp thông tin, nhất quán, khả năng đọc, phản hồi thao tác và giảm thao tác không cần thiết. Đây không phải bộ tiêu chí chấm IE106 mới; cấu trúc/code vẫn theo IE104.
5. Có thể thay bố cục trong phần được giao; giữ phong cách học thuật hiện tại, màu xanh UIT, font hệ thống, theme và thành phần chung. Dùng token hiện có; không tự định nghĩa :root, palette hoặc header/footer riêng.
6. Chỉ Vanilla HTML/CSS/JS; BEM, CSS scope theo ID trang, Flex/Grid và media queries. Một h1, heading hợp lý, label/alt/focus rõ. JS camelCase, mỗi hàm một nhiệm vụ, JSDoc tham số/đầu ra và comment giải thích logic. Không template/thư viện/framework.
7. Giữ nguyên JSON, schema, URL, dữ liệu và logic nghiệp vụ. Chủ đề nhận group/topic/email; hồ sơ nhận email. Dùng API chung, không thêm ID, không tự fallback dữ liệu mẫu. Không thêm backend, đăng nhập hoặc lưu tiến độ.
8. Nhóm trưởng quản lý index.html ở root, assets/css/style.css, reset.css, assets/js/data.js, theme.js, dữ liệu và cấu hình repo. Không sửa các file này; ghi đề xuất phụ thuộc trong PR để nhóm trưởng xử lý trước khi tích hợp.
9. Không sửa lịch sử SUA-CHUA-TV*.md hoặc JOB-1.md. Job 2 thay phân công nhân sự Job 1; yêu cầu chức năng hiện hành tiếp tục có hiệu lực.
10. Một PR/người vào integration/job-2, không đặt thời hạn trong tài liệu. Tác giả ban đầu góp ý phần được sửa chéo; nhóm trưởng là người quyết định và merge.

## Đầu ra và nghiệm thu chung

- Code trong đúng phạm vi, phần ghi nhận cuối tài liệu này và một PR có link task; ảnh trước/sau desktop/mobile cùng sáng/tối. Có thể đính kèm ảnh vào PR, không cần tạo báo cáo Markdown khác.
- Giải thích được: JSON → module dữ liệu → render → sự kiện → URL tới trang khác. Ghi phần AI hỗ trợ và những gì đã tự kiểm tra.
- Kiểm tra 320/375/768/1024/1440px, cả hai theme: không tràn ngang toàn trang, không chữ đè/cắt nội dung, không dùng overflow-x:hidden để che lỗi.
- Thử bàn phím, focus, Escape/trả focus nếu có panel, vùng bấm chính tối thiểu 44px, tương phản chữ thường ít nhất 4.5:1.
- Thử tải/lỗi/rỗng/không tìm thấy, link trực tiếp, reload, Back/Forward, đổi theme và theme lưu qua trang. Không lỗi JS chưa xử lý.
- Không thay hai JSON nguồn; toàn dự án giữ 3 nhóm, 37 chủ đề, 234 keyword và 16 hồ sơ. Thử liên kết từ phần mình sang phần người khác.
- Chạy HTML/CSS validator, accessibility tự động và Lighthouse mobile trên trang sửa. Ghi công cụ/phiên bản, trình duyệt, ngày, URL và kết quả thực tế; Lighthouse 3 lần/trang lấy trung vị, mục tiêu Performance ≥90, Accessibility/Best Practices/SEO ≥95. Thiếu công cụ hoặc dịch vụ chặn phải ghi rõ, không dùng điểm cũ thay kết quả mới.
- Kiểm tra cả root và khi chạy dưới /ie104/ nếu có môi trường mô phỏng. Không tự deploy. Nhóm trưởng chạy kiểm thử xuyên năm trang trước merge.

## Ghi nhận thực hiện — thành viên điền

Trạng thái: ĐÃ HOÀN THÀNH CẬP NHẬT & KIỂM THỬ LOCAL (chờ TV2 góp ý và nhóm trưởng duyệt PR).

- Commit integration/job-2 làm nền: `741e5af` (`upstream/integration/job-2`, nhánh làm việc `task/job-2-tv1-roadmap`).
- Các vấn đề đã quan sát và link ảnh trước sửa:
  1. **Yêu cầu A (Kéo sơ đồ bằng cảm ứng):** `initCanvasViewport()` chỉ gắn `mousedown`, `mousemove`, `mouseup`. Khi phát sự kiện `PointerEvent` cảm ứng (`pointerType: "touch"`) trên mobile, `stage.style.transform` không thay đổi (`movedByPointer: false`); chưa có ngưỡng dịch chuyển (`DRAG_THRESHOLD`) để phân biệt chạm (`tap`) và kéo (`pan`).
  2. **Yêu cầu B (Zoom giữ vị trí đang xem):** `zoomIn()` và `zoomOut()` chỉ cộng/trừ `state.scale` mà không tính lại `state.panX`, `state.panY`. Do `#mindmap-stage` có `transform-origin: 0 0`, khi bấm nút `+` phóng to từ `scale = 1` lên `1.2`, điểm nằm tại tâm viewport `(567, 270)` bị trôi sang `(640.5, 299.4)` (lệch `driftX = +73.5px`, `driftY = +29.4px`).
  3. **Yêu cầu C (Mở nhánh căn giữa, giữ nguyên scale):** `toggleNode(node)` chỉ đảo `node.collapsed` và gọi `renderMindMap(false, node.id)` mà không căn giữa lại cây đang hiển thị (`panChanged: false`, `panX = 199.5, panY = 123` giữ nguyên khiến nhánh mới mở bị lệch về bên phải khung nhìn).
  4. **Yêu cầu D (Phân biệt Căn vừa và Toàn màn hình):** Hai nút `#btn-zoom-reset` và `#btn-fullscreen` cùng dùng biểu tượng 4 góc rỗng gần giống hệt nhau (`M8 3H3v5...` và `M9 3H3v6...`), không có nhãn chữ hiển thị (`resetBtnText: ""`, `fsBtnText: ""`), và `#btn-fullscreen` không lắng nghe `fullscreenchange` để đổi icon/nhãn khi thoát bằng `Escape`.
  5. **Yêu cầu E (Mở đề tài thấy khung sơ đồ giữa màn hình đầu trên cả mobile & desktop):** Trước khi sửa, mobile (`<= 767px`) mặc định mở chế độ Danh sách (`cardsActive: true`) thay vì Sơ đồ; trang giữ ở `scrollY = 0` khiến khung `.mindmap-component` nằm lệch xuống dưới (`top = 471.6px`, `bottom = 1132.8px`, tâm ở `802.2px` so với tâm viewport `450px` trên màn hình `1440×900`).
  6. **Lỗi phát sinh 1 (Vuốt dọc cuộn trang làm cây dịch chuyển):** Khi vuốt dọc vùng trống canvas trên mobile để cuộn trang, `pointermove` dùng `Math.hypot(dx, dy)` chưa phân định hướng cử chỉ đã vội cập nhật `panY`, làm cây bị dịch theo ngón tay (ví dụ vuốt 100px dọc làm `panY` đổi từ 80 thành -20) trước khi trình duyệt phát `pointercancel`.
  7. **Lỗi phát sinh 2 (Bỏ sót ý định cuộn bằng phím khi tải chậm):** `trackInitialScrollIntent()` dùng `{ once: true }` cho listener `keydown`. Khi người dùng nhấn `Tab` để di chuyển focus trước khi tải xong dữ liệu, listener bị gỡ bỏ ngay; nếu sau đó người dùng nhấn `PageDown` hoặc `ArrowDown`, cờ `userHasScrolled` không được cập nhật khiến trang tự ý cuộn đè vị trí xem của người dùng khi layout hoàn tất.
  - Ảnh chụp trước khi sửa (lưu ngoài nhánh code để giữ sạch `git status`): `job2-before-desktop-1440.png`, `job2-before-mobile-375.png` (đính kèm khi mở PR).
- Quyết định cập nhật theo yêu cầu trực tiếp của người dùng:
  - **Thay đổi mặc định trên mobile:** Khi mở mới một đề tài, mặc định hiển thị chế độ **Sơ đồ (`mindmap`)** trên cả mobile và desktop (thay cho quy tắc cũ "mobile mặc định Danh sách"). Nút **Danh sách** vẫn được giữ nguyên trên thanh công cụ để người dùng chuyển sang đọc tuần tự bất cứ lúc nào.
- Phụ thuộc/đề xuất thay đổi phần chung: Không có (không sửa bất kỳ file dùng chung nào ngoài 4 file trong phạm vi của TV1).
- Phần AI hỗ trợ và phần tự xác minh:
  - AI hỗ trợ: chuyển luồng kéo canvas sang `Pointer Events` có phân định hướng `absDy >= absDx` (bỏ qua vuốt dọc để trình duyệt cuộn tự nhiên, khóa cứng `panY` khi vuốt ngang), sửa `onUserKeydownIntent` không gỡ listener sớm khi nhận `Tab`/`Shift`, bổ sung hàm `zoomAtPoint()` giữ điểm neo, `centerMapKeepScale()` căn giữa bounding box giữ nguyên `scale`, nút `Căn vừa` / `Toàn màn hình` phân biệt rõ ràng và `scrollRoadmapIntoFirstScreen()` đưa `.mindmap-component` vào giữa màn hình đầu.
  - Tự xác minh: kiểm thử qua HTTP server cục bộ (`http://127.0.0.1`) trên Chrome `157.0.8103.51` với toàn bộ 37 chủ đề (234 keyword), 7 kích thước khung nhìn (`320×680`, `375×812`, `768×1024`, `1024×768`, `1440×900`, `1280×560`, `375×560`), 2 giao diện Sáng/Tối, đường dẫn con `/ie104/`, mô phỏng cử chỉ cảm ứng thật `Input.synthesizeScrollGesture` và luồng phím `Tab` → `PageDown`.

| Trước | Sau | Lý do/ảnh hưởng tới người dùng | File liên quan |
|---|---|---|---|
| Kéo sơ đồ dùng `mousedown`/`mousemove`/`mouseup`, không kéo được bằng cảm ứng trên mobile; thiếu ngưỡng phân biệt kéo và chạm | Chuyển sang `Pointer Events` (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `lostpointercapture`) với ngưỡng `DRAG_THRESHOLD = 6px`, `touch-action: pan-y` trong trang và `touch-action: none` khi toàn màn hình | Giúp người dùng kéo sơ đồ mượt bằng cả chuột và cảm ứng (vuốt ngang di chuyển cây, vuốt dọc vẫn cuộn trang tự nhiên trên mobile), không mở nhầm panel khi kết thúc thao tác kéo | `assets/js/topic-detail.js`, `assets/css/topic-detail.css` |
| Vuốt dọc vùng trống canvas để cuộn trang làm cây bị trôi theo chiều dọc (`panY` bị thay đổi từ 80 thành -20) trước khi `pointercancel` phát ra | Trong `pointermove`, phân định hướng cử chỉ: nếu `Math.abs(dy) >= Math.abs(dx)` thì bỏ qua luồng pan (`dragDirection = 'vertical-ignored'`), không đổi `panX`/`panY`/`scale` và không bắt pointer capture; nếu `Math.abs(dx) > Math.abs(dy)` thì khóa hướng ngang, chỉ đổi `panX` và khóa cứng `panY = dragOriginPanY` | Người dùng vuốt dọc cuộn trang mượt mà không lo cây bị nhảy hoặc giật giật; vuốt ngang không bị trôi dọc do ngón tay lệch nhẹ | `assets/js/topic-detail.js` |
| Nút Phóng to (`+`) / Thu nhỏ (`−`) trên toolbar chỉ đổi `state.scale`, làm điểm đang xem tại tâm viewport bị dịch đi (`+73.5px` ngang, `+29.4px` dọc) | Bổ sung `zoomAtPoint(targetScale, anchorX, anchorY)`: nút `+`/`−` lấy tâm `.mindmap-viewport` làm điểm neo, `Ctrl + wheel` lấy vị trí con trỏ làm điểm neo (`world = (a - p) / s`, `newPan = a - world * newScale`) | Giữ cố định nội dung đang quan sát ngay tại tâm khung nhìn (hoặc dưới con trỏ chuột) khi phóng to/thu nhỏ liên tiếp (`drift = 0.00px`) | `assets/js/topic-detail.js` |
| Bấm dấu `+` trên node để mở nhánh tiên quyết không căn giữa lại cây đang hiển thị | Khi mở nhánh (`node.collapsed` từ `true` sang `false`), đặt `state.centerAfterRender = true` và gọi `centerMapKeepScale()` sau khi đo xong `state.nodeBounds`; chỉ cập nhật `panX`, `panY` và giữ nguyên tuyệt đối `state.scale` | Đưa toàn bộ cây đang mở về giữa khung nhìn để dễ theo dõi nhánh mới mà không tự ý phóng to/thu nhỏ làm mất mức zoom của người dùng | `assets/js/topic-detail.js` |
| Hai nút `Căn vừa` và `Toàn màn hình` chỉ có icon 4 góc rỗng tương tự nhau, không có chữ, không đổi trạng thái khi thoát fullscreen bằng `Escape` | Nút `Căn vừa` có icon khung kèm hình chữ nhật giữa + nhãn `Căn vừa` (`aria-label="Căn vừa sơ đồ trong khung"`); nút `Toàn màn hình` có icon 4 góc hướng ra ngoài + nhãn `Toàn màn hình`, tự động đổi sang icon thu góc + nhãn `Thoát toàn màn hình` (`aria-pressed="true"`) qua sự kiện `fullscreenchange` | Phân biệt trực quan ngay lập tức giữa chức năng căn vừa sơ đồ và chế độ toàn màn hình trên cả desktop và mobile `320px` (vùng bấm đạt chuẩn `>= 44×44px`) | `topics/detail/index.html`, `assets/css/topic-detail.css`, `assets/js/topic-detail.js` |
| Mobile mặc định mở chế độ Danh sách; khi mở đề tài trang đứng ở đầu (`scrollY = 0`) khiến nửa dưới sơ đồ bị khuất khỏi màn hình đầu | Mặc định mở chế độ `Sơ đồ` trên cả mobile và desktop; tinh chỉnh chiều cao `.mindmap-viewport` theo `dvh`/`vh` và tự cuộn một lần (`scrollRoadmapIntoFirstScreen`) đưa `.mindmap-component` vào chính giữa viewport đầu tiên (tôn trọng cuộn tay và Back/Forward) | Người dùng chọn đề tài từ trang Khám phá hoặc bộ chuyển chủ đề sẽ thấy trọn thanh công cụ và sơ đồ ở chính giữa màn hình đầu tiên mà không phải cuộn tìm | `assets/css/topic-detail.css`, `assets/js/topic-detail.js` |
| Bấm phím `Tab` làm gỡ bỏ listener `keydown` sớm (do `once: true`), khiến thao tác bấm `PageDown`/`ArrowDown` sau đó trong lúc chờ tải không được ghi nhận, dẫn đến tự cuộn đè vị trí người dùng | `trackInitialScrollIntent()` không dùng `once: true` cho `keydown`; chỉ khi gặp phím cuộn trang (`ArrowDown/Up`, `PageDown/Up`, `Home`, `End`, `Space` ngoài ô nhập liệu) mới đánh dấu `userHasScrolled = true` và gọi `cleanupInitialScrollListeners()` | Bảo toàn trọn vẹn khả năng nhận diện ý định cuộn của người dùng; phím di chuyển focus `Tab` hay `Shift` không làm mất khả năng theo dõi | `assets/js/topic-detail.js` |

| Kịch bản/kích thước/theme | Công cụ/trình duyệt | Kết quả thực tế | Minh chứng/hạn chế |
|---|---|---|---|
| Kiểm tra 37 chủ đề & mở toàn bộ cây (234 keyword + 37 node gốc = 271 node) | Python HTTP Server + Chrome `157.0.8103.51` (CDP) | Đạt 37/37 chủ đề: 271/271 node hiển thị đầy đủ, `overlaps = 0` (không chồng lấn node), `console_errors = 0` | Đã kiểm tra tự động toàn bộ dữ liệu `data/research-data.json` |
| Đa kích thước `320×680`, `375×812`, `768×1024`, `1024×768`, `1440×900` và màn hình thấp `1280×560`, `375×560` (Sáng & Tối) | Chrome `157.0.8103.51` (Emulation + Media emulation / Theme toggle) | Không tràn ngang ở mọi kích thước (`scrollWidth === clientWidth`, `overflow-x: visible`), nút bấm đạt `>= 44px` (`94×44px` và `133×44px` ở `320px`), khung `.mindmap-component` nằm trọn trong viewport và tâm trùng khít tâm màn hình (`compCenterY === viewportCenterY = 340/406/512/384/450/280px`) | Ảnh chụp `job2-after-viewport-320-light.png`, `job2-after-viewport-375-light.png`, `job2-after-viewport-375-dark.png`, `job2-after-viewport-1440-light.png`, `job2-after-viewport-1440-dark.png` |
| Kiểm tra Lỗi 1: Cảm ứng vuốt dọc (lên/xuống/chéo), vuốt ngang, kéo chuột và fullscreen | Chrome `157.0.8103.51` (CDP Pointer Events + `Input.synthesizeScrollGesture`) | Vuốt dọc xuống 100px: `panX`/`panY`/`scale` giữ nguyên 100% (`verticalDownUnchanged: true`); vuốt dọc lên 80px: `panY` không đổi (`verticalUpUnchanged: true`); vuốt chéo thiên dọc (dx=20, dy=50): `panY` không đổi (`diagVerticalUnchanged: true`); vuốt ngang (dx=90, dy=10): `panX` đổi đúng 90px và `panY` giữ nguyên 100% (`horizontalPanYStrictlyLocked: true`); cử chỉ cảm ứng trình duyệt thật `Input.synthesizeScrollGesture`: cử chỉ dọc `transform` giữ nguyên hoàn toàn (`treeTransformUnchanged: true`), cử chỉ ngang chỉ đổi `panX` | Đã kiểm tra qua cả sự kiện PointerEvent chi tiết và bộ tổng hợp cử chỉ cảm ứng thật của Chrome DevTools; chưa thử trên thiết bị di động vật lý |
| Kiểm tra Lỗi 2: Nhận diện ý định cuộn bàn phím khi tải chậm (Tab, Shift, PageDown, ArrowDown, Space) | Chrome `157.0.8103.51` (CDP) | Nhấn `Tab` → `scrolledAfterTab: false` (không gỡ listener); nhấn tiếp `Shift` → `scrolledAfterShift: false`; sau đó nhấn `PageDown` → `scrolledAfterPageDown: true` (được ghi nhận thành công!); thử `Tab` → `ArrowDown` → `true`; thử `Space` trên body → `true`; thử `Space` trong input → `false`; khi `userHasScrolled = true`, `scrollRoadmapIntoFirstScreen()` không cuộn đè vị trí người dùng (`scrollRemainedAt350: true`) | Kiểm tra kiểm soát độ trễ và luồng phím tuần tự trong bộ nhớ |
| Yêu cầu B: Zoom giữ điểm neo (nút `+`/`−` trên toolbar và `Ctrl + wheel`) sau khi đã pan lệch tâm | Chrome `157.0.8103.51` | Sau khi pan tới `(379.5, 40)`, bấm nút `+` 2 lần và `−` 1 lần giữ nguyên điểm tại tâm viewport (`driftX = 0px, driftY = 0px`); `Ctrl + wheel` tại tọa độ lệch tâm `(220, 140)` giữ nguyên điểm dưới con trỏ (`drift < 0.02px`) | Chỉ cập nhật `transform`, không dựng lại DOM cây |
| Yêu cầu C: Mở nhánh bằng dấu `+` trên node ở mức zoom bất kỳ (`scale = 0.605` / `1.242`) | Chrome `157.0.8103.51` | Mở liên tiếp các nhánh bằng dấu `+` và thu bằng dấu `−`: `scaleBeforeExpand === scaleAfterExpand` (giữ nguyên 100%); tâm bounding box cây đang mở trùng khít tâm viewport; giữ đúng focus ở nút `+`/`−` và không làm cuộn trang | Nút `Căn vừa` trên toolbar vẫn hoạt động độc lập (tính lại `scale` và chừa đệm `40px`) |
| Yêu cầu D & Bàn phím / A11y / Subpath `/ie104/` / URL sai | Chrome `157.0.8103.51` + `node --check` | Nhấn `Enter` trên node mở drawer, `Tab` giữ focus trong `#drawer-close`, `Escape` đóng drawer và trả focus về đúng node; chạy dưới `/ie104/topics/detail/index.html` và chuyển đề tài bằng dropdown hoạt động đúng; URL sai hiển thị thông báo "Không tìm thấy chủ đề" | Tương phản chữ đạt `11.15:1 – 15.53:1` ở cả hai chế độ Sáng/Tối (vượt mức chuẩn WCAG AA `4.5:1`) |

- Link ảnh sau sửa: `job2-after-viewport-1440-light.png`, `job2-after-viewport-1440-dark.png`, `job2-after-viewport-375-light.png`, `job2-after-viewport-375-dark.png`, `job2-after-viewport-320-light.png`, `job2-after-viewport-1280x560-low-light.png`, `job2-after-expanded-keep-scale.png` (lưu trong thư mục artifact phiên làm việc để đính kèm vào PR mà không tạo file rác trong git).
- Kết quả validator/accessibility/Lighthouse:
  - Cú pháp JS (`node --check assets/js/topic-detail.js`): `0` lỗi.
  - Kiểm tra cấu trúc HTML/ARIA tự động trên DOM thực (`Chrome/157.0.8103.51`, ngày `2026-11-16`, URL `http://127.0.0.1/ie104/topics/detail/index.html`): đúng `1` thẻ `h1`, `0` nút thiếu `type`, `0` SVG trang trí thiếu `aria-hidden="true"`, tương phản màu đạt `11.15:1` đến `15.53:1`, `0` lỗi console/runtime.
  - Giới hạn môi trường: PowerShell trên máy hiện chặn thực thi script `.ps1` (`PSSecurityException` với `npm.ps1`/`npx.ps1`) và repository không cài sẵn gói `lighthouse` cục bộ nên chưa chạy CLI Lighthouse 3 lần; cần chạy thêm Lighthouse trong Chrome DevTools khi mở PR.
- Điểm còn tồn tại: Thao tác vuốt cảm ứng mới được xác minh qua chế độ mô phỏng thiết bị và `PointerEvent` (`pointerType: "touch"`) trên trình duyệt máy tính, chưa kiểm thử trên thiết bị di động vật lý.
- Góp ý tác giả ban đầu và cách xử lý: Chờ TV2 review trên PR nhánh `task/job-2-tv1-roadmap` → `integration/job-2`.
