# Job 2 — TV3: kiểm tra chéo và nâng cấp khám phá

> Git Job 2: clone fork cá nhân → fetch upstream → tạo nhánh task riêng từ upstream/integration/job-2 → push lên origin → PR về liem-2006/ie104:integration/job-2. Xem [hướng dẫn clone mới hoặc dùng repo có sẵn](../CONTRIBUTING.md). Không viết trực tiếp trên nhánh chung.


> Người thực hiện: TV3. Phần gốc: TV1. Không có hạn bàn giao cố định. PR #4 đã merge vào main. Nhánh làm nền và nhận PR Job 2 là integration/job-2.

## Mục tiêu, đầu vào và phạm vi

Giúp sinh viên dễ tìm, lọc và mở đúng chủ đề/giảng viên. Đọc [sửa chữa TV1](SUA-CHUA-TV1.md), [yêu cầu chức năng](JOB-1.md), [đóng góp](../CONTRIBUTING.md) và [nghiệm thu nền](../idea/ke-hoach-tich-hop-sua-loi.md).

Đầu vào: data/research-data.json, module assets/js/data.js, bộ token và component topic-row chung. Đường dẫn dưới đây tính từ root repo.

| File được sửa | Công việc |
|---|---|
| topics/index.html | Bố cục tìm/lọc/sắp xếp, thống kê, danh sách và phân trang |
| assets/css/topics.css | Giao diện riêng scope #page-topics, dùng lại component chung |
| assets/js/topics.js | Tương tác khám phá, không đổi quy tắc lọc/phân trang |
| topics/JOB-2.md | Ghi nhận kết quả Job 2 của TV3 |

## Công việc và kiểm tra riêng

- Đánh giá người mới có nhận ra cách chọn nhiều nhóm, xóa bộ lọc, chuyển trang và mở giảng viên hay không; ghi vấn đề trước khi sửa.
- Giữ tìm tên đề tài/tên giảng viên không phân biệt hoa thường/dấu; OR giữa nhóm, AND với tìm kiếm; không chọn nhóm nghĩa là tất cả.
- Giữ thứ tự lọc toàn bộ → sắp xếp → phân trang 12. Có hai cách sắp xếp: theo dữ liệu gốc và tên A–Z. Đổi tìm/lọc/sắp xếp về trang 1.
- Giữ ẩn phân trang khi ≤12 kết quả; không kết quả không hiện số trang. Reset chỉ hiện khi khác mặc định, reset trả focus input; đổi trang focus/scroll về kết quả.
- Không đưa modal chọn nhóm cũ trở lại, không thêm ngày/lượt xem/độ phổ biến giả, không lưu page vào URL/storage.
- Thử 37 kết quả thành 12/12/12/1, chọn sec=14, sec+nlp=26, nhóm data=11; tìm không kết quả và chủ đề ở trang cuối, A–Z trên toàn bộ dữ liệu.
- 375×812 phải thấy tiêu đề chủ đề đầu trong màn hình đầu; 1440×900 thấy ít nhất ba hàng. Tên đề tài và giảng viên vẫn có link riêng đúng dữ liệu.
- Tác giả TV1 góp ý PR của TV3 trước khi nhóm trưởng quyết định merge.
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

Trạng thái: ĐÃ THỰC HIỆN (TV3 — ckiet, 14/11/2026). Kết quả kiểm thử dưới đây là của Job 2, không dùng lại điểm Job 1.

- **Commit integration/job-2 làm nền:** `741e5af` (`docs: clarify fork clone and pull request workflow for Job 2`). Nhánh task: `task/job-2-tv3-topics`, tạo từ `upstream/integration/job-2` ngày 14/11/2026. Không đụng nhánh Job 1 cũ.
- **Các vấn đề đã quan sát:** xem bảng trước–sau bên dưới. Ảnh trước sửa: [desktop sáng](minh-chung-giao-dien/job-2-tv3/before-topics-desktop-light.png), [desktop tối](minh-chung-giao-dien/job-2-tv3/before-topics-desktop-dark.png), [mobile](minh-chung-giao-dien/job-2-tv3/before-topics-mobile-light.png).
- **Phụ thuộc/đề xuất thay đổi phần chung:** không có. Mọi thay đổi nằm trong 3 file của phần TV3; không sửa `style.css`, `reset.css`, `assets/js/data.js`, `theme.js`, `index.html` ở root hay JSON.
- **Phần AI hỗ trợ và phần tự xác minh:** toàn bộ phân tích vấn đề, viết code và chạy kiểm thử có dùng trợ lý AI. Tác giả đã tự chạy lại toàn bộ kiểm tra ghi dưới đây trên máy và tự đối chiếu kết quả; ảnh trước/sau chụp từ hai bản mã thật (nền và nhánh task).

