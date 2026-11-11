# IE104 — UIT Discovery

## Job 2 — kiểm tra chéo và nâng cấp giao diện

Chỉ bắt đầu code sau khi nhóm trưởng merge PR tích hợp vào main. Đọc bản ghi sửa chữa phần mình nhận trước khi sửa.

- **TV1:** [Chi tiết/roadmap](topics/detail/JOB-2.md), phần gốc TV2.
- **TV2:** [Danh bạ/hồ sơ](lecturers/JOB-2.md), phần gốc TV3.
- **TV3:** [Khám phá](topics/JOB-2.md), phần gốc TV1.
- Nhóm trưởng quản lý nền chung và tích hợp; một PR/người từ fork theo [CONTRIBUTING](CONTRIBUTING.md).
- IE104 quy định code/cấu trúc; IE106 định hướng thiết kế dễ dùng. Giữ style học thuật hiện tại, dữ liệu và logic.

Website giúp sinh viên khám phá chủ đề nghiên cứu, xem cây kiến thức nền và tìm giảng viên hướng dẫn. Phiên bản tích hợp dùng HTML5, CSS3, JavaScript thuần và JSON cục bộ; không có backend hoặc bước build.

## Chạy website

1. Mở root repo bằng VS Code và chạy Live Server (hoặc HTTP static server tương đương).
2. Mở index.html để vào Khám phá hoặc Giảng viên.
3. Không mở bằng file:// vì ES module và fetch cần HTTP. Không cần npm install để chạy website.

Có đủ 37 chủ đề thuộc 3 nhóm và 16 hồ sơ giảng viên. Giao diện tra cứu học thuật, sáng/tối. Tìm/lọc/sắp xếp hoạt động trên toàn bộ JSON rồi phân trang 12 chủ đề; đổi bộ lọc về trang 1. Roadmap có sơ đồ tương tác và danh sách đệ quy; mobile mặc định danh sách. Nút sáng/tối nằm trên header của mọi trang; lựa chọn được lưu bằng localStorage và đồng bộ giữa các tab. Khi chưa chọn, website theo hệ điều hành/trình duyệt.

## Đọc trước khi nhận việc

- [Quyết định hiện hành](idea/README.md), [quy chuẩn code](AGENTS.md), [đóng góp](CONTRIBUTING.md).
- [Kế hoạch tích hợp và kết quả nghiệm thu](idea/ke-hoach-tich-hop-sua-loi.md): nguồn PR, hợp đồng URL, kiểm thử và giới hạn.
- Ghi nhận sửa chữa [TV1](topics/SUA-CHUA-TV1.md), [TV2](topics/detail/SUA-CHUA-TV2.md), [TV3](lecturers/SUA-CHUA-TV3.md).

Các JOB-1.md tại thư mục đích có phần Yêu cầu giao diện hiện hành ở đầu. Bản giao việc ban đầu được giữ trong phần Lịch sử để đối chiếu; giới hạn chỉ HTML/CSS, disabled filter và một trang mẫu đã được thay thế.

## Cấu trúc đang chạy

| Thành phần | Vai trò |
|---|---|
| index.html | Điểm vào tối giản |
| topics/ và topics/detail/ | Khám phá và chi tiết/roadmap |
| lecturers/ và lecturers/detail/ | Danh bạ và hồ sơ |
| assets/css/ | Reset, token/thành phần chung và CSS scoped từng trang |
| assets/js/data.js | JSON, URL, email và DOM dùng chung |
| assets/js/*.js | Logic từng trang |
| data/research-data.json | 3 nhóm, 37 chủ đề, cây keyword đệ quy |
| data/lecturers.json | 16 giảng viên và thông tin mở rộng tùy chọn |
| idea/ | Hợp đồng, kế hoạch, bối cảnh |
| saved/, about/ | Thư mục dự phòng, chưa có tính năng runtime |

Giữ data/ ở root, không chuyển sang assets/data/. Không thêm ID vào JSON. Link chủ đề dùng group/topic/email, link hồ sơ dùng email; tạo bằng module chung để chạy được cả dưới /ie104/.

## Kiểm thử và quyền quản lý

Giao diện ngày 12/11/2026 đã kiểm tra 37 chủ đề/16 hồ sơ, 50 tổ hợp responsive/theme và phân trang 12/12/12/1. HTML-Validate và axe không lỗi/vi phạm phát hiện trong phạm vi đã thử. Lighthouse mobile trung vị: Performance 94–100, ba nhóm còn lại 100. [Kết quả, ảnh và giới hạn W3C/Firefox/hosting](idea/ke-hoach-tich-hop-sua-loi.md#giao-dien-hoc-thuat). Kết quả tối ưu trước đó giữ làm lịch sử.

Nhánh bàn giao: integration/job-1-fixes. PR #1–#3 được giữ để đối chiếu; không merge chồng các PR gốc lên bản tích hợp. Chủ repo @liem-2006 duyệt và merge. Thành viên đóng góp qua fork/PR, không push vào repo chính. Không tự thay đổi bảo vệ main hoặc CODEOWNERS.
