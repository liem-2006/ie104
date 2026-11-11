# Tích hợp và sửa lỗi Job 1 — IE104

> **Bàn giao:** nhánh `integration/job-1-fixes`. Thiết kế TV1 là nền chung; bốn trang chức năng đã dùng JavaScript thuần và JSON. PR gốc được giữ để đối chiếu. Đọc tài liệu này thay cho các giới hạn HTML/CSS tĩnh trong bản giao Job 1 ban đầu.

## Nguồn và phạm vi

| Nguồn | Commit đã tích hợp | Thành phần giữ lại |
|---|---|---|
| main | adea9fe01c25d220c08ae34b90f7ea3cd84dd369 | JSON nghiên cứu, quy chuẩn và tài liệu |
| TV1 — PR #3 | 969f5e2c020abb986a6040edf8aa9356e55becdc | Reset, token sáng/tối, typography, shell, bố cục khám phá |
| TV2 — PR #2 | 78f4924b7aa5db0ef81b0aed0e92e5313b89beea | Chi tiết chủ đề, engine sơ đồ, zoom/pan, cây danh sách |
| TV3 — PR #1 | 292c4aa00bad124ca1d25f6ff10ffabb513581cb | JSON giảng viên, bố cục danh bạ và hồ sơ |

Các ref PR đã được fetch lại trước khi làm; commit không đổi so với lần review. Đã đối chiếu API trước bàn giao: cả ba PR vẫn open và giữ đúng các commit trên. Không merge nguyên ba PR chồng nhau: phần CSS chung/trang khám phá trùng của TV2 không lấy; thao tác xóa JSON nghiên cứu không áp dụng.

Website gồm trang vào tối giản và bốn màn hình: khám phá → chi tiết/roadmap → hồ sơ; danh bạ → hồ sơ. Dùng toàn bộ dữ liệu hiện có, không xây backend, đăng nhập, lưu tiến độ hoặc quản trị. Không xác minh học thuật lại nội dung nghiên cứu/chỉ số giảng viên.

## Các chặng thực hiện

- [x] A — Chuẩn hóa nền TV1: token, font, spacing, header/nav/footer, focus và theme theo hệ điều hành. Loại HTML lỗi và các chức năng minh họa không có dữ liệu.
- [x] B — Module `assets/js/data.js`: tải/cache JSON, email chuẩn hóa, DOM an toàn, URL chung và trạng thái lỗi. Giữ nguyên JSON nghiên cứu.
- [x] C — Khám phá: render đủ chủ đề, tìm kiếm tiếng Việt không dấu, OR nhóm/AND từ khóa, modal chọn nhóm, sắp xếp nguồn/A–Z và reset.
- [x] D — Roadmap: URL chính xác, không fallback mẫu; giữ engine TV2, đệ quy children, outcome/subjects, mũi tên con → cha, native dialog và danh sách mặc định trên mobile.
- [x] E — Giảng viên: render đủ danh bạ/hồ sơ theo email; nối đúng chủ đề, thông tin tùy chọn và nguồn chỉ số; fallback ảnh; link ngoài an toàn.
- [x] F — Trang vào, đường dẫn subpath, cập nhật hướng dẫn và ba bản ghi sửa chữa.
- [x] Kiểm thử chức năng, dữ liệu, responsive, accessibility, validator cục bộ và Lighthouse.
- [ ] W3C HTML/CSS trực tuyến xác nhận đầy đủ: còn giới hạn dịch vụ, xem bên dưới.
- [ ] Firefox: môi trường hiện tại chưa có trình duyệt này.

## Hợp đồng để tiếp tục phát triển