### Nhận xét khi kiểm tra chéo phần của TV1

Bản tích hợp đã đạt đúng các con số nghiệm thu của Job 1 (37 chủ đề chia 12/12/12/1, sec = 14, sec + nlp = 26, data = 11), tìm không dấu, OR nhóm/AND truy vấn, A–Z, ẩn phân trang khi ≤ 12 kết quả, focus về `results-heading` khi đổi trang và reset trả focus về ô tìm. Không phát hiện lỗi chức năng nào trong phạm vi khám phá.

Vấn đề thực tế còn lại đều thuộc nhóm **khả năng nhận biết và phục hồi khi người dùng lạc**, không phải lỗi tính toán:

1. Nhóm lọc nằm ngay dưới ô tìm mà không có nhãn nhìn thấy được. Ở bản trước, bốn nút pill "Tất cả / An toàn thông tin / Dữ liệu & dự báo / AI ngôn ngữ" trông như một thanh công cụ chung; người mới không biết đó là bộ lọc theo nhóm và phải bấm thử mới hiểu. Câu "Có thể chọn nhiều nhóm." nằm dưới nhưng không nêu đây là nhóm gì.
2. Ô tìm kiếm chỉ nêu ví dụ, không nói rõ quy tắc bỏ dấu. Đây là điểm dễ thất vọng nhất: gõ "hoc sau" mới thấy "học sâu" ra, nên nhiều người kết luận là tìm kiếm "không dấu" bị lỗi. (Đã kiểm tra: tìm "hoc sau" vẫn ra đúng 5 chủ đề.)
3. Khi không có kết quả, trang gần như trắng — chỉ còn một dòng chữ nhỏ. Không có lối ra trực tiếp; người dùng phải tự tìm nút "Xóa bộ lọc" ở góc trên bên phải, mà nút đó lại nằm xa chỗ vừa gõ từ khóa.
4. Hai nút "Xóa bộ lọc" cùng lúc ở hai vị trí khác nhau sẽ là trùng lặp; bản này chọn giữ nút trong bảng rỗng và ẩn nút ở thanh thao tác khi bảng rỗng đang hiện.

Ngoài ra đã rà lại và **không thấy lỗi**: tràn ngang ở 5 mốc rộng, tương phản chữ, vùng bấm 44px, lỗi console, link chủ đề/giảng viên, trạng thái không tìm thấy khi URL sai. Chi tiết ở bảng kết quả bên dưới.

### Trước → sau

| Trước | Sau | Lý do/ảnh hưởng tới người dùng | File liên quan |
|---|---|---|---|
| Bốn pill lọc không có nhãn nhìn thấy, kèm câu "Có thể chọn nhiều nhóm." ở dưới | Nhãn "Lọc theo nhóm" hiển thị trước nhóm nút, kèm gợi ý "Chọn một hoặc nhiều để lọc nhanh" | Người mới nhận ra đây là bộ lọc theo nhóm ngay khi nhìn, không phải bấm thử mới hiểu; giữ được quy tắc OR nhiều nhóm | topics/index.html, assets/css/topics.css |
| Ô tìm chỉ có placeholder, không nói quy tắc bỏ dấu | Thêm gợi ý "Tìm không phân biệt hoa thường và dấu: 'hoc sau' vẫn ra 'học sâu'." nối bằng `aria-describedby` | Người dùng không nghĩ tìm kiếm bị hỏng khi gõ tiếng Việt không dấu; đồng thời screen reader đọc được quy tắc này | topics/index.html, assets/css/topics.css |
| Không có kết quả → trang gần như trắng, chỉ có dòng chữ nhỏ, phải tự tìm nút "Xóa bộ lọc" ở góc trên | Thêm khối rỗng nổi bật: "Không có chủ đề nào khớp bộ lọc hiện tại." kèm nút "Xóa bộ lọc" ngay dưới | Có lối ra trực tiếp từ đúng chỗ vừa gõ từ khóa, không phải nhớ vị trí nút cũ; giảm thao tác không cần thiết | topics/index.html, assets/css/topics.css, assets/js/topics.js |
| — | Khi khối rỗng đang hiện thì nút "Xóa bộ lọc" ở thanh thao tác bị ẩn; còn lại hành vi cũ (reset chỉ hiện khi khác mặc định, reset trả focus về ô tìm) | Tránh hai nút cùng một hành động ở hai nơi; giữ đúng hợp đồng reset đã thống nhất | assets/js/topics.js |

