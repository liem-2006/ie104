# Ghi nhận sửa chữa TV1 — Khám phá và nền chung

> Bản hiện hành ngày 12/11/2026: thiết kế học thuật được nhóm trưởng duyệt. Nội dung tích hợp trước đó được giữ trong phần Lịch sử bên dưới.

## Thiết kế lại giao diện học thuật

### Phần được giữ

Giữ luồng khám phá, dữ liệu thật, tìm không dấu, OR nhóm/AND truy vấn, sắp xếp nguồn/A–Z, font hệ thống, logo và sáng/tối. Thiết kế mới được nhóm trưởng duyệt thay bố cục ba cột và gradient cũ.

### Trước → sau

| Trước | Sau | Lý do | File liên quan |
|---|---|---|---|
| Logo đơn lẻ, các trang rộng/hẹp khác nhau | Logo + UIT Discovery, header/footer và container 1.200px thống nhất | Nhận diện và căn lề rõ | Năm HTML, assets/css/style.css |
| Ba cột, sidebar chỉ có ít nội dung | Một danh sách rộng; thống kê một dòng; hướng dẫn bằng details | Bỏ vùng trống dọc hai bên | topics/index.html, topics.css |
| H1 chia span, dính chữ trên mobile | H1 liền mạch “Khám phá chủ đề nghiên cứu” | Xuống dòng tự nhiên | topics/index.html |
| Pill và modal cùng chọn nhóm | Chỉ nút nhóm aria-pressed, giữ OR; xóa modal/handler | Một cách lọc thống nhất | topics/index.html, topics.js |
| Render tất cả 37 card với nút mở lặp lại | 12 hàng/trang; tên đề tài là link chính, GV là link độc lập | Trang ngắn, dễ quét và không lặp hành động | topics.js, data.js, style.css |
| Không phân trang | Lọc → sắp xếp → chia trang; Trước/Sau, số trang, focus về kết quả | Không bỏ sót dữ liệu ngoài trang đang xem | topics.js, topics.css |
| Nhiều viền xanh, gradient và nút pill | Nền trung tính, xanh nhấn, nút/input bo 8px, khối 12px | Phân cấp bằng chữ/khoảng cách | style.css |
| Component thẻ chỉ nằm ở khám phá | createTopicRow trong data.js, hồ sơ dùng cùng component với h3 | Tránh hai bản HTML/CSS lệch nhau | data.js, topics.js, lecturer-detail.js |

### Quy ước tiếp tục làm

TV1 quản lý token và component chung; TV2/TV3 không ghi đè :root/header riêng. Giữ pageSize=12; lọc toàn bộ trước khi cắt trang, không lưu page vào URL/storage. Thay tìm/lọc/sắp xếp về trang 1; <=12 kết quả ẩn phân trang. Giữ focus/aria-current và API URL group/topic/email. Bỏ nút reset khỏi giao diện chỉ khi không còn bộ lọc, trả focus về input khi reset.

### Tự chạy và kết quả thực tế

Live Server từ root → topics/index.html. Kiểm tra các trang 1–4, tìm “lịch sử” ở dữ liệu cuối, chọn sec + nlp, A–Z, không kết quả và Enter trên nút trang.

Đã kiểm tra 12/12/12/1, 37 URL duy nhất; tìm/lọc/sắp xếp toàn bộ trước phân trang, 0 kết quả và reset đúng. Đổi trang focus về results-heading. 375×812: tiêu đề đề tài đầu từ y≈674 đến y≈726; 1440×900 thấy bốn hàng đầy đủ. Năm trang qua 50 tổ hợp responsive và 20 kiểm tra axe không vi phạm phát hiện; HTML nguồn hợp lệ theo công cụ cục bộ. Các giới hạn W3C/trình duyệt và Lighthouse mới xem kế hoạch chung.

Ảnh: [khám phá desktop](../idea/minh-chung-giao-dien/kham-pha-desktop.png), [mobile](../idea/minh-chung-giao-dien/kham-pha-mobile.png), [trang vào](../idea/minh-chung-giao-dien/trang-vao-desktop.png).

Commit triển khai: 8a2984f; sửa validation/nhận diện logo: dcb925f.

## Lịch sử tích hợp trước thiết kế lại

<details>
<summary>Mở bản ghi tích hợp cũ để đối chiếu.</summary>

> Đọc nhanh: giữ phong cách UIT Discovery của PR #3; thay dữ liệu viết cứng bằng JSON và dùng nền này cho toàn website. Phiên bản tích hợp đã được phép dùng JavaScript. [Kế hoạch và nghiệm thu chung](../idea/ke-hoach-tich-hop-sua-loi.md).

## Đóng góp được giữ

Nguồn: PR #3, commit 969f5e2c020abb986a6040edf8aa9356e55becdc. Giữ reset, bảng màu sáng xanh nhạt/tối xám than, font hệ thống tiếng Việt, gradient, khoảng cách, bo góc, nút, trạng thái focus và bố cục khám phá ba cột trên desktop. Giữ ý tưởng tìm kiếm, lọc nhiều nhóm, sắp xếp và modal; logic được thay để hoạt động với dữ liệu thật.

