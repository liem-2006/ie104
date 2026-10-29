# Job 1 — Hợp đồng HTML/CSS dùng chung

Đọc cùng `AGENTS.md`, skill IE104 và `idea/README.md`. Đây là hướng dẫn hiện hành của Job 1; không áp dụng phần schema/phân công cũ khi mâu thuẫn. Chưa viết JavaScript, fetch, backend, đăng nhập, lưu chủ đề hoặc tiến độ. Tên người nhận là TV1–TV3; thời hạn thống nhất riêng.

## Phân công và thứ tự

1. TV1 đề xuất bộ màu sáng/tối, font, khoảng cách và header/footer mẫu trong PR đầu tiên. Nhóm trưởng duyệt rồi merge trước khi các thành viên hoàn thiện CSS riêng.
2. TV2 có thể dựng HTML và tự đề xuất bố cục cây trong lúc chờ; TV3 có thể chuẩn bị dữ liệu giảng viên và HTML. Chỉ dùng bộ màu/font chung sau khi đã duyệt.
3. TV1 hoàn thiện khám phá; TV2 hoàn thiện chi tiết/roadmap; TV3 hoàn thiện danh bạ/hồ sơ. Mỗi phần có PR riêng, nhóm trưởng tích hợp.
4. Nhóm trưởng làm trang chủ/404 ở task riêng, duyệt thành phần chung và kiểm tra liên kết giữa các trang. Job 1 không tạo link tới các trang chưa tồn tại.

## Kiến thức và ràng buộc

- Ưu tiên kiến thức trong bài học và thực hành. Lab2-1 trong workspace có viewport, max-width, srcset/sizes và picture; Lab3 có định dạng chữ và liên kết. Không suy ra rằng toàn bộ Flexbox/Grid/media queries đã được dạy chỉ từ các bài này.
- Skill IE104 yêu cầu Flexbox/Grid và media queries thuần, vì vậy dùng chúng cho bố cục đồ án. Nếu cần bổ trợ cách dùng ngoài bài đã học, ghi nguồn tài liệu và giải thích trong PR; không dùng framework, thư viện UI hoặc template tải sẵn.
- Mobile dưới 768px, tablet 768–1023px, desktop từ 1024px. Kiểm tra ít nhất 375, 768, 1024, 1440px và khả năng co giãn giữa các mốc; thêm 320px cho trường hợp hẹp. Không che nội dung tràn bằng overflow-x:hidden để giả lập đạt yêu cầu.
- HTML ngữ nghĩa, lang=vi, UTF-8, viewport, một h1 mỗi trang, heading theo cấp. Label cho input; alt ảnh; loading=lazy cho ảnh dưới màn hình; focus bàn phím rõ, không chỉ dựa vào hover/màu.
- CSS BEM; selector CSS riêng bắt đầu bằng ID trang. Không inline style; không dùng float cho bố cục chính.

## Giao diện sáng/tối và quyền sửa

TV1 sở hữu `assets/css/reset.css` và `assets/css/style.css`. TV2/TV3 không sửa trực tiếp hai file này; thiếu token/thành phần thì đề nghị TV1, nhóm trưởng duyệt thay đổi chung.

Các token bắt buộc trong style.css: `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-primary`, `--color-on-primary`, `--color-focus`; `--font-body`, `--font-heading`; `--space-1` đến `--space-6`; `--radius-card`, `--container-max`. TV1 chốt giá trị, không đổi tên tùy ý sau merge. Mặc định nền sáng; dark khai báo qua `prefers-color-scheme: dark`. Font và spacing dùng chung, màu có hai bộ. CSS riêng dùng var() thay cho hardcode màu giao diện.

Job 1 đổi theme theo hệ điều hành/trình duyệt, kiểm tra bằng DevTools hoặc cài đặt hệ thống. Chưa có nút chuyển theme hay localStorage vì chưa làm JS. Mục tiêu tương phản chữ thường tối thiểu 4.5:1 ở cả hai theme. Ưu tiên font hệ thống có tiếng Việt; font tải về phải có quyền sử dụng, đường dẫn nội bộ và fallback.

Header dùng `.site-header`, nav `.site-nav`, footer `.site-footer`, khung `.container`, thẻ chủ đề `.topic-card`. TV1 viết HTML mẫu tại `topics/index.html`; TV2/TV3 sao chép header/footer và điều chỉnh đường dẫn, aria-current cho trang của mình. Header hiển thị Khám phá/Giảng viên, xuống dòng trên mobile; không tạo menu hamburger cần JS.

Thứ tự link CSS: reset.css → style.css → CSS trang. ID body: `page-topics`, `page-topic-detail`, `page-lecturers`, `page-lecturer-detail`.

## Dữ liệu mẫu và liên kết

Nguồn dùng chung: `data/research-data.json`. Chọn chủ đề “Phát hiện tấn công mạng bằng học sâu”, giảng viên `camnt@uit.edu.vn`, làm luồng chi tiết mẫu chung. Không sửa JSON nghiên cứu trong Job 1. HTML viết sẵn nội dung đại diện; không chép cả 37 chủ đề thành nhiều trang.

- `topics/index.html` hiển thị ít nhất 6 thẻ (mỗi nhóm 2 thẻ). Chỉ thẻ chủ đề mẫu có link chi tiết hoạt động; các thẻ khác ghi “Trang mẫu chưa triển khai”, không dẫn nhầm sang chi tiết mẫu.
- `topics/detail/index.html` là chi tiết chủ đề mẫu. Link GV sang `../../lecturers/detail/index.html`.
- `lecturers/index.html` hiển thị 16 giảng viên từ danh mục TV3. Chỉ GV mẫu có link chi tiết; không gán cùng một trang chi tiết cho mọi người.
- `lecturers/detail/index.html` là hồ sơ GV mẫu; danh sách chủ đề đối chiếu email từ JSON nghiên cứu, link chủ đề mẫu sang `../../topics/detail/index.html`.
- Danh sách → chi tiết dùng `./detail/index.html`, chi tiết → danh sách dùng `../index.html`. Link nhóm trang ngang dùng đường dẫn tương đối đúng độ sâu. Email dùng mailto.
- Tìm/lọc ở Job 1 chỉ là bố cục: có label, disabled và ghi chú “Chức năng sẽ bổ sung ở chặng JavaScript”. Không để người dùng tưởng bộ lọc đã hoạt động.

## Bàn giao và kiểm thử

Mỗi PR nêu file đã sửa, cách chạy bằng HTTP, ảnh mobile/desktop ở hai theme, thử bàn phím và kết quả kiểm tra HTML/CSS. HTML/CSS hợp lệ; không lỗi đường dẫn, ảnh, font; nội dung dài không đè nhau. TV1 rà TV2, TV2 rà TV3, TV3 rà TV1; chủ repo duyệt/merge. Không tự sửa file ngoài danh sách task. File JOB-1.md là hướng dẫn, chỉ sửa khi nhóm trưởng giao.
