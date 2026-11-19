# Phân tích kỹ thuật bài học theo từng trang — UIT Discovery

Tài liệu ôn vấn đáp cho Job 3 (bản tổng quan job-history/job-3.md do nhóm trưởng gửi riêng; task trong repo ở topics/detail/JOB-3.md, lecturers/JOB-3.md và topics/JOB-3.md). Đối chiếu code hiện tại ngày 19/11/2026; bảng dưới ghi nguyên tắc vận dụng, không khẳng định code dự án là đáp án chép nguyên từ Lab. Nguồn chi tiết nằm trong [bảng thống kê IE104](thong-ke-kien-thuc-ie104.md). Không cần dùng hết kiến thức; ưu tiên Lab khi phù hợp, giữ kỹ thuật bổ trợ để chức năng đúng và dễ dùng.

## 1. Kiến trúc chung cần hiểu trước

`HTML tạo khung → DOMContentLoaded → fetch JSON → xử lý dữ liệu/state → dựng DOM → CSS trình bày → sự kiện cập nhật state và render lại`.

- [data.js](../assets/js/data.js): loadJson/cache Promise/kiểm tra HTTP; loadResearch/loadLecturers; flattenTopics; URL; email; DOM helper; avatar; phân trang và tag dùng chung.
- [theme.js](../assets/js/theme.js): đọc ie104.theme, gắn data-theme và lưu lựa chọn; storage bị chặn vẫn cho đổi trong trang. Khởi tạo theme sớm trước CSS để giảm nháy, gắn nút khi DOM sẵn sàng.
- [style.css](../assets/css/style.css), [reset.css](../assets/css/reset.css): nền chung, token, typography, header/footer, responsive. CSS từng trang scope bằng ID, class BEM. Không dùng float để dựng layout chính.
- [research-data.json](../data/research-data.json): groups → topics → lecturer/keywords; mỗi keyword có name/outcome/subjects tùy chọn/children. [lecturers.json](../data/lecturers.json): hồ sơ nối theo email; thiếu dữ liệu không được bịa.
- URL chi tiết nhận group/topic/email; hồ sơ nhận email. URLSearchParams mã hóa tên có dấu. normalizeEmail trim/lowercase, giữ alias hunglkt@uit.edu.vn → hunglk@uit.edu.vn. findTopic chỉ nhận đúng một kết quả đủ ba khóa, không chọn đại bản ghi trùng tên.

| Kiến thức | Ứng dụng / lý do | Nguồn và ranh giới |
|---|---|---|
| HTML ngữ nghĩa, liên kết, button | Landmark, một h1, link điều hướng khác button thay đổi trạng thái | Lab 1 dựng cấu trúc; Lab 5 button (`row-html-50`, `row-html-90`) |
| Box model, Flexbox/Grid, typography | Bố cục dễ đọc, co giãn; token dùng lại giữa năm trang | Lab 3/4, `row-css-54`, `row-css-83`; media queries/BEM/token là quy chuẩn/bổ trợ, không gán tất cả cho Lab |
| Biến, mảng, for, push, DOM API | Duyệt JSON, tạo phần tử và nội dung bằng textContent | Lab 5 `code-js-40`, Lab 6 `code-js-61`; áp dụng nguyên tắc, không thêm gallery/game |
| fetch + async/await | Đọc JSON qua HTTP, báo lỗi tải | Lý thuyết `code-js-49`; cache Promise, module và URL là bổ trợ |
| DocumentFragment | Dựng một nhóm node rồi cập nhật vùng DOM một lần | Bổ trợ cho cách dựng DOM Lab 5; không bảo đảm “chỉ một lần reflow” |
| ARIA, focus, storage, Pointer Events | Bàn phím, trạng thái đọc được, lưu theme và kéo sơ đồ | Bổ trợ Vanilla cần thiết; xem mục 5.3 bảng thống kê |

## 2. Trang chủ — nhóm trưởng

Đọc [index.html](../index.html) → phần `#page-home` trong style.css → [home.js](../assets/js/home.js).

| Phân loại | Kỹ thuật và vị trí | Cách vận dụng / câu hỏi cần giải thích |
|---|---|---|
| HTML | header/nav/main/section/footer; hai CTA là liên kết | Lab 1 semantic. CTA dẫn tới chức năng; không phải form hoặc thao tác JS |
| CSS | Grid hero/hành trình, Flexbox header, breakpoint | Lab 4 bố cục + responsive bổ trợ. Vì sao đổi số cột khi khung hẹp và min-width:0 giúp tránh tràn? |
| JS | initHome → renderHomeStats; countUniqueLecturers | for cộng số đề tài theo Lab 5–6; Set khử email trùng là bổ trợ. Danh bạ lỗi thì đếm từ chủ đề; tải nghiên cứu lỗi thì ẩn thống kê |

