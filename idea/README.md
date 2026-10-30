# Ngữ cảnh hiện hành — đọc trước tài liệu chi tiết

## Quyết định đang áp dụng

- **Job 1 hiện hành:** HTML + CSS responsive, sáng/tối bằng CSS; đọc [quy tắc chung](job-1-rules.md). TV1: [khám phá và theme](../topics/JOB-1.md); TV2: [chi tiết và roadmap tự thiết kế](../topics/detail/JOB-1.md); TV3: [danh bạ, hồ sơ và schema giảng viên](../lecturers/JOB-1.md). Chưa làm JS. Bản tổng quan job chỉ lưu ngoài repo và nhóm trưởng gửi riêng.
- TV3 được tạo `data/lecturers.json` theo schema trong task, dùng email nối với dữ liệu chủ đề; ảnh/hồ sơ/chỉ số nghiên cứu là tùy chọn có nguồn. Không sửa schema nghiên cứu để thêm thông tin này.

- Tập trung frontend vanilla theo skill IE104; JSON tĩnh, không cần backend.
- Dùng `../data/research-data.json` với 3 nhóm và 37 bản ghi đã hợp nhất. Tạm dừng đánh giá chất lượng nội dung để triển khai web.
- Mỗi bản ghi chỉ có một `lecturer` gồm `name`, `email`; keyword có `name`, `outcome`, `subjects` tùy chọn, `children` đệ quy không giới hạn cấp.
- `children` là kiến thức học trước cha, không nối xuyên chủ đề. Chưa thêm ID chủ đề/keyword. Quy ước khóa lưu tiến độ được nhóm trưởng chốt ở chặng JavaScript.
- Repo dùng `data/` ở gốc theo yêu cầu nhóm trưởng, thay cho `assets/data/` trong mẫu skill.
- Job 1 gộp HTML/CSS: TV1 đề xuất nền chung để nhóm trưởng duyệt; TV2 tự thiết kế roadmap; TV3 chuẩn bị danh mục và hồ sơ. JavaScript làm ở job sau. Thành viên gửi PR từ fork; chủ repo duyệt và merge.

## Tài liệu

- [Chi tiết ý tưởng](de-tai-nckh-chi-tiet.md) và [kế hoạch môn học](de-tai-nckh-plan.md) lưu lại bối cảnh đã xây dựng. Các phần schema cũ, ID, nền dùng chung, chỉ tiêu 3 chủ đề/người hoặc 4 nhóm không phải yêu cầu thay đổi dữ liệu hiện tại. Khi có khác biệt, dùng quyết định ở trang này.
- [Hợp đồng và quy trình dữ liệu](data-work/quy-trinh-xu-ly-du-lieu.md): tham khảo ý nghĩa các trường. Giai đoạn nhập liệu đã hoàn thành cho phạm vi đang triển khai; không yêu cầu thành viên xử lý lại dữ liệu trong task frontend.
- [Mẫu từng nhóm](data-work/group-template.json): mẫu một nhóm; file chạy web bọc các nhóm trong mảng `groups`.

Các liên kết Excel/tài liệu môn học trong bản lưu có thể trỏ ra workspace gốc và không có trong repo công khai. Không cần các tài liệu đó để chạy web; khi task thực sự cần, nhóm trưởng cung cấp riêng. Không xem chúng là dữ liệu tải ở runtime.
