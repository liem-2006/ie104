# TV1 — Khám phá và giao diện chung

## Yêu cầu giao diện hiện hành

> Cập nhật ngày 12/11/2026 theo quyết định thiết kế lại của nhóm trưởng. Phần này là yêu cầu áp dụng khi tiếp tục sửa code.

### Mục tiêu và đầu vào

Thiết kế tra cứu học thuật: ít trang trí, ưu tiên tìm đề tài. Đọc [hợp đồng hiện hành](../idea/job-1-rules.md), AGENTS.md và skill IE104. Đầu vào: dữ liệu 3 nhóm/37 chủ đề/16 giảng viên, bộ màu được nhóm trưởng duyệt, module dữ liệu/URL hiện có. Không thay schema hoặc nội dung JSON.

### Phạm vi và đầu ra

| File | Công việc hiện hành |
|---|---|
| `index.html` | Trang vào ngắn, hai lựa chọn Khám phá/Giảng viên, cùng header/footer |
| `topics/index.html` | H1 liền mạch, thống kê một dòng, tìm kiếm, nút chọn nhiều nhóm trực tiếp, danh sách và phân trang |
| `assets/css/style.css` | TV1 sở hữu token sáng/tối, container 1.200px, font, nút/input, header/footer và component topic-row dùng chung |
| `assets/css/topics.css` | Scope #page-topics; bố cục tìm/lọc, kết quả và phân trang, không có sidebar |
| `assets/js/topics.js` | Lọc toàn bộ dữ liệu → sắp xếp → chia 12/trang; cập nhật DOM an toàn và focus khi đổi trang |
| `assets/js/data.js` | Giữ API đọc JSON/URL; createTopicRow dùng chung với TV3, heading cấp 2 ở khám phá và cấp 3 ở hồ sơ |
| `assets/js/theme.js` | Giữ theme mặc định hệ thống, ưu tiên lựa chọn ie104.theme; không đổi khóa |

### Quy tắc bắt buộc

- Bỏ modal chọn nhóm và các handler riêng của modal. Nút nhóm dùng aria-pressed, OR giữa nhóm, AND với từ khóa; không chọn nhóm là tất cả.
- state.page bắt đầu 1; thay tìm kiếm/nhóm/sắp xếp về trang 1. Không phân trang trước khi lọc và không ghi trạng thái trang vào URL/storage.
- Hiện Trước/Sau và số trang có aria-current; ẩn cả thanh khi tối đa 12 kết quả. Đổi trang trả focus về heading kết quả và cuộn tới đó.
- Xóa bộ lọc chỉ hiện khi có lựa chọn khác mặc định; reset trả focus về ô tìm kiếm vì nút sẽ ẩn.
- Tên đề tài và tên giảng viên là hai link độc lập. Không tạo anchor bao quanh một anchor khác; không thêm nút mở roadmap trùng với link tiêu đề.
- Giữ ID JS đang dùng, semantic HTML, một h1, JSDoc từng hàm, media queries thuần. Không ép xuống dòng tiêu đề bằng các span dính chữ.
- TV2/TV3 dùng token và header của TV1; mọi đổi thành phần chung cần đồng bộ tất cả trang.

### Nghiệm thu và tự kiểm tra

Chạy HTTP bằng Live Server từ root. Mặc định 37 chủ đề chia 12/12/12/1, không trùng hoặc thiếu. Thử từ khóa không dấu, chọn nhiều nhóm, A–Z, 0 kết quả, reset và điều hướng trang bằng bàn phím. 375×812 phải thấy tiêu đề đề tài đầu tiên; 1440×900 thấy ít nhất ba hàng. Kiểm tra sáng/tối, 320/375/768/1024/1440px, không tràn ngang và không dùng overflow-x:hidden để che lỗi.

Ảnh và kết quả hiện hành ghi tại [SUA-CHUA-TV1.md](SUA-CHUA-TV1.md) và [kế hoạch tổng](../idea/ke-hoach-tich-hop-sua-loi.md).

## Lịch sử giao việc ban đầu