- Nguồn: `data/research-data.json` có 3 nhóm, 37 chủ đề, 234 keyword; `data/lecturers.json` có 16 email duy nhất. Không thêm ID chủ đề/keyword, không đổi schema.
- Chi tiết: `topics/detail/index.html?group=<id>&topic=<tên>&email=<email>`. Tạo link bằng `topicUrl(group, topic)`; không tự ghép query.
- Hồ sơ: `lecturers/detail/index.html?email=<email>`, tạo bằng `lecturerUrl(email)`.
- Email trim/chữ thường. Chủ đề phải khớp đủ nhóm, tên và email, đúng duy nhất một bản ghi. URL thiếu/sai không trả chủ đề hoặc giảng viên mẫu.
- `projectRoot` tính từ `import.meta.url` nên chạy được cả root và `/ie104/`. Không dùng đường dẫn tuyệt đối bắt đầu bằng `/assets` hay `/data`.
- JSON được fetch qua HTTP. Nội dung nguồn vào DOM bằng `textContent`/DOM API. Không render chuỗi JSON bằng `innerHTML`.
- `children` là kiến thức chuẩn bị trước cha, không phải nhóm nội dung; không có quan hệ cross-topic. Danh sách và sơ đồ giữ cùng nội dung; các ID node chỉ là trạng thái runtime của engine.
- CSS: reset → style chung → CSS trang. Chỉ style chung khai báo token, CSS riêng scope theo ID trang; dùng màu chữ link và màu nền primary đúng cặp tương phản.
- Theo yêu cầu bổ sung của nhóm trưởng, đã có nút sáng/tối chung ở header. Khi chưa chọn thì theo `prefers-color-scheme`; khi đã chọn thì ưu tiên `localStorage["ie104.theme"]` (light/dark), giữ qua chuyển trang/reload và đồng bộ tab. Script theme áp dụng trước CSS để tránh nháy màu; bị chặn storage vẫn đổi được trong trang.
- Mobile mặc định danh sách; desktop mặc định sơ đồ. Ctrl + wheel zoom, cuộn thường vẫn cuộn trang. Zoom/pan/nút căn vừa không làm thay đổi dữ liệu.
- Không khai báo bốn cách fetch/link/theme khác nhau. Thay đổi hợp đồng chung cần đồng bộ mọi trang.

## Kết quả kiểm thử thực tế

Kiểm tra trên Chrome 157.0.8103.50 qua HTTP cục bộ; công cụ QA nằm trong thư mục tạm, không phải dependency của website.

| Kiểm tra | Kết quả |
|---|---|
| Mở đủ 37 chủ đề, so tiêu đề và số node với JSON | Đạt 37/37 |
| Mở đủ 16 hồ sơ, so tên và số chủ đề theo email | Đạt 16/16 |
| Tìm không dấu, OR nhóm, AND từ khóa, A–Z, reset, không kết quả | Đạt |
| URL thiếu/sai/topicId cũ | Hiển thị không tìm thấy, không fallback |
| Reload, link trực tiếp, Back/Forward và tiền tố /ie104/ | Đạt |
| HTTP 500, JSON lỗi, dữ liệu rỗng | Có trạng thái UI, không lỗi JS không xử lý |
| Fixture cây 9 cấp, tên/outcome dài, subjects, HTML trong dữ liệu | Giữ đủ node, không render HTML nguồn, không tràn mobile |
| Fixture chủ đề trùng tên nhưng khác email | Chọn đúng người hướng dẫn |
| Ảnh URL lỗi, chỉ số 0, thiếu chỉ số, link javascript | Fallback/ẩn đúng; 0 thật giữ lại; link nguy hiểm bị bỏ |
| Mở/đóng nhánh, zoom/fit, đổi view/chủ đề, Escape và phục hồi focus | Đạt |
| Mở rộng toàn bộ cây của 37 chủ đề, so hình chữ nhật node | Không phát hiện node chồng nhau |
| 4 trang × 5 độ rộng 320/375/768/1024/1440 × 2 theme | 40 trường hợp không tràn ngang; một h1/trang |
| axe WCAG 2 A/AA và 2.1 AA | 0 vi phạm phát hiện: 10 trường hợp desktop, 8 mobile, modal node |
| HTML-Validate recommended, 5 trang | 0 lỗi với cấu hình kiểm tra đã dùng |
| HTML sau render, bao gồm roadmap | 0 lỗi cấu trúc; chuẩn hóa hidden="" do browser serialize thành hidden trước khi kiểm tra quy tắc phong cách |
| Parser CSS, token tham chiếu | Parse thành công, không thiếu token |
| Console runtime ở các luồng đã kiểm tra | Không pageerror |

