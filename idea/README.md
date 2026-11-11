# Ngữ cảnh hiện hành — đọc trước tài liệu chi tiết

## Quyết định đang áp dụng

- **Phiên bản tích hợp hiện hành:** bốn màn hình động và trang vào, HTML/CSS/JavaScript thuần. Đọc [kế hoạch tích hợp và nghiệm thu](ke-hoach-tich-hop-sua-loi.md). TV1 cung cấp thiết kế chung, TV2 roadmap, TV3 giảng viên; các JOB-1.md cũ giữ làm lịch sử, không còn giới hạn chỉ HTML/CSS hoặc một trang mẫu.
- TV3 được tạo `data/lecturers.json` theo schema trong task, dùng email nối với dữ liệu chủ đề; ảnh/hồ sơ/chỉ số nghiên cứu là tùy chọn có nguồn. Không sửa schema nghiên cứu để thêm thông tin này.

- Tập trung frontend vanilla theo skill IE104; JSON tĩnh, không cần backend.
- Dùng `../data/research-data.json` với 3 nhóm và 37 bản ghi đã hợp nhất. Tạm dừng đánh giá chất lượng nội dung để triển khai web.
- Mỗi bản ghi chỉ có một `lecturer` gồm `name`, `email`; keyword có `name`, `outcome`, `subjects` tùy chọn, `children` đệ quy không giới hạn cấp.
- `children` là kiến thức học trước cha, không nối xuyên chủ đề. Chưa thêm ID chủ đề/keyword. Quy ước khóa lưu tiến độ được nhóm trưởng chốt ở chặng JavaScript.
- Repo dùng `data/` ở gốc theo yêu cầu nhóm trưởng, thay cho `assets/data/` trong mẫu skill.
- Nhóm trưởng đã cho phép giữ JavaScript hữu ích và hoàn thiện luồng dữ liệu trong nhánh integration/job-1-fixes. Thành viên gửi PR từ fork; chủ repo duyệt và merge. Không merge lại chồng PR #1–#3 sau khi dùng bản tích hợp.

## Tài liệu

- [Chi tiết ý tưởng](de-tai-nckh-chi-tiet.md) và [kế hoạch môn học](de-tai-nckh-plan.md) lưu lại bối cảnh đã xây dựng. Các phần schema cũ, ID, nền dùng chung, chỉ tiêu 3 chủ đề/người hoặc 4 nhóm không phải yêu cầu thay đổi dữ liệu hiện tại. Khi có khác biệt, dùng quyết định ở trang này.
- [Hợp đồng và quy trình dữ liệu](data-work/quy-trinh-xu-ly-du-lieu.md): tham khảo ý nghĩa các trường. Giai đoạn nhập liệu đã hoàn thành cho phạm vi đang triển khai; không yêu cầu thành viên xử lý lại dữ liệu trong task frontend.
- [Mẫu từng nhóm](data-work/group-template.json): mẫu một nhóm; file chạy web bọc các nhóm trong mảng `groups`.

Các liên kết Excel/tài liệu môn học trong bản lưu có thể trỏ ra workspace gốc và không có trong repo công khai. Không cần các tài liệu đó để chạy web; khi task thực sự cần, nhóm trưởng cung cấp riêng. Không xem chúng là dữ liệu tải ở runtime.
