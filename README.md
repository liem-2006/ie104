# IE104 — Website định hướng nghiên cứu khoa học

Website giúp sinh viên khám phá chủ đề, xem cây kiến thức nền và tìm giảng viên liên quan. Đồ án dùng HTML5, CSS3, JavaScript thuần và JSON tĩnh; phát triển lần lượt HTML → CSS → JavaScript theo lịch môn học.

## Bắt đầu

1. Đọc [quyết định hiện hành](idea/README.md), [quy tắc code](AGENTS.md) và [hướng dẫn đóng góp](CONTRIBUTING.md).
2. Nhận một Issue có phạm vi file, đầu vào, đầu ra và tiêu chí nghiệm thu do nhóm trưởng chốt.
3. Fork repo, tạo nhánh riêng, làm task rồi gửi Pull Request về `liem-2006/ie104:main`.

Repo đang ở giai đoạn dựng khung; chưa có giao diện hoàn chỉnh. Khi bắt đầu tạo trang, chạy bằng HTTP server cục bộ (ví dụ Live Server của VS Code), không mở bằng `file://` vì website đọc JSON qua `fetch`.

## Cấu trúc

```text
data/research-data.json        # Nguồn dữ liệu chạy web duy nhất
assets/css/                   # reset.css, style.css và CSS từng trang khi đến task CSS
assets/js/                    # data.js, main.js và JS chức năng khi đến task JS
assets/images/                # Ảnh dùng trên website
topics/detail/                # Trang khám phá và chi tiết chủ đề
lecturers/detail/             # Danh bạ và chi tiết giảng viên
saved/                        # Chủ đề đã lưu
about/                        # Giới thiệu, nguồn dữ liệu và cách đọc roadmap
idea/                         # Ngữ cảnh, kế hoạch và hợp đồng dữ liệu
.agents/skills/                # Skill bắt buộc của môn IE104
.github/                      # CODEOWNERS, mẫu task và mẫu PR
```

Task HTML sẽ tạo `index.html`, `404.html` ở gốc và `index.html` trong từng thư mục trang. `.gitkeep` chỉ giữ thư mục trống. Nhóm trưởng làm mẫu dùng chung trước từng chặng; thành viên áp dụng mẫu vào phần đã giao, không tạo nhiều phiên bản của cùng một trang/hàm dùng chung.

Dữ liệu có cấu trúc `{ "groups": [{ "group": { "id", "name" }, "topics": [...] }] }`: 3 nhóm `sec`, `data`, `nlp`, 37 bản ghi. Mỗi chủ đề có một giảng viên và cây keyword đệ quy. Từ trang gốc tải `./data/research-data.json`; trang sâu phải tính đường dẫn tương ứng. Tên file dữ liệu và hợp đồng không đổi trong task giao diện nếu nhóm trưởng chưa duyệt.

## Quyền quản lý

Chủ repo: **@liem-2006**. Thành viên đóng góp qua fork và PR; không cấp quyền ghi vào repo chính. Chỉ chủ repo quyết định merge. CODEOWNERS chỉ yêu cầu người rà soát; bảo vệ nhánh trên GitHub mới thực thi yêu cầu duyệt.