## Những gì đã sửa hoặc thay thế

| Trước | Sau | Lý do | File liên quan |
|---|---|---|---|
| HTML dài với thẻ button/header đóng dư | HTML ngữ nghĩa gọn, một h1; header/footer dùng chung | Loại lỗi cấu trúc, dễ bảo trì | topics/index.html và HTML các trang |
| Header có mục hồ sơ mẫu và chức năng chưa triển khai | Điều hướng Khám phá/Giảng viên; logo về trang vào | Không tạo link sai hoặc nút chết | HTML các trang, assets/css/style.css |
| Danh sách viết cứng 12 đề tài | Render đủ 37 chủ đề từ JSON | Dữ liệu có một nguồn duy nhất | assets/js/topics.js, assets/js/data.js |
| 13 lĩnh vực gồm 10 minh họa | Lấy đúng 3 nhóm, tên và số lượng thực | Không dùng dữ liệu giả như tính năng thật | topics/index.html, assets/js/topics.js |
| Ngày mới/cũ, lượt xem không có trong JSON | Theo thứ tự nguồn và tên A–Z; bỏ chỉ số giả | Tránh trình bày thông tin không có nguồn | assets/js/topics.js |
| Các cơ chế lọc dựa trên DOM và danh sách riêng | Một state cho tìm kiếm, pills, dialog và sort | Không lệch trạng thái hoặc mất kết quả khi kết hợp lọc | assets/js/topics.js |
| Link chi tiết mẫu hoặc query khác nhau | URL chung đủ group/topic/email, hồ sơ theo email | Mỗi thẻ mở đúng bản ghi | assets/js/data.js |
| Mobile dựa vào menu cũ | Điều hướng hai mục xuống dòng và luôn hiện | Shell đã tối giản cần hoạt động trên mobile | assets/css/style.css |
| Bộ lọc xuất hiện sau fetch đẩy bố cục | Dự trữ chiều cao pills và thống kê | Giảm layout shift | assets/css/topics.css |
| Bộ token của TV1 chưa đủ cho roadmap | Bổ sung token font/cỡ chữ/radius/trạng thái trong style chung | Các trang không tự định nghĩa theme khác nhau | assets/css/style.css |

assets/js/topics.js đã được viết lại quanh nguồn JSON; không chỉ vá danh sách HTML cũ. Một số CSS dành cho thành phần chưa dùng vẫn được giữ từ thiết kế gốc để không xóa thiết kế vượt phạm vi.

## Quy ước tiếp tục làm

- TV1 tiếp tục phụ trách reset và style chung. TV2/TV3 đề xuất token thiếu, không khai báo lại :root trong CSS trang.
- Tìm kiếm không phân biệt hoa/thường và dấu, theo tên đề tài/giảng viên. OR giữa các nhóm, AND với từ khóa. Không chọn nhóm là tất cả.
- Dialog giữ bản nháp đến khi Áp dụng; Hủy/Escape giữ bộ lọc cũ và trả focus về nút mở.
- Danh mục/số lượng đến từ JSON; không thêm ngày, độ hot, lượt xem hoặc lĩnh vực minh họa vào dữ liệu runtime.
- Dùng topicUrl/lecturerUrl của module chung; dữ liệu văn bản vào textContent.
- CSS riêng scope #page-topics; theme mặc định theo hệ điều hành, nút sáng/tối ghi đè theo lựa chọn được lưu. Tránh dùng màu link làm nền đi với color-on-primary.

## Tự chạy và kiểm tra

Chạy Live Server từ root repo, mở topics/index.html. Thử tên không dấu, sec/nlp cùng lúc, thêm từ khóa, chọn A–Z, xóa lọc và không có kết quả. Mở modal bằng bàn phím, Hủy/Escape và Áp dụng; Tab phải quay lại nút mở sau khi đóng. Mở chủ đề và giảng viên bất kỳ, kiểm tra query đúng.

Đã kiểm tra 37 thẻ, bộ lọc/sort/reset, native dialog, các mốc 320/375/768/1024/1440 ở hai theme; HTML-Validate 0 lỗi; axe không phát hiện lỗi WCAG trong các trạng thái đã thử. Lighthouse mobile: 99/100/100/100. Giới hạn dịch vụ W3C và trình duyệt khác xem tài liệu chung; không ghi pass cho kiểm tra chưa chạy.

## Bổ sung — chuyển theme thủ công

Đã thêm nút sáng/tối ở header tất cả các trang, dùng script chung assets/js/theme.js và token trong style.css. Lựa chọn lưu ở ie104.theme (light/dark), ưu tiên hơn hệ thống, giữ qua reload/chuyển trang và đồng bộ tab. Khi chưa chọn thì theo hệ thống; nếu localStorage bị chặn, nút vẫn đổi theme trong trang. Không tạo script theme riêng cho từng TV.

Đã kiểm tra lựa chọn thủ công ngược theme hệ thống, lưu trạng thái, bàn phím, mobile 320px và storage bị chặn. HTML-Validate năm trang và axe mobile hai theme đều không có lỗi phát hiện.

</details>
