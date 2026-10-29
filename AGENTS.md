# IE104 - Internet và Công nghệ Web (UIT) - Workspace Rules

## Ngữ cảnh repo này

- Đọc `idea/README.md` trước khi làm task; trang này ghi quyết định mới thay thế các phần cũ trong tài liệu ý tưởng.
- Dữ liệu runtime nằm ở `data/research-data.json` theo yêu cầu nhóm trưởng. Không đổi schema, đường dẫn hoặc nội dung dữ liệu trong task frontend nếu chưa được giao.
- Làm đúng phạm vi Issue, dùng mẫu nhóm trưởng đã chốt cho từng chặng HTML/CSS/JS. Đóng góp qua fork và PR theo `CONTRIBUTING.md`; @liem-2006 là người duyệt và merge.

## BẮT BUỘC TUÂN THỦ KHI VIẾT CODE ĐỒ ÁN:
1. **100% Vanilla Code:** Chỉ dùng HTML5, CSS3, JavaScript thuần.
2. **CẤM THƯ VIỆN & FRAMEWORK:** Không dùng Bootstrap, Tailwind, jQuery, React, Vue,... Mọi component (Slider, Modal, Filter, LiveSearch, Form validation) phải tự code bằng Vanilla JS.
3. **CẤM TEMPLATE CÓ SẴN:** Tự dựng giao diện từ file trống dựa trên wireframe/mockup.
4. **CSS Convention:** Tuân thủ BEM (`block__element--modifier`). Viết Flexbox, CSS Grid. Responsive đa thiết bị bằng Media Queries thuần. Scoping CSS theo ID của từng trang để tránh xung đột.
5. **JS Convention:** Đặt tên `camelCase`. Tư duy component-based. Xử lý DOM qua `DOMContentLoaded`. Sử dụng `localStorage`/`sessionStorage` và file JSON cục bộ (`fetch API`) làm mock data. Không để phát sinh runtime error trong console.
6. **TÁCH HÀM & CHÚ THÍCH (COMMENT) BẮT BUỘC:** Mỗi hàm chỉ làm đúng 1 nhiệm vụ duy nhất (Single Responsibility). Mọi hàm JS đều phải có block comment (chuẩn JSDoc: giải thích chức năng hàm, `@param`, `@returns`) và inline comment cho các đoạn logic xử lý để phục vụ tiêu chí chấm điểm **Chất lượng code (30%)** của giảng viên.
7. **SEO & Performance:** Thẻ ngữ nghĩa HTML5, duy nhất 1 thẻ `<h1>` mỗi trang, ảnh có `alt` và `loading="lazy"`, tối ưu điểm Google Lighthouse và pass W3C Validator.
8. Chi tiết xem thêm tại skill: `.agents/skills/ie104-web-project-guidelines/SKILL.md`.
