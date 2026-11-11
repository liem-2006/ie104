# Ghi nhận sửa chữa TV1 — Khám phá và nền chung

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
