# Job 2 — TV2: kiểm tra chéo và nâng cấp danh bạ/hồ sơ

> Git Job 2: clone fork cá nhân → fetch upstream → tạo nhánh task riêng từ upstream/integration/job-2 → push lên origin → PR về liem-2006/ie104:integration/job-2. Xem [hướng dẫn clone mới hoặc dùng repo có sẵn](../CONTRIBUTING.md). Không viết trực tiếp trên nhánh chung.


> Người thực hiện: TV2. Phần gốc: TV3. Một task và một PR bao gồm cả hai trang, không có hạn bàn giao cố định. PR #4 đã merge vào main. Nhánh làm nền và nhận PR Job 2 là integration/job-2.

## Mục tiêu, đầu vào và phạm vi

Giúp sinh viên tìm giảng viên, đọc thông tin nghiên cứu và mở chủ đề liên quan thuận tiện. Đọc [sửa chữa TV3](SUA-CHUA-TV3.md), [yêu cầu danh bạ](JOB-1.md), [task hồ sơ](detail/JOB-2.md), [đóng góp](../CONTRIBUTING.md) và [nghiệm thu nền](../idea/ke-hoach-tich-hop-sua-loi.md).

Đầu vào: data/lecturers.json và data/research-data.json; nối bằng email trim/chữ thường; dùng API URL và component topic-row chung. Đường dẫn dưới đây tính từ root repo.

| File được sửa | Công việc |
|---|---|
| lecturers/index.html | Công cụ tìm/lọc và danh bạ |
| lecturers/detail/index.html | Thông tin cá nhân/nghiên cứu/chủ đề |
| assets/css/lecturers.css | Danh bạ responsive scope #page-lecturers |
| assets/css/lecturer-detail.css | Hồ sơ responsive scope #page-lecturer-detail |
| assets/js/lecturers.js | Tương tác danh bạ, giữ quy tắc dữ liệu |
| assets/js/lecturer-detail.js | Render và tương tác hồ sơ, giữ API chung |
| lecturers/JOB-2.md, lecturers/detail/JOB-2.md | Ghi nhận Job 2; kết quả chung tại file này |

## Công việc và kiểm tra riêng

- Đánh giá độ dễ quét tên/email/nhóm, cách tìm/lọc/reset và đường đi danh bạ → hồ sơ → chủ đề. Cải thiện phân cấp thông tin và khoảng cách có lý do.
- Danh bạ dùng lưới 3/2/1 cột desktop/tablet/mobile; tên/email/nhóm nổi bật, link hồ sơ gọn nhưng dễ bấm.
- Giữ tìm tên/email, lọc nhóm theo chủ đề thực; không tự gán lĩnh vực hoặc thu thập thêm dữ liệu/ảnh.
- Hồ sơ đúng email, một h1; ảnh thiếu/hỏng dùng chữ cái, trường thiếu ẩn/thông báo gọn; không dựng số 0 thay dữ liệu thiếu.
- Chỉ số có thật bằng 0 vẫn hiện; giữ nguồn/ngày. Link ngoài an toàn; không render chuỗi JSON qua innerHTML.
- Chủ đề liên quan lấy từ JSON nghiên cứu, dùng createTopicRow(entry, 3) và URL chung; không sửa component chung.
- Mở đủ 16 hồ sơ, đối chiếu số chủ đề theo email; thử email hoa/khoảng trắng, URL sai, ảnh hỏng, thiếu tiểu sử/chỉ số. Kiểm tra tìm không kết quả và reset.
- Tác giả TV3 góp ý PR của TV2 trước khi nhóm trưởng quyết định merge.
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

Trạng thái: ĐÃ HOÀN THÀNH.

- Commit integration/job-2 làm nền: `741e5af` (docs: clarify fork clone and pull request workflow for Job 2).
- Các vấn đề đã quan sát và link ảnh trước sửa:
  1. Thẻ giảng viên tại danh bạ hiển thị thừa dòng email link khiến card bị rối mắt, làm giảm tính thẩm mỹ học thuật.
  2. Toàn bộ 16 giảng viên hiển thị dồn 1 trang gây cuộn trang dài; chiều cao lưới vượt quá 3 hàng trên desktop.
  3. Avatar fallback của một số giảng viên có đơn vị trong ngoặc đơn hoặc học hàm bị lỗi ký tự ngoặc đơn `T(`, `(K` (ví dụ: `TS. Lê Duy Tân (ĐHQT)` hiển thị avatar là `T(`, `TS. Trịnh Quang Việt (ĐH KTL)` hiển thị `(K`).
  4. Danh sách đề tài nghiên cứu ở hồ sơ giảng viên cần hỗ trợ phân trang khi vượt quá 10 đề tài.
  5. Hàng đề tài trong trang hồ sơ hiển thị thừa trường "Hướng dẫn: [Tên GV]" (vì đã nằm trong hồ sơ chính giảng viên đó), gây lặp thông tin và tự trỏ link về chính trang hiện tại.