<details>
<summary>Mở bản giao việc cũ để đối chiếu; yêu cầu hiện hành ở trên được ưu tiên.</summary>

> **Bản giao việc ban đầu, lưu để đối chiếu.** Giới hạn chỉ HTML/CSS, chức năng disabled và một trang mẫu đã được thay thế bởi [kế hoạch tích hợp](../idea/ke-hoach-tich-hop-sua-loi.md). Các quy định schema và code còn phù hợp vẫn được giữ.

# TV1 — Khám phá chủ đề và giao diện dùng chung

## Bắt đầu

Đọc `../idea/job-1-rules.md`, `../AGENTS.md` và skill IE104. Task này chỉ áp dụng `topics/index.html` và các CSS liệt kê dưới đây; không bao gồm `topics/detail/` (TV2).

Đầu vào: JSON hợp nhất, quy tắc chung, 3 nhóm sec/data/nlp. Đầu ra: trang khám phá HTML/CSS responsive cùng bộ màu/font sáng-tối được nhóm trưởng duyệt.

## File được tạo và nội dung

Hướng dẫn riêng cho các file stylesheet đặt ngay tại [assets/css/JOB-1.md](../assets/css/JOB-1.md).

| File tính từ gốc repo | Công việc và giới hạn |
|---|---|
| `assets/css/reset.css` | Reset nhỏ tự viết: box-sizing, margin mặc định cần thiết, font form, ảnh co giãn. Giữ dấu hiệu focus; không chép thư viện reset. |
| `assets/css/style.css` | Token có tên đúng hợp đồng, hai bộ màu, font, spacing, container, header/nav/footer, link/button và topic-card dùng chung. Không chứa bố cục riêng roadmap/hồ sơ. |
| `topics/index.html` | Head và header/footer mẫu; h1; giới thiệu ngắn; tìm kiếm và select nhóm có label nhưng disabled; ít nhất 6 thẻ lấy đúng từ JSON; liên kết chi tiết mẫu; phần trạng thái rỗng mẫu tách riêng bằng ghi chú để review, không trộn vào kết quả đang có. |
| `assets/css/topics.css` | Scope `#page-topics`: bố cục thanh tìm/lọc, grid thẻ và trạng thái rỗng. Dùng token; 1 cột mobile, tăng cột khi đủ chỗ. |

## Thứ tự thực hiện

1. PR nền chung: đề xuất giá trị token và HTML mẫu header/footer/thẻ; ảnh hai theme ở mobile/desktop. Chỉ cần khung và ít nhất một thẻ, chưa cần đủ 6 thẻ hoặc link xuyên trang hoạt động trước khi TV2/TV3 merge. Nhóm trưởng duyệt trước khi TV2/TV3 phụ thuộc vào CSS này.
2. Hoàn thiện trang khám phá bằng các thành phần đã duyệt; không đổi hợp đồng CSS âm thầm.
3. Kiểm tra tiêu đề dài, tên giảng viên dài, nút/link focus và các đường dẫn. Ghi chú bộ màu/font trong mô tả PR để nhóm áp dụng.

Trạng thái rỗng đặt trong section có thuộc tính hidden, là anh em với danh sách kết quả. Khi kiểm tra, tạm ẩn danh sách và bỏ hidden của trạng thái rỗng bằng DevTools; trả trạng thái mặc định trước bàn giao. Không tạo nút chuyển giả hoặc hiển thị đồng thời “không có kết quả” với danh sách đang có.

## Không thuộc task

Không JS, không bộ lọc chạy thật, không nút theme giả, không fetch, không tạo homepage/roadmap, không sửa dữ liệu hoặc file của TV2/TV3.

## Nghiệm thu

- Đủ file và nội dung trên; tên nhóm/thẻ/giảng viên đúng nguồn.
- Hai theme đọc được; TV2/TV3 chỉ cần dùng token để theo theme.
- Header/footer/thẻ là mẫu chung; trang co giãn ở các mốc trong hợp đồng, không tràn ngang.
- Link mẫu đúng, chức năng chưa triển khai được ghi rõ; PR có minh chứng và kiểm tra HTML/CSS.

</details>