### Những gì **không** đổi

Không đổi JSON, schema, URL, `pageSize = 12`, quy tắc OR giữa nhóm/AND với truy vấn, thứ tự lọc → sắp xếp → phân trang, định dạng thông báo trạng thái (`1–12 trong 37 chủ đề` — theo [hợp đồng phân trang chung](../idea/ke-hoach-tich-hop-sua-loi.md)), API `topicUrl`/`lecturerUrl`, component `createTopicRow`, token màu, header/footer, nút sáng/tối. Không khôi phục modal chọn nhóm. Không thêm ngày/lượt xem/độ phổ biện giả, không lưu trang hay bộ lọc vào URL/storage. Không thêm backend, đăng nhập hay lưu tiến độ.

### Kết quả kiểm thử thực tế

Môi trường: Windows 11, Chrome 157.0.8103.78, HTTP cục bộ qua `python -m http.server`. Công cụ QA nằm ở thư mục tạm ngoài repo, **không** phải dependency của website. Ngày chạy: 14/11/2026.

| Kịch bản/kích thước/theme | Công cụ/trình duyệt | Kết quả thực tế | Minh chứng/hạn chế |
|---|---|---|---|
| 37 chủ đề, phân trang 12 | Chrome DevTools qua CDP | Đạt: trang 1/2/3 = 12 hàng, trang 4 = 1 hàng; 37 URL chủ đề duy nhất, không trùng không thiếu | Đo bằng `getBoundingClientRect` và `document.querySelectorAll` |
| Chọn `sec` | CDP | `1–12 trong 14 chủ đề`, 2 trang | — |
| Chọn `sec` + `nlp` | CDP | `1–12 trong 26 chủ đề`, 3 trang | — |
| Chọn nhóm `data` | CDP | `1–11 trong 11 chủ đề`, 11 hàng, thanh phân trang ẩn | — |
| Sắp xếp A–Z toàn bộ dữ liệu | CDP | 37 mục, đúng thứ tự `localeCompare(…, "vi")`, không trùng | — |
| Tìm không dấu | CDP | "hoc sau" → 5 chủ đề; "học sâu" → 5; "Nguyễn Tấn Cầm" và "nguyen tan cam" → 3 | — |
| Không có kết quả | CDP | Khối rỗng hiện, phân trang ẩn, nút reset ở thanh thao tác ẩn; bấm nút trong khối rỗng → 37 chủ đề, focus về `topic-search` | [Ảnh khối rỗng](minh-chung-giao-dien/job-2-tv3/after-topics-empty.png) |
| Đổi trang | CDP | Focus về `results-heading`, cuộn tới đầu kết quả; nút trang có `aria-current="page"`, Trước/Sau disabled ở hai đầu | — |
| Bàn phím | Chrome DevTools | Nút nhóm, nút trang, nút trong khối rỗng là `<button>` gốc nên kích hoạt bằng Enter/Space; `aria-pressed` phản ánh trạng thái nhóm; `aria-label="Trang N"` cho số trang | — |
| Vùng bấm | Chrome DevTools | Nút nhóm, nút trang, select, nút reset đều ≥ 44px; các link chữ trong hàng chủ đề là link nội tuyến nên không tính là vùng bấm chính | Đo `getBoundingClientRect().height` |
| 320/375/768/1024/1440px, sáng và tối | Chrome DevTools + CDP `setDeviceMetricsOverride` | Không tràn ngang ở cả 10 tổ hợp (`scrollWidth === clientWidth`); không dùng `overflow-x: hidden`; không có chữ chồng/cắt | Ảnh [mobile sáng](minh-chung-giao-dien/job-2-tv3/after-topics-mobile-light.png), [desktop sáng](minh-chung-giao-dien/job-2-tv3/after-topics-desktop-light.png), [desktop tối](minh-chung-giao-dien/job-2-tv3/after-topics-desktop-dark.png) |
| 375×812 | Chrome DevTools | Tiêu đề chủ đề đầu tiên hiện trong màn hình đầu (y ≈ 731–783) | Đo theo `getBoundingClientRect` |
| 1440×900 | Chrome DevTools | Thấy đủ 4 tiêu đề chủ đề đầu trong màn hình (y ≈ 524, 621, 719, 816) | [Ảnh desktop](minh-chung-giao-dien/job-2-tv3/after-topics-desktop-light.png) |
| Tương phản chữ | Tính WCAG 2.1 theo công thức chính thức | Chữ thường đều ≥ 4.5:1: muted/bg 5.88 (sáng) và 8.69 (tối); muted/surface 6.25 và 7.69; link/surface 6.68 và 8.63; on-primary 6.68 và 8.62; badge nhóm 6.11–8.11 | Tính tay từ giá trị token trong `style.css` |
| Link sang phần người khác | Chrome DevTools | Mở chủ đề đầu → trang chi tiết/roadmap hiện đúng tên và sơ đồ; mở giảng viên → hồ sơ đúng tên và email; nút Back quay lại khám phá vẫn 37 chủ đề | — |
| URL sai | Chrome DevTools | `?email=hoctai@uit.edu.vn` → "Không tìm thấy giảng viên", không fallback mẫu | — |
| Lỗi console | Chrome DevTools | Không có `pageerror` hay log lỗi ở các luồng đã thử | — |
| HTML-Validate | html-validate 11.21.1, preset recommended (tắt `void-style`, `no-trailing-whitespace`, `long-title`, `tel-non-breaking`) | **0 lỗi**, exit code 0 trên `topics/index.html` | — |
| axe-core WCAG 2.0/2.1 A+AA | axe-core trên Chrome DevTools | **0 vi phạm** ở 4 trạng thái: mặc định, khối rỗng, sau khi reset, khi lọc `sec` | — |
| Lighthouse mobile | Lighthouse 13.x, Chrome headless 157, `--form-factor=mobile`, URL `http://localhost:8321/ie104/topics/index.html` | 3 lần liên tiếp trên bản code đã commit: **96 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO); trung vị Performance 96 | Không phải cam kết điểm trên hosting thực |

