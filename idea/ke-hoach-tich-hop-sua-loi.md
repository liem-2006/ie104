# Tích hợp và sửa lỗi Job 1 — IE104

> **Giao diện hiện hành ngày 12/11/2026:** [thiết kế lại theo hướng tra cứu học thuật](#giao-dien-hoc-thuat). Các phần tích hợp/tối ưu trước mục này là lịch sử; quyết định mới thay bố cục ba cột, gradient và modal chọn nhóm cũ. Hợp đồng dữ liệu/URL vẫn có hiệu lực.


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


<a id="giao-dien-hoc-thuat"></a>

## Thiết kế lại giao diện học thuật — 12/11/2026

> **Đã triển khai và kiểm thử cục bộ.** Năm trang dùng cùng thiết kế gọn, nền trung tính và xanh UIT, tập trung tìm đề tài và xem kiến thức nền. Khám phá phân trang 12 chủ đề. Quyết định đã được nhóm trưởng duyệt thay yêu cầu giữ nguyên bố cục TV1 ban đầu; các kết quả ở mục này là bằng chứng cho giao diện mới.

### Đầu vào, giới hạn và commit

Mốc trước thiết kế lại: `206c92f`. Dữ liệu/source PR và lịch sử sửa chữa được giữ ở các mục trước. Tiếp tục HTML5/CSS3/JavaScript thuần, BEM, CSS riêng theo ID, JSDoc và DOMContentLoaded. Không thêm thư viện/build/backend hoặc dữ liệu nghiên cứu mới. Hai JSON giữ nguyên SHA-256, 3 nhóm/37 chủ đề/234 keyword/16 hồ sơ. URL group/topic/email, URL hồ sơ email và khóa ie104.theme giữ nguyên.

| Commit | Kết quả |
|---|---|
| 8a2984f | Nền học thuật, header/footer, trang vào, khám phá và phân trang |
| b6916b2 | Chi tiết gọn, cây/danh sách theo token chung và fit theo node thật |
| 0c94920 | Danh bạ, hồ sơ và component hàng chủ đề dùng chung |
| dcb925f | Sửa HTML semantics của tìm kiếm và nền trắng cho logo gốc ở theme tối |
| 5238351 | Chốt tiêu đề hàng chủ đề 18px trên mobile theo thang chữ đã duyệt |

Commit bàn giao tài liệu/ảnh theo sau các commit trên; tra bằng git log. Chưa push, merge, deploy, đóng PR hoặc đăng nhận xét lên GitHub.

### Bộ quy tắc giao diện

- Container tối đa 1.200px; lề 16/24/32px, breakpoint 768/1024px. Font hệ thống, body 16px/1,6; phụ 14px; H1 mobile/desktop 26/32px; tên thẻ 18px.
- Spacing 4/8/12/16/24/32/48px; input/nút bo 8px, khối 12px. Bỏ gradient/shadow cũ; đường phân cách và khoảng cách thay cho nhiều khung trang trí.
- Sáng: nền #F6F8FB, surface #FFFFFF, chữ #162536, phụ #526274, nhấn #165F9B với chữ trắng. Tối: nền #141A23, surface #1C2531, chữ #ECF2F8, phụ #ACB8C8, nhấn #8CC7FF với chữ #10263A.
- Header có logo + UIT Discovery, Khám phá/Giảng viên và theme. Mobile hai hàng. Logo gốc màu xanh có nền trắng riêng để nhìn rõ trong theme tối; không tạo logo mới.
- Nút/điều khiển chính có kích thước CSS ít nhất 44px, focus rõ, nhãn truy cập khớp chữ hiển thị. Một H1 mỗi trang. Emoji trang trí đã bỏ khỏi phần trình bày roadmap; chữ/thuật ngữ trong JSON được giữ.
- Chỉ style.css quản lý token, header/footer và topic-row dùng chung. CSS riêng có ID scope. TV1 sở hữu nền; TV2/TV3 không tạo bộ màu/header riêng.

### Thay đổi theo phần việc

| Phần | Trước | Sau | Mục đích |
|---|---|---|---|
| TV1 — Khám phá | Cột giữa hẹp, sidebar trống kéo dài, 37 card | Danh sách rộng, thống kê một dòng, hướng dẫn details, 12 hàng/trang | Dễ quét và ngắn hơn |
| TV1 — Điều khiển | Pill + modal trùng chức năng, filter thành nhiều hàng | Chọn nhiều nhóm trực tiếp; kết quả/sắp xếp/reset gọn | Giảm thao tác trùng lặp |
| TV1 — Thẻ | Tên đề tài và nút mở riêng cùng dẫn một nơi | Tên đề tài là link chính, giảng viên là link độc lập | Bỏ hành động lặp |
| TV2 — Phần đầu | Nhiều metadata card và mô tả tự sinh lặp tên | Tiêu đề/nhóm và metadata gọn, bộ chuyển chủ đề phụ | Đưa kiến thức nền lên sớm |
| TV2 — Sơ đồ | Fit theo cả vùng SVG trống | Fit theo bounding box node, chừa 40px/cạnh, không tự phóng quá 1 | Cây ít nhánh có chữ dễ đọc |
| TV2 — Hướng dẫn | Nhiều emoji/nhãn dài, mô tả dài luôn hiện | Sơ đồ/Danh sách, hướng dẫn một câu và details, panel theo token chung | Dễ hiểu và đồng nhất |
| TV3 — Danh bạ | Bộ tìm/lọc dọc trên desktop, nút hồ sơ rộng | Tìm/lọc cùng hàng, grid 3/2/1, link hồ sơ gọn | Dùng không gian hợp màn hình |
| TV3 — Hồ sơ | Tiêu đề tách avatar/email và nhiều mục trống | Header thông tin gọn, một ghi chú khi thiếu, khối tùy chọn chỉ hiện khi có | Không tạo hồ sơ trống lớn |
| TV3 — Chủ đề liên quan | HTML riêng | createTopicRow(entry,3) cùng component khám phá | Tránh lệch thiết kế và đường dẫn |

### Hợp đồng phân trang và component

- state.page ban đầu 1, pageSize=12. Lọc toàn bộ dữ liệu theo OR nhóm + AND truy vấn → sắp xếp → lấy lát cắt của trang hiện tại.
- Đổi tìm kiếm/nhóm/sắp xếp về trang 1. Không chọn nhóm là tất cả; tìm tên đề tài hoặc giảng viên không phân biệt dấu/hoa thường.
- Trạng thái “1–12 trong 37 chủ đề”, Trước/Sau và số trang có aria-current. Khi <=12 hoặc 0 kết quả thì ẩn thanh phân trang.
- Đổi trang focus về results-heading và cuộn tới đầu kết quả. Không ghi page hoặc bộ lọc vào URL/storage. Nút reset chỉ hiện khi có lựa chọn khác mặc định; reset trả focus về input.
- Đã bỏ modal nhóm cùng handler, không khôi phục modal khi sửa tiếp.
- createTopicRow(entry, headingLevel=2) là export mới trong data.js: h2 ở khám phá, gọi với 3 ở hồ sơ dưới mục h2. Tạo nội dung bằng DOM/textContent, URL bằng helper cũ. Khi duyệt mảng phải gọi hàm với tham số rõ ràng; không truyền trực tiếp vào Array.map vì index sẽ bị hiểu là headingLevel.
- Roadmap giữ engine và đệ quy children, gom frame, fit/focus sau bố trí. nodeBounds chỉ là dữ liệu runtime. Pan/zoom không dựng lại cây, mobile mặc định danh sách.

### Tài liệu đã đồng bộ

- [TV1 — Job hiện hành](../topics/JOB-1.md), [TV2 — Job hiện hành](../topics/detail/JOB-1.md), [TV3 — Job hiện hành](../lecturers/JOB-1.md), [hồ sơ TV3](../lecturers/detail/JOB-1.md), [CSS theo TV](../assets/css/JOB-1.md): mục tiêu, đầu vào, file đích, đầu ra, quy tắc và nghiệm thu ở đầu; bản giao việc cũ giữ trong phần Lịch sử.
- Ba ghi nhận [TV1](../topics/SUA-CHUA-TV1.md), [TV2](../topics/detail/SUA-CHUA-TV2.md), [TV3](../lecturers/SUA-CHUA-TV3.md) có bảng trước/sau/lý do/file, cách tự thử, kết quả và giới hạn.
- README, idea/README, job-1-rules, AGENTS và CONTRIBUTING đã chỉ tới yêu cầu hiện hành. Phần lịch sử không còn là lệnh giữ nguyên giao diện cũ.

### Ảnh minh chứng của bản hiện hành

Ảnh chụp viewport thực, không phải mockup; đã xem trực tiếp desktop/mobile trước khi chuyển sang phần việc kế tiếp. Folder ảnh này chỉ phục vụ bàn giao, không được tải ở runtime.

| Ảnh | Kích thước/theme |
|---|---|
| [Trang vào](minh-chung-giao-dien/trang-vao-desktop.png) | 1440×900, sáng |
| [Khám phá desktop](minh-chung-giao-dien/kham-pha-desktop.png) | 1440×900, sáng |
| [Khám phá mobile](minh-chung-giao-dien/kham-pha-mobile.png) | 375×812, sáng |
| [Roadmap desktop](minh-chung-giao-dien/roadmap-desktop-toi.png) | 1440×900, tối |
| [Danh bạ desktop](minh-chung-giao-dien/giang-vien-desktop.png) | 1440×900, sáng |
| [Hồ sơ mobile](minh-chung-giao-dien/ho-so-mobile-toi.png) | 375×812, tối |

### Nghiệm thu đã thực hiện

Chrome 157.0.8103.50 headless qua HTTP root và /ie104/, ngày 12/11/2026. Công cụ/fixture QA đặt trong thư mục tạm, không là dependency của web.

| Kiểm tra | Kết quả |
|---|---|
| Dữ liệu và URL | Hai JSON không đổi SHA-256; đủ 3 nhóm, 37 chủ đề, 234 keyword và 16 hồ sơ |
| Mở tất cả đề tài/hồ sơ | Đúng tên, giảng viên, số chủ đề theo email; 37 cây đủ node/đường nối, không phát hiện node chồng nhau |
| Phân trang mặc định | 12/12/12/1; 37 URL duy nhất, đúng Trước/Sau và aria-current |
| Lọc/tìm/sắp xếp | OR nhóm + AND truy vấn, không dấu, A–Z trên cả 37 đề tài trước phân trang; đổi lọc về 1 |
| Kết quả ít/rỗng | 0, dưới 12, trên 12; ẩn phân trang đúng, reset và focus đúng |
| Điều hướng trang bằng bàn phím | Enter đổi trang, focus về results-heading; reset trả focus input |
| Màn hình đầu | 375×812: tên đề tài đầu y≈674–726; 1440×900 thấy bốn hàng đầy đủ |
| Responsive | 5 trang × 5 độ rộng × 2 theme = 50 ca, không tràn ngang, một h1, nav/theme hiện đủ; danh bạ đúng 1/2/3 cột |
| Tinh chỉnh tiêu đề mobile 18px | Kiểm tra lại 320/375px, hai theme: không tràn, axe không vi phạm phát hiện |
| Roadmap | Fit theo node thật/đệm; mở/thu nhanh, pan/zoom giữ DOM, danh sách, fullscreen, quick switch/reload/Back/Forward đạt |
| Dialog và bàn phím | Enter/Space mở, Escape đóng và trả focus; axe dialog không vi phạm phát hiện |
| Fixture kiến thức | Cây 9 cấp, tên/outcome dài/chứa HTML, subjects có/không, tên trùng khác email: đủ dữ liệu, đúng người, không render HTML nguồn |
| Fixture hồ sơ | Ảnh hỏng về chữ cái; chỉ số thiếu không thành 0; 0 thật giữ; URL javascript bị loại |
| Tải dữ liệu | 12 ca HTTP 500/JSON sai/hai nguồn rỗng × 4 màn hình: có thông báo, không kẹt aria-busy, không runtime error |
| Theme | Bàn phím, reload/chuyển trang, đồng bộ tab; storage bị chặn vẫn đổi được; tắt JS theo hệ thống và nút ẩn |
| URL và tài nguyên | 5 URL thiếu/sai không fallback, email hoa/khoảng trắng đúng; 5 trang dưới /ie104/ giữ tiền tố; không tài nguyên cục bộ tải thất bại trong các luồng bình thường |
| HTML/CSS/JS | HTML-Validate nguồn 5 trang: 0 lỗi; CSS parse được/không thiếu token; CSS trang có scope; AST không phát hiện hàm thiếu JSDoc/returns; không pageerror |
| Accessibility | 20 ca axe mobile/desktop, hai theme, WCAG 2 A/AA và 2.1 A/AA không vi phạm phát hiện; thêm dialog và bốn ca mobile sau tinh chỉnh đạt |

HTML-Validate giữ cấu hình đã mô tả ở mục lịch sử (tắt bốn quy tắc phong cách, không tắt cấu trúc/accessibility). Kết quả tự động không thay việc dùng screen reader hoặc thử trên thiết bị thật.

### Lighthouse trên giao diện mới

Lighthouse 13.6.0, mobile mặc định; ba lượt/trang, ghi trung vị. Trang khám phá chạy lại ba lượt sau khi chốt font mobile 18px; bốn trang còn lại lấy bộ ba sau khi hoàn thiện nền logo. Kết quả này thay bảng Lighthouse trước đó cho giao diện hiện hành; không suy ra điểm trên hosting thật.

| Trang | Performance 1 / 2 / 3 | Performance trung vị | Accessibility / Best Practices / SEO trung vị |
|---|---|---:|---|
| Trang vào | 100 / 100 / 100 | 100 | 100 / 100 / 100 |
| Khám phá | 94 / 94 / 94 | 94 | 100 / 100 / 100 |
| Chi tiết/roadmap | 95 / 95 / 95 | 95 | 100 / 100 / 100 |
| Danh bạ | 97 / 97 / 97 | 97 | 100 / 100 / 100 |
| Hồ sơ | 95 / 95 / 95 | 95 | 100 / 100 / 100 |

### Checklist bàn giao và giới hạn

- [x] Năm trang thiết kế lại, giữ dữ liệu/URL và chức năng đã chốt.
- [x] Phân trang 12 và bàn phím, trạng thái lỗi/rỗng, responsive hai theme.
- [x] Kiểm tra trực quan và sáu ảnh minh chứng; không chỉ dựa số đo overflow.
- [x] Cập nhật năm Job MD, ba ghi nhận TV và hướng dẫn hiện hành; giữ lịch sử.
- [x] Nghiệm thu cục bộ/Lighthouse và commit theo phần việc.
- [ ] W3C chính thức: thử lại ngày 12/11/2026 bằng HTML trang vào và endpoint CSS, đều HTTP 403. Chưa có báo cáo hợp lệ, không ghi pass W3C.
- [ ] Firefox: chưa có tại đường dẫn Playwright hoặc hai vị trí cài Windows đã kiểm tra. Chưa xác nhận Firefox/Safari/iOS, screen reader hoặc thiết bị thật.
- [ ] Hosting thật: chưa deploy/push/merge; /ie104/ hiện được mô phỏng bằng HTTP cục bộ.

Tự chạy: mở repo bằng VS Code Live Server, vào index.html. Đối chiếu ảnh ở kích thước tương ứng, thử phân trang/tìm/lọc, mở cây và giảng viên, thay theme và thu cửa sổ. Tiếp tục theo Yêu cầu giao diện hiện hành trong Job MD cạnh code, không áp dụng ràng buộc HTML/CSS tĩnh của bản lịch sử.

## Bàn giao GitHub và Job 2 — 12/11/2026

Phần này cập nhật trạng thái bàn giao sau thiết kế lại; kết quả kiểm thử giao diện bên trên là lịch sử bản nền, không phải kết quả Job 2.

- Đã kiểm tra GitHub: main vẫn adea9fe01c25d220c08ae34b90f7ea3cd84dd369; PR #1/#2/#3 còn mở, commit nguồn không đổi so với bảng tích hợp. Không có cập nhật nguồn mới cần hòa giải.
- Bản code nền: 54d0de6. Đợt giao Job 2 chỉ sửa tài liệu; không thay code, asset hoặc hai JSON.
- Đã tạo JOB-2.md cạnh khám phá, chi tiết/roadmap, danh bạ và hồ sơ; cập nhật README, CONTRIBUTING, AGENTS, ngữ cảnh idea và mẫu PR.
- TV1 nhận roadmap (gốc TV2); TV2 nhận danh bạ/hồ sơ (gốc TV3); TV3 nhận khám phá (gốc TV1). Nhóm trưởng quản lý trang vào/token/component/module chung.
- IE104 giữ vai trò quy chuẩn code/cấu trúc. IE106 dùng kiến thức đã học về khả năng sử dụng, phân cấp và nhất quán giao diện; không tự thêm rubric.
- Job 2 chưa bắt đầu. Thành viên chờ nhóm trưởng merge PR bản nền vào main, tạo nhánh mới từ upstream/main, rồi thực hiện một PR/người. Không dùng nhánh Job 1 cũ.
- Bản tổng quan job-history/job-2.md ở workspace bên ngoài repo, chỉ lưu local. Không đưa vào GitHub.
- Đã rà link nội bộ của tài liệu mới và hướng dẫn cập nhật: không phát hiện link hỏng; ID scope khớp HTML. git diff --check không lỗi khoảng trắng; code/dữ liệu không đổi, không chạy lại kiểm thử giao diện cho thay đổi thuần tài liệu.
- Công bố bằng push integration/job-1-fixes và mở PR vào main; không merge, đóng PR gốc hoặc deploy. Trạng thái/đường dẫn PR được bàn giao sau khi GitHub xác nhận.
### Xác nhận công bố

Đã push nhánh integration/job-1-fixes và mở [PR #4](https://github.com/liem-2006/ie104/pull/4) vào main ngày 12/11/2026. Commit giao việc: 3ad3c5c. PR có liên kết ba bản ghi sửa chữa, các task Job 2 và kết quả kiểm thử bản nền. Chờ nhóm trưởng duyệt/merge; chưa merge, chưa đóng PR #1–#3, chưa deploy.
## Nhánh nhận PR Job 2 — cập nhật 12/11/2026

PR #4 đã được nhóm trưởng yêu cầu merge và GitHub xác nhận thành công vào main, commit 265b38986d832d0714e987dd1a75f5ea2f2aa09f. Trạng thái “chờ merge” ở các bản ghi trước là lịch sử.

Tạo integration/job-2 từ origin/main tại commit trên. Thành viên tạo nhánh task mới từ upstream/integration/job-2, gửi một PR/người với base integration/job-2. Nhóm trưởng duyệt/merge từng PR vào nhánh này; hoàn tất kiểm thử mới mở PR tổng vào main. Không thay quyền repo, không tự thêm thành viên hoặc deploy.

Đã đồng bộ các JOB-2.md, README, CONTRIBUTING, AGENTS, ngữ cảnh idea, mẫu PR và bản tổng quan local theo nhánh đích mới. Chỉ thay tài liệu, không sửa code/dữ liệu. Các hướng dẫn Job 1 và biên bản cũ giữ làm lịch sử.
## Kế hoạch tích hợp và ghi nhận sửa chữa Job 2 — 16/11/2026

> **Trạng thái: mới cập nhật kế hoạch, chưa thực hiện tích hợp hoặc merge Job 2.** Phải bàn giao bản chạy thử để nhóm trưởng kiểm tra và cho phép trước khi merge. Phần này là hướng dẫn hiện hành cho đợt tích hợp Job 2; các trạng thái và kết quả ở phần trước được giữ nguyên như lịch sử, không phải nghiệm thu bản Job 2.

### 1. Ngữ cảnh để mọi thành viên đọc chung

- Job 1 đã được tích hợp, sửa lỗi và thiết kế lại theo hướng tra cứu học thuật; PR #4 đã merge vào main tại `265b38986d832d0714e987dd1a75f5ea2f2aa09f` theo yêu cầu nhóm trưởng.
- Nhánh `integration/job-2` nhận bài kiểm tra và nâng cấp chéo. Mốc local khi viết kế hoạch: `741e5af`; phải kiểm tra remote lại trước triển khai.
- Phân công Job 2: **TV1 làm chi tiết/roadmap (phần gốc Job 1 của TV2); TV2 làm danh bạ/hồ sơ (phần gốc của TV3); TV3 làm khám phá (phần gốc của TV1)**. Số TV trong tên tài liệu `job2-...` chỉ người nhận Job 2, không đổi tên hay ghi đè đóng góp Job 1.
- Đợt này giữ các cải tiến hữu ích của thành viên, sửa lỗi liên kết và tương tác, đồng nhất phần dùng chung; không làm lại giao diện toàn bộ hoặc thêm nghiệp vụ.
- Giữ Vanilla HTML/CSS/JS, BEM, CSS scope theo trang, hàm đơn nhiệm/JSDoc, theme sáng/tối và thiết kế học thuật hiện hành. IE106 định hướng khả năng sử dụng; IE104 vẫn là quy chuẩn code. Không backend, thư viện, đăng nhập hoặc lưu tiến độ.

### 2. Nguồn PR và các phát hiện cần xác nhận lại

Các SHA dưới đây là mốc của lần rà soát trước, không thay thế việc kiểm tra GitHub khi bắt đầu. Nếu có commit mới, đọc diff mới và ghi thêm mốc, không xóa nguồn cũ.

| Người nhận Job 2 | PR | Commit đã rà soát | Tình trạng/điểm cần xử lý |
|---|---|---|---|
| TV1 — chi tiết/roadmap | [#8](https://github.com/liem-2006/ie104/pull/8) | `48c857ec41157ca67775b0365cd67a3933ad57ba` | Đang nhắm main trong lần rà trước; cần đổi đích sau khi được phép. Giữ cải tiến pointer/zoom, xử lý mặc định mobile, tự cuộn, debug và minh chứng |
| TV2 — danh bạ/hồ sơ | [#6](https://github.com/liem-2006/ie104/pull/6) | `a2b32b20ec527a1320125e456ef8771f70129eb7` | Giữ sửa email đúng; xử lý tương thích link chủ đề cũ, focus phân trang, ảnh/token và bổ sung ghi nhận còn thiếu |
| TV3 — khám phá | [#7](https://github.com/liem-2006/ie104/pull/7) | `a0dc22027cd7696d6e34820695b2baff058e195a` | Giữ cải tiến tìm/lọc/trạng thái rỗng; kiểm thử hồi quy sau khi ghép |

Nhóm trưởng xác nhận `hunglkt@uit.edu.vn` là lỗi chính tả, email đúng là `hunglk@uit.edu.vn`. Giữ sửa đổi đồng bộ trong hai JSON; không hoàn tác. Vấn đề kỹ thuật cần sửa là URL chủ đề cũ chưa được ánh xạ tương thích, dù URL hồ sơ cũ đã có xử lý riêng. Đây là xác nhận dữ liệu từ nhóm trưởng, không phải tuyên bố kiểm chứng học thuật độc lập.

Lần kiểm tra riêng từng PR đã ghi nhận 40 trường hợp responsive không tràn ngang, bốn ca axe không phát hiện vi phạm và không có pageerror trong luồng đã thử. Đồng thời đã tái hiện mất focus khi đổi trang danh bạ, link chủ đề email cũ không tìm thấy, mobile roadmap mặc định sơ đồ và tự cuộn khỏi tiêu đề. Các kết quả này **không chứng minh bản ghép đã đạt**, không thay kiểm thử lại bên dưới; ảnh tương đối cần thử bằng fixture, chưa kết luận lỗi trên dữ liệu ảnh thật.

### 3. Đầu ra tài liệu và quy tắc ghi lịch sử

Ngoài code trên nhánh thử `review/job-2-combined`, bắt buộc tạo ba bản ghi khi triển khai:

| File sẽ tạo, tính từ gốc repo | Phạm vi |
|---|---|
| `topics/detail/job2-sua-chua-tv1.md` | Chi tiết chủ đề, roadmap, panel và tương tác |
| `lecturers/job2-sua-chua-tv2.md` | Cả danh bạ, hồ sơ, email và dữ liệu giảng viên |
| `topics/job2-sua-chua-tv3.md` | Khám phá, tìm/lọc, phân trang và trạng thái kết quả |

Hiện các file này là **đầu ra dự kiến**, chưa ghi là đã tạo. Khi tạo xong, thêm liên kết tương đối vào các JOB-2.md liên quan và kế hoạch này. JOB-2.md vẫn là tài liệu giao việc; job2-sua-chua là lịch sử nhận bài, tích hợp và sửa chữa. Không thay thế SUA-CHUA-TV*.md hoặc JOB-1.md của đợt trước, không tạo thêm báo cáo riêng. Tổng quan `job-history/job-2.md` vẫn chỉ lưu local.

Mỗi bản ghi mới phải có đầy đủ:

1. **Ô tóm tắt đầu file:** người nhận theo Job 2, phần gốc thuộc ai, PR nguồn, bản nền, trạng thái hiện tại, việc thành viên cần đọc/làm tiếp; liên kết JOB-2.md, ghi nhận Job 1 và kế hoạch tổng.
2. **Nguồn và đóng góp gốc:** SHA PR, chức năng/cải tiến giữ lại, phần thay thế và phần không áp dụng cùng lý do; không quy đóng góp của thành viên thành việc do người tích hợp viết.
3. **Bảng thay đổi:** mã thay đổi, trước → sau → lý do/ảnh hưởng → file liên quan → người thực hiện/vai trò → commit → kiểm thử/minh chứng. Mỗi thay đổi logic hoặc hành vi cần một dòng rõ ràng; không chỉ viết “đồng bộ giao diện”.
4. **Thay đổi dùng chung:** ghi nguồn thay đổi module/token/dữ liệu do nhóm trưởng phụ trách và ảnh hưởng tới phần của TV; dẫn về cùng bản ghi ở kế hoạch tổng, không mô tả thành ba cách xử lý khác nhau.
5. **Nhật ký theo mốc:** ngày, commit/bản thử, nội dung, lý do, góp ý liên quan, trạng thái. Ghi các mốc nhận PR → tích hợp → sửa lỗi → kiểm thử → nhóm trưởng góp ý → sửa sau góp ý → duyệt → merge. Chỉ ghi mốc đã xảy ra; việc chưa làm để checklist trống.
6. **Quy ước tiếp tục:** dữ liệu/URL/API dùng chung, phạm vi file và hành vi cần giữ, cách chạy HTTP và các bước tái hiện/tự kiểm tra phần mình.
7. **Nghiệm thu:** kết quả thực tế, công cụ/môi trường/ngày/commit được thử, ảnh trước–sau khi đổi giao diện, giới hạn và vấn đề chưa xử lý. Không chuyển tự báo cáo của thành viên thành kết quả đã được người tích hợp xác minh.
8. **Duyệt và merge:** ghi đúng phản hồi nhóm trưởng và SHA được duyệt. Khi chưa duyệt ghi “Chờ nhóm trưởng kiểm tra”; chỉ ghi PR/commit merge sau khi GitHub xác nhận. Tài liệu mô tả một commit không tự tham chiếu hash của commit đang chứa chính thay đổi đó; dùng SHA code đã chốt hoặc bổ sung ở mốc sau.

Không xóa kết quả hoặc quyết định cũ khi có bản mới. Thêm mốc “thay thế bởi ...” và lý do để người đọc hiểu tiến trình. Đầu file phải chỉ rõ trạng thái mới nhất để tránh thành viên làm theo hướng dẫn đã hết hiệu lực.

### 4. Trình tự triển khai và đầu ra từng bước

#### Bước 1 — Chốt đầu vào

- [ ] Đọc quy chuẩn, kiểm tra working tree, bảo toàn thay đổi có sẵn; lấy trạng thái main, integration/job-2 và ba PR mới nhất.
- [ ] Ghi SHA nguồn mới, diff so với lần rà trước, nhánh đích và phạm vi từng TV. Không tự nhận xét công khai, đóng PR hoặc đổi nhánh đích trong bước này.
- [ ] Tạo ba bản ghi job2-sua-chua theo cấu trúc trên với trạng thái đang triển khai, chưa nghiệm thu.

#### Bước 2 — Tích hợp cách ly

- [ ] Tạo local `review/job-2-combined` từ integration/job-2 mới nhất. Nếu nhánh đã tồn tại, kiểm tra tiến độ và tiếp tục an toàn, không reset mất việc.
- [ ] Áp dụng diff từng PR theo thứ tự #7 → #6 → #8, mỗi phần một commit có PR/SHA/tác giả nguồn; không áp dụng lại commit nền đã có.
- [ ] Kiểm tra sau từng phần và ghi xung đột/quyết định giải quyết nếu có. Chưa thay đổi nhánh chung trên GitHub.

#### Bước 3 — Email và module chung

- [ ] Giữ email đúng trong hai JSON; thêm ánh xạ email cũ sang mới trong module dữ liệu chung sau trim/lowercase, dùng khi tra cả hồ sơ và chủ đề.
- [ ] Bỏ alias cục bộ trùng lặp; link mới sinh email đúng. Email sai khác vẫn không tìm thấy, không fallback mẫu. Giữ hợp đồng URL group/topic/email và schema.
- [ ] Ghi rõ ngoại lệ được nhóm trưởng cho phép: hai JSON được sửa email chính tả; dữ liệu khác và số lượng phải được bảo toàn. Yêu cầu “không thay JSON” của nhiệm vụ gốc được thay thế chỉ trong phạm vi này.

#### Bước 4 — TV2: danh bạ/hồ sơ

- [ ] Sửa focus phân trang về đầu danh sách sau khi cập nhật, thông báo kết quả rõ; giữ 9 người/trang và 10 chủ đề/trang hồ sơ.
- [ ] Dùng chung xử lý ảnh với đường dẫn tính đúng từ gốc dự án; kiểm thử ảnh tương đối ở hai cấp thư mục, ảnh hỏng/thiếu dùng avatar chữ cái; gom logic tên/avatar trùng lặp phù hợp.
- [ ] Khôi phục email trên thẻ theo yêu cầu tra cứu; thay màu riêng bằng token tương ứng, giữ cải tiến hữu ích còn lại.
- [ ] Bổ sung ghi nhận thực hiện còn thiếu tại JOB-2.md danh bạ/hồ sơ, phân biệt phần thành viên làm và phần người tích hợp sửa; ghi lịch sử chi tiết trong job2-sua-chua-tv2.md.

#### Bước 5 — TV1: roadmap

- [ ] Giữ pointer/zoom hữu ích; mobile mặc định Danh sách theo nhiệm vụ đã giao, vẫn chọn Sơ đồ được.
- [ ] Bỏ tự cuộn xuống cây khi tải trang và đối tượng debug trên window; giữ hiển thị tên/metadata ở đầu.
- [ ] Sửa URL minh họa bằng chủ đề thật, bổ sung minh chứng; kiểm thử cuộn mobile/pan/zoom/fullscreen/panel. Ghi việc thay hành vi của PR và căn cứ yêu cầu trong job2-sua-chua-tv1.md.

#### Bước 6 — TV3 và các điểm nối

- [ ] Giữ cải tiến tìm kiếm, hướng dẫn lọc và trạng thái rỗng; bảo toàn phân trang 12, reset và focus.
- [ ] Kiểm tra module/token/theme/liên kết giữa các phần; không tạo thay đổi không cần thiết để mọi TV đều có sửa code. Nếu phần TV3 không cần sửa, ghi rõ giữ nguyên và chỉ kiểm thử tích hợp.
- [ ] Cập nhật ba bản ghi, JOB-2.md và kế hoạch tổng theo công việc thực tế. Commit sửa lỗi theo phần việc; chưa push, merge hoặc deploy.

### 5. Kiểm thử bản tích hợp và ghi nhận kết quả

Tất cả mục dưới đây đang **chưa chạy trên bản tích hợp Job 2**. Ghi kết quả theo commit ứng viên mới, không sao chép điểm Job 1 hoặc điểm thành viên tự báo cáo.

| Nhóm kiểm tra | Tiêu chí |
|---|---|
| Dữ liệu | 3 nhóm, 37 chủ đề, 234 keyword, 16 hồ sơ; không mất/trùng liên kết giảng viên; diff hai JSON chỉ gồm sửa email được phép |
| Email/URL | Cũ và mới mở đúng chủ đề/hồ sơ; email hoa/khoảng trắng đúng; email sai không fallback; link mới dùng email đúng |
| Liên thông | Mở tất cả chủ đề/hồ sơ, đúng giảng viên; URL trực tiếp, reload, Back/Forward; root và /ie104/ |
| Khám phá | 12/12/12/1, tìm không dấu, OR nhóm + AND truy vấn, sắp xếp toàn dữ liệu trước phân trang; 0/ít/nhiều kết quả, reset/focus |
| Danh bạ/hồ sơ | 9/7, tìm/lọc và phân trang reset hợp lý; bàn phím không mất focus; chủ đề liên quan đúng email; ảnh tương đối/hỏng/thiếu |
| Roadmap | Cả 37 cây đủ node, không chồng khi mở toàn bộ; cây sâu/tên dài/subjects tùy chọn; quickselect/reset, mở/thu, pan/zoom/fit/fullscreen, panel/Escape/trả focus |
| Giao diện | Năm trang × 320/375/768/1024/1440px × hai theme; xem trực tiếp bố cục, không tràn ngang/mất nội dung; mobile mặc định danh sách |
| Lỗi/truy cập | JSON lỗi/sai định dạng/rỗng, storage bị chặn, trạng thái tải/không tìm thấy; bàn phím/focus, không JS error chưa bắt; axe |
| Chuẩn/hiệu năng | HTML/CSS validator, token/asset, Lighthouse mobile ba lần/trang lấy trung vị: P ≥90, A/BP/SEO ≥95; ghi nguyên nhân nếu chưa đạt |

Ghi công cụ/phiên bản/trình duyệt/ngày/URL/commit. Thử W3C và Firefox nếu có; công cụ thiếu hoặc dịch vụ chặn ghi là chưa xác minh. Không coi headless là đã thử thiết bị cảm ứng thật. Lưu ảnh trước–sau riêng theo Job 2, không ghi đè ảnh Job 1.

### 6. Điểm dừng bắt buộc để nhóm trưởng kiểm tra

- [ ] Bàn giao commit bản thử, cách chạy HTTP, URL năm trang, ba bản ghi sửa chữa và báo cáo ngắn kết quả/vấn đề còn lại.
- [ ] Hướng dẫn nhóm trưởng thử khám phá → roadmap → hồ sơ → danh bạ, tìm/lọc/phân trang, hai theme, cửa sổ nhỏ và link dùng email cũ/mới.
- [ ] **Dừng, chờ nhóm trưởng tự kiểm tra và cho phép merge. Không tự push bản ghép, merge, đóng PR hoặc deploy.**
- [ ] Mỗi góp ý tạo một mốc lịch sử: vấn đề → sửa → commit → kiểm thử lại → bàn giao lại. Không ghi nhận im lặng hoặc hết thời gian chờ là duyệt.

### 7. Thực hiện merge sau khi có phép rõ ràng

1. Ghi nhận phạm vi cho phép và SHA bản thử đã được duyệt. Kiểm tra lại PR/nhánh đích; nếu có thay đổi ảnh hưởng bản duyệt, ghép/kiểm thử lại rồi gửi nhóm trưởng duyệt bản mới.
2. Sau khi được phép merge Job 2, đổi base PR #8 sang integration/job-2; kiểm tra lại diff vì đổi base có thể đổi nội dung so sánh.
3. Merge #7 → #6 → #8 vào integration/job-2 bằng phương thức repo cho phép; đưa các commit sửa lỗi và tài liệu đã duyệt vào nhánh này. Không đưa lại các commit nhập PR trên nhánh thử nếu nội dung đã có từ merge PR.
4. Đối chiếu code/asset/dữ liệu cuối với bản thử được duyệt, chỉ cho phép tài liệu khác ở cập nhật trạng thái/commit merge; chạy kiểm tra nhanh các luồng chính. Nếu không khớp, chưa mở đường cho merge main cho đến khi giải quyết và kiểm thử.
5. Cập nhật ba bản ghi và kế hoạch tổng bằng PR/commit merge thực tế, rồi mở PR tổng từ integration/job-2 vào main. Không tự đăng review hay nhận xét thay thành viên.
6. **Merge main cần nhóm trưởng cho phép riêng.** Sau khi được phép và GitHub xác nhận, thêm mốc cuối cùng; không tự deploy. Nếu cần quay lại, giữ mốc nền và dùng revert có kiểm soát khi được yêu cầu, không force-push/reset nhánh chung.

### Nhật ký cập nhật kế hoạch

| Ngày | Nội dung | Trạng thái |
|---|---|---|
| 16/11/2026 | Chốt tích hợp cách ly, giữ email đúng, sửa tương thích URL và bắt buộc nhóm trưởng kiểm tra trước merge | Kế hoạch, chưa triển khai |
| 16/11/2026 | Bổ sung ba file job2-sua-chua theo phân công Job 2; quy định truy vết PR, đóng góp, thay đổi, góp ý, kiểm thử, duyệt và merge; giữ nguyên lịch sử Job 1 | Đã cập nhật tài liệu kế hoạch; chưa tạo ba bản ghi hoặc sửa code |


## Kết quả triển khai local Job 2 — 16/11/2026

> **Đã tích hợp và sửa code local; CHƯA được nhóm trưởng duyệt, CHƯA push/merge/deploy.** Kết quả dưới đây thay trạng thái “chưa triển khai” của kế hoạch phía trên cho các mục thực tế được nêu; kế hoạch gốc giữ làm lịch sử. Bản ghép: review/job-2-combined.

### Nguồn và commit

Remote xác nhận ba PR vẫn mở, SHA không đổi so với bảng nguồn. #6/#7 nhắm integration/job-2, #8 vẫn nhắm main; chưa đổi base. Nhánh nền 741e5af.

| Commit local | Nội dung |
|---|---|
| a94656e | Bảo toàn phần kế hoạch Markdown có sẵn |
| c6d5364 | Áp dụng diff PR #7 của TV3 |
| 7e44ce6 | Áp dụng diff PR #6 của TV2 |
| 16bf421 | Áp dụng diff PR #8 của TV1 |
| b5a7227 | Alias email chung, avatar/initials chung, email trên thẻ, token viền, focus phân trang và mobile roadmap |

Chỉ hai thay đổi JSON so với nền: email của PGS. TS. Lê Kim Hùng trong danh bạ và chủ đề Bảo vệ mô hình học sâu, theo xác nhận nhóm trưởng. Giữ schema và nội dung khác. Commit nhập PR ghi nguồn trong thông điệp; tác giả đóng góp được dẫn theo PR ở các bản ghi dưới đây.

### Lịch sử theo người nhận Job 2

- [TV1 — chi tiết/roadmap](../topics/detail/job2-sua-chua-tv1.md): giữ Pointer Events và zoom; khôi phục mobile danh sách, bỏ tự cuộn và debug.
- [TV2 — danh bạ/hồ sơ](../lecturers/job2-sua-chua-tv2.md): giữ phân trang; sửa email tương thích URL, avatar, focus, email thẻ và token.
- [TV3 — khám phá](../topics/job2-sua-chua-tv3.md): giữ nguyên cải tiến PR, kiểm thử cùng bản ghép.

Các JOB-2.md đã dẫn tới lịch sử mới; không ghi đè Job 1. Trong lúc sửa avatar, lần kiểm tra đầu phát hiện helper bị tách thiếu; đã khắc phục trước b5a7227 và chạy lại toàn bộ 16 hồ sơ/danh bạ đạt. Kết quả kiểm tra hỏng tạm thời không được tính thành nghiệm thu cuối.

### Nghiệm thu mới trên code b5a7227

Chrome headless qua HTTP localhost:8876 ngày 16/11/2026; công cụ QA đặt trong TEMP, không là dependency website.

| Kiểm tra | Kết quả thực tế |
|---|---|
| Dữ liệu | 3 nhóm, 37 chủ đề, 234 keyword, 16 hồ sơ; diff JSON chỉ sửa email |
| URL toàn bộ | 37 tiêu đề chủ đề và 16 tên hồ sơ khớp dữ liệu |
| Email | URL chủ đề/hồ sơ cũ mở đúng; normalizeEmail trim/hoa và alias trả hunglk@uit.edu.vn |
| Responsive | 50 ca năm trang × năm độ rộng × hai theme, không tràn ngang |
| Mobile roadmap | 375×812: Danh sách mặc định, scrollY=0, không window debug |
| Cây | 37 cây danh sách đủ keyword; mở toàn bộ sơ đồ desktop tổng 271 node, không phát hiện chồng nhau |
| Phân trang | Khám phá 12/12/12/1; Enter trang 2 danh bạ đưa focus về lecturers-status |
| Tìm kiếm | Không kết quả trả 0; hoc sau trả 5 chủ đề |
| URL sai | Chủ đề thiếu query/hồ sơ email sai có heading Không tìm thấy |
| Subpath | Năm trang /ie104/ tải đúng tiêu đề/dữ liệu |
| Lỗi tải | Khám phá HTTP500/JSON sai/nhóm rỗng có thông báo phù hợp |
| Axe | Năm trang đại diện, WCAG2A/AA và 2.1AA, không vi phạm phát hiện |
| HTML | HTML-Validate recommended: năm nguồn 0 lỗi; tắt void-style, no-trailing-whitespace, long-title, no-inline-style; không tắt cấu trúc |
| Runtime | Không pageerror trong các luồng bình thường đã kiểm tra; lỗi tải được UI xử lý |

### Lighthouse mới

Lighthouse 13.6.0 mobile ba lượt mỗi trang; không dùng điểm Job 1. [Dữ liệu số đo](minh-chung-giao-dien/job-2-integration/lighthouse-summary.json).

| Trang | Performance ba lượt | Trung vị P | A / BP / SEO |
|---|---|---:|---|
| Trang vào | 100/100/100 | 100 | 100/100/100 |
| Khám phá | 96/96/96 | 96 | 100/100/100 |
| Roadmap | 94/95/94 | 94 | 100/100/100 |
| Danh bạ | 97/97/97 | 97 | 100/100/100 |
| Hồ sơ | 95/95/95 | 95 | 100/100/100 |

### Giới hạn và bước duyệt

Chưa xác minh toàn bộ checklist thủ công: pan/zoom bằng cảm ứng thật, fullscreen theo thiết bị, mọi trạng thái lỗi trên từng trang, fixture cây mới sâu bất thường, subjects thiếu, storage bị chặn và Back/Forward trên mọi luồng. W3C chính thức/Firefox/Safari/screen reader chưa có kết quả mới; CSS và JSDoc chưa có audit toàn bộ tự động trong đợt này. Không coi số Lighthouse/axe là thay thế kiểm tra người dùng. Bản local đủ để nhóm trưởng xem và góp ý; chưa ghi toàn bộ nghiệm thu hoàn thành.

Tự chạy: VS Code mở folder repo, dùng Live Server tại index.html; hoặc khi phiên QA còn hoạt động mở http://127.0.0.1:8876/. Kiểm tra khám phá → chủ đề → hồ sơ → danh bạ, tìm/lọc/phân trang, theme, mobile và email cũ/mới. Live Server có thể dùng cổng khác.

**Điểm dừng hiện tại:** chờ nhóm trưởng tự kiểm tra bản local. Chưa cho phép merge integration/job-2 hoặc main; không tự coi yêu cầu triển khai kế hoạch là duyệt merge. Góp ý tiếp theo phải thêm ngày, commit sửa và kết quả kiểm thử, không xóa lịch sử này.


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

Định hướng thiết kế đề xuất: tra cứu học thuật tối giản, ưu tiên chữ/nhịp khoảng cách và thao tác rõ. Tham khảo nguyên tắc typography và responsive spacing của GOV.UK (https://design-system.service.gov.uk/styles/type-scale/ và https://design-system.service.gov.uk/styles/spacing/), tự triển khai CSS/DOM; không nhập GOV.UK Frontend, font thương hiệu hoặc template. Đây là đề xuất thiết kế, không mở thêm phạm vi redesign trong commit này.


## Material tiết chế và danh sách đọc phẳng — 17/11/2026

### Backup và trạng thái

- Bản trước sửa: `2317f0380221d2913de39f80b1946e030545c95f`; working tree sạch khi bắt đầu.
- Backup local: `backup/job-2-before-material-20261117`. Git bundle ngoài repo: `../job-history/backups/job-2-before-material-20261117.bundle`; `git bundle verify` báo hợp lệ, chứa lịch sử đầy đủ.
- Xem lại an toàn: `git worktree add ../ie104-before-material backup/job-2-before-material-20261117`. Hoặc clone bundle vào thư mục mới. Không reset/xóa bản đang làm.
- Triển khai trên `review/job-2-combined`; chưa push, merge hoặc deploy.

### Thay đổi thực tế

| Vấn đề trước | Thay đổi | File | Commit |
|---|---|---|---|
| Header trang chủ trùng hai nút chính | Chỉ giữ logo và theme, cùng hàng | index.html | 7c7f3ab |
| Trạng thái/độ nổi chưa thống nhất | Token dialog/shadow, nút, focus, disabled, reduced motion; thẻ giảng viên bỏ nhấc/bóng màu | assets/css/style.css; assets/css/lecturers.css | 7c7f3ab |
| Mobile mặc định Danh sách | Sơ đồ mặc định cả mobile và khi tải chủ đề mới | assets/js/topic-detail.js | 127ccbc; f9dca24 |
| Accordion lồng nhiều cấp, nhãn lặp | Một details cho mỗi keyword gốc; danh sách phẳng con trước cha, quan hệ trực tiếp bằng chữ | assets/js/topic-detail.js; assets/css/topic-detail.css | 127ccbc; f9dca24 |

`flattenKnowledge` tạo danh sách hậu thứ tự; `createKnowledgeItem` chỉ render nội dung; `createPillarCard` dựng accordion một cấp. Không gộp node trùng tên, không đánh số bắt buộc. Mục đầu mở mặc định, các mục khác đóng, có thể mở nhiều mục. Môn học chỉ xuất hiện khi có. Quy tắc này thay mặc định Danh sách mobile và cấu trúc danh sách lồng cũ; giữ lịch sử cũ ở trên.

### Kết quả mới đã chạy

- JSON không có diff so với backup: 3 nhóm, 37 chủ đề, 234 keyword, 16 hồ sơ.
- Đã mở 37 URL chủ đề: Sơ đồ mặc định; 234 mục Danh sách khớp thứ tự hậu duyệt từ JSON.
- 50 tổ hợp (5 trang × 5 chiều rộng 320/375/768/1024/1440 × 2 theme): không tràn ngang theo phép đo DOM.
- Axe WCAG 2A/AA, 2.1AA trên 5 trang: 0 vi phạm trong lượt kiểm tra. HTML Validate trên 5 nguồn: 0 lỗi với cấu hình recommended, tắt void-style/no-trailing-whitespace/long-title/no-inline-style như đợt trước. Không thay cho W3C chính thức.
- Accordion mở/thu bằng Enter; không có details lồng. Fixture node tên dài/trùng tên giữ đủ 4 lần xuất hiện; fixture chủ đề không keyword không phát sinh lỗi. Không sửa JSON thật.
- Thử chuyển hai tab, 12 mục trang khám phá đầu, URL email cũ và URL chủ đề sai: đúng trạng thái; không pageerror trong luồng đã chạy.
- Ảnh tại `idea/minh-chung-giao-dien/material-20261117/`: trước/sau trang chủ 375/1440, sau trang chi tiết 375/1440, danh sách mobile/desktop. Đã xem trực tiếp ảnh trang chủ mobile và chi tiết mobile; phép đo overflow không thay thế đánh giá trực quan mọi tổ hợp.

### Cách chạy và giới hạn

Chạy HTTP từ repo: `python -m http.server 8876`, mở `http://127.0.0.1:8876/`. Nếu cổng đang chạy thì dùng server hiện có.

Chưa xác minh đầy đủ trong đợt này: W3C/CSS validator chính thức, Firefox/thiết bị thật, tất cả pan/zoom/fullscreen và phục hồi focus, Back/Forward, đường dẫn /ie104/, lỗi fetch/storage trên mọi trang. CSS parser bổ sung không có sẵn trong môi trường; không đánh dấu CSS pass. Các chức năng được giữ nhưng các kết quả cũ chỉ là lịch sử.

### Lighthouse mới

Lighthouse 13.6.0, Chrome headless, HTTP local, cấu hình mobile mặc định, 3 lượt/trang; trung vị:

| Trang | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| home | 100 | 100 | 100 | 100 |
| topics | 93 | 100 | 100 | 100 |
| topic-detail | 95 | 100 | 100 | 100 |
| lecturers | 97 | 100 | 100 | 100 |
| lecturer-detail | 95 | 100 | 100 | 100 |

Số đo đầy đủ: `idea/minh-chung-giao-dien/material-20261117/lighthouse-summary.json`. Đây là số đo mới cho đợt Material, không phải số đo Job 1. Kiểm thử tự động không bảo đảm mọi tương tác/thiết bị thực đã được xác minh. Chưa push, merge hoặc deploy; bản local chờ nhóm trưởng xem.


## Nhóm trưởng cải thiện sau tích hợp Job 2 — hộp chuyển chủ đề và footer

Ngày 17/11/2026; bản trước sửa `f6fc28f`, working tree sạch. Backup local `backup/job-2-before-picker-footer-20261117`. Xem lại an toàn bằng `git worktree add ../ie104-before-picker-footer backup/job-2-before-picker-footer-20261117`; giữ backup Material cũ.

- [x] `01e7f10`: Hộp lọc chủ đề cùng email giảng viên (hàm normalizeEmail chung), đủ mọi nhóm; tìm theo tên không dấu, A–Z trong nhóm; tên giảng viên ghi một lần, chủ đề hiện tại có Đang xem.
- [x] Đóng backdrop chỉ khi pointer bắt đầu/kết thúc ngoài hộp; Escape/nút Đóng trả focus. Chỉ danh sách cuộn, mở lại reset tìm kiếm và scroll.
- [x] `0e8efec`: Footer năm trang thống nhất nhận diện, mục đích dự án, tên trường; bỏ link danh bạ, CSS chung căn trái, padding 24px.
- [x] Cập nhật ba bản ghi sửa chữa và bốn JOB-2.md, phân biệt đóng góp gốc với chỉnh sửa nhóm trưởng. Không đổi dữ liệu/schema/URL.

### Kiểm thử mới

- 37 chủ đề mở hộp: số lượng và email của mọi link khớp toàn bộ chủ đề giảng viên trong dữ liệu; có người chỉ một chủ đề.
- Email cũ HUNGLKT kèm khoảng trắng tìm đúng giảng viên; tìm phan tich ra Phân tích mã độc; không kết quả trả 0; mở lại xóa query.
- Click/tap backdrop đóng và trả focus; kéo từ trong ra ngoài giữ mở; Escape và nút Đóng hoạt động. Touch là mô phỏng Chromium, không phải thiết bị thật.
- 50 tổ hợp năm trang × 5 chiều rộng 320/375/768/1024/1440 × hai theme: không tràn ngang, footer không còn link.
- 10 tổ hợp hộp mở/cuộn cuối × chiều rộng/theme: nút Đóng nằm trong viewport. Đã xem trực tiếp ảnh hộp mobile sau khi cuộn.
- Axe WCAG2A/AA,21AA năm trang (trang chi tiết mở dialog): 0 vi phạm; HTML Validate năm nguồn 0 lỗi, cấu hình recommended với void-style/no-trailing-whitespace/long-title/no-inline-style tắt như đợt trước. Không pageerror trong luồng kiểm tra.
- Minh chứng: `idea/minh-chung-giao-dien/picker-footer-20261117/` trước/sau hộp và trang chủ.

### Bàn giao và giới hạn

Chạy HTTP từ repo bằng `python -m http.server 8876`, hoặc dùng server đang chạy tại http://127.0.0.1:8876/. Kiểm tra chủ đề → chuyển chủ đề → cuộn/tìm/đóng và footer các trang. Chưa kiểm tra Firefox, thiết bị thật, W3C chính thức; không chạy lại Lighthouse vì đợt này giới hạn hộp chọn/footer. Không coi số Lighthouse Material là số đo mới. Tất cả thay đổi local trên review/job-2-combined, chưa push/merge/deploy.


## Đánh giá UI/UX và thiết kế lại — agent hỗ trợ nhóm trưởng, 17/11/2026

**Phương pháp:** rà code sở hữu và ảnh render Chrome ở desktop/mobile; đối chiếu phân cấp thị giác, bố cục, tính nhất quán, khả năng đọc và phản hồi thao tác. Đây là heuristic review, chưa phải nghiên cứu với sinh viên thật; không tự chấm điểm thẩm mỹ bằng số.

| Tiêu chí | Quan sát trước sửa | Mức ảnh hưởng | Quyết định thiết kế |
|---|---|---|---|
| Điểm nhìn đầu trang | Trang vào gồm văn bản nhỏ và vùng trống lớn, ít khác biệt với trang tra cứu | Trung bình | Hero chữ lớn, nhấn xanh UIT, hai CTA rõ; minh họa khái niệm bằng HTML/CSS tự viết |
| Phân nhóm chức năng | Tìm/lọc và kết quả có phân cách yếu, nhiều thành phần cùng trọng lượng | Trung bình | Gom controls vào một bề mặt, tiêu đề có dấu nhấn, giữ kết quả dạng hàng |
| Nhận diện xuyên trang | Thẻ giảng viên, profile và workspace kiến thức có sắc độ/độ nổi thiếu nhất quán | Trung bình | Token accent-soft/shadow-soft chung, border và radius thống nhất, header đề tài có surface riêng |
| Nội dung trên mobile | Minh họa mới có nguy cơ chồng card do định vị tuyệt đối | Cao nếu xuất hiện | Đã xem ảnh 375px và sửa hai card dưới thành hai ô cùng hàng, không che chữ |
| Tính chính xác sản phẩm | Số liệu có thể dễ bị dùng như trang trí | Nguyên tắc | Không thêm thống kê giả, nội dung nghiên cứu hay ảnh ngoài; minh họa trang chủ aria-hidden, mô tả khái niệm không phải roadmap thật |

**Bản nền/backup:** 1775493, nhánh backup/job-2-before-ui-review-20261117 và bundle đã được nhóm trưởng xác minh trước sửa. Thay đổi do nhóm trưởng cùng agent thực hiện; không quy thành đóng góp gốc của thành viên.

**File:** index.html; assets/css/style.css, topics.css, topic-detail.css, lecturers.css, lecturer-detail.css. Không sửa JavaScript hoặc JSON. Commit code: `8f3e61a`; kết quả kiểm thử độc lập ghi dưới đây.

**Minh chứng:** idea/minh-chung-giao-dien/ui-review-20261117/ có before-home-desktop.png, after-home-desktop/mobile/dark.png và ảnh desktop các phần. Đã xem trực tiếp home desktop/mobile; phép đo overflow sơ bộ home/topics 375px không tràn. Không ghi đây là toàn bộ kiểm thử responsive/accessibility.

**Giới hạn và quy tắc:** nhận xét mỹ thuật có yếu tố phán đoán; cần nhóm trưởng xem bản chạy. Giữ vanilla, system font, xanh UIT, light default/dark manual, chức năng và URL. Minh họa chỉ trang chủ; các trang nghiệp vụ ưu tiên tra cứu. Các quy tắc ít trang trí trước đây được thay trong phạm vi đợt này theo yêu cầu mới. Chưa push/merge/deploy.

### Nghiệm thu độc lập từ nhóm trưởng cho bản UI/UX

- 50 tổ hợp năm trang × năm chiều rộng × hai theme: không tràn ngang.
- Axe năm trang × hai theme: 0 vi phạm sau khi chờ 500ms để chuyển màu hoàn tất; lượt đo ngay trong transition có báo contrast tạm thời, không dùng làm kết quả trạng thái ổn định.
- HTML Validate năm nguồn: 0 lỗi trong cấu hình kiểm tra hiện hành. Không pageerror ở luồng được chạy.
- Chưa đo Lighthouse mới, chưa Firefox hoặc thiết bị thật; không dùng số đo Material cũ thay cho đợt UI/UX này.

- Kiểm tra luồng sau thiết kế: hộp chứa 10 chủ đề của giảng viên mẫu và đóng backdrop đúng; danh sách mẫu đủ 6 keyword; chuyển Sơ đồ/Danh sách đúng; khám phá 12 mục; theme tối giữ qua reload. JS/JSON không có diff so với backup.
- Bản local review/job-2-combined, commit giao diện `8f3e61a`; mốc backup `1775493`. Git bundle: `../job-history/backups/job-2-before-ui-review-20261117.bundle`, verify thành công.


### Phản biện UI/UX độc lập — 17/11/2026

Agent thứ hai phát hiện thẻ minh họa chồng nhau tại 768px; nhóm trưởng xác minh bằng bounding box và sửa CSS Grid tự giãn ở <=1023px. Kiểm tra 320/375/768/820/1023/1024/1440px: không chồng thẻ, không tràn ngang; axe tablet không vi phạm. Backup trước sửa: backup/job-2-before-peer-fixes-20261117 tại cad69a3.

Agent còn nhận xét sơ đồ mobile căn vừa khiến chữ nhỏ; đây là đánh đổi hiện hữu, chưa sửa trong lượt này và cần đánh giá tiếp. Cả hai agent bị giới hạn lượt sử dụng trước khi hoàn tất phản biện qua lại; không tuyên bố đã có đồng thuận hai agent. Nhóm trưởng tự xác minh/sửa lỗi tablet, không sửa dữ liệu hoặc chức năng. Chưa push/merge/deploy.