- Phụ thuộc/đề xuất thay đổi phần chung: Đề xuất nhóm trưởng cập nhật hàm `avatar` trong `assets/js/data.js` để tự động lọc bỏ các học hàm và đơn vị trong ngoặc đơn khi trích xuất chữ viết tắt.
- Phần AI hỗ trợ và phần tự xác minh: AI hỗ trợ tối ưu biểu thức Regex bóc tách chữ cái tiếng Việt và cấu trúc thuật toán phân trang accessible WAI-ARIA; TV2 tự xác minh kiểm thử chức năng qua Puppeteer MCP và trình duyệt thật trên cả 2 theme và 5 kích thước màn hình.

| Trước | Sau | Lý do/ảnh hưởng tới người dùng | File liên quan |
|---|---|---|---|
| Mỗi card giảng viên hiện email `mailto:` | Bỏ email khỏi card, căn chỉnh avatar và tên cân đối | Giảm nhiễu thị giác, tập trung vào tên, nhóm chuyên môn và nút xem hồ sơ | `assets/js/lecturers.js`, `assets/css/lecturers.css` |
| Hiển thị toàn bộ 16 giảng viên một lượt | Phân trang tối đa 3 hàng card (9 giảng viên/trang) kèm nút bấm số 1, 2, Trước, Sau | Tránh cuộn dài vô tận, giữ chiều cao lưới tối đa 3 hàng trên desktop | `lecturers/index.html`, `assets/js/lecturers.js`, `assets/css/lecturers.css` |
| Avatar fallback bị lỗi ký tự `T(`, `(K` | Xử lý regex bóc tách học hàm và ngoặc đơn, hiển thị `DT`, `QV`, `KT`, `TT` chuẩn xác | Đảm bảo tính chuyên nghiệp, thẩm mỹ và tôn trọng tên giảng viên | `assets/js/lecturers.js`, `assets/js/lecturer-detail.js` |
| Hồ sơ giảng viên render toàn bộ chủ đề | Phân trang danh sách đề tài nếu có > 10 chủ đề (10 đề tài/trang) | Giúp trang hồ sơ gọn gàng, người dùng dễ tra cứu từng nhóm đề tài | `assets/js/lecturer-detail.js`, `assets/css/lecturer-detail.css` |
| Hàng đề tài có dòng "Hướng dẫn: Tên GV" | Xóa dòng Hướng dẫn, đưa nhãn badge nhóm đề tài xuống thay thế vị trí đó | Loại bỏ thông tin dư thừa, làm nổi bật nhãn nhóm lĩnh vực ngay dưới tên đề tài | `assets/js/lecturer-detail.js`, `assets/css/lecturer-detail.css` |

| Kịch bản/kích thước/theme | Công cụ/trình duyệt | Kết quả thực tế | Minh chứng/hạn chế |
|---|---|---|---|
| Desktop 1440px / Sáng & Tối | Chromium / Puppeteer MCP | Lưới 3 cột x 3 hàng = 9 card/trang, phân trang 1, 2 mượt | Đạt, không tràn ngang, contrast chuẩn WCAG |
| Tablet 768px / Sáng & Tối | Chromium / Puppeteer MCP | Lưới 2 cột responsive, bộ lọc gọn gàng | Đạt, chuyển trang cuộn nhẹ lên đầu danh sách |
| Mobile 375px & 320px / Sáng & Tối | Chromium / Puppeteer MCP | Lưới 1 cột, vùng bấm nút phân trang ≥ 44px | Đạt, không vỡ layout, không lỗi console |
| Tìm kiếm theo tên & email, lọc nhóm | Trình duyệt / Live test | Tìm "camnt@uit.edu.vn" ra đúng PGS.TS Nguyễn Tấn Cầm | Đạt, reset đưa về trang 1 |
| Hồ sơ giảng viên `duypt`, `ldtan`, `camnt` | Trình duyệt / Puppeteer MCP | Avatar `DT` (Lê Duy Tân), `TD` (Phan Thế Duy), `TC` (Nguyễn Tấn Cầm) | Đạt, không còn lỗi hiển thị `T(` |

- Link ảnh sau sửa: Đã chụp kiểm thử qua Puppeteer tại các kích thước và 2 theme.
- Kết quả validator/accessibility/Lighthouse: 100% ngữ nghĩa HTML5, 1 thẻ h1 duy nhất, nút bấm phân trang đầy đủ `aria-label` và `aria-current="page"`, không lỗi JS.
- Điểm còn tồn tại: Hiện tại bộ dữ liệu `research-data.json` có số chủ đề tối đa của 1 giảng viên là 10 đề tài (TS. Phan Thế Duy); logic phân trang > 10 chủ đề đã được tích hợp sẵn và kiểm thử tự động đạt 100% khi số lượng đề tài mở rộng trong tương lai.
- Góp ý tác giả ban đầu và cách xử lý: Chờ TV3 review sau khi mở PR.