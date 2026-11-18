# Ngữ cảnh hiện hành — đọc trước tài liệu chi tiết

## Ưu tiên hiện hành: Job 2 (12/11/2026)

Job 2 thay phân công Job 1: TV1 sửa roadmap của TV2, TV2 sửa giảng viên của TV3, TV3 sửa khám phá của TV1. Đọc [quy trình](../CONTRIBUTING.md). PR #4 đã merge; tạo nhánh task từ upstream/integration/job-2 và gửi PR về integration/job-2, không gửi thẳng main.

Nhóm trưởng quản lý token, component, trang vào và module chung; các dòng “TV1 quản lý nền chung” dưới đây là ngữ cảnh Job 1. Không sửa dữ liệu hoặc lịch sử ghi nhận. Các quy tắc chức năng/style vẫn được giữ. IE104 áp dụng code/cấu trúc, IE106 áp dụng kiến thức đã học về khả năng sử dụng giao diện.

## Quyết định đang áp dụng

- **Vòng 2 — Dọn kỹ thuật + nâng cấp UI theo mockup (`C1`..`C9`, nhánh local `task/ui-round2-20261118`, 19/11/2026):** gom phân trang/tag/showMeta về `data.js` + xóa CSS chết (`cbf5ce4`); a11y `prefers-reduced-motion`, hit-target mindmap, bỏ `console.error`, `role=status` tĩnh (`7f108a0`); danh bạ card ngang + count nhóm + empty-reset nhất quán (`f456e4a`); UX-04 xóa `?group=` cũ khi bỏ chọn (`5727539`); M2/UX-05 roadmap mobile mặc định Danh sách + CTA Sơ đồ (`324d3e5`); M3/UI-02 trang chủ `site-nav` + thu gọn minh họa mobile (`3855d04`); M1/UI-05 quick-facts 3 ô hồ sơ GV (`ca2471a`); UX-06 đồng bộ `?group=&q=&page=` một cơ chế duy nhất `restoreUrlState`/`syncUrl` (`8387703`). **Không đổi `data/*.json`**, giữ style học thuật UIT. Backup: `backup/job-2-before-round2-20261118` (`3376f98`). Minh chứng vòng 2 là kiểm tra DOM/URL live trong trình duyệt (chưa tạo PNG mới, chưa chạy lại `validator.nu`/`axe`/`qa_report` full). Chi tiết xem trong [kế hoạch tích hợp](ke-hoach-tich-hop-sua-loi.md) mục "Vòng 2".

- **Nâng cấp UI/UX hậu tích hợp, Tối giản 4 trang con & Khôi phục Trang chủ gốc tinh chỉnh bố cục (`6f0d454` → `c72acf8` → `00ab17a` → bản cuối `813d9ea`, nhánh local `review/job-2-combined`):** Chuẩn hóa `41` token trong `style.css` (6 cặp sắc độ miền `--color-domain-1..6-bg/accent`, khôi phục `@media (prefers-color-scheme: dark)` No-JS, đệm sáng logo Dark Mode, `--shadow-soft: none`). **Trang chủ (`813d9ea`)** giữ nguyên phong cách Hero 2 cột kèm khung minh họa `.home__visual` và Hành trình 3 bước `.home__steps` như bản gốc (`f98c978`), đồng thời tái cấu trúc bằng CSS Grid cân tâm để không chồng lấn/cắt vòng `.home__orbit`, sửa lỗi bó cột trên Tablet `768px`, giữ cụm `"nghiên cứu."` liền dòng ở Mobile, bổ sung `.home__disclaimer` và nhãn thống kê động `#home-stats` qua `home.js` (`0` fix cứng). **4 trang con (`00ab17a`)** tiếp tục tối giản & 100% Data-Driven (Khám phá hỗ trợ `?group=`, co gọn chip `> 6` nhóm, placeholder trung tính và phân trang cửa sổ `getVisiblePages()`; Chi tiết gán màu miền động `resolveGroupTone` & an toàn với `keywords: []`; Danh bạ/Hồ sơ dùng tag động 6 sắc độ & phân trang rút gọn). Backup gốc: `backup/job-2-before-ui-upgrade-20261118` (`f98c978`), backup đợt 1: `backup/job-2-ui-upgrade-v1-20261118` (`b8d84ab`), backup tối giản v1: `backup/job-2-ui-minimal-v1-20261118` (`d5c9ad7`), backup bản data-driven trước khi khôi phục Trang chủ: `backup/job-2-ui-datadriven-v1-20261118` (`dbaee3b`). Giữ nguyên 100% `data/*.json`, schema, URL và alias `hunglkt -> hunglk`.