HTML-Validate dùng preset recommended; tắt quy tắc phong cách void-style, no-trailing-whitespace, long-title và tel-non-breaking, không tắt kiểm tra cấu trúc hay accessibility. Accessibility tự động không thay thế việc đọc bằng screen reader hoặc kiểm thử toàn bộ thiết bị thực.

### Lighthouse mobile

Điểm dưới đây là lần chạy cục bộ với Chrome headless, cấu hình mobile mặc định; không phải cam kết điểm trên hosting thực.

| Trang | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Trang vào | 100 | 100 | 100 | 100 |
| Khám phá | 99 | 100 | 100 | 100 |
| Chi tiết/roadmap | 92 | 100 | 100 | 100 |
| Danh bạ | 97 | 100 | 100 | 100 |
| Hồ sơ | 93 | 100 | 100 | 100 |

Đã dự trữ chỗ cho pills/thống kê khi tải JSON để giảm layout shift của trang khám phá. Điểm performance có thể dao động theo máy và mạng.

### Giới hạn chưa xác nhận

- W3C Nu tại validator.w3.org và CSS Validator tại jigsaw.w3.org trả trang Cloudflare challenge, không trả báo cáo hợp lệ. Không ghi pass W3C.
- Endpoint validator.nu trả báo cáo cho 5 trang: trang vào/danh bạ/hồ sơ không lỗi; hai trang dùng dialog bị báo method=dialog không hợp lệ hoặc thiếu role, trong khi lần kiểm tra có role lại báo role không hợp lệ. Không sửa HTML native hiện đại theo các báo cáo mâu thuẫn này; đối chiếu bằng HTML-Validate, Chrome, axe và Lighthouse. Cần kiểm tra lại với Nu Validator hiện hành khi dịch vụ dùng được.
- Firefox chưa cài, chưa kiểm tra Safari/iOS hoặc thiết bị thật. Không tuyên bố đã pass các môi trường đó.
- Chưa deploy/chưa merge main; /ie104/ được mô phỏng bằng HTTP cục bộ. Hosting thực cần kiểm tra lại đường dẫn và cache.

## Cách nghiệm thu thủ công

1. Mở toàn bộ repo bằng VS Code, chạy Live Server từ root; không mở file://, không cần npm install.
2. Mở index.html → Khám phá → chọn bất kỳ chủ đề → giảng viên → chủ đề liên quan; làm lại từ danh bạ.
3. Thử tên không dấu, nhiều nhóm, A–Z và reset. Sửa query thành email/tên sai để thấy trạng thái không tìm thấy.
4. Trên roadmap mở nhánh, Enter để xem node, Escape để đóng, dùng nút +/−, căn vừa, đổi danh sách/sơ đồ và chọn chủ đề khác.
5. Thử mobile/desktop và hai theme bằng DevTools; Tab qua điều hướng, lọc, modal và cây.
6. Đọc ba bản ghi sửa chữa bên cạnh code trước khi nhận task tiếp theo. Chủ repo duyệt nhánh tích hợp; không merge chồng lại các PR gốc vì có file trùng hoặc thao tác xóa data.

## Bản ghi theo thành viên

- [TV1 — khám phá và nền chung](../topics/SUA-CHUA-TV1.md)
- [TV2 — chi tiết và roadmap](../topics/detail/SUA-CHUA-TV2.md)
- [TV3 — danh bạ, hồ sơ và dữ liệu](../lecturers/SUA-CHUA-TV3.md)

## Bổ sung sau tích hợp — nút sáng/tối

Đã thêm assets/js/theme.js và nút trên header của năm trang. Nút có nhãn Chế độ tối, aria-pressed phản ánh trạng thái, dùng được bằng Enter/Space và hiển thị ở mobile. CSS dùng cùng token TV1; selector thủ công áp dụng được cả khi hệ điều hành đang ở theme ngược lại. Chưa chọn thì vẫn theo hệ thống; giá trị lưu không hợp lệ được bỏ qua.

