# TV1 — Khám phá chủ đề và giao diện dùng chung

## Bắt đầu

Đọc `../idea/job-1-rules.md`, `../AGENTS.md` và skill IE104. Task này chỉ áp dụng `topics/index.html` và các CSS liệt kê dưới đây; không bao gồm `topics/detail/` (TV2).

Đầu vào: JSON hợp nhất, quy tắc chung, 3 nhóm sec/data/nlp. Đầu ra: trang khám phá HTML/CSS responsive cùng bộ màu/font sáng-tối được nhóm trưởng duyệt.

## File được tạo và nội dung

| File tính từ gốc repo | Công việc và giới hạn |
|---|---|
| `assets/css/reset.css` | Reset nhỏ tự viết: box-sizing, margin mặc định cần thiết, font form, ảnh co giãn. Giữ dấu hiệu focus; không chép thư viện reset. |
| `assets/css/style.css` | Token có tên đúng hợp đồng, hai bộ màu, font, spacing, container, header/nav/footer, link/button và topic-card dùng chung. Không chứa bố cục riêng roadmap/hồ sơ. |
| `topics/index.html` | Head và header/footer mẫu; h1; giới thiệu ngắn; tìm kiếm và select nhóm có label nhưng disabled; ít nhất 6 thẻ lấy đúng từ JSON; liên kết chi tiết mẫu; phần trạng thái rỗng mẫu tách riêng bằng ghi chú để review, không trộn vào kết quả đang có. |
| `assets/css/topics.css` | Scope `#page-topics`: bố cục thanh tìm/lọc, grid thẻ và trạng thái rỗng. Dùng token; 1 cột mobile, tăng cột khi đủ chỗ. |

## Thứ tự thực hiện

1. PR nền chung: đề xuất giá trị token và HTML mẫu header/footer/thẻ; ảnh hai theme ở mobile/desktop. Nhóm trưởng duyệt trước khi TV2/TV3 phụ thuộc vào CSS này.
2. Hoàn thiện trang khám phá bằng các thành phần đã duyệt; không đổi hợp đồng CSS âm thầm.
3. Kiểm tra tiêu đề dài, tên giảng viên dài, nút/link focus và các đường dẫn. Ghi chú bộ màu/font trong mô tả PR để nhóm áp dụng.

## Không thuộc task

Không JS, không bộ lọc chạy thật, không nút theme giả, không fetch, không tạo homepage/roadmap, không sửa dữ liệu hoặc file của TV2/TV3.

## Nghiệm thu

- Đủ file và nội dung trên; tên nhóm/thẻ/giảng viên đúng nguồn.
- Hai theme đọc được; TV2/TV3 chỉ cần dùng token để theo theme.
- Header/footer/thẻ là mẫu chung; trang co giãn ở các mốc trong hợp đồng, không tràn ngang.
- Link mẫu đúng, chức năng chưa triển khai được ghi rõ; PR có minh chứng và kiểm tra HTML/CSS.
