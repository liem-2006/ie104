---
name: ie104-web-project-guidelines
description: Quy chuẩn và hướng dẫn bắt buộc khi thực hiện đồ án môn học IE104 (Internet và Công nghệ Web - UIT). Sử dụng khi tư vấn, thiết kế, triển khai code (HTML/CSS/JS), cấu trúc thư mục dự án, tối ưu hiệu suất hoặc kiểm thử theo yêu cầu của giảng viên ThS. Võ Tấn Khoa.
---

# Hướng Dẫn & Quy Chuẩn Code Đồ Án Môn Học IE104 (UIT)
> **Môn học:** Internet và Công nghệ Web (IE104)
> **Giảng viên phụ trách:** ThS. Võ Tấn Khoa - Khoa KH&KTTT, Trường ĐH Công nghệ Thông tin (ĐHQG-HCM)

Tài liệu này đóng vai trò là kim chỉ nam và quy chuẩn kỹ thuật bắt buộc cho Agent khi hỗ trợ sinh viên xây dựng đồ án IE104.

---

## 1. NGUYÊN TẮC "VÀNG" (BẮT BUỘC TUÂN THỦ)

1. **100% Vanilla Code (Code thuần):**
   * **CHỈ SỬ DỤNG:** HTML5, CSS3 và JavaScript thuần (Vanilla JS).
   * **TUYỆT ĐỐI CẤM:**
     * Framework/Thư viện CSS: Bootstrap, Tailwind CSS, Bulma, Foundation,...
     * Thư viện/Framework JS: jQuery, React, Vue, Angular, Lodash,...
     * Plugin giao diện có sẵn: Swiper.js, Owl Carousel, Slick, jQuery UI, Bootstrap Modal,... (Mọi slider, modal, dropdown đều phải tự code bằng Vanilla JS).
   * **TUYỆT ĐỐI CẤM TEMPLATE TẢI SẴN:** Toàn bộ giao diện phải được viết từ đầu (từ file trống) dựa trên bản thiết kế wireframe/mockup Figma.

2. **Phạm vi đồ án (Front-end First):**
   * Tập trung 100% vào Front-end: Giao diện, trải nghiệm tương tác (UX/UI), logic trình duyệt, responsive.
   * **Không bắt buộc Backend.** Dữ liệu động giả lập bằng file JSON cục bộ (`assets/data/*.json`) và lấy qua `fetch API`, hoặc lưu trữ trạng thái người dùng bằng `localStorage` / `sessionStorage`.
   * *(Backend API thật chỉ là phần tùy chọn nâng cao nếu nhóm còn thời gian và đã hoàn thiện xuất sắc Front-end).*

---

## 2. CẤU TRÚC MÃ NGUỒN CHUẨN DỰ ÁN

Dự án phải tuân thủ nghiêm ngặt cấu trúc thư mục sau:

```text
project-root/
├── assets/
│   ├── css/ (hoặc styles/)
│   │   ├── reset.css          # Reset CSS cơ bản (giữ nguyên, không tùy tiện sửa)
│   │   ├── style.css          # CSS dùng chung: typography, màu sắc, buttons, layout, components dùng chung
│   │   └── <page-name>.css    # CSS đặc thù riêng cho từng trang để tránh xung đột
│   ├── js/
│   │   ├── main.js            # Logic dùng chung: navigation, modal, user session, form login/register
│   │   ├── SlideShow.js       # Class/module điều khiển slider tự viết
│   │   ├── search.js          # Logic live-search
│   │   └── <feature>.js       # Logic riêng từng tính năng (filter, tab, pagination,...)
│   ├── images/
│   │   ├── common/            # Logo, icons, default avatar,...
│   │   ├── home/              # Ảnh dùng riêng trang chủ
│   │   └── <feature>/         # Ảnh dùng cho trang tính năng
│   └── data/
│       ├── search.json        # Dữ liệu giả lập cho tìm kiếm
│       └── <data>.json        # Dữ liệu giả lập cho sự kiện, tin tức, sản phẩm,...
├── index.html                 # Trang chủ (Homepage)
├── 404.html                   # Trang báo lỗi 404 Not Found
├── <feature-folder>/          # Các trang tính năng theo chuẩn folder/index.html (vd: event-detail/index.html)
├── README.md                  # Hướng dẫn cài đặt, cấu trúc mã nguồn, link Figma & Demo
└── .gitignore                 # Bỏ qua các file không cần thiết (.DS_Store, .vscode,...)
```

---

## 3. QUY CHUẨN VIẾT CODE (CODING CONVENTIONS)