Demo: mở trang, đọc số 3/37/16, chuyển theme, mở hai CTA. Không gọi các con số là dữ liệu hardcode. Logo ảnh có alpha; CSS không thêm nền sáng ở dark.

## 3. Khám phá chủ đề — TV3

Đọc [HTML](../topics/index.html), [CSS](../assets/css/topics.css), [JS](../assets/js/topics.js).

**Luồng:** initTopics → flattenTopics → restoreUrlState → renderGroups/renderTopics. Khi nhập/chọn nhóm: cập nhật state, về trang 1; lọc toàn bộ → sort A–Z tiếng Việt → slice 12 mục → render → syncUrl.

| Phân loại | Kỹ thuật và vị trí | Nguồn / điều cần hiểu |
|---|---|---|
| HTML | input có label, button nhóm, danh sách và nav phân trang | HTML form/danh sách từ lý thuyết; button theo Lab 5. Không dùng bảng chỉ để sắp layout |
| CSS | Flexbox nút lọc, hàng chủ đề, focus/selected, responsive | Lab 3/4 và trạng thái pseudo-class lý thuyết; ARIA/BEM bổ trợ |
| JS | matchesFilters, compareTitles, getFilteredTopics | Chuỗi/điều kiện/mảng; for/push trong module dữ liệu theo Lab 6. Nhóm chọn theo OR, kết hợp truy vấn theo AND; không chọn nhóm là tất cả |
| JS | searchText, changePage, restoreUrlState/syncUrl | Chuẩn hóa dấu tiếng Việt; History/URLSearchParams bổ trợ. Giữ query ngoài tính năng/hash; page phải số nguyên hợp lệ |

Demo: tìm “hoc sau”; chọn/bỏ nhóm; 0 kết quả; reset; trang 12/12/12/1; mở chủ đề và tên giảng viên. Câu hỏi: nếu slice trước filter thì sai thế nào? Vì sao cần phân biệt tên đề tài trùng nhưng khác giảng viên?

## 4. Chi tiết và roadmap — TV1

Đọc [HTML](../topics/detail/index.html), [CSS](../assets/css/topic-detail.css), [JS](../assets/js/topic-detail.js).

**Luồng:** initTopicDetailPage → readTopicQuery/findTopic → thông tin chủ đề → buildMindMapTree → showMap → dựng node/đo/bố trí → finishMapInteraction/fitToScreen. Sơ đồ không tự mở hết descendants; chỉ căn vừa node đang hiển thị lần đầu.

| Phân loại | Kỹ thuật và vị trí | Nguồn / điều cần hiểu |
|---|---|---|
| HTML | button, details/summary danh sách, dialog/panel, SVG | Button Lab 5; SVG lý thuyết và tài nguyên Lab 2 (`row-html-87`); details/dialog/ARIA bổ trợ |
| CSS | position cho canvas/nút, transform pan/zoom, overflow trong khung | Positioning lý thuyết; bố cục Lab 4. Không che tràn toàn trang bằng overflow-x:hidden |
| JS | Cây đệ quy; flattenKnowledge con trước cha; renderCardsView | Mảng/hàm là nền tảng; thuật toán cây bổ trợ. Keyword trùng tên vẫn giữ từng lần xuất hiện; không gộp làm mất đầu ra |
| JS | requestAnimationFrame, đo bounds/fit, sự kiện kéo và zoom | rAF có trong Lab 6 (`code-js-61`), nhưng thuật toán layout/Pointer Events/Fullscreen là bổ trợ; không gọi roadmap là Canvas game |
| JS | renderQuickTopicSwitcher, drawer/panel | DOM/event theo tinh thần Lab 5; focus/Escape bổ trợ. Chỉ chủ đề của giảng viên hiện tại, qua mọi nhóm; tìm tên không dấu |

Demo: mở/reload là Sơ đồ, tự fit; kéo/zoom, đổi Danh sách rồi quay lại giữ góc nhìn; Danh sách ban đầu đóng hết. Mở nhánh, xem outcome/subjects, đóng panel bằng Escape. Câu hỏi: children nghĩa gì? Tại sao dùng SVG+HTML thay Canvas? Vì sao phải đo sau khi khung hiển thị? Học con trước cha không đồng nghĩa mọi nhánh bắt buộc học tuần tự.

## 5. Danh bạ giảng viên — TV2

Đọc [HTML](../lecturers/index.html), [CSS](../assets/css/lecturers.css), [JS](../assets/js/lecturers.js).