Đã kiểm tra chuyển hai chiều, giữ qua reload/cả năm trang, đồng bộ tab, bàn phím và màn hình 320px; storage bị chặn không phát sinh pageerror. Khi tắt JS, nút ẩn và CSS vẫn theo hệ thống. HTML-Validate: 0 lỗi trên năm trang; axe: 0 vi phạm phát hiện trên 10 trường hợp mobile với theme chọn thủ công ngược hệ thống. Các điểm Lighthouse ở bảng trên được ghi nhận trước lần bổ sung nút này.


## Tối ưu sau tích hợp và đối chiếu quy chuẩn IE104

> **Bản nghiệm thu tối ưu ngày 11/11/2026:** giữ giao diện TV1, dữ liệu và các chức năng đã chốt; refactor JavaScript, giảm CSS thừa và sửa trạng thái tải. Kết quả trong mục này là kết quả mới. Bảng kiểm thử/Lighthouse ở phía trên được giữ làm lịch sử, không thay thế bằng chứng cho phiên bản này.

### Mốc và phạm vi thực hiện

- Mốc trước tối ưu: commit `9a0bd27` trên nhánh `integration/job-1-fixes` (đã có nút sáng/tối).
- `9e9a12e` — tách các bước dựng roadmap, gom lượt vẽ, làm rõ JSDoc và cấu trúc node/link runtime.
- `11dd2db` — dọn CSS không còn dùng và hợp nhất token chung.
- `45f1c6a` — sửa layout shift khi tải roadmap, nhãn accessibility của nút theme và JSDoc hàng chủ đề; gồm các sửa chữa phát hiện trong chặng kiểm thử.
- Commit tài liệu tiếp theo ghi nhận kết quả nghiệm thu tại chính mục này; tra bằng `git log --oneline`.

Giữ Vanilla HTML/CSS/JS, BEM và scope CSS riêng theo ID trang. Không thêm thư viện chạy web, build bắt buộc, backend hoặc chức năng sản phẩm. Công cụ QA và fixture chỉ nằm trong thư mục tạm của máy, không phải dependency của repo. Hai JSON nguồn giữ nguyên cả nội dung và SHA-256; URL và khóa `ie104.theme` không đổi. Không push, merge hoặc deploy trong đợt này.

### Checklist công việc đã thực hiện

- [x] Ghi nhận dung lượng ban đầu và tọa độ/kích thước mọi node trong 37 roadmap trước khi sửa.
- [x] Tách DOM, đo kích thước, bố trí cột/hàng, xử lý va chạm, cập nhật canvas và đường nối thành các hàm riêng.
- [x] Đối chiếu bản tách hàm trước tối ưu tiếp: 37/37 cây có tọa độ và kích thước node khớp bản gốc.
- [x] Lập chỉ mục node theo độ sâu một lần, dùng lại trong bố trí cột và chống va chạm.
- [x] Tách pha đọc kích thước khỏi ghi vị trí; dựng node/đường nối/danh sách theo lô bằng DocumentFragment.
- [x] Gom yêu cầu vẽ bằng requestAnimationFrame, hủy lượt đang chờ khi có yêu cầu mới; fit/focus thực hiện sau khi bố trí xong.
- [x] Tách chọn node, nội dung panel và mở dialog; thay comment chung chung bằng mô tả thao tác và kiểu trả về cụ thể.
- [x] Thêm typedef nội bộ Keyword, MapNode, MapLink; sửa JSDoc createTopicRow trả HTMLElement.
- [x] Đối chiếu selector với HTML và class tạo từ JavaScript; giữ các modifier nhóm giảng viên được ghép động từ dữ liệu.
- [x] Bỏ 304 nhánh selector không được dùng trong năm CSS; dọn thành phần tài khoản, mẫu thống kê/giảng viên và dialog cũ.
- [x] Gom các nhóm token cơ sở về một khối :root; giữ riêng override tối thủ công và fallback theo hệ điều hành.
- [x] Giữ trạng thái tải có chừa không gian, công bố nội dung roadmap sau khi dữ liệu đã sẵn sàng.
- [x] Sửa nhãn nút theme thành “Giao diện sáng/tối”, bao gồm chữ Sáng/Tối hiển thị trên nút; giữ aria-pressed.
- [x] Chạy lại kiểm thử chức năng, lỗi, responsive, accessibility, validator cục bộ và 15 lượt Lighthouse.
- [ ] Xác nhận bằng W3C trực tuyến: dịch vụ hiện trả HTTP 403.
- [ ] Kiểm tra Firefox, Safari/iOS và thiết bị thật; kiểm tra hosting thật sau khi có đợt deploy riêng.