### 3.1. HTML5:
* Sử dụng đầy đủ các thẻ ngữ nghĩa (**Semantic Tags**): `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
* Mỗi trang chỉ có **duy nhất 1 thẻ `<h1>`** đại diện cho tiêu đề chính của trang. Các tiêu đề phụ phải phân cấp logic: `<h2>` -> `<h3>` -> `<h4>`.
* Mọi thẻ `<img>` bắt buộc phải có thuộc tính `alt` mô tả nội dung ảnh (hỗ trợ Accessibility và SEO).
* Ảnh nằm dưới nếp gấp màn hình (below the fold) phải có thuộc tính `loading="lazy"` để tối ưu tốc độ tải trang.
* Cấu trúc thẻ phải hợp lệ, chuẩn W3C, đóng mở thẻ đầy đủ, không lồng ghép sai chuẩn (vd: không lồng `<div>` bên trong `<p>` hay `<a>` lồng `<a>`).

### 3.2. CSS3:
* **Đặt tên theo phương pháp BEM (Block - Element - Modifier):**
  * `Block`: Tên khối giao diện độc lập (vd: `.ticket-card`, `.navbar`, `.event-list`, `.modal`).
  * `Element`: Thành phần con thuộc khối, nối bằng 2 dấu gạch dưới `__` (vd: `.ticket-card__thumb`, `.ticket-card__title`, `.navbar__link`).
  * `Modifier`: Biến thể kiểu dáng/trạng thái, nối bằng 2 dấu gạch ngang `--` (vd: `.ticket-card--highlight`, `.btn--primary`, `.modal--active`).
* **Tránh xung đột CSS giữa các trang:**
  * Gán ID đặc trưng cho `<body>` hoặc phần tử container chính của từng trang (vd: `<body id="page-event-detail">`).
  * CSS đặc thù của trang đó bắt đầu bằng ID cha: `#page-event-detail .event-banner { ... }`.
* **Layout hiện đại:** Sử dụng thành thạo **Flexbox** và **CSS Grid**. Không dùng `float` để chia cột layout chính.
* **Responsive Web Design:**
  * Bắt buộc có thẻ `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  * Viết media queries tường minh cho ít nhất 3 breakpoint chính:
    * Mobile: `max-width: 767px`
    * Tablet: `min-width: 768px` và `max-width: 1023px`
    * Desktop: `min-width: 1024px` trở lên.
  * Đảm bảo không bị vỡ giao diện hay xuất hiện thanh cuộn ngang ngoài ý muốn (`overflow-x: hidden` nếu cần).

### 3.3. JavaScript (ES6+ Vanilla JS):
* **Chuẩn đặt tên:** Dùng `camelCase` cho biến, hàm (`handleSearch()`, `ticketPrice`, `eventList`); dùng `PascalCase` cho Class/Constructor (`class SlideShow { ... }`).
* **Phân chia hàm và chức năng rõ ràng (Single Responsibility):**
  * Mỗi hàm chỉ thực hiện **DUY NHẤT một nhiệm vụ cụ thể** (vd: `fetchEvents()`, `renderEventList()`, `validateEmail()`, `openModal()`).
  * Tuyệt đối không viết dồn nhiều luồng logic phức tạp vào một hàm khổng lồ khó đọc.
  * Tách biệt rõ ràng: Hàm xử lý dữ liệu (Data/Logic), Hàm tương tác giao diện (DOM/Render), và Hàm xử lý sự kiện (Event Handler).
* **BẮT BUỘC CHÚ THÍCH (COMMENT) CHO TỪNG HÀM VÀ KHỐI CHỨC NĂNG:**
  * Giảng viên yêu cầu tiêu chí **Chất lượng code (30%)** phải có comment giải thích rõ ràng.
  * **Mọi hàm đều phải có Block Comment (JSDoc format)** mô tả:
    1. Mục đích / chức năng của hàm.
    2. Các tham số đầu vào (`@param {kiểu_dữ_liệu} tên_biến - Mô tả`).
    3. Giá trị trả về (`@return {kiểu_dữ_liệu} - Mô tả`).
  * **Inline comments:** Chú thích các dòng logic điều kiện, xử lý chuỗi, regex hoặc thuật toán quan trọng bên trong hàm.
  * *Ví dụ mẫu comment chuẩn:*
    ```javascript
    /**
     * Kiểm tra tính hợp lệ của địa chỉ email
     * @param {string} email - Chuỗi email cần kiểm tra
     * @returns {boolean} True nếu email hợp lệ, ngược lại False
     */
    function isValidEmail(email) {
      // Biểu thức chính quy kiểm tra định dạng email tiêu chuẩn
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    }

    /**
     * Lọc danh sách sự kiện theo danh mục và từ khóa
     * @param {Array<Object>} events - Danh sách toàn bộ sự kiện
     * @param {string} category - Danh mục cần lọc (all/music/sports)
     * @param {string} keyword - Từ khóa tìm kiếm
     * @returns {Array<Object>} Danh sách sự kiện sau khi lọc
     */
    function filterEvents(events, category, keyword) {
      // 1. Chuẩn hóa từ khóa tìm kiếm
      const cleanKeyword = keyword.toLowerCase().trim();

      // 2. Lọc theo cả danh mục và từ khóa tên sự kiện
      return events.filter(event => {
        const matchesCategory = (category === 'all' || event.category === category);
        const matchesKeyword = event.title.toLowerCase().includes(cleanKeyword);
        return matchesCategory && matchesKeyword;
      });
    }
    ```
* **Tư duy Component / Module hóa:**
  * Viết code tái sử dụng được (vd: class `SlideShow` có thể nhận tham số selector để tái sử dụng cho nhiều vị trí).
  * Modal Box: Dùng cơ chế `data-id` và trigger `js-modal-open` / `js-modal-close` để mở/đóng popup linh hoạt.
* **Lifecycle & Hiệu năng DOM:**
  * Dùng `document.addEventListener('DOMContentLoaded', ...)` để khởi tạo các thao tác tương tác giao diện ngay khi DOM sẵn sàng.
  * Chỉ dùng `window.addEventListener('load', ...)` cho các tác vụ phụ thuộc vào việc toàn bộ ảnh/tài nguyên nặng đã tải xong.
* **Form Validation:**
  * Bắt buộc validate dữ liệu người dùng (kiểm tra rỗng, đúng định dạng email regex, độ dài mật khẩu tối thiểu 6-8 ký tự, mật khẩu nhập lại khớp nhau).
  * Hiển thị thông báo lỗi rõ ràng trực tiếp trên giao diện form (không dùng alert thô sơ).
* **Quản lý dữ liệu:**
  * Sử dụng `localStorage` hoặc `sessionStorage` để lưu trạng thái phiên (đăng nhập giả lập, lưu giỏ hàng, vé đã đặt, bài viết yêu thích).
* **Console sạch sẽ:** Không để phát sinh lỗi đỏ runtime (unhandled errors) trong Developer Tools Console. Xóa bớt `console.log` thừa trước khi xuất bản.

---

## 4. CHECKLIST KIỂM THỬ & TỐI ƯU HÓA (ĐỂ ĐẠT ĐIỂM TỐI ĐA)

1. **Kiểm tra chuẩn W3C HTML/CSS:**
   * Kiểm thử qua `https://validator.w3.org/` (HTML) và `https://jigsaw.w3.org/css-validator/` (CSS). Sửa triệt để các cảnh báo lỗi cú pháp.