| Phân loại | Kỹ thuật và vị trí | Nguồn / điều cần hiểu |
|---|---|---|
| HTML | Form tìm kiếm, select nhóm, button reset, thẻ giảng viên | Form theo lý thuyết; semantic/button Lab 1/5. Email là text; tên/Xem hồ sơ mới là link |
| CSS | Lưới responsive, card, trạng thái rỗng và focus | Grid/Flexbox Lab 4 + responsive bổ trợ |
| JS | getFilteredLecturers → renderLecturers → fragment → phân trang | DOM createElement/appendChild Lab 5, vòng lặp Lab 6; fragment bổ trợ. 9 người/trang; tìm/lọc reset trang và không vượt số trang |
| JS | avatar và relatedTopics dùng module chung | Email nối dữ liệu, initials khi ảnh thiếu/hỏng; ảnh không tải được khác trình duyệt không hỗ trợ định dạng. Không thêm picture/srcset khi chưa có bộ ảnh biến thể |

Demo: 9/7 người, tìm tên/email, nhóm, rỗng/reset; chuyển trang bằng bàn phím và mở hồ sơ. Câu hỏi: nhóm của giảng viên được suy ra từ đâu? Tại sao phải dùng cùng normalizeEmail ở mọi trang?

## 6. Hồ sơ giảng viên — TV2

Đọc [HTML](../lecturers/detail/index.html), [CSS](../assets/css/lecturer-detail.css), [JS](../assets/js/lecturer-detail.js).

**Luồng:** initProfile → đọc email/tra danh bạ → lọc chủ đề theo email → renderProfile → header/quick facts/bio/metrics/chủ đề. URL sai hiển thị không tìm thấy, không fallback người mẫu.

| Phân loại | Kỹ thuật và vị trí | Nguồn / điều cần hiểu |
|---|---|---|
| HTML | createQuickFacts/createMetricCard/renderMetrics dùng dl/div/dt/dd | Lab 1 tr.2–4 (`row-html-46`). Đây là cặp nhãn–giá trị; nhãn trước trong DOM, CSS giữ giá trị trước về thị giác |
| HTML/JS | createDateNode dùng time datetime | Lab 1 tr.1–2,4 (`row-html-43`); kiểm tra ngày lịch là logic bổ trợ. YYYY-MM-DD hợp lệ mới tạo time; ngày sai giữ text; dữ liệu thiếu theo xử lý hiện hành |
| CSS | metrics-grid, metric-card Flex/Grid và order; reset margin | Lab 3/4. Thay thẻ không được làm margin mặc định gây lệch bố cục |
| JS | createTopicFragment + renderTopicPage | Lab 5–6 DOM/vòng lặp; giữ thứ tự, 10 chủ đề/trang; fragment bổ trợ |
| JS | Chỉ số và nguồn/ngày, quick facts đếm keyword/môn học | Không thay null bằng 0; 0 có thật vẫn hiển thị. Số keyword là lần xuất hiện, môn học dùng Set khử trùng |

Demo hồ sơ `camnt@uit.edu.vn` có ngày/chỉ số và hồ sơ ít dữ liệu `duypt@uit.edu.vn`. Chỉ số có nguồn/ngày không đồng nghĩa nhóm đã kiểm chứng học thuật toàn bộ. Câu hỏi: vì sao time tốt hơn text? Vì sao dl hợp hơn div thuần? 2025-02-29 khác 2024-02-29 ra sao?

## 7. Lịch sử, giới hạn và cách học

- Đợt Lab chỉ sửa 5 file code: data.js, home.js, lecturers.js, lecturer-detail.js, lecturer-detail.css. Commit `88e91e8`; lịch sử/kiểm thử local tới `2566f89`. Sửa nền logo và tài liệu Job 3 là các thay đổi tiếp sau; không nói chúng đã nằm trong commit Lab hoặc main.
- Lịch sử theo phần: [TV1](../topics/detail/job2-sua-chua-tv1.md), [TV2](../lecturers/job2-sua-chua-tv2.md), [TV3](../topics/job2-sua-chua-tv3.md), [nền chung/nghiệm thu](ke-hoach-tich-hop-sua-loi.md).
- Các bộ kiểm thử đã chạy chủ yếu là Node VM/DOM giả lập và validator cấu trúc. Không đủ chứng minh responsive, focus thực tế hay điểm Lighthouse. Nêu đúng hạn chế khi được hỏi.
- Cách ôn: chọn một thao tác, dự đoán state/DOM, chỉ code, thực hiện và so kết quả. Chỉ học thuật toán phức tạp tới mức giải thích được đầu vào/đầu ra và các bước chính; không học thuộc code hoặc tuyên bố mọi API đều được dạy trong Lab.