### Vấn đề và thay đổi

| Vấn đề trước sửa | Thay đổi thực hiện | File liên quan | Lý do |
|---|---|---|---|
| renderMindMap trộn nhiều bước, hơn 300 dòng | Hàm chính nhận yêu cầu; từng bước dựng/đo/tính/vẽ nằm trong hàm riêng có JSDoc | assets/js/topic-detail.js | Dễ đọc, giải thích và bảo trì theo nguyên tắc đơn nhiệm |
| Lọc lại toàn bộ node ở từng độ sâu | groupNodesByDepth tạo chỉ mục cột dùng lại | assets/js/topic-detail.js | Giảm phép duyệt lặp trong mỗi lượt bố trí |
| Dựng lại DOM ngay ở mỗi yêu cầu | Hủy frame cũ, chỉ dựng trạng thái mới nhất; DocumentFragment cập nhật container theo lô | assets/js/topic-detail.js | Tránh cập nhật dư khi đóng/mở hoặc resize nhanh |
| Fit và trả focus có thể chạy trước khi tọa độ mới sẵn sàng | Hoàn tất hai thao tác sau bước đo/vẽ cuối cùng | assets/js/topic-detail.js | Tránh dùng kích thước cũ hoặc focus vào node sắp bị thay thế |
| Comment lặp, kiểu trả về không cụ thể | Mô tả đúng sự kiện/thuật toán; typedef cây; sửa kiểu trả về của hàng chủ đề | assets/js/topic-detail.js, assets/js/topics.js | Chú thích phục vụ người đọc và tiêu chí chất lượng code |
| CSS còn nhiều thành phần không có trong giao diện hiện hành | Xóa selector đã đối chiếu; giữ selector trạng thái và class ghép động | assets/css/style.css, topics.css, lecturers.css, lecturer-detail.css | Giảm mã tải và tránh hiểu nhầm về tính năng |
| Token cơ sở nằm rải rác trong nhiều khối :root | Gom về khối chung, giữ override theme độc lập | assets/css/style.css | Dễ quản lý màu/chữ/khoảng cách mà không đổi giao diện |
| Placeholder tiêu đề/bộ chọn thay đổi kích thước khi JSON tới | aria-busy, thông báo tải có role=status, giữ không gian và ẩn placeholder bằng visibility trong lúc chờ | topics/detail/index.html, assets/css/topic-detail.css, assets/js/topic-detail.js | Giảm layout shift, không che lỗi bằng overflow-x:hidden |
| Nhãn “Chế độ tối” không chứa chữ Sáng đang hiển thị | Nhãn ổn định “Giao diện sáng/tối” trên cả năm trang | Năm file index.html | Khớp nhãn nhìn thấy với accessible name, hỗ trợ điều khiển giọng nói |

Không cần đổi tên các block BEM đang dùng: các tên dạng topic-meta-card, profile-header hoặc mindmap-node là block hợp lệ. CSS trang sau sửa đều còn scope theo ID; CSS shared/reset tiếp tục dùng chung.

### Luồng dựng roadmap sau refactor

1. renderMindMap ghi nhận yêu cầu fit/focus, tăng phiên bản vẽ và hẹn buildMapFrame; yêu cầu mới hủy frame cũ đang chờ.
2. buildMapFrame lấy cây đang mở, dựng node bằng DocumentFragment và chuẩn bị lớp SVG.
3. Khung hình tiếp theo chỉ đọc kích thước node. groupNodesByDepth lập các cột một lần.
4. Tính tọa độ ngang; tính chiều cao cây con, phân bố hàng, dịch nhánh va chạm và căn lại cha. Giai đoạn này chỉ xử lý dữ liệu hình học.
5. Ghi vị trí node, kích thước canvas và các đường Bezier theo lô; cuối cùng căn vừa/trả focus nếu có yêu cầu.