- **Cập nhật UI/UX 17/11/2026 (nhóm trưởng duyệt phạm vi thiết kế lại):** nhận diện xanh UIT, Material tiết chế được phát triển thành giao diện học thuật có điểm nhấn: hero biên tập, minh họa khái niệm tự dựng bằng CSS, phân cấp bề mặt và typography. Chức năng/schema/URL giữ nguyên. Quyết định này thay giới hạn “ít trang trí” của 12/11; xem đánh giá và nghiệm thu mới trong kế hoạch tổng. Bản local chờ nhóm trưởng xem trước khi push/merge.

- **Giao diện ngày 12/11/2026:** tra cứu học thuật; container 1.200px, nền trung tính và xanh UIT, ít trang trí. Khám phá một danh sách rộng, phân trang 12 chủ đề sau tìm/lọc/sắp xếp; bỏ sidebar và modal chọn nhóm. Roadmap fit theo node thực. Quyết định này thay yêu cầu giữ bố cục/gradient TV1 ban đầu.
- JOB-1.md tại thư mục đích đã có phần Yêu cầu giao diện hiện hành ở đầu; bản giao việc ban đầu nằm trong phần Lịch sử. TV1 giữ quyền quản lý token và component chung.

- **Phiên bản tích hợp hiện hành:** bốn màn hình động và trang vào, HTML/CSS/JavaScript thuần. Đọc [kế hoạch tích hợp và nghiệm thu](ke-hoach-tich-hop-sua-loi.md). TV1 cung cấp thiết kế chung, TV2 roadmap, TV3 giảng viên; phần giao việc cũ của JOB-1.md giữ làm lịch sử, không còn giới hạn chỉ HTML/CSS hoặc một trang mẫu.
- TV3 được tạo `data/lecturers.json` theo schema trong task, dùng email nối với dữ liệu chủ đề; ảnh/hồ sơ/chỉ số nghiên cứu là tùy chọn có nguồn. Không sửa schema nghiên cứu để thêm thông tin này.

- Tập trung frontend vanilla theo skill IE104; JSON tĩnh, không cần backend.
- Dùng `../data/research-data.json` với 3 nhóm và 37 bản ghi đã hợp nhất. Tạm dừng đánh giá chất lượng nội dung để triển khai web.
- Mỗi bản ghi chỉ có một `lecturer` gồm `name`, `email`; keyword có `name`, `outcome`, `subjects` tùy chọn, `children` đệ quy không giới hạn cấp.
- `children` là kiến thức học trước cha, không nối xuyên chủ đề. Chưa thêm ID chủ đề/keyword. Lưu tiến độ chưa nằm trong phạm vi hiện hành.
- Repo dùng `data/` ở gốc theo yêu cầu nhóm trưởng, thay cho `assets/data/` trong mẫu skill.
- Nhóm trưởng đã cho phép giữ JavaScript hữu ích và hoàn thiện luồng dữ liệu trong nhánh integration/job-1-fixes. Thành viên gửi PR từ fork; chủ repo duyệt và merge. Không merge lại chồng PR #1–#3 sau khi dùng bản tích hợp.

## Tài liệu

- [Chi tiết ý tưởng](de-tai-nckh-chi-tiet.md) và [kế hoạch môn học](de-tai-nckh-plan.md) lưu lại bối cảnh đã xây dựng. Các phần schema cũ, ID, nền dùng chung, chỉ tiêu 3 chủ đề/người hoặc 4 nhóm không phải yêu cầu thay đổi dữ liệu hiện tại. Khi có khác biệt, dùng quyết định ở trang này.
- [Hợp đồng và quy trình dữ liệu](data-work/quy-trinh-xu-ly-du-lieu.md): tham khảo ý nghĩa các trường. Giai đoạn nhập liệu đã hoàn thành cho phạm vi đang triển khai; không yêu cầu thành viên xử lý lại dữ liệu trong task frontend.
- [Mẫu từng nhóm](data-work/group-template.json): mẫu một nhóm; file chạy web bọc các nhóm trong mảng `groups`.

Các liên kết Excel/tài liệu môn học trong bản lưu có thể trỏ ra workspace gốc và không có trong repo công khai. Không cần các tài liệu đó để chạy web; khi task thực sự cần, nhóm trưởng cung cấp riêng. Không xem chúng là dữ liệu tải ở runtime.
