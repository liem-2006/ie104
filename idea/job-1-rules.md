# Job 1 — Hợp đồng giao diện hiện hành

> Quyết định nhóm trưởng ngày 12/11/2026: thiết kế tra cứu học thuật, gọn và dễ đọc. Quyết định này thay yêu cầu giữ nguyên bố cục ba cột/gradient của TV1 trước đây. Dữ liệu và tính năng đã tích hợp được giữ, bổ sung phân trang 12 chủ đề.

## Phân công và nền chung

TV1 quản lý token/thành phần chung, trang vào, khám phá và phân trang; TV2 chi tiết/roadmap; TV3 danh bạ/hồ sơ. Header/footer dùng cùng cấu trúc ở năm trang, chỉ đổi đường dẫn theo độ sâu và aria-current. Đọc phần Yêu cầu giao diện hiện hành ở đầu JOB-1.md đặt cạnh code; nội dung cũ trong Lịch sử không còn giới hạn HTML/CSS tĩnh, disabled hoặc một trang mẫu.

Chỉ HTML5/CSS3/JavaScript thuần, BEM, CSS riêng theo ID, font hệ thống; hàm đơn nhiệm, JSDoc và DOMContentLoaded. Nạp reset → style → CSS trang. Container 1.200px, lề 16/24/32px; breakpoint 768/1024px. Màu sáng/tối theo style.css; không tự định nghĩa :root khác ở CSS trang. Một h1/trang, label/alt/focus rõ, vùng bấm nút ít nhất 44px. Theme theo hệ thống khi chưa chọn, ưu tiên localStorage ie104.theme khi đã chọn, đồng bộ tab và xử lý storage bị chặn.

## Dữ liệu và URL

Fetch JSON cục bộ qua HTTP bằng assets/js/data.js. Giữ nguyên schema, đường dẫn data/ ở root, 3 nhóm/37 chủ đề/234 keyword/16 giảng viên. Không thêm ID hoặc sửa nội dung để vừa giao diện. Mỗi chủ đề có một giảng viên; email trim/chữ thường để nối. URL chi tiết nhận group/topic/email, hồ sơ nhận email; tạo bằng helper chung. URL sai không fallback mẫu. children là tiên quyết của cha, không có cross-topic; subjects là tùy chọn. Dữ liệu vào textContent/DOM API, không nội suy HTML nguồn.

## Hành vi giao diện

- Khám phá: nút nhóm nhiều lựa chọn OR, kết hợp AND với truy vấn tên chủ đề/giảng viên không dấu. Không có lựa chọn là tất cả. Đã bỏ modal chọn nhóm.
- Lọc toàn bộ dữ liệu → sắp xếp → lấy 12 chủ đề/trang. Tìm/lọc/sắp xếp về trang 1; 0 kết quả hoặc <=12 ẩn phân trang. Đổi trang trả focus và cuộn tới đầu kết quả. Không đổi URL/storage cho phân trang.
- Component createTopicRow trong data.js dùng chung: h2 ở khám phá, h3 trong mục chủ đề của hồ sơ. Hai link chủ đề/giảng viên độc lập.
- Roadmap: mobile mặc định danh sách, sơ đồ có pan/zoom/fit/mở nhánh/dialog. Fit theo nodeBounds thực, chừa 40px/cạnh, không tự phóng quá 1; vẫn cho zoom thủ công. Không checkbox tiến độ.
- Danh bạ: tìm trực tiếp và nút Tìm, lọc nhóm theo chủ đề, reset. Hồ sơ: trường tùy chọn thiếu thì ghi ngắn hoặc ẩn; không số 0 giả, ảnh lỗi về chữ cái, link ngoài an toàn.

## Kiểm tra và bàn giao

Duy trì mọi luồng cũ, root và /ie104/. Kiểm tra 320/375/768/1024/1440px, hai theme, nội dung dài/cây sâu/lỗi JSON/bàn phím. 375×812 thấy tên đề tài đầu; 1440×900 thấy >=3 hàng. Ghi ảnh, kiểm thử thực và giới hạn trong [kế hoạch tổng](ke-hoach-tich-hop-sua-loi.md) cùng ba SUA-CHUA-TV*.md; không dùng kết quả lịch sử làm bằng chứng cho code đã thay.

Chủ repo duyệt/merge; thành viên qua fork/PR. Không tự push, merge hoặc deploy trong đợt thiết kế lại. Không thêm backend, đăng nhập, lưu đề tài/tiến độ hoặc quản trị.