Giữ thuật toán hình học và hướng tiên quyết con → cha. Mọi cấp children vẫn được duyệt đệ quy. Pan/zoom chỉ thay transform, không dựng lại node. Keyword/list và JSON không thêm ID lưu trữ hoặc quan hệ xuyên chủ đề.

### Dung lượng trước và sau

Số byte UTF-8 của mã nguồn chưa nén, không minify. CSS gồm năm stylesheet ứng dụng, không tính reset.css vì không đổi. JavaScript gồm sáu module/script hiện hành.

| Thành phần | Trước | Sau | Chênh lệch |
|---|---:|---:|---:|
| Tổng CSS ứng dụng | 121.961 B | 79.900 B | Giảm 42.061 B, khoảng 34,49% |
| style.css | 41.972 B | 27.703 B | Giảm 14.269 B |
| topics.css | 40.989 B | 17.510 B | Giảm 23.479 B |
| topic-detail.css | 22.368 B | 22.937 B | Tăng 569 B cho trạng thái tải |
| lecturers.css | 6.952 B | 5.588 B | Giảm 1.364 B |
| lecturer-detail.css | 9.680 B | 6.162 B | Giảm 3.518 B |
| Tổng JavaScript | 70.254 B | 70.033 B | Giảm 221 B |
| Riêng topic-detail.js | 40.693 B | 40.376 B | Giảm 317 B, đồng thời thêm typedef/JSDoc cụ thể |

Mục tiêu refactor JS là giảm công việc lặp và làm rõ trách nhiệm, không phải rút số dòng bằng cách bỏ chú thích.

### Kết quả kiểm thử mới

Môi trường: Chrome 157.0.8103.50 headless, HTTP cục bộ root và tiền tố /ie104/. Lighthouse 13.6.0, mobile mặc định. Công cụ tự động không thay thế kiểm thử trình đọc màn hình hoặc thiết bị thật.

| Hạng mục | Kết quả thực tế |
|---|---|
| Dữ liệu | Parse được, giữ nguyên 3 nhóm/37 chủ đề/16 giảng viên và SHA-256 hai JSON |
| 37 chủ đề và 16 hồ sơ | Đúng tên, người hướng dẫn và số chủ đề liên quan; link dùng email và đủ khóa URL |
| Toàn bộ cây mở rộng | Đủ 234 keyword + 37 gốc; 0 cặp node chồng nhau; 37/37 bố cục khớp mốc trước tối ưu |
| Năm yêu cầu đóng/mở/resize liên tiếp trong một frame | Chỉ 1 lượt thay nội dung lớp node |
| Pan/zoom/fit | Hoạt động; node DOM cũ vẫn còn kết nối, không bị dựng lại bởi pan/zoom/fit |
| Tìm/lọc/sắp xếp | Tìm tên giảng viên không dấu; OR nhóm + AND từ khóa; A–Z; reset; không kết quả; dialog áp dụng/hủy |
| Điều hướng | Quick switch, mở trực tiếp, reload, Back/Forward; 5 URL thiếu/sai không trả dữ liệu mẫu |
| Roadmap tương tác | Mở/thu nhanh, danh sách/sơ đồ, fullscreen, Enter/Space, Escape và trả focus |
| Fixture cây 9 cấp ở 320px | Đủ node, tên/outcome dài, subjects có/không có, chữ chứa HTML không trở thành thẻ |
| Fixture trùng tên | Chọn đúng chủ đề theo email của người hướng dẫn thứ hai |
| 12 tình huống lỗi/rỗng | HTTP 500, JSON sai cú pháp, hai nguồn rỗng × 4 màn hình; có thông báo, không kẹt aria-busy |
| Hồ sơ thiếu/lỗi thông tin | Ảnh hỏng về chữ cái; link javascript bị bỏ; 0 thật vẫn hiện, chỉ số thiếu không đổi thành 0 |
| Theme | Bàn phím, reload, chuyển trang, đồng bộ tab; storage bị chặn không gây lỗi; tắt JS vẫn có fallback tối và nút ẩn |
| Responsive | 5 trang × 5 độ rộng × 2 theme = 50 trường hợp: không tràn ngang, một h1 và điều hướng/nút theme hiện đủ |
| Đối chiếu ảnh sau dọn CSS | 20/20 ảnh mobile/desktop, sáng/tối khớp bản trước dọn CSS; sửa trạng thái tải được kiểm tra riêng sau đó |
| Accessibility | axe WCAG 2 A/AA và 2.1 A/AA: 0 vi phạm phát hiện trên 20 trường hợp (mobile/desktop, hai theme), thêm dialog node không vi phạm |
| HTML | HTML-Validate: 0 lỗi trên năm trang với cấu hình đã ghi ở mục kiểm thử lịch sử |
| JS/CSS | Parse thành công; không phát hiện hàm thiếu JSDoc/returns qua kiểm tra AST; không thiếu token, không selector CSS trang ngoài scope |
| Runtime | Không pageerror trong các luồng và fixture đã chạy |
| Subpath | Năm trang chạy dưới /ie104/; các URL nội bộ/asset do trang tạo giữ đúng tiền tố |

