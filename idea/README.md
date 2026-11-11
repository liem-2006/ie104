# Ngữ cảnh hiện hành — đọc trước tài liệu chi tiết

## Ưu tiên hiện hành: Job 2 (12/11/2026)

Job 2 thay phân công Job 1: TV1 sửa roadmap của TV2, TV2 sửa giảng viên của TV3, TV3 sửa khám phá của TV1. Đọc [quy trình](../CONTRIBUTING.md). Chờ PR tích hợp được nhóm trưởng merge vào main trước khi tạo nhánh mới.

Nhóm trưởng quản lý token, component, trang vào và module chung; các dòng “TV1 quản lý nền chung” dưới đây là ngữ cảnh Job 1. Không sửa dữ liệu hoặc lịch sử ghi nhận. Các quy tắc chức năng/style vẫn được giữ. IE104 áp dụng code/cấu trúc, IE106 áp dụng kiến thức đã học về khả năng sử dụng giao diện.

## Quyết định đang áp dụng

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
