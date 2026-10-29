# TV2 — Chi tiết chủ đề và cây roadmap

Đọc `../../idea/job-1-rules.md`, AGENTS.md và skill. Task riêng này không kế thừa phạm vi sửa file của TV1 trong `topics/JOB-1.md`.

## Đầu vào / đầu ra

Đầu vào: chủ đề “Phát hiện tấn công mạng bằng học sâu” trong `data/research-data.json`, header/footer và CSS chung TV1 đã được duyệt. Đầu ra: một trang chi tiết mẫu HTML/CSS responsive, cây mở/thu được bằng HTML thuần.

## File được tạo

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
