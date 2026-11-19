# Job 3 — TV2: Danh bạ và hồ sơ giảng viên

> Mục tiêu: hiểu và giải thích đồ án khi vấn đáp. Không đặt thời hạn. Bản tổng quan job-history/job-3.md do nhóm trưởng gửi riêng, chỉ lưu local. File này là task chi tiết trong repo.

## Đầu vào và thứ tự đọc

1. Lấy đúng nhánh/SHA nhóm trưởng công bố; chạy HTTP theo [README](../README.md). Không mặc định main đã có bản local mới.
2. Đọc [ngữ cảnh hiện hành](../idea/README.md) và [lịch sử phần được giao](job2-sua-chua-tv2.md). Phân biệt đóng góp gốc Job 1, phần nhận chéo Job 2 và sửa hậu tích hợp của nhóm trưởng.
3. Đọc mục chung và mục 5–6 trong [phân tích kỹ thuật từng trang](../idea/phan-tich-ky-thuat-theo-trang.md); tra [bảng kiến thức](../idea/thong-ke-kien-thuc-ie104.md) để xem nguồn Lab.
4. Mở HTML → CSS → JS → JSON. File trọng tâm: lecturers/index.html, lecturers/detail/index.html, assets/css/lecturers.css, assets/css/lecturer-detail.css, assets/js/lecturers.js, assets/js/lecturer-detail.js. Cả nhóm phải hiểu thêm assets/js/data.js, theme.js và data/*.json.

## Công việc cần làm

- Lần theo luồng: Email chuẩn hóa nối hai JSON, alias, tìm/lọc và phân trang 9/10. Đợt Lab thêm time và dl/dt/dd, vòng lặp/fragment; null khác 0; avatar có fallback.
- Demo: Tìm tên/email, lọc nhóm, rỗng/reset, trang 9/7; mở hồ sơ đầy đủ và tối giản; chỉ nguồn/ngày, chủ đề liên quan và link roadmap.
- Chỉ được sự kiện, state, hàm xử lý và DOM thay đổi cho mỗi thao tác. Giải thích tối thiểu ba kỹ thuật có thật thuộc HTML/CSS/JS và nguồn bài học, tách kỹ thuật bổ trợ khỏi mẫu Lab.
- Hiểu luồng xuyên năm trang; biết dữ liệu tĩnh khác database, vì sao fetch cần HTTP, cách chuẩn hóa email, theme và URL.
- Hỏi chéo: TV1 hỏi TV2; TV2 hỏi TV3; TV3 hỏi TV1. Nhóm trưởng hỏi tích hợp/chung.

## Đầu ra và nghiệm thu

Demo khoảng 5–7 phút, gồm luồng thường và trường hợp lỗi/rỗng/thiếu; giải thích bằng code thực, không phụ thuộc agent. Trả lời câu hỏi chéo; ghi điểm chưa hiểu để trao đổi. Không bắt buộc báo cáo mới hoặc PR code.

Phạm vi file được sửa trong Job 3: chưa giao sửa file nào. Không đổi JSON/schema/URL, style hoặc chức năng để dễ demo. Nếu phát hiện lỗi, gửi bước tái hiện, ảnh và kết quả mong đợi cho nhóm trưởng trước khi sửa. Giữ Vanilla/BEM/scope/JSDoc theo AGENTS.md.

## Giới hạn cần nói đúng

Code/logic và kiểm tra cấu trúc đã đạt trong phạm vi ghi nhận; chưa hoàn tất nghiệm thu trực quan toàn kích thước/theme, axe/Lighthouse mới. Không dùng kết quả cũ hoặc tự báo cáo thành kết quả đã kiểm chứng. Đọc [kế hoạch nghiệm thu](../idea/ke-hoach-tich-hop-sua-loi.md) nếu cần chi tiết.