### Lighthouse: ba lượt mỗi trang

Bảng dưới thay thế kết quả Lighthouse cũ cho bản tối ưu. Ba nhóm Accessibility, Best Practices, SEO đều đạt 100 ở cả 15 lượt. Điểm là số đo cục bộ; không suy ra điểm hosting thật. Thay đổi cuối ở topics.js chỉ sửa JSDoc và đặt tên tham số rồi destructure trong thân hàm, giữ nguyên hành vi render đã kiểm tra.

| Trang | Performance lượt 1 / 2 / 3 | Performance trung vị | Accessibility / Best Practices / SEO trung vị |
|---|---|---:|---|
| Trang vào | 100 / 100 / 100 | 100 | 100 / 100 / 100 |
| Khám phá | 100 / 100 / 100 | 100 | 100 / 100 / 100 |
| Chi tiết/roadmap | 92 / 92 / 92 | 92 | 100 / 100 / 100 |
| Danh bạ | 97 / 97 / 97 | 97 | 100 / 100 / 100 |
| Hồ sơ | 93 / 93 / 93 | 93 | 100 / 100 / 100 |

Lượt chẩn đoán trước khi sửa trạng thái tải cho roadmap đạt Performance 85, CLS khoảng 0,301. Sau sửa, cả ba lượt có CLS khoảng 0,00374 và Performance 92. Bộ Lighthouse lịch sử phía trên chạy trước khi bổ sung nút theme, không phải phép so sánh trước/sau có cùng điều kiện; không dùng bảng đó để khẳng định mức tăng hiệu năng của đợt này.

### Giới hạn và cách kiểm tra tiếp

- Đã thử lại W3C HTML bằng trang vào và truy cập dịch vụ CSS Validator: cả hai trả HTTP 403. Chưa có báo cáo W3C hợp lệ; không đánh dấu pass W3C hoặc dùng HTML-Validate thay cho chứng nhận của dịch vụ này.
- Không tìm thấy Firefox tại các vị trí cài đặt Windows thông dụng hoặc đường dẫn Firefox của Playwright. Chưa chạy Firefox/Safari/iOS, thiết bị thật và screen reader.
- Chưa deploy/push/merge; đường dẫn /ie104/ mới được kiểm tra bằng server cục bộ. Cache và nén HTTP phụ thuộc hosting, không phải tính năng backend cần thêm vào đồ án.
- Kiểm tra lại hosting và W3C khi môi trường sẵn sàng. Không cần thêm chức năng để hoàn thành bước đó.

Tự chạy: mở repo bằng VS Code Live Server qua HTTP; bắt đầu ở index.html. Thử luồng Khám phá → chủ đề → giảng viên → chủ đề liên quan, đổi theme và kích thước cửa sổ. Khi sửa roadmap, thử đóng/mở nhanh, đổi view, căn vừa và bàn phím trước khi tạo PR. Công cụ QA tạm trên máy không phải yêu cầu cài đặt để thành viên chạy website.