### Ảnh sau sửa

- [Desktop sáng](minh-chung-giao-dien/job-2-tv3/after-topics-desktop-light.png)
- [Desktop tối](minh-chung-giao-dien/job-2-tv3/after-topics-desktop-dark.png)
- [Mobile 375×812](minh-chung-giao-dien/job-2-tv3/after-topics-mobile-light.png)
- [Trạng thái không có kết quả](minh-chung-giao-dien/job-2-tv3/after-topics-empty.png)

### Điểm còn tồn tại và giới hạn

- **W3C Nu trực tuyếp và CSS Validator chưa xác nhận**: kế hoạch tích hợp đã ghi hai dịch vụ này trả trang Cloudflare challenge / HTTP 403. Lần chạy này dùng HTML-Validate cục bộ và axe-core; **không ghi pass W3C**.
- **Chưa kiểm tra Firefox, Safari/iOS và thiết bị thật**: môi trường hiện tại không có các trình duyệt đó. Mọi kết quả trên là trên Chrome.
- **Chưa kiểm tra hosting thật**: `/ie104/` chỉ được mô phỏng bằng HTTP cục bộ (đặt thư mục cha làm gốc server). Đường dẫn thực tế sau khi deploy cần nhóm trưởng kiểm lại.
- **Chưa đọc bằng screen reader**: kiểm tra accessibility tự động không thay thế việc đọc thật bằng trình đọc màn hình.
- **Điểm Lighthouse dao động** theo máy và mạng; ba lần chạy ở đây cho cùng kết quả 96/100/100/100. Lần đo trước khi dọn hai khối CSS trùng lặp cho 97/100/100/100 — chênh 1 điểm là nhiễu đo, không phải hồi quy.
- **Chưa thử tải lỗi 500/JSON hỏng** trên trang này: `initTopics` có nhánh `catch` hiển thị thông báo, nhưng lần này chỉ thử trạng thái rỗng và không tìm thấy.
- **Chưa kiểm thử xuyên năm trang** sau khi tích hợp: việc đó thuộc nhóm trưởng trước khi merge, theo quy trình Job 2.

### Góp ý tác giả ban đầu và cách xử lý

Phần gốc do TV1 xây dựng; theo quy trình Job 2, TV1 là người góp ý PR này trước khi nhóm trưởng quyết định merge. PR mở về `liem-2006/ie104:integration/job-2`; nhóm trưởng là người duyệt và merge. Không tự merge, không push vào repo chính, không deploy.