2. **Kiểm tra Google Lighthouse (Audit):**
   * **Performance:** Tối ưu kích thước hình ảnh, nén ảnh định dạng WebP/SVG, dùng `loading="lazy"`. Tối ưu LCP, FCP, CLS.
   * **Accessibility:** Độ tương phản màu (contrast ratio), đầy đủ nhãn `aria-label` cho các nút icon, thuộc tính `alt` cho ảnh.
   * **Best Practices:** Không dùng API lỗi thời, đảm bảo liên kết ngoài có `rel="noopener noreferrer"`.
   * **SEO:** Có đủ thẻ `<title>`, `<meta name="description">`, phân cấp thẻ H rõ ràng, có favicon.
3. **Deploy kiểm thử online:**
   * Luôn kiểm tra website hoạt động ổn định trên đường dẫn thật (Netlify hoặc GitHub Pages).
   * Đảm bảo các đường dẫn tĩnh (ảnh, link href, script src) sử dụng relative path hợp lý, không bị lỗi 404 khi deploy lên subpath.

---

## 5. HỒ SƠ BÀN GIAO ĐỒ ÁN (DELIVERABLES)

Khi hoàn thiện đồ án, sinh viên cần chuẩn bị đầy đủ bộ hồ sơ sau:
1. **GitHub Repository:** Public repo, commit đều đặn phản ánh quá trình làm việc của cả nhóm, README.md chi tiết.
2. **Workspace quản lý nhóm:** Trello hoặc Notion bảng Kanban hiển thị rõ sự phân công công việc.
3. **Website Deploy Link:** Chạy trực tiếp trên Netlify / GitHub Pages.
4. **Video demo (YouTube Unlisted):** Video quay rõ các thành viên, trình bày luồng giao diện và demo từng chức năng.
5. **Báo cáo đồ án (File Word/PDF, 15 - 40 trang):** Bố cục theo mẫu chuẩn khoa: Giới thiệu đề tài, Wireframe/Mockup Figma, Cấu trúc mã nguồn, Triển khai chi tiết từng component/trang, Kiểm thử W3C & Lighthouse, Tổng kết & Hạn chế.
6. **Slide thuyết trình:** Thời lượng 10-15 phút, trình bày trước lớp kèm demo trực tiếp.
