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
