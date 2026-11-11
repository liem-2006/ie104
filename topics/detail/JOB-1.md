# TV2 — Chi tiết và roadmap

## Yêu cầu giao diện hiện hành

> Cập nhật ngày 12/11/2026 theo quyết định thiết kế lại của nhóm trưởng. Phần này là yêu cầu áp dụng khi tiếp tục sửa code.

### Mục tiêu và đầu vào

Đưa kiến thức nền lên sớm, giữ ý nghĩa con học trước cha. Đầu vào: JSON nghiên cứu hiện có, URL group/topic/email, token/header của TV1 và engine sơ đồ đã tích hợp. Đọc [hợp đồng chung](../../idea/job-1-rules.md), AGENTS.md và skill IE104.

### Phạm vi và đầu ra

- `topics/detail/index.html`: thông tin chủ đề gọn; nhóm, tên, giảng viên/email; bộ chuyển chủ đề phụ; Kiến thức nền; Sơ đồ/Danh sách; hướng dẫn thu gọn và dialog node.
- `assets/css/topic-detail.css`: scope #page-topic-detail, dùng token chung, canvas clamp(360px,60vh,640px), danh sách đệ quy và panel responsive.
- `assets/js/topic-detail.js`: tải đúng chủ đề theo URL, dựng mọi children, giữ pan/zoom/mở nhánh, fit theo bounding box thực của node, chừa 40px mỗi cạnh và không tự zoom lớn hơn 1.

Không sửa JSON, URL chung, bộ token của TV1 hoặc file danh bạ/hồ sơ.

### Quy tắc bắt buộc

- Một h1, không chèn mô tả sinh tự động lặp lại tên đề tài. Thông tin giảng viên/email cùng metadata, tự xuống dòng.
- Hướng dẫn ngắn luôn có gần cây: nhánh con là kiến thức học trước cha; hướng dẫn thao tác dài dùng details.
- Mobile mặc định danh sách, vẫn chọn được sơ đồ. Đệ quy không giới hạn cấp, giảm thụt lề lồng sâu thay vì thu nhỏ chữ hoặc cắt nội dung.
- Giữ thuật toán bố trí node, gom requestAnimationFrame, tách pha đọc/ghi DOM. Pan/zoom chỉ thay transform; fit dùng nodeBounds cập nhật sau bố trí.
- Node mở bằng bàn phím; dialog có nhãn, Escape đóng và trả focus. Không tạo quan hệ cross-topic hoặc biến keyword thành checkbox tiến độ.
- outcome phải đọc được; subjects là tùy chọn. Không tự bổ sung kiến thức hoặc môn học.
- Không fallback IDS khi URL sai. Giữ trạng thái đang tải/lỗi/không tìm thấy và giải phóng aria-busy trong cả nhánh lỗi.

### Nghiệm thu và tự kiểm tra

Chạy HTTP, mở từ danh sách và link trực tiếp. Thử đủ 37 đề tài, cây sâu, tên dài, subjects có/không có; không mất node hoặc node chồng nhau. Thử mở/thu liên tục, chuyển view/chủ đề, fit/zoom/pan, fullscreen, bàn phím và focus dialog. Kiểm tra hai theme tại 320/375/768/1024/1440px; canvas có thể chứa vùng rộng nhưng không làm toàn trang tràn.

Chi tiết thay đổi: [SUA-CHUA-TV2.md](SUA-CHUA-TV2.md). Kết quả toàn website: [kế hoạch tổng](../../idea/ke-hoach-tich-hop-sua-loi.md).

## Lịch sử giao việc ban đầu

<details>
<summary>Mở bản giao việc cũ để đối chiếu; yêu cầu hiện hành ở trên được ưu tiên.</summary>

> **Bản giao việc ban đầu, lưu để đối chiếu.** Giới hạn chỉ HTML/CSS, chức năng disabled và một trang mẫu đã được thay thế bởi [kế hoạch tích hợp](../../idea/ke-hoach-tich-hop-sua-loi.md). Các quy định schema và code còn phù hợp vẫn được giữ.

# TV2 — Chi tiết chủ đề và cây roadmap

Đọc `../../idea/job-1-rules.md`, AGENTS.md và skill. Task riêng này không kế thừa phạm vi sửa file của TV1 trong `topics/JOB-1.md`.

## Đầu vào / đầu ra

Đầu vào: chủ đề “Phát hiện tấn công mạng bằng học sâu” trong `data/research-data.json`, header/footer và CSS chung TV1 đã được duyệt. Đầu ra: một trang chi tiết mẫu HTML/CSS responsive, cây mở/thu được bằng HTML thuần.

## File được tạo

Hướng dẫn stylesheet đặt ngay tại [assets/css/JOB-1.md](../../assets/css/JOB-1.md).

| File tính từ gốc repo | Nội dung phải có |
|---|---|
| `topics/detail/index.html` | Body `page-topic-detail`; breadcrumb về danh sách; h1 tên chủ đề; nhóm, tên GV và link hồ sơ; hướng dẫn cách đọc cây; keyword gốc, outcome, subjects nếu có; link quay lại. Dùng ul/li lồng nhau và details/summary khi cần. |
| `assets/css/topic-detail.css` | Scope `#page-topic-detail`; bố cục thông tin và cây, đường nối hoặc dấu phân cấp, khoảng thụt, trạng thái focus/mở, responsive và màu từ token chung. |

## Quyền thiết kế roadmap

TV2 tự đề xuất và dựng format cây cho mobile/tablet/desktop. Nhóm trưởng không cung cấp nhánh roadmap mẫu bắt buộc. Có thể thay đổi cách sắp xếp giữa màn hình rộng và hẹp nhưng giữ nguyên nội dung, cấp cây và ý nghĩa con học trước cha.

- Nhánh con là tiên quyết; thứ tự anh em không tạo quan hệ. Có chú giải rõ ngay gần cây.
- Không biến keyword thành nhóm nội dung hoặc sửa JSON để vừa giao diện.
- Dùng đúng cây của chủ đề mẫu. Trong lúc tự kiểm tra, thử thêm cây sâu 5 cấp lấy từ dữ liệu hiện có; có thể thay tạm nội dung để thử, không giả đó là cây của chủ đề mẫu.
- Trên mobile, giảm thụt lề và cho chữ xuống dòng; không thu nhỏ chữ đến khó đọc, không ép cây rộng làm toàn trang cuộn ngang.
- Dùng bàn phím mở/đóng được; outcome/môn học đọc được khi mở nút. Không canvas, thư viện graph hay JS.
- Không thêm checkbox học xong, phần trăm tiến độ hoặc lưu chủ đề trong Job 1.

## Nghiệm thu

Link chủ đề–giảng viên và quay lại đúng; không mất nút/outcome; hai theme thống nhất với TV1. PR giải thích cách trình bày cây và cung cấp ảnh cây sâu trên mobile/desktop, kết quả thử bàn phím và kiểm tra HTML/CSS. Không sửa CSS chung, schema hoặc dữ liệu giảng viên.

</details>
