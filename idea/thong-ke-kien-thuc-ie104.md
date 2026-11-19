# Thống kê Toàn diện Kiến thức Môn IE104 — Áp dụng cho Đồ án UIT Discovery

**Môn học:** IE104 – Internet và Công nghệ Web (UIT)  
**Giảng viên biên soạn học liệu:** ThS. Võ Tấn Khoa  
**Dự án đối chiếu áp dụng:** Website tĩnh **UIT Discovery** (`index.html`, `topics/`, `topics/detail/`, `lecturers/`, `lecturers/detail/`, `assets/css/*.css`, `assets/js/*.js`, `data/*.json`)  
**Trạng thái mã nguồn dự án:** Chỉ lập tài liệu tham chiếu; **không** thay đổi code, dữ liệu JSON hay cấu trúc website.

---

## 1. Hướng dẫn Đọc & Phạm vi Nguồn đã Xử lý

### 1.1. Quy ước đọc tài liệu & bảng tổng hợp
- **Bố cục bảng chính (đúng 5 cột):**
  1. `Phân loại`: Chỉ dùng đúng 3 nhãn `HTML`, `CSS`, `JS` và sắp xếp tuần tự `HTML` (`91` mục) → `CSS` (`90` mục) → `JS` (`75` mục), đi đúng theo trình tự bài giảng và bài thực hành Lab trong mỗi phần.
  2. `Kiến thức/kỹ thuật`: Từng phần tử, thuộc tính, bộ chọn, cơ chế bố cục, API hoặc khái niệm cụ thể (có neo `<a id="row-..."></a>` để liên kết 2 chiều với Phụ lục Code mẫu).
  3. `Ý nghĩa và cách áp dụng vào đồ án`: Tách bạch rõ **`Nội dung tài liệu`** (kiến thức giảng viên trình bày) với **`Áp dụng UIT Discovery`** (đối chiếu cách dùng trong 5 trang dự án, lý do không phù hợp, hoặc cảnh báo `[BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104]` đối với Framework/Thư viện/Template/Float chia layout).
  4. `Code mẫu từ bài giảng`: Mã ngắn `1` dòng đặt trực tiếp bằng inline code; mã dài/nhiều dòng gắn liên kết tham chiếu xuống mục [4. Phụ lục Code Mẫu](#phu-luc-code-mau) theo mã `CODE-HTML-*` / `CODE-CSS-*` / `CODE-JS-*` kèm liên kết quay lại đúng hàng trong bảng; mục không có code ví dụ trong giáo trình/lab ghi chính xác **`Không có mẫu trong tài liệu`**. Toàn bộ cú pháp gốc (kể cả lỗi đánh máy hoặc ví dụ cố ý sai trong slide/lab) đều được **giữ nguyên bản** kèm chú thích riêng.
  5. `Nguồn bài giảng`: Ghi chính xác đường dẫn tương đối bên trong `source - tài liệu học/`, **trang PDF** (đếm 1-based theo file PDF), kèm **số slide in ở góc trang** nếu khác trang PDF; mã thực hành ghi rõ đường dẫn tệp và khoảng dòng (`dòng X–Y`).

### 1.2. Phạm vi kiểm kê & đối chiếu tài nguyên trong `source - tài liệu học/`
- **Tổng số tệp PDF đã rà soát:** **`57/57` PDF** (`660` trang tổng cộng; **`613` trang duy nhất** đã được trích xuất văn bản lẫn kết xuất hình ảnh trực quan để đọc mọi đoạn code/sơ đồ nằm trong ảnh slide).
- **Tổng số tệp thực hành trong `LABs/`:** **`14/14` tệp mã nguồn & vector** (`6` HTML, `5` CSS, `2` JS, `1` SVG) và **`26/26` tệp hình ảnh tài nguyên** (`LABs/02`, `04`, `06`, `08`, `10`).
- **Metadata hệ điều hành đã loại trừ (`39` mục):** Toàn bộ thư mục/tệp `__MACOSX/`, `._*` và `.DS_Store` trong `02_LAB 1_Lab1-2-start`, `08_LAB 4_Lab4-1-start`, `10_LAB 5_Lab5-2-start` đều bị bỏ qua, không tính vào tài liệu học.
- **Đối chiếu 6 cặp PDF Lab giữa `slides_drive/` và `LABs/` (`47` trang trùng):** Kiểm tra băm MD5 và đối chiếu text từng trang xác nhận cả 6 cặp giống nhau 100%, đã gộp nội dung trùng và luôn trích dẫn đồng thời cả 2 đường dẫn nguồn:

| Đường dẫn trong `slides_drive/` | Đường dẫn trong `LABs/` | Kết quả đối chiếu MD5 & nội dung từng trang |
|---|---|---|
| `slides_drive/12_LAB 1.pdf` | `LABs/01_LAB 1_BT1.1.2.pdf` | Trùng MD5 100% (`c467106c...`) — đã gộp nguồn |
| `slides_drive/21_LAB 2.pdf` | `LABs/03_LAB 2_BT2.1.2.pdf` | Trùng MD5 100% (`d1675ede...`) — đã gộp nguồn |
| `slides_drive/29_IE104 _ LAB 3.pdf` | `LABs/05_LAB 3_BT3.1.2.pdf` | Trùng MD5 100% (`b31e3333...`) — đã gộp nguồn |
| `slides_drive/33_IE104 _ LAB 4.pdf` | `LABs/07_LAB 4_BT4.1.2.pdf` | Trùng MD5 100% (`79cf5a5c...`) — đã gộp nguồn |
| `slides_drive/43_IE104 _ LAB 5.pdf` | `LABs/09_LAB 5_BT5.1.2.pdf` | Trùng MD5 100% (`2c3ae286...`) — đã gộp nguồn |
| `slides_drive/51_IE104 _ LAB 6.pdf` | `LABs/11_LAB 6_BT6.1.2.pdf` | Trùng MD5 100% (`a52c8f36...`) — đã gộp nguồn |

---

## 2. Tóm tắt Giới thiệu Môn học, Quy định & Kiến thức Nền tảng Khác

*(Phần này tổng hợp toàn bộ nội dung ngoài HTML/CSS/JS từ 6 tệp đầu tiên trong `slides_drive/`, kèm trích dẫn trang PDF và số slide thực tế để đối chiếu với định hướng đồ án IE104.)*

### 2.1. Giới thiệu môn học, Đánh giá & Quy định (`slides_drive/01_GIỚI THIỆU MÔN HỌC.pdf`)

| Nội dung | Tóm tắt theo bài giảng | Áp dụng & Ranh giới Đồ án UIT Discovery | Nguồn |
|---|---|---|---|
| **Mục tiêu học phần** | Chia thành 2 mảng: **(1) Internet** (hệ thống mạng Internet và các vấn đề liên quan) và **(2) Công nghệ Web** (HTML, CSS, JavaScript cùng hệ sinh thái mở rộng như Bootstrap, Nodejs, React). | Đồ án UIT Discovery sử dụng mảng **HTML5, CSS3, JavaScript thuần**; các công nghệ mở rộng (Bootstrap, Node.js, React) phục vụ nhận thức tổng quan nhưng **bị cấm** trong phạm vi đồ án IE104. | `slides_drive/01_GIỚI THIỆU MÔN HỌC.pdf` (tr. 4, slide 4) |
| **Chương trình 4 chương** | Lộ trình 4 chương: **Chương 1: Tổng quan** → **Chương 2: Ngôn ngữ HTML** → **Chương 3: Ngôn ngữ CSS** → **Chương 4: Ngôn ngữ Javascript**. | Lưu ý quy ước đánh số file PDF trên Drive: bài giảng tách mục 1.x–11.x (slide bìa `22_5.1` ghi *"CHƯƠNG 3: Ngôn ngữ CSS"*, còn slide bìa `49_11.1` ghi *"Chương 5"* cho phần Framework). | `slides_drive/01_GIỚI THIỆU MÔN HỌC.pdf` (tr. 5, slide 5) |
| **Đánh giá học phần** | **Quá trình (20%):** Bài tập nhóm · **Thực hành (30%):** Bài tập cá nhân · **Đồ án (50%):** Thuyết trình và demo. | UIT Discovery chiếm tỷ trọng lớn (50%) gắn với quy chuẩn **30% Chất lượng code** (tách hàm đơn nhiệm, JSDoc + inline comments), SEO/Lighthouse/W3C Validator và demo trực tiếp trên 5 màn hình. | `slides_drive/01_GIỚI THIỆU MÔN HỌC.pdf` (tr. 6, slide 6) |
| **Quy định lớp học** | Đi học đúng giờ, không làm việc riêng; sử dụng laptop làm bài tập trên lớp; ngồi theo nhóm để thảo luận và làm bài tập nhóm. | Tổ chức làm việc nhóm trên GitHub (`CONTRIBUTING.md`, phân công Job 1 / Job 2 giữa Nhóm trưởng và TV1–TV3 qua fork & PR). | `slides_drive/01_GIỚI THIỆU MÔN HỌC.pdf` (tr. 7, slide 7) |

### 2.2. Kiến thức Nền tảng Internet, Mạng & Công nghệ Web (Chương 1: `02_1.1` → `06_1.5`)

1. **Khái niệm Internet, DNS, ARPANET, Intranet & Extranet (`slides_drive/02_1.1 Internet _ Intranet _ Extranet.pdf` tr. 3–11, slide 3–11; lặp bảng trang 1 `03_1.2`):**
   - **Internet & DNS (`tr. 4–5, slide 4–5`):** Internet là "mạng của các mạng"; mỗi máy chủ định danh bằng **địa chỉ IP** duy nhất toàn cầu; **DNS (Domain Name Server)** phân giải tên miền (ví dụ `https://www.turnonvpn.org/`) sang địa chỉ IP cụ thể (sơ đồ 4 bước slide 5: Request URL → DNS trả IP `198.61.190.243` → Gửi HTTP request → Nhận HTTP response).
   - **Lịch sử & Đặc điểm Internet (`tr. 7–8, slide 7–8`):** Khởi nguồn từ **ARPANET (1969, Bộ Quốc phòng Hoa Kỳ)** đến **1972** lan rộng toàn cầu (TCP/IP, DNS, WWW, trình duyệt, Script...); vận hành theo giao thức TCP/IP với địa chỉ IP duy nhất trên phạm vi toàn cầu.
   - **Intranet & Extranet (`tr. 9–11, slide 9–11` & lặp tại `slides_drive/03_1.2 Mô hình OSI _ TCP_IP.pdf` tr. 1, slide 11):** **Intranet** là mạng riêng nội bộ tổ chức dùng tường lửa và địa chỉ IP riêng, không truy cập từ ngoài; **Extranet** là phần mở rộng có kiểm soát của Intranet dựa trên TCP/IP cho phép đối tác/khách hàng được ủy quyền truy cập giới hạn. *(Trong đồ án UIT Discovery: website triển khai công khai tĩnh qua GitHub Pages/Netlify trên Internet, không phụ thuộc Intranet trường).*
2. **Mô hình tham chiếu OSI (7 tầng) & TCP/IP (4 tầng) (`slides_drive/03_1.2 Mô hình OSI _ TCP_IP.pdf` tr. 2–4, slide 12–14):**
   - **Mô hình OSI (`tr. 2–3, slide 12–13`):** Mô hình tham chiếu giả định gồm **7 tầng**: Physical (1) → Data link (2) → Network (3) → Transport (4) → Session (5) → Presentation (6) → Application (7), minh họa cả các nút trung gian chỉ xử lý 3 tầng dưới và giao tiếp ngang hàng (peer-to-peer protocol) ở các tầng trên.
   - **Mô hình TCP/IP (`tr. 2, 4, slide 12, 14`):** Mô hình thực tế của Internet gồm **4 tầng**: *Host to network* (gộp Physical + Data link của OSI) → *Internet* → *Transport* → *Application*. *(Liên hệ đồ án: UIT Discovery hoạt động ở tầng Application thông qua HTTP/HTTPS của trình duyệt).*
3. **Địa chỉ IP, Dịch vụ Internet, ISP, Kết nối & Giao thức TCP/IP (`slides_drive/04_1.3 Kiến thức cơ bản về Internet.pdf` tr. 1–8, slide 15–22):**
   - **Hệ thống tên miền & Địa chỉ IP (`tr. 1–2, slide 15–16`):** DNS phân cấp + CSDL phân tán; IPv4 dài **32 bit (4 byte)** gồm phần mạng và phần máy chủ, mỗi byte giá trị `0–255` cách nhau dấu chấm (ví dụ `137.170.4.124`). *Lưu ý nguồn:* Hình laptop minh họa ở tr. 1 (slide 15) hiển thị chuỗi `"Your IP address: 77.872.67.54"` (octet `872 > 255` mang tính minh họa đồ họa).
   - **4 Dịch vụ Internet (`tr. 3, slide 17`):** Communication Services, Information retrieval service, Web Services, World Wide Web (sơ đồ cây).
   - **ISP & Hình thức kết nối (`tr. 4–6, slide 18–20`):** ISP cung cấp truy cập Internet, đăng ký tên miền, quay số, kênh thuê riêng. *Lưu ý nguồn:* văn bản tr. 5 (slide 19) ghi *"sáu loại"* nhưng sơ đồ vẽ 5 nhóm (*Access Providers, Mailbox Providers, Hosting ISPs, Virtual ISPs, Free ISPs*). Các kết nối khả dụng gồm: Quay số, ISDN, DSL, Truyền hình cáp, Vệ tinh, Không dây.
   - **Giao thức TCP vs IP (`tr. 7–8, slide 21–22`):** **TCP** ở lớp truyền tải là giao thức hướng kết nối, đáng tin cậy, sắp xếp thứ tự byte theo ACK và truyền lại gói mất; **IP** là giao thức không kết nối, không đáng tin cậy (sơ đồ cấu trúc IPv4 Header 32-bit ở tr. 8 / slide 22 gồm `VER`, `HLEN`, `Total length`, `TTL`, `Protocol`, `Source/Destination IP`...), cần ghép với TCP để truyền dữ liệu chuẩn xác.
4. **Cộng tác, Bảo mật & Quyền riêng tư trên Internet (`slides_drive/05_1.4 Cộng tác _ Bảo mật _ Quyền riêng tư.pdf` tr. 1–13, slide 23–35):**
   - **4 kênh cộng tác (`tr. 1–8, slide 23–30`):** *Mailing List* (4 loại: phản hồi, tổng hợp, thông báo, thảo luận; máy chủ `@listserver.com`), *Usenet Newsgroup* (nhóm tin phân cấp theo chủ đề như cây `Comp`; bảng so sánh 6 tiêu chí với Mailing List ở tr. 6 / slide 28), *Online Education* (Đào tạo trực tuyến, Hội thảo trực tuyến, Hội thảo trên web/webinar), và *Social Networking* (5 lĩnh vực phổ biến: tiếp thị trực tuyến, việc làm trực tuyến, tin tức trực tuyến, trò chuyện, chia sẻ hình ảnh/âm thanh/video). *(UIT Discovery hiện hiển thị email dạng văn bản theo quyết định nhóm trưởng; không có thao tác gửi email hoặc hệ thống thảo luận).*
   - **Bảo mật, Mã hóa, Chữ ký số & Tường lửa (`tr. 9–13, slide 31–35`):** **IPSec** (bảo mật cấp độ mạng/gói IP) và **SSL** (bảo mật lớp truyền tải — riêng tư, toàn vẹn, xác thực); **Mã hóa khóa đối xứng** (cùng 1 Symmetric Key) vs **Mã hóa khóa công khai** (Public Key mã hóa, Private Key giải mã); **Chữ ký số** (băm Hash + mã hóa bằng Private Key người ký, kiểm chứng bằng Public Key và so khớp Hash); **Tường lửa (Firewall)** lọc lưu lượng hai chiều giữa LAN và Internet. *(UIT Discovery là website tĩnh công khai không đăng nhập, không xử lý mật khẩu hay gửi form backend; khi deploy trên GitHub Pages/Netlify dùng HTTPS thay SSL cổ điển).*
5. **Tổng quan Công nghệ Web (`slides_drive/06_1.5 Công nghệ Web.pdf` tr. 1–12, slide 36–47):**
   - **8 nhóm công cụ phát triển cơ bản (`tr. 2, slide 37`):** Máy tính, Trình soạn thảo văn bản, Trình duyệt web, Trình chỉnh sửa đồ họa, Hệ thống kiểm soát phiên bản (Git), Chương trình FTP, Hệ thống tự động hóa, Thư viện/Frameworks *(bỏ qua phần thư viện/frameworks khi code đồ án IE104 theo ràng buộc Vanilla)*.
   - **Mô hình 3 công nghệ lõi HTML – CSS – JS (`tr. 3–9, slide 38–44`):** HTML tạo cấu trúc siêu văn bản (bộ khung `<!DOCTYPE html>...</html>` ở tr. 3/slide 38, giải phẫu tag/attribute ở tr. 4–5/slide 39–40); CSS tạo kiểu chọn lọc (giải phẫu Selector/Declaration `p { color: red; ... }` ở tr. 6–7/slide 41–42); JS bổ sung tương tác qua API tích hợp trình duyệt, API bên thứ ba và Frameworks/thư viện (ví dụ `<script> if(age > 19)...` ở tr. 8/slide 43). *(Mọi kỹ thuật cụ thể của HTML/CSS/JS được phân rã chi tiết trong Bảng mục 3 dưới đây).*
   - **Xuất bản Website & Client–Server (`tr. 10–11, slide 45–46`):** 3 kênh xuất bản cho người mới (*Dịch vụ lưu trữ & tên miền*, *GitHub hoặc Google App Engine*, *IDE web như CodePen*); cơ chế tương tác **Client ↔ Server** thông qua cặp `requests` / `responses`. *(UIT Discovery bắt buộc chạy qua HTTP Server / Live Server chứ không mở trực tiếp `file://` để `ES Modules` và `fetch()` JSON nhận HTTP response hợp lệ).*
---

## 3. Bảng Thống kê Chi tiết Kiến thức HTML / CSS / JS (`256` mục)

> Phân bổ: **`91` mục `HTML`** · **`90` mục `CSS`** · **`75` mục `JS`** (gồm `12` mẫu code inline, `196` mẫu code ở [Phụ lục Code Mẫu](#phu-luc-code-mau) và `48` mục `Không có mẫu trong tài liệu`).

| Phân loại | Kiến thức/kỹ thuật | Ý nghĩa và cách áp dụng vào đồ án | Code mẫu từ bài giảng | Nguồn bài giảng |
|---|---|---|---|---|
| HTML | <a id="row-html-01"></a> **Tổng quan HTML và 3 chức năng cơ bản** | **Nội dung tài liệu:** HTML là ngôn ngữ đánh dấu tạo thành từ các phần tử (elements), có 3 chức năng cơ bản: (1) cung cấp ý nghĩa khác nhau trong một tài liệu, (2) cấu trúc tài liệu thành các phần hợp lý, và (3) nhúng nội dung như hình ảnh và video vào trang web.<br>**Áp dụng UIT Discovery:** Định hướng toàn bộ 5 trang tĩnh của UIT Discovery (index.html, topics/index.html, topics/detail/index.html, lecturers/index.html, lecturers/detail/index.html): tách bạch hoàn toàn cấu trúc ngữ nghĩa HTML5 khỏi CSS trình bày và JS tương tác theo quy chuẩn 100% Vanilla IE104. | [Xem CODE-HTML-01](#code-html-01) | `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 4–5) |
| HTML | <a id="row-html-02"></a> **Cấu trúc phần tử HTML (Opening tag, Content, Closing tag)** | **Nội dung tài liệu:** HTML bao gồm các phần tử dùng để bao bọc/đánh dấu nội dung nhằm hiển thị hoặc hoạt động theo cách xác định. Một phần tử tiêu chuẩn gồm 3 thành phần: thẻ mở (opening tag - tên phần tử trong dấu ngoặc nhọn), nội dung (content), và thẻ đóng (closing tag - có dấu gạch chéo / trước tên phần tử).<br>**Áp dụng UIT Discovery:** Mọi thành phần HTML trên 5 trang UIT Discovery (như tiêu đề, đoạn văn bản, liên kết, nút bấm) phải tuân thủ đóng mở thẻ đầy đủ để vượt qua W3C HTML Validator theo checklist đồ án. | `<p>My cat is very grumpy</p>` | `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 8–9) |
| HTML | <a id="row-html-03"></a> **Lồng phần tử HTML (Nesting elements) hợp lệ và lỗi chồng chéo thẻ** | **Nội dung tài liệu:** Các phần tử HTML có thể đặt bên trong phần tử khác (nesting). Các thẻ phải mở và đóng theo nguyên tắc lồng nhau đúng thứ tự (vào sau ra trước); nếu lồng chồng chéo sai, trình duyệt phải tự đoán ý định dẫn tới kết quả hiển thị không mong muốn.<br>**Áp dụng UIT Discovery:** Áp dụng bắt buộc trên toàn bộ HTML tĩnh và DOM sinh động bằng JS (createTopicRow, createLecturerCard, mindmap-drawer) của UIT Discovery: ví dụ không được lồng `<a>` bên trong `<a>` hoặc lồng `<div>` trong `<p>`; hiện dự án đã tách riêng `<a>` chủ đề và `<a>` giảng viên trong `<article class="topic-row">`. | [Xem CODE-HTML-02](#code-html-02) | `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 10–11) |
| HTML | <a id="row-html-04"></a> **Phần tử cấp khối (Block-level) và phần tử nội tuyến (Inline)** | **Nội dung tài liệu:** Phần tử cấp khối (block-level) tạo thành một khối hiển thị riêng và xuống dòng trên trang, thường là các phần tử cấu trúc (như `<p>`). Phần tử nội tuyến (inline) nằm bên trong phần tử cấp khối, chỉ bao quanh phần nhỏ nội dung và hiển thị nối tiếp trên cùng hàng (như `<em>`).<br>**Áp dụng UIT Discovery:** Giúp phân định đúng cấu trúc HTML của UIT Discovery: dùng phần tử khối (`<section>`, `<article>`, `<p>`, `<h1>`–`<h3>`) cho bố cục và khối nội dung, dùng phần tử nội tuyến (`<a class="btn">`, `<span class="badge">`, `<span class="home__highlight">`) bên trong các khối mà không lồng khối vào nội tuyến. | [Xem CODE-HTML-03](#code-html-03) | `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 12–13) |
| HTML | <a id="row-html-05"></a> **Phần tử trống (Empty / Void elements)** | **Nội dung tài liệu:** Một số phần tử HTML không tuân theo mô hình thẻ mở - nội dung - thẻ đóng mà chỉ gồm một thẻ đơn duy nhất, thường dùng để chèn hoặc nhúng nội dung/siêu dữ liệu vào tài liệu (ví dụ `<img>`).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng đúng chuẩn các phần tử trống trong HTML5: `<meta>`, `<link>`, `<img>`, `<input>`, `<br>` mà không thêm thẻ đóng rời. (Trong HTML5 của dự án hiện viết dạng self-closing '/>' do formatter Prettier; đều hợp lệ W3C nhưng không có thẻ đóng riêng như '`</img>`'). | [Xem CODE-HTML-04](#code-html-04) | `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 14–15) |
| HTML | <a id="row-html-06"></a> **Thuộc tính HTML (Attributes) và quy tắc cú pháp** | **Nội dung tài liệu:** Thuộc tính cung cấp thông tin bổ sung về phần tử mà không xuất hiện trực tiếp trong nội dung hiển thị. Một thuộc tính gồm khoảng trắng ngăn cách với tên phần tử (hoặc với thuộc tính khác), tên thuộc tính, dấu '=', và giá trị thuộc tính đặt trong cặp dấu ngoặc.<br>**Áp dụng UIT Discovery:** Áp dụng cho toàn bộ thuộc tính định danh, class BEM, liên kết và accessibility trên UIT Discovery như class="site-header", id="main-content", href="...", title="...", aria-label="...", data-domain-tone="...". | [Xem CODE-HTML-05](#code-html-05) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 1–2; slide 16–17) |
| HTML | <a id="row-html-07"></a> **Thuộc tính Boolean (Boolean attributes)** | **Nội dung tài liệu:** Các thuộc tính được viết không cần giá trị; sự hiện diện của thuộc tính đại diện cho giá trị bật (thường trùng tên thuộc tính), ví dụ thuộc tính disabled ngăn người dùng nhập liệu vào `<input>`.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng rộng rãi thuộc tính Boolean: disabled trên nút phân trang đầu/cuối trong topics.js và lecturers.js; hidden trên .theme-toggle, #home-stats, #reset-filters, #topics-empty, #topic-pagination, #cards-viewport, #mindmap-drawer, #lecturers-reset, #lecturers-empty, #lecturers-pagination. | [Xem CODE-HTML-06](#code-html-06) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 3; slide 18) |
| HTML | <a id="row-html-08"></a> **Dấu ngoặc kép, dấu ngoặc đơn và bỏ ngoặc quanh giá trị thuộc tính** | **Nội dung tài liệu:** HTML cho phép bỏ dấu ngoặc ở vài trường hợp đơn giản nhưng rất dễ làm vỡ đánh dấu khi giá trị có khoảng trắng (ví dụ title=The Mozilla homepage chỉ nhận 'The'). Có thể dùng ngoặc kép hoặc ngoặc đơn nhất quán, và dùng thực thể HTML (như &apos;) nếu cần lồng dấu ngoặc cùng loại bên trong.<br>**Áp dụng UIT Discovery:** UIT Discovery chuẩn hóa dùng dấu ngoặc kép "..." cho 100% giá trị thuộc tính ở cả 5 trang HTML nhằm tránh lỗi phân tách giá trị và đảm bảo đồng nhất code style. | [Xem CODE-HTML-07](#code-html-07) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 4–6; slide 19–21) |
| HTML | <a id="row-html-09"></a> **Cấu trúc chuẩn một tài liệu HTML (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)** | **Nội dung tài liệu:** Tài liệu HTML hoàn chỉnh gồm: `<!DOCTYPE html>` (chuỗi ngắn nhất hợp lệ cho loại tài liệu HTML5), `<html></html>` bao bọc toàn trang, `<head></head>` chứa siêu dữ liệu và khai báo phụ trợ (`<meta charset="utf-8">`, `<title>`), và `<body></body>` chứa toàn bộ nội dung hiển thị.<br>**Áp dụng UIT Discovery:** Tất cả 5 trang HTML của UIT Discovery đều tuân thủ bộ khung `<!DOCTYPE html>` -> `<html lang="vi">` -> `<head>` -> `<body id="page-...">` (có gán ID trang trên `<body>` để scope CSS theo quy chuẩn IE104). | [Xem CODE-HTML-08](#code-html-08) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 7; slide 22) |
| HTML | <a id="row-html-10"></a> **Cơ chế rút gọn khoảng trắng (Whitespace collapsing) trong HTML** | **Nội dung tài liệu:** Trình phân tích cú pháp HTML sẽ rút gọn mọi chuỗi nhiều khoảng trắng hoặc ngắt dòng liên tiếp bên trong nội dung phần tử thành duy nhất một khoảng trắng khi hiển thị.<br>**Áp dụng UIT Discovery:** Cho phép định dạng code HTML của UIT Discovery thụt lề, xuống dòng thoáng mắt giữa các thẻ/thuộc tính (như trong index.html và các trang con) mà không làm sai khoảng cách chữ hiển thị trên trình duyệt. | [Xem CODE-HTML-09](#code-html-09) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 8; slide 23) |
| HTML | <a id="row-html-11"></a> **Ký tự đặc biệt và tham chiếu thực thể HTML (&lt;, &gt;, &quot;, &apos;, &amp;)** | **Nội dung tài liệu:** Các ký tự <, >, ", ', & là một phần cú pháp của HTML nên cần viết dưới dạng thực thể tham chiếu (&lt;, &gt;, &quot;, &apos;, &amp;) khi muốn hiển thị nguyên văn trong nội dung văn bản mà không bị trình duyệt hiểu nhầm là thẻ hay dấu phân cách.<br>**Áp dụng UIT Discovery:** Khi hiển thị tên đề tài hoặc dữ liệu từ JSON chứa ký tự đặc biệt lên DOM trong UIT Discovery, dự án gán qua textContent trong data.js thay vì innerHTML để trình duyệt tự escape an toàn (tránh lỗi hiển thị và XSS); dùng trực tiếp entity nếu viết văn bản chứa ký hiệu đặc biệt trong HTML tĩnh. | [Xem CODE-HTML-10](#code-html-10) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 9–10; slide 24–25) |
| HTML | <a id="row-html-12"></a> **Chú thích trong HTML (`<!-- ... -->`)** | **Nội dung tài liệu:** Chú thích trong HTML được đặt giữa hai dấu `<!--` và `-->` để trình duyệt bỏ qua, không hiển thị nội dung chú thích ra trang web.<br>**Áp dụng UIT Discovery:** Hỗ trợ chú thích phân tách các vùng layout lớn trong HTML khi cần bảo trì nhóm, tuy nhiên cần giữ mã nguồn HTML sản phẩm gọn gàng và tránh để lại thông tin nhạy cảm hoặc mã dead-code bị comment. | [Xem CODE-HTML-11](#code-html-11) | `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 11; slide 26) |
| HTML | <a id="row-html-13"></a> **Phần tử `<head>` và siêu dữ liệu tài liệu** | **Nội dung tài liệu:** Nội dung trong phần tử `<head>` không hiển thị trực tiếp trên vùng nhìn trang web như `<body>`, mà đảm nhiệm vai trò chứa siêu dữ liệu (metadata) mô tả tài liệu HTML và các liên kết tài nguyên ngoài.<br>**Áp dụng UIT Discovery:** Cả 5 trang của UIT Discovery đều tổ chức `<head>` thống nhất: meta charset, script theme.js chống FOUC, meta viewport, meta description, title riêng từng trang, favicon uit-logo.png, các stylesheet (reset.css, style.css, CSS riêng trang) và script module JS. | [Xem CODE-HTML-12](#code-html-12) | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 1–2; slide 27–28) |
| HTML | <a id="row-html-14"></a> **Phần tử `<title>` (tiêu đề tài liệu) so sánh với `<h1>`** | **Nội dung tài liệu:** `<title>` là siêu dữ liệu nằm trong `<head>` đại diện cho tiêu đề của toàn bộ tài liệu HTML (hiển thị trên tab trình duyệt/kết quả tìm kiếm, không thuộc nội dung trang), khác với `<h1>` là tiêu đề chính hiển thị bên trong `<body>`.<br>**Áp dụng UIT Discovery:** Cả 5 trang UIT Discovery đều có `<title>` độc lập dạng '&lt;Tên trang> \| UIT Discovery', đồng thời topics/detail/index.html và lecturers/detail/index.html còn cập nhật động document.title bằng tên chủ đề hoặc tên giảng viên trong JS để tối ưu UX và tab trình duyệt. | Không có mẫu trong tài liệu | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 3; slide 29) |
| HTML | <a id="row-html-15"></a> **Chỉ định mã hóa ký tự bằng `<meta charset="utf-8">`** | **Nội dung tài liệu:** Phần tử `<meta charset="utf-8">` khai báo bộ mã ký tự UTF-8 cho tài liệu HTML, giúp trình duyệt giải mã và hiển thị chính xác mọi bộ ký tự đa ngôn ngữ.<br>**Áp dụng UIT Discovery:** Bắt buộc đặt ở đầu `<head>` trên toàn bộ 5 trang UIT Discovery để hiển thị đúng tiếng Việt có dấu (trong HTML tĩnh lẫn nội dung nạp từ research-data.json và lecturers.json). | `<meta charset="utf-8">` | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 4; slide 30) |
| HTML | <a id="row-html-16"></a> **Siêu dữ liệu `<meta>` với thuộc tính name và content (description, author)** | **Nội dung tài liệu:** Nhiều phần tử `<meta>` sử dụng cặp thuộc tính name (chỉ loại siêu dữ liệu như description hoặc author) và content (nội dung siêu dữ liệu thực tế), phục vụ mô tả trang cho công cụ tìm kiếm (SEO snippet).<br>**Áp dụng UIT Discovery:** Cả 5 trang UIT Discovery đã khai báo đầy đủ `<meta name="description" content="...">` đạt chuẩn SEO Google Lighthouse; có thể bổ sung `<meta name="author" content="Nhóm thực hiện UIT Discovery">` nếu muốn tăng đầy đủ thông tin tài liệu. | [Xem CODE-HTML-13](#code-html-13) | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 5–6; slide 31–32) |
| HTML | <a id="row-html-17"></a> **Giao thức siêu dữ liệu Open Graph Data (`<meta property="og:...">`)** | **Nội dung tài liệu:** Open Graph Data (do Facebook phát triển) sử dụng các thẻ `<meta>` với thuộc tính property="og:image", "og:description", "og:title" và content để hiển thị bản xem trước phong phú (ảnh, tiêu đề, mô tả) khi chia sẻ liên kết trên mạng xã hội.<br>**Áp dụng UIT Discovery:** Hiện tại 5 trang của UIT Discovery chưa khai báo nhóm thẻ Open Graph. Nên bổ sung các thẻ og:title, og:description, og:type và og:image (trỏ tới ảnh banner/logo hợp lệ trên domain deploy) để tối ưu hiển thị khi chia sẻ link đồ án qua Facebook/Zalo. | [Xem CODE-HTML-14](#code-html-14) | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 7–8; slide 33–34) |
| HTML | <a id="row-html-18"></a> **Áp dụng CSS vào HTML bằng phần tử `<link rel="stylesheet">`** | **Nội dung tài liệu:** Phần tử `<link>` luôn đặt bên trong `<head>` với thuộc tính rel="stylesheet" và href trỏ tới tệp CSS để định kiểu giao diện cho tài liệu HTML.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng đúng kiến trúc CSS nhiều tầng qua `<link rel="stylesheet">`: luôn nạp reset.css -> style.css -> CSS riêng từng trang (topics.css, topic-detail.css, lecturers.css, lecturer-detail.css), kèm `<link rel="icon" href="...uit-logo.png">` cho favicon. | `<link rel="stylesheet" href="my-css-file.css">` | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 9; slide 35) |
| HTML | <a id="row-html-19"></a> **Nhúng JavaScript trong `<head>` bằng `<script src="..." defer>`** | **Nội dung tài liệu:** Phần tử `<script>` đặt trong `<head>` với thuộc tính src chứa đường dẫn tệp JS và thuộc tính defer để tải song song mà không chặn quá trình phân tích HTML, chỉ thực thi sau khi DOM được dựng xong.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `<script type="module" src="...">` trong `<head>` cho home.js, topics.js, topic-detail.js, lecturers.js, lecturer-detail.js (ES module tự động có hành vi tương đương defer), kết hợp lắng nghe DOMContentLoaded; riêng theme.js chạy đồng bộ không defer trong `<head>` để áp theme trước khi render tránh nháy sáng/tối. | `<script src="my-js-file.js" defer></script>` | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 9; slide 35) |
| HTML | <a id="row-html-20"></a> **Đặt ngôn ngữ chính của trang bằng thuộc tính `<html lang="...">`** | **Nội dung tài liệu:** Thêm thuộc tính lang vào thẻ mở `<html>` (ví dụ `<html lang="en-US">`) giúp xác định ngôn ngữ chính của tài liệu, hỗ trợ công cụ tìm kiếm lập chỉ mục hiệu quả hơn và hỗ trợ công nghệ trợ năng.<br>**Áp dụng UIT Discovery:** Cả 5 trang của UIT Discovery đều khai báo chính xác `<html lang="vi">`, chuẩn tiếng Việt cho trình đọc màn hình và SEO. | `<html lang="en-US">` | `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 10; slide 36) |
| HTML | <a id="row-html-21"></a> **Đoạn văn bản `<p>` và sáu cấp độ tiêu đề `<h1>`–`<h6>`** | **Nội dung tài liệu:** Mỗi đoạn văn bản nên được bao bọc trong một phần tử `<p>`. HTML cung cấp 6 phần tử tiêu đề phân cấp từ `<h1>` đến `<h6>` để tạo cấu trúc rõ ràng, giúp trải nghiệm đọc dễ dàng hơn.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng `<h1>` duy nhất mỗi trang, phân cấp xuống `<h2>`–`<h4>` ở các mục/thẻ bài/drawer (ví dụ h1#topic-title -> h2#roadmap-heading -> h3.mindmap-drawer__title -> h4.mindmap-drawer__label) và dùng `<p>` cho mô tả, hướng dẫn, trạng thái tải. | [Xem CODE-HTML-15](#code-html-15) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 1–2; slide 37–38) |
| HTML | <a id="row-html-22"></a> **Phân cấp cấu trúc tiêu đề (Heading hierarchy: `<h1>` → `<h2>` → `<h3>`)** | **Nội dung tài liệu:** Cần phân cấp tiêu đề hợp lý (`<h1>` tiêu đề chính, `<h2>` tiêu đề chương/mục lớn, `<h3>` mục con...) vì 3 lý do: (1) người dùng có xu hướng đọc lướt qua tiêu đề, (2) công cụ tìm kiếm coi nội dung tiêu đề là từ khóa quan trọng ảnh hưởng SEO, và (3) tạo điểm neo cấu trúc để CSS/JS thao tác hiệu quả.<br>**Áp dụng UIT Discovery:** Tuân thủ nghiêm ngặt quy chuẩn IE104 trên UIT Discovery: đúng 1 thẻ `<h1>` mỗi trang, không nhảy cấp tiêu đề (ví dụ trong createTopicRow dùng headingLevel=2 trên topics/index.html và headingLevel=3 khi lồng dưới h2 trong hồ sơ giảng viên để giữ đúng thứ tự h1 -> h2 -> h3). | [Xem CODE-HTML-16](#code-html-16) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 3–4; slide 39–40) |
| HTML | <a id="row-html-23"></a> **Danh sách không có thứ tự `<ul>` và mục `<li>`** | **Nội dung tài liệu:** Phần tử `<ul>` (unordered list) kết hợp với các phần tử con `<li>` đánh dấu danh sách các mục mà thứ tự sắp xếp không quan trọng.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `<ul>`/`<li>` cho thanh điều hướng chính .site-nav__list, danh sách hướng nghiên cứu .profile-areas trong lecturer-detail.js và danh sách kiến thức tiên quyết #drawer-prereqs trong topic-detail.html. | [Xem CODE-HTML-17](#code-html-17) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 5; slide 41) |
| HTML | <a id="row-html-24"></a> **Danh sách có thứ tự `<ol>` và mục `<li>`** | **Nội dung tài liệu:** Phần tử `<ol>` (ordered list) cùng các phần tử `<li>` dùng cho danh sách mà thứ tự các mục mang ý nghĩa quan trọng (ví dụ các bước chỉ đường hoặc quy trình).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng chính xác `<ol class="home__step-list">` trong index.html để trình bày 3 bước tuần tự của hành trình nghiên cứu (01 Chọn điều bạn quan tâm -> 02 Hiểu kiến thức cần có -> 03 Tìm người đồng hành). | [Xem CODE-HTML-18](#code-html-18) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 6; slide 42) |
| HTML | <a id="row-html-25"></a> **Danh sách lồng vào nhau (Nested lists)** | **Nội dung tài liệu:** HTML cho phép lồng một danh sách (`<ul>` hoặc `<ol>`) vào bên trong phần tử `<li>` của một danh sách khác để biểu diễn cấu trúc phân cấp nhiều tầng.<br>**Áp dụng UIT Discovery:** Phù hợp để biểu diễn cây kiến thức tiên quyết nhiều tầng (nếu cần hiển thị dạng danh sách phẳng theo cấu trúc cây) trong chế độ Danh sách (cards-viewport) của trang chi tiết chủ đề topics/detail/index.html. | [Xem CODE-HTML-19](#code-html-19) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 7; slide 43) |
| HTML | <a id="row-html-26"></a> **Định dạng văn bản ngữ nghĩa: nhấn mạnh `<em>` và quan trọng `<strong>`** | **Nội dung tài liệu:** Phần tử `<em>` (emphasis) dùng để nhấn mạnh ngữ nghĩa (mặc định hiển thị nghiêng), còn phần tử `<strong>` đánh dấu nội dung có mức độ quan trọng cao/khẩn cấp (mặc định in đậm).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, index.html sử dụng `<strong>` cho tiêu đề concept card (.home__concept) và có thể dùng `<strong>`/`<em>` cho cảnh báo hoặc từ khóa nhấn mạnh thay cho thẻ trình bày thuần túy `<b>`/`<i>`. | [Xem CODE-HTML-20](#code-html-20) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 8; slide 44) |
| HTML | <a id="row-html-27"></a> **Tạo siêu liên kết `<a>` với thuộc tính href và title** | **Nội dung tài liệu:** Siêu liên kết được tạo bằng phần tử `<a>` bao bọc văn bản hoặc nội dung khác, kết hợp thuộc tính href chứa địa chỉ web đích và thuộc tính title cung cấp thông tin bổ sung (tooltip).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `<a href="...">` kết nối xuyên suốt 5 trang (header brand, site-nav, CTA, breadcrumb, liên kết chủ đề, liên kết hồ sơ giảng viên, skip-link #main-content); tránh lạm dụng title thay thế cho văn bản hiển thị hoặc aria-label. | [Xem CODE-HTML-21](#code-html-21) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 9–10; slide 45–46) |
| HTML | <a id="row-html-28"></a> **URL và đường dẫn tương đối (Relative paths)** | **Nội dung tài liệu:** URL xác định vị trí tài nguyên trên Web thông qua đường dẫn. Đường dẫn tương đối cho phép điều hướng vào thư mục con (projects/index.html) hoặc lùi lên thư mục cha (../pdfs/project-brief.pdf) tính từ vị trí tài liệu hiện tại.<br>**Áp dụng UIT Discovery:** Rất quan trọng với UIT Discovery khi deploy lên subpath (GitHub Pages/Netlify): các file HTML cấp gốc dùng 'topics/index.html', thư mục cấp 1 dùng '../index.html', thư mục cấp 2 (topics/detail/, lecturers/detail/) dùng '../../index.html'; các module JS tính đường dẫn động từ projectRoot = new URL('../../', import.meta.url). | [Xem CODE-HTML-22](#code-html-22) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 11; slide 47) |
| HTML | <a id="row-html-29"></a> **Thực hành đặt văn bản liên kết rõ nghĩa (Descriptive link text)** | **Nội dung tài liệu:** Cần viết từ ngữ liên kết mô tả rõ hành động hoặc đích đến (ví dụ 'Download Firefox') thay vì cụm từ mơ hồ ('Click here') để người dùng đọc lướt và trình đọc màn hình hiểu ngay ý nghĩa liên kết.<br>**Áp dụng UIT Discovery:** UIT Discovery thực hành tốt nguyên tắc này: tên liên kết là tên đề tài đầy đủ, tên giảng viên, 'Khám phá chủ đề', 'Tìm giảng viên', 'Xem hồ sơ →' kèm aria-label="Xem hồ sơ chi tiết của &lt;tên giảng viên>" để tránh lặp ngữ nghĩa cho screen reader. | [Xem CODE-HTML-23](#code-html-23) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 12; slide 48) |
| HTML | <a id="row-html-30"></a> **Liên kết tới tài nguyên không phải HTML và thuộc tính target="_blank"** | **Nội dung tài liệu:** Khi liên kết đến tài nguyên không phải HTML (PDF, luồng video...) hoặc mở tab mới bằng target="_blank", cần ghi chú rõ định dạng, dung lượng hoặc hành vi mở tab mới ngay trong nội dung liên kết.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, hàm externalLink() ở data.js mở các hồ sơ nghiên cứu ngoài (Google Scholar, ORCID, nguồn thông tin) bằng target="_blank" VÀ bắt buộc bổ sung rel="noopener noreferrer" theo chuẩn bảo mật Lighthouse Best Practices (nhắc thêm điểm nâng cấp so với slide chỉ nêu target="_blank"). Không dùng nội dung yêu cầu Flash. | [Xem CODE-HTML-24](#code-html-24) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 13; slide 49) |
| HTML | <a id="row-html-31"></a> **Thuộc tính download trên liên kết `<a>`** | **Nội dung tài liệu:** Thuộc tính download trên thẻ `<a>` gợi ý trình duyệt tải tài nguyên liên kết về máy với tên tệp chỉ định thay vì mở điều hướng xem trực tiếp.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery chưa cung cấp tệp tải về (PDF đề cương/bộ dữ liệu); có thể áp dụng thuộc tính download (với tệp cùng nguồn same-origin) nếu sau này bổ sung tính năng tải lộ trình học tập hoặc tài liệu tham khảo. | [Xem CODE-HTML-25](#code-html-25) | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 14; slide 50) |
| HTML | <a id="row-html-32"></a> **Liên kết e-mail với lược đồ mailto:** | **Nội dung tài liệu:** Sử dụng phần tử `<a>` kết hợp lược đồ URL mailto: trong thuộc tính href để khi nhấp vào sẽ mở ứng dụng thư mặc định soạn email gửi tới địa chỉ chỉ định.<br>**Áp dụng UIT Discovery:** UIT Discovery đang dùng mailto: tại 3 vị trí: #topic-email-link trong topics/detail/index.html, email trên thẻ giảng viên trong lecturers.js và .profile-header__email trong lecturer-detail.js (đều qua normalizeEmail()). | `<a href="mailto:nowhere@mozilla.org">Send email to nowhere</a>` | `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 15; slide 51) |
| HTML | <a id="row-html-33"></a> **Phần tử ngữ nghĩa `<header>` (Đầu trang / Đầu khối)** | **Nội dung tài liệu:** Phần tử `<header>` đại diện cho phần đầu trang (hoặc phần đầu một khối nội dung): nằm ở trên cùng, thường chứa tiêu đề lớn, biểu trưng (logo), khẩu hiệu và có thể chứa thanh điều hướng.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng `<header class="site-header">` trên tất cả 5 trang để chứa thương hiệu/logo UIT Discovery, thanh điều hướng .site-nav và nút đổi giao diện sáng/tối; ngoài ra dùng `<header class="page-header">`, `<header class="topic-header">`, `<header class="roadmap-header">` và `<header class="profile-header">` ở đầu các phân vùng. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 1–3; slide 52–54) |
| HTML | <a id="row-html-34"></a> **Phần tử ngữ nghĩa `<nav>` (Thanh điều hướng)** | **Nội dung tài liệu:** Phần tử `<nav>` đánh dấu khu vực chứa các liên kết điều hướng đến các phần chính của trang web, thường được trình bày dưới dạng nút menu, liên kết hoặc tab.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `<nav class="site-nav" aria-label="Điều hướng chính">` (với aria-current="page" cho trang hiện hành) ở 4 trang con, `<nav class="breadcrumb" aria-label="Đường dẫn">` ở trang chi tiết, và `<nav id="topic-pagination">` / `<nav id="lecturers-pagination">` cho thanh phân trang. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 1–3; slide 52–54) |
| HTML | <a id="row-html-35"></a> **Phần tử ngữ nghĩa `<main>` (Nội dung chính của trang)** | **Nội dung tài liệu:** Phần tử `<main>` bao bọc khu vực trung tâm chứa phần lớn nội dung độc đáo, trọng tâm của một trang web, bên trong có thể chứa các phân vùng phụ và thanh bên (`<aside>`).<br>**Áp dụng UIT Discovery:** Cả 5 trang của UIT Discovery đều có đúng 1 thẻ `<main id="main-content">` là đích đến của liên kết bỏ qua (skip-link `<a class="skip-link" href="#main-content">`) và là vùng nội dung chính chứa các section/article.<br>*Ghi chú nguồn:* Slide 52–54 trình bày vai trò Main content và thẻ `<main>` bằng sơ đồ/liệt kê văn bản. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 1–3; slide 52–54) |
| HTML | <a id="row-html-36"></a> **Phần tử ngữ nghĩa `<article>` (Nội dung độc lập)** | **Nội dung tài liệu:** Phần tử `<article>` dùng để đại diện cho một phần nội dung độc lập, hoàn chỉnh trong khu vực nội dung chính (như một bài viết hoặc mục độc lập).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng `<article class="topic-row">` (data.js) cho từng mục đề tài, `<article class="lecturer-card">` (lecturers.js) cho từng thẻ giảng viên và `<article class="profile-card">` (lecturer-detail.js) cho toàn bộ hồ sơ giảng viên.<br>*Ghi chú nguồn:* Slide 54 chỉ nêu tên phần tử `<article>` trong nhóm thẻ đại diện phần phụ của main content. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 3; slide 54) |
| HTML | <a id="row-html-37"></a> **Phần tử ngữ nghĩa `<section>` (Phân vùng chủ đề)** | **Nội dung tài liệu:** Phần tử `<section>` dùng để nhóm các phần nội dung có liên quan theo chủ đề hoặc chức năng bên trong vùng nội dung chính của tài liệu.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng `<section>` rộng rãi kèm aria-labelledby/aria-label: .home__hero và .home__steps (trang chủ), .topics-search và danh sách kết quả (topics/index.html), .roadmap-section, #mindmap-viewport và các .mindmap-drawer__section (topics/detail/index.html), #lecturers-list (lecturers/index.html), .profile-section (lecturers/detail/index.html).<br>*Ghi chú nguồn:* Slide 54 chỉ nêu tên phần tử `<section>` trong nhóm thẻ phân vùng nội dung. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 3; slide 54) |
| HTML | <a id="row-html-38"></a> **Phần tử vùng chứa phi ngữ nghĩa `<div>`** | **Nội dung tài liệu:** Phần tử `<div>` đại diện cho một vùng chứa chung không mang ý nghĩa ngữ nghĩa riêng, dùng khi cần gom nhóm phần tử cho mục đích trình bày CSS hoặc thao tác bố cục.<br>**Áp dụng UIT Discovery:** UIT Discovery chỉ dùng `<div>` cho mục đích khung căn chỉnh CSS/layout container (như .container, .home__actions, .form-group, .mindmap-component, .mindmap-toolbar, .mindmap-stage) sau khi đã dùng đúng các thẻ ngữ nghĩa (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), tránh hội chứng 'div soup'.<br>*Ghi chú nguồn:* Slide 54 chỉ liệt kê tên `<div>` cạnh `<article>` và `<section>`. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 3; slide 54) |
| HTML | <a id="row-html-39"></a> **Phần tử ngữ nghĩa `<aside>` (Thanh bên / Nội dung phụ trợ)** | **Nội dung tài liệu:** Phần tử `<aside>` đại diện cho thanh bên (sidebar) chứa thông tin ngoại vi liên quan gián tiếp đến nội dung chính như liên kết liên quan, trích dẫn, quảng cáo; thường đặt bên trong `<main>`.<br>**Áp dụng UIT Discovery:** Hiện 5 trang của UIT Discovery dùng bố cục một cột tập trung (hoặc drawer `<dialog>` cho chi tiết lộ trình) nên chưa dùng `<aside>`. Nếu mở rộng thêm cột mục lục nhanh hoặc 'Đề tài gợi ý liên quan' tách khỏi luồng chính, có thể đặt trong `<aside>`.<br>*Ghi chú nguồn:* Slide 52–54 minh họa Sidebar 'Related' trên wireframe và nêu tên thẻ `<aside>`. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 1–3; slide 52–54) |
| HTML | <a id="row-html-40"></a> **Phần tử ngữ nghĩa `<footer>` (Chân trang)** | **Nội dung tài liệu:** Phần tử `<footer>` là dải ở cuối trang (hoặc cuối một phần nội dung), thường chứa thông báo bản quyền (copyright), tín dụng (credit) hoặc thông tin liên hệ.<br>**Áp dụng UIT Discovery:** Tất cả 5 trang UIT Discovery đều có `<footer class="site-footer">` đồng nhất ở cuối trang, hiển thị tên đồ án IE104, mục tiêu hỗ trợ sinh viên và đơn vị Trường ĐH Công nghệ Thông tin, ĐHQG-HCM.<br>*Ghi chú nguồn:* Slide 52–54 minh họa vùng Footer và nêu tên thẻ `<footer>` bằng văn bản. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 1–3; slide 52–54) |
| HTML | <a id="row-html-41"></a> **Gỡ lỗi và xác thực HTML bằng W3C Markup Validation Service** | **Nội dung tài liệu:** Trình duyệt phân tích HTML khá khoan dung nên trang vẫn hiển thị dù có lỗi cú pháp. Chiến lược gỡ lỗi chuẩn nhất là chạy mã qua công cụ W3C Markup Validation Service (https://validator.w3.org / W3C Nu HTML Checker) bằng cách nhập URL, tải file HTML hoặc dán trực tiếp mã nguồn để phát hiện lỗi như thiếu thẻ đóng (Unclosed element), vi phạm lồng thẻ (violates nesting rules), ngầm hiểu thẻ đóng (End tag implied) hoặc hết tệp khi đang trong giá trị thuộc tính.<br>**Áp dụng UIT Discovery:** Là tiêu chí kiểm thử BẮT BUỘC trong checklist đồ án IE104: cả 5 trang UIT Discovery (và DOM xuất ra sau khi JS render) phải kiểm tra qua validator.w3.org cho đến khi đạt 0 Error. | Không có mẫu trong tài liệu | `slides_drive/11_2.5 Cấu trúc tài liệu _ Gỡ lỗi.pdf` (tr. 4–6; slide 55–57); `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 5, 8) |
| HTML | <a id="row-html-42"></a> **Phần tử `<address>` và ngắt dòng `<br>` cho thông tin liên hệ** | **Nội dung tài liệu:** Trong Lab 1 bài 1, hai địa chỉ người gửi và người nhận trong bức thư phải đặt trong phần tử `<address>`. Mỗi dòng của địa chỉ cần xuống dòng mới (dùng `<br>`) thay vì tách thành nhiều phần tử `<p>` riêng biệt.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery đặt thông tin đơn vị ĐHQG-HCM gọn trong `<footer class="site-footer">` bằng `<p>`, và dùng `<br />` chỉ ở chỗ ngắt nhịp tiêu đề hero h1 trên index.html. Có thể dùng `<address>` bên trong `<footer>` nếu sau này bổ sung khối địa chỉ liên hệ chính thức của nhóm/khoa.<br>*Ghi chú nguồn:* Lab 1 chỉ nêu yêu cầu bằng văn bản (tr. 4) và dữ liệu thô (tr. 1), không cung cấp mã HTML đáp án sẵn. | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 1, 4) |
| HTML | <a id="row-html-43"></a> **Phần tử `<time>` đánh dấu ngày tháng máy có thể đọc được** | **Nội dung tài liệu:** Lab 1 yêu cầu đánh dấu bốn mốc ngày tháng trong bức thư (20 January 2016, 9 September 2016, 15 January 2017, 2 May 2017) bằng phần tử ngày tháng mà máy có thể đọc được (`<time datetime="YYYY-MM-DD">`).<br>**Áp dụng UIT Discovery:** Trong lecturer-detail.js của UIT Discovery (dòng 254), ngày ghi nhận hồ sơ (lecturer.profile.checkedAt) hiện nối trực tiếp dạng text (' · Ngày ghi nhận: ...'). Nên nâng cấp bọc giá trị ngày bằng `<time datetime="...">` để tăng ngữ nghĩa HTML5 cho dữ liệu thời gian.<br>*Ghi chú nguồn:* Lab 1 tr. 4 mô tả yêu cầu bằng tiếng Việt ('phần tử ngày tháng mà máy có thể đọc được'), không viết sẵn thẻ `<time>` trong đề. | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 1–2, 4) |
| HTML | <a id="row-html-44"></a> **Phần tử `<abbr>` với thuộc tính title giải thích từ viết tắt** | **Nội dung tài liệu:** Lab 1 hướng dẫn đánh dấu 5 từ viết tắt/từ rút gọn (PhD, HTML, CSS, BC, Esq) để cung cấp bản mở rộng giải thích đầy đủ (ví dụ Doctor of Philosophy, Before Christ, Esquire), hiển thị gạch chân chấm và tooltip khi rê chuột (qua `<abbr title="...">`).<br>**Áp dụng UIT Discovery:** Có thể áp dụng cho các thuật ngữ viết tắt học thuật trên UIT Discovery như `<abbr title="Trường Đại học Công nghệ Thông tin">`UIT`</abbr>`, `<abbr title="Xử lý ngôn ngữ tự nhiên">`NLP`</abbr>`, `<abbr title="Khoa học Máy tính">`KHMT`</abbr>` nếu xuất hiện trong văn bản mô tả. | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 4) |
| HTML | <a id="row-html-45"></a> **Phần tử chỉ số dưới `<sub>` và chỉ số trên `<sup>`** | **Nội dung tài liệu:** Lab 1 yêu cầu đánh dấu 6 ký tự phụ/ký tự trên (sub/superscript) theo công thức hóa học (H2O, C14H12O3) và ký hiệu số mũ toán học (3 × 10^3, 3 × 10^4). Lab 2 cũng dùng `<sup>` trong đơn vị khoa học ở dữ liệu bảng.<br>**Áp dụng UIT Discovery:** Ít dùng trên giao diện tổng quan UIT Discovery; hữu ích nếu dữ liệu tên đề tài hoặc đầu ra kỳ vọng trong research-data.json có công thức toán/hóa học (lưu ý nếu render từ JSON thì cần parse có kiểm soát hoặc dùng ký tự Unicode thay vì innerHTML thô để đảm bảo an toàn DOM).<br>*Ghi chú nguồn:* Lab 1 tr. 2 và tr. 4 nêu dữ liệu thô và yêu cầu, không viết mã thẻ `<sub>`/`<sup>` mẫu (mẫu code tường minh `<sup>` có trong Lab 2 tr. 7). | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 2, 4) |
| HTML | <a id="row-html-46"></a> **Danh sách mô tả `<dl>`, `<dt>`, `<dd>`** | **Nội dung tài liệu:** Bên cạnh `<ul>` và `<ol>`, Lab 1 dùng danh sách định nghĩa/mô tả (`<dl>` chứa cặp thuật ngữ `<dt>` và phần giải nghĩa `<dd>`) để đánh dấu mục 'Exotic dance moves' kèm định nghĩa từng điệu nhảy; CSS mẫu của Lab 1 (tr. 3) định kiểu trực tiếp cho p, ul, ol, dl, address và p, li, dd, dt, address.<br>**Áp dụng UIT Discovery:** Rất phù hợp cho UIT Discovery khi cần trình bày cặp thuật ngữ - giải thích hoặc các cặp thuộc tính - giá trị học thuật (ví dụ các chỉ số học thuật/thông tin tóm tắt trong hồ sơ giảng viên hoặc mục Giải thích thuật ngữ). | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 2–4) |
| HTML | <a id="row-html-47"></a> **Trích dẫn (`<q>` / `<blockquote>`) và nguồn trích dẫn (`<cite>`)** | **Nội dung tài liệu:** Lab 1 yêu cầu đánh dấu trích dẫn phương châm đại học (quote, như `<q>`) và phần trích dẫn nguồn tác phẩm (citation, như `<cite>`) bằng các phần tử HTML ngữ nghĩa thích hợp.<br>**Áp dụng UIT Discovery:** Có thể áp dụng trên UIT Discovery nếu trang hồ sơ giảng viên hoặc trang giới thiệu hiển thị trích dẫn bài báo/nguồn tham khảo (`<cite>`) hoặc câu trích dẫn định hướng nghiên cứu (`<q>`/`<blockquote>`). | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 3, 5) |
| HTML | <a id="row-html-48"></a> **Khai báo tác giả bằng `<meta name="author">` và CSS nội bộ trong `<head>` (`<style>`)** | **Nội dung tài liệu:** Phần thẻ `<head>` của Lab 1 yêu cầu đặt bộ ký tự utf-8 bằng `<meta>`, đặt tên tác giả bức thư trong một thẻ `<meta>` (name="author"), và đặt đoạn CSS được cung cấp vào thẻ thích hợp (`<style>`) bên trong `<head>`.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, toàn bộ CSS được tách ra tệp .css riêng nhúng qua `<link rel="stylesheet">` theo đúng chuẩn cấu trúc thư mục IE104 (không lạm dụng `<style>` nội bộ để tránh khó bảo trì và trộn lẫn CSS giữa các trang). `<meta name="author">` có thể bổ sung vào `<head>` nếu cần. | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 3, 5) |
| HTML | <a id="row-html-49"></a> **Thuộc tính class kết nối phần tử HTML với CSS (.sender-column)** | **Nội dung tài liệu:** Lab 1 yêu cầu gắn thuộc tính class với giá trị 'sender-column' cho địa chỉ và ngày tháng đầu tiên trong thư để quy tắc CSS .sender-column { text-align: right; } căn phải đúng các phần tử này.<br>**Áp dụng UIT Discovery:** Là nền tảng cho quy chuẩn đặt tên class BEM (block__element--modifier) xuyên suốt UIT Discovery, ví dụ .site-header__inner, .topic-row__title, .btn--outline, .mindmap-tool-btn--with-label.<br>*Ghi chú nguồn:* Lab 1 tr. 3–4 chỉ cung cấp quy tắc CSS .sender-column và yêu cầu gắn class trong HTML. | Không có mẫu trong tài liệu | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 3–4, 6) |
| HTML | <a id="row-html-50"></a> **Nhúng Google Fonts qua `<link>` và tái cấu trúc HTML thô sang thẻ ngữ nghĩa** | **Nội dung tài liệu:** Bài 2 của Lab 1 cung cấp tệp khởi đầu index.html đã nhúng Google Fonts bằng `<link>`, nhưng phần `<body>` chỉ gồm các thẻ rời (`<h1>`, `<img>`, `<ul>`, `<h2>`, `<p>`) chưa có thẻ bao bọc ngữ nghĩa. Sinh viên phải thêm `<link>` trỏ tới style.css và bao bọc các vùng bằng `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` (khi gán đúng thẻ, style.css sẽ tô nền xanh lục).<br>**Áp dụng UIT Discovery:** Trực tiếp phản ánh phương pháp dựng HTML của UIT Discovery: xây khung ngữ nghĩa sạch từ đầu (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) trước khi áp dụng CSS. Lưu ý khi dùng Google Fonts cần đánh giá tác động Lighthouse hoặc dùng font hệ thống fallback mượt như UIT Discovery đang tối ưu. | [Xem CODE-HTML-26](#code-html-26) | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 7–9); `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 6, 15–45) |
| HTML | <a id="row-html-51"></a> **Conditional Comment `<!--`[if lt IE 9]> và polyfill html5shiv.js** | **Nội dung tài liệu:** Tệp khởi đầu Lab 1 dùng chú thích có điều kiện dành riêng cho Internet Explorer cũ (dưới IE 9) để nạp thư viện html5shiv.js từ CDN giúp IE cũ nhận diện và tạo kiểu được các thẻ ngữ nghĩa HTML5 mới.<br>**Áp dụng UIT Discovery:** KHÔNG áp dụng và KHÔNG cần thiết cho UIT Discovery: đồ án IE104 hiện đại dùng ES6+ Modules (`<script type="module">`), CSS Grid/Flexbox, CSS Variables và `<dialog>`, đồng thời quy chuẩn đồ án không sử dụng script bên thứ ba từ CDN nếu không cần. | [Xem CODE-HTML-27](#code-html-27) | `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 8–10) |
| HTML | <a id="row-html-52"></a> **Phần tử nội tuyến phi ngữ nghĩa `<span>` trong thanh điều hướng/văn bản** | **Nội dung tài liệu:** Trong tệp khởi đầu Lab 1, mục đang hoạt động 'Home' trong danh sách điều hướng `<ul>` được đặt trong `<li><span>`Home`</span></li>` thay vì thẻ `<a>`, giúp giữ kiểu dáng đồng bộ với nav a trong CSS (nav a, nav span) mà không thành liên kết bấm được.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `<span>` rất hiệu quả cho thành phần nội tuyến nhỏ cần CSS/ARIA: dấu phân cách breadcrumb (`<span aria-hidden="true">` / `</span>`), biểu tượng nút (`<span class="theme-toggle__icon" aria-hidden="true">`), badge nhóm (.badge), nhãn nút mindmap (.mindmap-tool-btn__label), và dấu lược phân trang (.pagination-ellipsis); riêng mục menu hiện tại của UIT Discovery dùng `<a aria-current="page">` chuẩn trợ năng thay vì bỏ thẻ `<a>`. | [Xem CODE-HTML-28](#code-html-28) | `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 19–25) |
| HTML | <a id="row-html-53"></a> **Liên kết ảnh thu nhỏ (Thumbnail `<img>` lồng trong `<a>`) kèm alt mô tả** | **Nội dung tài liệu:** Tệp khởi đầu Lab 1 minh họa kỹ thuật bọc thẻ `<img>` ảnh thu nhỏ (*_th.jpg) bên trong thẻ `<a>` trỏ tới ảnh kích thước lớn (*.jpg), kèm thuộc tính alt mô tả rất chi tiết hình ảnh và hành động liên kết cho người dùng trình đọc màn hình.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, logo ở header dùng mẫu tương tự (`<a class="site-header__brand" href="..."><img ... alt="UIT" /><span>`UIT Discovery`</span></a>`); riêng ảnh chân dung giảng viên sử dụng avatar() với fallback chữ cái viết tắt và loading="lazy". | [Xem CODE-HTML-29](#code-html-29) | `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 36–39); `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 7) |
| HTML | <a id="row-html-54"></a> **Tổng quan về đa phương tiện và nhúng (Multimedia & Embedding)** | **Nội dung tài liệu:** Một trang web chỉ toàn văn bản sẽ đơn điệu và nhàm chán; kỹ thuật nhúng đa phương tiện (hình ảnh, video, âm thanh, iframe/object, đồ họa vector SVG) làm cho trang web trở nên trực quan và sinh động hơn.<br>**Áp dụng UIT Discovery:** UIT Discovery lựa chọn đa phương tiện có chọn lọc để giữ tốc độ tải nhanh và tập trung học thuật: sử dụng ảnh đại diện giảng viên, logo UIT, cùng sơ đồ tư duy SVG + DOM tương tác thay cho hình ảnh tĩnh nặng nề. | Không có mẫu trong tài liệu | `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 1–3; slide 58–60) |
| HTML | <a id="row-html-55"></a> **Phần tử `<img>` và thuộc tính src (đường dẫn tương đối vs URL tuyệt đối)** | **Nội dung tài liệu:** `<img>` là phần tử trống dùng để nhúng hình ảnh vào trang web, yêu cầu tối thiểu thuộc tính src chứa đường dẫn ảnh. Nên dùng URL tương đối (cùng thư mục hoặc thư mục con images/) thay vì URL tuyệt đối (hotlinking) vì URL tuyệt đối làm trình duyệt tốn thêm DNS lookup, chậm trang và không kiểm soát được việc ảnh bị xóa hoặc thay đổi ở máy chủ ngoài.<br>**Áp dụng UIT Discovery:** UIT Discovery lưu nội bộ assets/images/uit-logo.png và assets/images/lecturers/..., dùng đường dẫn tương đối chuẩn xác theo độ sâu thư mục (hoặc new URL(value, projectRoot) trong data.js) để tránh hotlinking và đảm bảo không lỗi 404 khi deploy subpath. | [Xem CODE-HTML-30](#code-html-30) | `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 4–7; slide 61–64) |
| HTML | <a id="row-html-56"></a> **Thuộc tính alt (văn bản thay thế) trên `<img>`** | **Nội dung tài liệu:** Thuộc tính alt cung cấp mô tả bằng văn bản cho hình ảnh khi ảnh không thể hiển thị, tải chậm hoặc phục vụ trình đọc màn hình; là yếu tố cốt lõi cho trải nghiệm truy cập. Có thể kiểm tra bằng cách cố ý nhập sai tên tệp ảnh.<br>**Áp dụng UIT Discovery:** Quy chuẩn IE104 bắt buộc mọi `<img>` đều có alt: logo dùng alt="UIT", ảnh giảng viên trong data.js gán image.alt = lecturer.photo.alt \|\| lecturer.name, đồng thời thêm fallback chữ cái viết tắt nếu ảnh lỗi tải. | [Xem CODE-HTML-31](#code-html-31) | `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 8–9; slide 65–66) |
| HTML | <a id="row-html-57"></a> **Thuộc tính width và height trên `<img>` (nguy cơ méo/mờ ảnh)** | **Nội dung tài liệu:** Có thể dùng thuộc tính width và height trên `<img>` để khai báo chiều rộng/chiều cao, nhưng không nên thay đổi kích thước gốc của ảnh bằng HTML vì dễ gây vỡ hạt, mờ hoặc méo tỷ lệ khung hình; cần xử lý kích thước ảnh chính xác bằng phần mềm chỉnh sửa ảnh trước khi đưa lên web.<br>**Áp dụng UIT Discovery:** UIT Discovery khai báo width="34" height="30" đúng tỷ lệ cho uit-logo.png để trình duyệt giữ chỗ tránh CLS (Cumulative Layout Shift) trên Lighthouse. Với ảnh giảng viên sinh động, có thể bổ sung width/height (hoặc CSS aspect-ratio: 1 / 1) kèm loading="lazy" để đạt tối đa điểm Performance. | [Xem CODE-HTML-32](#code-html-32) | `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 10–11; slide 67–68) |
| HTML | <a id="row-html-58"></a> **Thuộc tính title trên phần tử `<img>`** | **Nội dung tài liệu:** Thuộc tính title trên `<img>` dùng để cung cấp thông tin hỗ trợ bổ sung (hiển thị dạng tooltip khi rê chuột lên ảnh) khi cần thiết.<br>**Áp dụng UIT Discovery:** Không thay thế alt bằng title trên UIT Discovery; chỉ dùng title khi cần gợi ý bổ sung trên ảnh tương tác hoặc nút biểu tượng (ví dụ dự án đang dùng title trên các nút toolbar mindmap và nút theme-toggle). | [Xem CODE-HTML-33](#code-html-33) | `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 12; slide 69) |
| HTML | <a id="row-html-59"></a> **Chú thích hình ảnh ngữ nghĩa với `<figure>` và `<figcaption>`** | **Nội dung tài liệu:** Dùng `<div class="figure">` kèm `<p>` không tạo liên kết ngữ nghĩa giữa ảnh và chú thích cho trình đọc màn hình. Giải pháp chuẩn HTML5 là bọc ảnh (hoặc sơ đồ/khối minh họa) bằng `<figure>` và mô tả bằng `<figcaption>` bên trong.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery chưa có ảnh bài viết kèm chú thích; nếu bổ sung minh họa sơ đồ/ảnh hoạt động nghiên cứu hoặc ảnh giảng viên kèm chú thích trên trang chi tiết, nên bọc bằng `<figure>` + `<figcaption>` thay vì `<div>` + `<p>`. | [Xem CODE-HTML-34](#code-html-34) | `slides_drive/14_3.2 Hình ảnh.pdf` (tr. 1–2; slide 70–71) |
| HTML | <a id="row-html-60"></a> **Phân biệt ảnh nội dung HTML (`<img>`) và ảnh nền trang trí CSS (background-image)** | **Nội dung tài liệu:** CSS hỗ trợ nhúng ảnh nền qua background-image và các thuộc tính background-* giúp dễ căn vị trí. Nguyên tắc lựa chọn: nếu hình ảnh mang ý nghĩa về mặt nội dung thì dùng `<img>` trong HTML; nếu hoàn toàn phục vụ trang trí thì dùng hình ảnh nền CSS.<br>**Áp dụng UIT Discovery:** UIT Discovery thực hiện đúng nguyên tắc này: logo UIT và ảnh chân dung giảng viên mang ý nghĩa nhận diện/nội dung nên dùng `<img>` có alt; các vòng quỹ đạo trang trí .home__orbit và nền hero trên index.html được dựng thuần bằng CSS và gắn aria-hidden="true" cho khối .home__visual. | [Xem CODE-HTML-35](#code-html-35) | `slides_drive/14_3.2 Hình ảnh.pdf` (tr. 3–4; slide 72–73) |
| HTML | <a id="row-html-61"></a> **Phần tử `<video>`, thuộc tính src, controls và nội dung dự phòng** | **Nội dung tài liệu:** Phần tử `<video>` cho phép nhúng trình phát video trực tiếp vào trang HTML. Thuộc tính src trỏ tới tệp video; thuộc tính Boolean controls hiển thị bộ điều khiển phát lại mặc định của trình duyệt (hoặc tự xây dựng bằng JS API); nội dung `<p>` bên trong đóng vai trò dự phòng cho trình duyệt không hỗ trợ HTML5 video.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery chưa có nội dung video nội bộ trong kho dữ liệu JSON nên chưa dùng `<video>`. (Video demo bàn giao đồ án IE104 được đăng tải qua YouTube Unlisted ngoài website). | [Xem CODE-HTML-36](#code-html-36) | `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 1–3; slide 74–76) |
| HTML | <a id="row-html-62"></a> **Thuộc tính nâng cao của `<video>` và thẻ `<source>` đa định dạng** | **Nội dung tài liệu:** `<video>` hỗ trợ thêm width, height, autoplay (tự phát), loop (lặp lại), muted (tắt tiếng mặc định), poster (ảnh bìa trước khi phát) và preload (đệm trước tệp lớn). Dùng nhiều thẻ `<source src="..." type="...">` bên trong `<video>` để cung cấp đa định dạng (như video/mp4, video/webm) tăng tương thích trình duyệt.<br>**Áp dụng UIT Discovery:** Chưa áp dụng trên UIT Discovery; nếu sau này bổ sung video giới thiệu nhóm nghiên cứu, ưu tiên dùng poster + preload="metadata" hoặc preload="none" (tránh autoplay làm giảm trải nghiệm và điểm Lighthouse Performance). | [Xem CODE-HTML-37](#code-html-37) | `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 4–5; slide 77–78) |
| HTML | <a id="row-html-63"></a> **Phần tử `<audio>` và `<source>` nhúng âm thanh** | **Nội dung tài liệu:** Phần tử `<audio>` hoạt động tương tự `<video>` (có controls, `<source>` đa định dạng audio/mp3, audio/ogg và thẻ `<p>` dự phòng), nhưng KHÔNG hỗ trợ width, height và poster vì không có thành phần hiển thị hình ảnh trực quan.<br>**Áp dụng UIT Discovery:** Không phù hợp với phạm vi hiện tại của UIT Discovery (website tra cứu đề tài và hồ sơ giảng viên không có tệp âm thanh/podcast). | [Xem CODE-HTML-38](#code-html-38) | `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 6–7; slide 79–80) |
| HTML | <a id="row-html-64"></a> **Phụ đề/văn bản theo thời gian WebVTT và phần tử `<track>`** | **Nội dung tài liệu:** Sử dụng tệp văn bản định dạng WebVTT (.vtt) chứa mốc thời gian và nội dung phụ đề/chú thích/mô tả (subtitles, captions, timed descriptions), liên kết bằng phần tử `<track>` đặt bên trong `<video>`/`<audio>` sau tất cả các thẻ `<source>`, cùng thuộc tính kind, src, srclang và label.<br>**Áp dụng UIT Discovery:** Chưa áp dụng trên UIT Discovery vì chưa nhúng `<video>`/`<audio>`; nếu bổ sung video giới thiệu bài giảng/hướng dẫn sử dụng mindmap trong tương lai, bắt buộc kèm `<track kind="captions" srclang="vi">` để đạt tiêu chuẩn trợ năng. | [Xem CODE-HTML-39](#code-html-39) | `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 8–10; slide 81–83) |
| HTML | <a id="row-html-65"></a> **Phần tử `<iframe>` nhúng tài liệu web khác và các thuộc tính bảo mật** | **Nội dung tài liệu:** Phần tử `<iframe>` cho phép nhúng tài liệu web bên thứ ba (video, bản đồ, bảng thuật ngữ...) vào trang hiện tại qua thuộc tính src, width, height, allowfullscreen, sandbox (tăng mức bảo mật), cùng CSS border: none thay viền mặc định và nội dung fallback bên trong.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery không dùng `<iframe>` nhằm giữ giao diện sạch, nhanh và tối ưu điểm Lighthouse. Nếu nhúng video hướng dẫn ngoài về sau, phải đặt title mô tả, loading="lazy" và cấu hình sandbox phù hợp tránh lỗ hổng bảo mật. | [Xem CODE-HTML-40](#code-html-40) | `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 1–3; slide 84–86) |
| HTML | <a id="row-html-66"></a> **Phần tử `<embed>` nhúng nội dung plugin ngoài** | **Nội dung tài liệu:** `<embed>` là phần tử trống đa năng dùng để nhúng nội dung ngoài/plugin (như Flash trước đây) thông qua src, type (MIME type), width, height và các thuộc tính tham số trực tiếp trên thẻ; không hỗ trợ nội dung HTML dự phòng chuẩn (`<noembed>` đã lỗi thời).<br>**Áp dụng UIT Discovery:** KHÔNG sử dụng trong UIT Discovery: ví dụ Flash (.swf) đã hoàn toàn lỗi thời/ngừng hỗ trợ trên trình duyệt hiện đại và vi phạm kiểm thử Best Practices của Google Lighthouse. | [Xem CODE-HTML-41](#code-html-41) | `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 4–6; slide 87–89) |
| HTML | <a id="row-html-67"></a> **Phần tử `<object>` (và `<param>`) nhúng tệp ngoài/PDF và khuyến nghị thay thế** | **Nội dung tài liệu:** `<object>` dùng thuộc tính data (URL tài nguyên), type (MIME type), width, height, có thể chứa các thẻ đơn `<param>` truyền tham số plugin và khối HTML dự phòng nằm sau `<param>`. Slide nhấn mạnh khi nhúng PDF thường gây khó truy cập và khó đọc trên màn hình nhỏ, nên tốt hơn hết là tạo liên kết cho người dùng tải xuống hoặc đọc trên trang riêng.<br>**Áp dụng UIT Discovery:** Áp dụng đúng khuyến nghị trên slide 90 cho UIT Discovery: không nhúng PDF bằng `<object>`; mọi liên kết tài liệu/hồ sơ tham khảo ngoài dùng thẻ `<a>` kèm target="_blank" rel="noopener noreferrer" để thân thiện với mobile. | [Xem CODE-HTML-42](#code-html-42) | `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 4–5, 7; slide 87–88, 90) |
| HTML | <a id="row-html-68"></a> **So sánh đồ họa Raster (BMP, PNG, JPEG, GIF) và đồ họa Vector (SVG)** | **Nội dung tài liệu:** Hình ảnh Raster lưu dưới dạng lưới các pixel (vị trí và màu sắc từng điểm ảnh; phổ biến gồm .bmp, .png, .jpg, .gif) nên khi phóng to sẽ bị vỡ hạt; phù hợp cho ảnh chụp phức tạp. Hình ảnh Vector (định dạng SVG) được mô tả bằng thuật toán hình học và đường dẫn nên luôn sắc nét ở mọi tỷ lệ phóng to và thường có dung lượng tệp nhẹ hơn.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery: ảnh chân dung giảng viên (ảnh chụp thực tế) dùng định dạng raster (JPG/PNG/WebP) có nén tối ưu; còn biểu tượng thao tác toolbar mindmap và các đường nối Bezier/mũi tên động trên sơ đồ kiến thức dùng đồ họa vector SVG để sắc nét trên mọi độ phân giải Retina/mobile. | Không có mẫu trong tài liệu | `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 1–3; slide 91–93) |
| HTML | <a id="row-html-69"></a> **Ngôn ngữ SVG và các phần tử đồ họa (`<svg>`, `<rect>`, `<circle>`, `<feColorMatrix>`, `<animate>`, `<mask>`)** | **Nội dung tài liệu:** SVG (Scalable Vector Graphics) là ngôn ngữ dựa trên XML để đánh dấu đồ họa vector với thẻ gốc `<svg>` (thuộc tính version, baseProfile, width, height, xmlns), hình cơ bản như `<rect>`, `<circle>` và phần tử nâng cao như `<feColorMatrix>`, `<animate>`, `<mask>`. Ưu điểm: văn bản vẫn truy cập được (tốt cho SEO), mỗi thành phần có thể tạo kiểu bằng CSS và điều khiển bằng JS. Nhược điểm: hình phức tạp làm tăng kích thước tệp và thời gian xử lý; không hỗ trợ trình duyệt quá cũ.<br>**Áp dụng UIT Discovery:** Ứng dụng trực tiếp ở trang topics/detail/index.html của UIT Discovery: thẻ `<svg class="mindmap-svg" id="mindmap-svg">` được JS tạo động các đường `<path>` Bezier, `<defs>`/`<marker>` mũi tên chỉ hướng tiên quyết và tạo kiểu trực tiếp bằng CSS (biến màu theme sáng/tối), giúp sơ đồ phóng to thu nhỏ sắc nét mà không mờ như ảnh raster. | [Xem CODE-HTML-43](#code-html-43) | `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 4–7; slide 94–97) |
| HTML | <a id="row-html-70"></a> **Nhúng tệp SVG qua phần tử `<img>`** | **Nội dung tài liệu:** Tham chiếu tệp .svg trong thuộc tính src của `<img>`. Ưu điểm: cú pháp quen thuộc, dễ bọc trong `<a>` thành liên kết, trình duyệt cache được tệp SVG. Nhược điểm: không thể thao tác nội dung SVG bằng JavaScript bên ngoài, không dùng được CSS pseudoclass (như :focus) từ trang chính, phải nhúng CSS nội tuyến vào bên trong file SVG nếu muốn đổi kiểu.<br>**Áp dụng UIT Discovery:** Phù hợp cho UIT Discovery nếu muốn thay biểu trưng hoặc hình minh họa tĩnh tái sử dụng nhiều trang (ví dụ logo hoặc icon trang trí không cần JS tương tác); giúp trình duyệt cache file .svg riêng và giữ HTML gọn. | [Xem CODE-HTML-44](#code-html-44) | `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 8–9; slide 98–99) |
| HTML | <a id="row-html-71"></a> **Nhúng mã SVG nội tuyến (Inline `<svg>` trong HTML và `<foreignObject>`)** | **Nội dung tài liệu:** Dán trực tiếp cặp thẻ `<svg>...</svg>` vào tài liệu HTML. Ưu điểm: giảm một HTTP request, gắn được class/id cho các phần tử SVG để tạo kiểu CSS (kể cả :focus) và thao tác bằng JS, có thể bọc trong `<a>`. Nhược điểm: làm phình file HTML, trình duyệt không cache riêng SVG, tốn công bảo trì nếu lặp ở nhiều nơi; nếu dùng `<foreignObject>` dự phòng thì trình duyệt hỗ trợ SVG vẫn tải ảnh dự phòng.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng chính kỹ thuật Inline SVG này tại 2 chỗ trên topics/detail/index.html: (1) các icon 18x18px trong nút 'Căn vừa' và 'Toàn màn hình' (dùng fill="currentColor" để tự đổi màu theo theme sáng/tối và thay đổi path d bằng JS), và (2) `<svg class="mindmap-svg" id="mindmap-svg" aria-hidden="true">`. | [Xem CODE-HTML-45](#code-html-45) | `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 10–12; slide 100–102) |
| HTML | <a id="row-html-72"></a> **Nhúng SVG bằng `<iframe>` (và lý do hạn chế sử dụng)** | **Nội dung tài liệu:** Nhúng tệp .svg qua `<iframe src="..." sandbox>` kèm ảnh dự phòng bên trong. Slide khẳng định đây không phải lựa chọn tốt vì nội dung dự phòng chỉ hiện khi trình duyệt hoàn toàn không hỗ trợ `<iframe>`, đồng thời không thể dùng JavaScript ở trang chính để thao tác SVG nếu khác nguồn gốc (Same-Origin).<br>**Áp dụng UIT Discovery:** KHÔNG sử dụng trong UIT Discovery: dùng Inline SVG hoặc `<img>` trực tiếp thay vì nhúng SVG qua `<iframe>`. | [Xem CODE-HTML-46](#code-html-46) | `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 13–14; slide 103–104) |
| HTML | <a id="row-html-73"></a> **Tổng quan về Bảng (`<table>`) và nguyên tắc KHÔNG dùng bảng để chia bố cục trang** | **Nội dung tài liệu:** Bảng HTML là tập hợp dữ liệu có cấu trúc theo hàng và cột (dữ liệu dạng bảng như thời khóa biểu, kế hoạch bài học, số liệu thống kê). Slide cảnh báo KHÔNG được dùng `<table>` để sắp xếp bố cục trang web (đầu trang, cột nội dung, chân trang) vì khó viết code, khó bảo trì/gỡ lỗi và kém tương thích trên nhiều kích thước màn hình.<br>**Áp dụng UIT Discovery:** Tuân thủ tuyệt đối trên UIT Discovery: TUYỆT ĐỐI CẤM dùng `<table>` làm bố cục trang; toàn bộ bố cục 5 trang được dựng bằng thẻ ngữ nghĩa HTML5 kết hợp CSS Flexbox và CSS Grid theo quy chuẩn IE104. | Không có mẫu trong tài liệu | `slides_drive/18_4.1 Tổng quan về Bảng (Table).pdf` (tr. 1–5; slide 105–109) |
| HTML | <a id="row-html-74"></a> **Xây dựng bảng cơ bản với `<table>`, hàng `<tr>` và ô dữ liệu `<td>`** | **Nội dung tài liệu:** Mọi bảng HTML được bao bọc bởi `<table></table>`. Vùng chứa nhỏ nhất là ô dữ liệu tạo bởi phần tử `<td>`; các ô `<td>` cùng một hàng được bọc trong phần tử `<tr>` (table row).<br>**Áp dụng UIT Discovery:** Hiện 5 trang UIT Discovery không sử dụng bảng (dữ liệu chủ đề và giảng viên dùng danh sách thẻ article/grid dễ responsive hơn trên mobile 375px). Chỉ dùng `<table>`/`<tr>`/`<td>` nếu bổ sung bảng đối chiếu số liệu thống kê hoặc ma trận môn học thực thụ. | [Xem CODE-HTML-47](#code-html-47) | `slides_drive/18_4.1 Tổng quan về Bảng (Table).pdf` (tr. 6–9; slide 110–113) |
| HTML | <a id="row-html-75"></a> **Ô tiêu đề bảng `<th>` (trực quan và ngữ nghĩa)** | **Nội dung tài liệu:** Thay các ô tiêu đề hàng/cột từ `<td>` thành `<th>` giúp nhận diện tiêu đề cả về mặt trực quan (in đậm, căn giữa mặc định) lẫn ngữ nghĩa, giúp người dùng tra cứu dữ liệu nhanh và công nghệ trợ năng liên kết dữ liệu với tiêu đề hàng/cột.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery chưa dùng `<table>`; nếu bổ sung bảng thống kê chủ đề/giảng viên hoặc bảng môn học tham khảo có cột cố định, bắt buộc dùng `<th>` cho tiêu đề cột/hàng thay vì `<td>` bôi đậm bằng CSS.<br>*Ghi chú nguồn:* Slide 114–116 hướng dẫn chuyển `<td>` thành `<th>` qua hình ảnh bảng Dogs Table và mô tả bước làm; mẫu code dùng `<th>` xuất hiện từ slide 117. | Không có mẫu trong tài liệu | `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 1–3; slide 114–116) |
| HTML | <a id="row-html-76"></a> **Gộp ô nhiều cột (colspan) và nhiều hàng (rowspan) trong bảng** | **Nội dung tài liệu:** Thuộc tính colspan và rowspan trên `<th>` hoặc `<td>` nhận giá trị số nguyên không đơn vị để cho phép một ô kéo dài qua nhiều cột hoặc nhiều hàng (ví dụ gộp nhóm Animals/Horse/Chicken trong Animals table).<br>**Áp dụng UIT Discovery:** Chưa áp dụng trên UIT Discovery; chỉ dùng nếu bảng dữ liệu học thuật có tiêu đề phân cấp nhiều tầng (như thống kê số đề tài theo khoa/nhóm). | [Xem CODE-HTML-48](#code-html-48) | `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 4–5; slide 117–118) |
| HTML | <a id="row-html-77"></a> **Định kiểu cột dùng chung với `<colgroup>`, `<col>` và thuộc tính span** | **Nội dung tài liệu:** Thay vì lặp lại thuộc tính style trên từng `<td>`/`<th>` của cùng một cột, đặt vùng chứa `<colgroup>` ngay dưới thẻ mở `<table>` và khai báo các thẻ `<col>` bên trong (có thể dùng thuộc tính span="n" không đơn vị để áp dụng kiểu chung cho n cột liên tiếp).<br>**Áp dụng UIT Discovery:** Chưa áp dụng trên UIT Discovery; hữu ích nếu bổ sung bảng dữ liệu cần làm nổi bật đồng bộ một cột cụ thể (nên gán class cho `<col>` thay vì viết inline style như mẫu slide). | [Xem CODE-HTML-49](#code-html-49) | `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 6–8; slide 119–121) |
| HTML | <a id="row-html-78"></a> **Chú thích bảng `<caption>` và thuộc tính summary lỗi thời trong HTML5** | **Nội dung tài liệu:** Phần tử `<caption>` đặt ngay bên dưới thẻ mở `<table>` dùng để thêm tiêu đề/chú thích ngữ nghĩa hiển thị cho bảng. Thuộc tính summary trên `<table>` trước đây dùng cho mô tả ẩn nhưng KHÔNG được chấp nhận trong chuẩn HTML5.<br>**Áp dụng UIT Discovery:** Chưa dùng `<table>` trên UIT Discovery; quy chuẩn W3C HTML5 của đồ án nghiêm cấm dùng thuộc tính lỗi thời summary trên `<table>` — nếu tạo bảng dữ liệu phải dùng `<caption>`. | [Xem CODE-HTML-50](#code-html-50) | `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 9–10; slide 122–123) |
| HTML | <a id="row-html-79"></a> **Phân cấu trúc nhóm hàng bảng với `<thead>`, `<tbody>` và `<tfoot>`** | **Nội dung tài liệu:** Với bảng phức tạp, dùng `<thead>` bao bọc hàng tiêu đề đầu bảng, `<tfoot>` bao bọc phần cuối bảng (tổng kết, trình duyệt tự đẩy xuống cuối) và `<tbody>` bao bọc phần thân dữ liệu còn lại; đồng thời đóng vai trò móc nối cấu trúc hữu ích để viết CSS cho từng vùng.<br>**Áp dụng UIT Discovery:** Chưa dùng trên UIT Discovery; bắt buộc phân tách `<thead>`/`<tbody>` (và `<tfoot>` nếu có tổng) nếu về sau bổ sung bảng dữ liệu thống kê hoặc bảng kế hoạch học tập. | Không có mẫu trong tài liệu | `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 1–4; slide 124–127) |
| HTML | <a id="row-html-80"></a> **Bảng lồng nhau (Nesting Tables) và nhược điểm bảo trì** | **Nội dung tài liệu:** HTML cho phép lồng một `<table>` hoàn chỉnh bên trong ô `<td>` của một `<table>` khác (đôi khi dùng để chèn dữ liệu từ nguồn khác), nhưng thường KHÔNG được khuyên dùng vì làm mã nguồn phức tạp và khó hiểu/bảo trì.<br>**Áp dụng UIT Discovery:** KHÔNG sử dụng trong UIT Discovery: tránh hoàn toàn bảng lồng nhau vì gây khó đọc trên màn hình nhỏ (mobile 375px), giảm khả năng truy cập screen reader và khó tạo kiểu CSS. | [Xem CODE-HTML-51](#code-html-51) | `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 5–6; slide 128–129) |
| HTML | <a id="row-html-81"></a> **Khả năng truy cập bảng với thuộc tính scope (col, row, colgroup, rowgroup)** | **Nội dung tài liệu:** Thuộc tính scope thêm vào thẻ `<th>` giúp trình đọc màn hình thiết lập liên kết lập trình giữa ô dữ liệu và tiêu đề cột/hàng. Hỗ trợ 4 giá trị: col (tiêu đề cột), row (tiêu đề hàng), colgroup (tiêu đề cho nhiều cột) và rowgroup (tiêu đề cho nhiều hàng).<br>**Áp dụng UIT Discovery:** Chưa dùng `<table>` trên UIT Discovery; bắt buộc gắn scope="col" / "row" (hoặc colgroup/rowgroup) nếu tạo bảng dữ liệu để đạt chuẩn Accessibility trên Google Lighthouse. | [Xem CODE-HTML-52](#code-html-52) | `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 7–10; slide 130–133) |
| HTML | <a id="row-html-82"></a> **Khả năng truy cập bảng phức tạp bằng cặp thuộc tính id và headers** | **Nội dung tài liệu:** Giải pháp thay thế scope cho các bảng có cấu trúc đa tầng phức tạp: gắn một id duy nhất cho mỗi thẻ `<th>` và thêm thuộc tính headers vào mỗi thẻ `<td>` chứa danh sách các id tiêu đề liên quan phân tách bởi dấu cách.<br>**Áp dụng UIT Discovery:** Chưa dùng trên UIT Discovery; chỉ dùng nếu phát triển bảng ma trận đa chiều phức tạp (nơi scope thông thường không đủ xác định tiêu đề lồng nhau). | [Xem CODE-HTML-53](#code-html-53) | `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 11–13; slide 134–136) |
| HTML | <a id="row-html-83"></a> **Thẻ `<meta name="viewport">` hỗ trợ Responsive Web Design** | **Nội dung tài liệu:** Các tệp thực hành Lab 2 và Lab 4 khai báo `<meta name="viewport" content="width=device-width">` (Lab 4 bổ sung initial-scale=1) bên trong `<head>` để trình duyệt di động đặt chiều rộng vùng nhìn bằng độ rộng thiết bị, làm điều kiện tiên quyết cho responsive images và media queries.<br>**Áp dụng UIT Discovery:** Cả 5 trang của UIT Discovery đều khai báo chính xác `<meta name="viewport" content="width=device-width, initial-scale=1" />` trong `<head>`, đảm bảo hiển thị chuẩn trên Mobile 375px, Tablet 768px và Desktop ≥1024px theo quy chuẩn IE104. | [Xem CODE-HTML-54](#code-html-54) | `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 5); `LABs/08_LAB 4_Lab4-1-start/Lab4-1-start/index.html` (dòng 6) |
| HTML | <a id="row-html-84"></a> **Hình ảnh đáp ứng (Responsive Images) với srcset và sizes trên `<img>`** | **Nội dung tài liệu:** Lab 2 giới thiệu kỹ thuật Responsive Image bằng `<img>` kết hợp thuộc tính src, alt, srcset (khai báo các phiên bản ảnh theo độ rộng như 120px và 400px) và sizes (quy định khi viewport <= 500px hiển thị bản 120px, ngược lại dùng bản 400px), kiểm chứng qua tab Network Monitor trong DevTools trên localhost/live-server.<br>**Áp dụng UIT Discovery:** Hữu ích để tối ưu hiệu suất ảnh đại diện giảng viên hoặc banner nếu bổ sung nhiều kích thước ảnh trên UIT Discovery (hiện dự án tối ưu bằng kích thước nhỏ gọn, loading="lazy" và fallback initials). | [Xem CODE-HTML-55](#code-html-55) | `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 1–3); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 118–133) |
| HTML | <a id="row-html-85"></a> **Chuyển hướng nghệ thuật (Art Direction) với phần tử `<picture>` và `<source>`** | **Nội dung tài liệu:** Lab 2 hướng dẫn chèn phần tử `<picture>` vào trong `<div class="red-panda">` để chuyển đổi ảnh cắt khung (art direction) theo kích thước màn hình: hiển thị ảnh dọc red-panda-portrait-small.jpg (600px) khi viewport nhỏ hơn 600px, và ảnh ngang red-panda-landscape.jpg (1200px) ở màn hình lớn hơn.<br>**Áp dụng UIT Discovery:** Hiện UIT Discovery chưa dùng ảnh banner lớn đổi khung hình theo breakpoint nên chưa cần `<picture>`. Nếu sau này bổ sung ảnh minh họa toàn chiều rộng trên trang chủ/chi tiết, nên dùng `<picture>` với `<source media="...">` và WebP/JPG fallback. | [Xem CODE-HTML-56](#code-html-56) | `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 2–5); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 135–137) |
| HTML | <a id="row-html-86"></a> **Nhúng video YouTube qua `<iframe>` và tối ưu dung lượng ảnh (TinyPNG)** | **Nội dung tài liệu:** Lab 2 yêu cầu tối ưu dung lượng tệp PNG/JPG trước khi nhúng web (gợi ý công cụ tinypng.com, chuẩn hóa kích thước 400px/120px/1200px/600px) và lấy mã nhúng `<iframe>` từ YouTube (chiều rộng 400px) chèn ngay đầu thẻ `<article>`.<br>**Áp dụng UIT Discovery:** Kinh nghiệm tối ưu dung lượng ảnh trước khi đưa vào assets/images/ áp dụng trực tiếp cho UIT Discovery để giữ LCP/Lighthouse Performance cao. Phần nhúng `<iframe>` YouTube hiện không dùng trên web UIT Discovery (chỉ nộp link YouTube Unlisted trong hồ sơ bàn giao). | [Xem CODE-HTML-57](#code-html-57) | `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 1–2); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 108–109) |
| HTML | <a id="row-html-87"></a> **Cấu trúc tệp SVG phức hợp (viewBox, `<g>`, `<defs>`, `<linearGradient>`, `<stop>`, `<polygon>`, `<path>`, `<clipPath>`, `<use>`)** | **Nội dung tài liệu:** Tệp mdn.svg xuất từ Adobe Illustrator trong Lab 2 minh họa đầy đủ các thẻ SVG chuyên sâu: phần đầu XML và DOCTYPE SVG 1.1, thẻ `<svg>` với viewBox="0 0 400 300", gom nhóm bằng `<g>`, tô chuyển sắc với `<linearGradient>` và `<stop>`, vẽ đa giác `<polygon>`, định nghĩa vùng tái sử dụng `<defs>` chứa `<path id="...">`, mặt nạ cắt `<clipPath>` và tái tham chiếu `<use xlink:href="#..."/>`.<br>**Áp dụng UIT Discovery:** Trên topics/detail/index.html của UIT Discovery, mindmap-svg sử dụng đúng các phần tử vector cấu trúc như `<defs>`, `<marker>`, `<path>` để vẽ nhánh cây Bezier và đầu mũi tên, còn toolbar button sử dụng `<svg viewBox="0 0 24 24"><path d="..."/></svg>`. Lưu ý với SVG nội tuyến HTML5 hiện đại nên dùng href="#..." thay vì xlink:href đã lỗi thời và lược bỏ khai báo XML/DOCTYPE dư thừa. | [Xem CODE-HTML-58](#code-html-58) | `LABs/04_LAB 2_Lab2-1start/originals/mdn.svg` (dòng 1–15, 46–66) |
| HTML | <a id="row-html-88"></a> **Thực hành tổng hợp bảng dữ liệu phức tạp (Planets data) và `<sup>` / `<a>` trong bảng** | **Nội dung tài liệu:** Bài 2 của Lab 2 tổng hợp toàn bộ kiến thức Chương 4 trên dữ liệu thiên văn (blank-template.html và planets-data.txt): tạo `<table>` với `<caption>` (chứa liên kết `<a>`), `<thead>` và `<tbody>` (không cần `<tfoot>`), ô trống góc trên trái colspan="2", tiêu đề nhóm hành tinh (Terrestrial planets, Jovian planets, Gas giants, Ice giants, Dwarf planets) với rowspan/colspan, tiêu đề đơn vị khoa học dùng `<sup>`, gắn thuộc tính scope (col, row, rowgroup) cho toàn bộ `<th>` và viền bao quanh cột tên hành tinh (dùng `<colgroup>`/`<col>`).<br>**Áp dụng UIT Discovery:** Đóng vai trò mẫu chuẩn hoàn chỉnh nếu UIT Discovery cần phát triển bảng thống kê học thuật đa cấp trong tương lai (đảm bảo dùng `<caption>`, `<thead>`, `<tbody>`, scope, `<sup>` và tối ưu cuộn ngang trên mobile thay vì dùng bảng làm layout). | [Xem CODE-HTML-59](#code-html-59) | `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 6–9) |
| HTML | <a id="row-html-89"></a> **Tham chiếu thực thể ký tự bản quyền &copy; trong `<footer>`** | **Nội dung tài liệu:** Mã nguồn khởi đầu Lab 3 sử dụng thực thể HTML &copy; bên trong thẻ `<p>` của `<footer>` để hiển thị biểu tượng bản quyền © an toàn trong tài liệu HTML.<br>**Áp dụng UIT Discovery:** Có thể sử dụng &copy; (hoặc ký tự UTF-8 © vì đã khai báo `<meta charset="utf-8" />`) trong footer của UIT Discovery nếu muốn hiển thị dòng bản quyền đồ án sinh viên. | [Xem CODE-HTML-60](#code-html-60) | `LABs/06_LAB 3_Lab3-1-start/index.html` (dòng 75–79) |
| HTML | <a id="row-html-90"></a> **Phần tử `<button>` dùng cho tương tác DOM/JS** | **Nội dung tài liệu:** Mã nguồn khởi đầu Lab 5 sử dụng phần tử `<button class="dark">`Darken`</button>` để tạo nút bấm tương tác JavaScript (bật/tắt lớp phủ tối ảnh) thay vì gắn sự kiện click lên `<div>` hay `<a>`.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng triệt để phần tử `<button type="button">` cho mọi hành động không điều hướng: .theme-toggle, nút lọc nhóm trong #group-pills, #reset-filters, nút phân trang, các nút điều khiển sơ đồ mindmap (#btn-view-mindmap, #btn-view-cards, #btn-zoom-in/out/reset, #btn-pan-mode, #btn-fullscreen), #drawer-close; và `<button type="submit">` / `<button type="reset">` trong form tìm kiếm giảng viên. | [Xem CODE-HTML-61](#code-html-61) | `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 15–19) |
| HTML | <a id="row-html-91"></a> **Phần tử đồ họa HTML5 `<canvas>`** | **Nội dung tài liệu:** Mã nguồn Lab 6 sử dụng cặp thẻ `<canvas></canvas>` làm vùng vẽ đồ họa bitmap/hoạt ảnh 2D động thông qua Canvas API trong JavaScript (bài tập Bouncing balls).<br>**Áp dụng UIT Discovery:** KHÔNG sử dụng trong UIT Discovery: đồ án chọn Inline SVG + nút HTML tương tác cho Sơ đồ kiến thức thay vì `<canvas>` vì các node trên sơ đồ cần văn bản rõ nét, hỗ trợ CSS theme sáng/tối, focus bàn phím và trình đọc màn hình — đúng ưu điểm của SVG nêu ở bài 3.5. | [Xem CODE-HTML-62](#code-html-62) | `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 9–14) |
| CSS | <a id="row-css-01"></a> **Vai trò của CSS và nguyên tắc tách trình bày khỏi nội dung HTML** | **Nội dung tài liệu:** CSS (Cascading Style Sheets) là một trong ba công nghệ cốt lõi của World Wide Web cùng HTML và JavaScript. HTML đảm nhiệm cấu trúc và ngữ nghĩa nội dung, còn CSS kiểm soát việc tạo kiểu (phông chữ, màu sắc, kích thước, khoảng cách, hiệu ứng) và bố cục trình bày trang web; một tệp CSS có thể áp dụng đồng thời cho toàn bộ các phần tử tương ứng trong tệp HTML.<br>**Áp dụng UIT Discovery:** UIT Discovery tuân thủ triệt để nguyên tắc tách biệt HTML ngữ nghĩa và CSS trình bày: toàn bộ 5 trang HTML (`index.html`, `topics/index.html`, `topics/detail/index.html`, `lecturers/index.html`, `lecturers/detail/index.html`) không chứa style trình bày trực tiếp mà liên kết stylesheet thuần ngoài. Việc tách lớp này giúp đổi Light/Dark theme qua `:root` tokens mà không sửa markup HTML. | Không có mẫu trong tài liệu | `slides_drive/22_5.1 Giới thiệu _ Tổng quan CSS.pdf` (tr. 4–8) |
| CSS | <a id="row-css-02"></a> **Cú pháp CSS cơ bản: Selector, khối `{ }` và cặp `property: value;`** | **Nội dung tài liệu:** CSS là ngôn ngữ dựa trên quy tắc (rule-based). Mỗi quy tắc mở đầu bằng một selector chỉ định phần tử HTML mục tiêu, theo sau là cặp ngoặc nhọn `{ }` chứa một hoặc nhiều khai báo (declaration) dưới dạng cặp `thuộc-tính: giá-trị;` phân cách dấu hai chấm và kết thúc dấu chấm phẩy. Một stylesheet chứa nhiều quy tắc viết lần lượt.<br>**Áp dụng UIT Discovery:** Mọi quy tắc trong `assets/css/reset.css`, `assets/css/style.css` và các file CSS riêng của UIT Discovery đều viết chuẩn cú pháp `selector { property: value; }`, kết thúc đầy đủ dấu `;` để pass W3C CSS Validator (`jigsaw.w3.org/css-validator/`). | [Xem CODE-CSS-01](#code-css-01) | `slides_drive/22_5.1 Giới thiệu _ Tổng quan CSS.pdf` (tr. 11–13) |
| CSS | <a id="row-css-03"></a> **CSS Modules và tổ chức module hóa stylesheet theo nhiều tệp nhỏ** | **Nội dung tài liệu:** Do CSS có rất nhiều tính năng tạo kiểu nên ngôn ngữ được chia thành các module chuyên biệt; đồng thời trong thực tế phát triển, stylesheet được module hóa thành từng file nhỏ tách biệt thay vì gom tất cả vào một tệp stylesheet tập trung khổng lồ.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng kiến trúc chia tệp CSS theo vai trò: `assets/css/reset.css` (chuẩn hóa trình duyệt), `assets/css/style.css` (design tokens `:root`, header/footer, nút, badge, `.topic-row` dùng chung và trang chủ `#page-home`), và 4 tệp CSS chuyên biệt theo từng trang (`topics.css`, `topic-detail.css`, `lecturers.css`, `lecturer-detail.css`) scoped bằng ID `#page-*`. Lưu ý: trong IE104 chỉ dùng file `.css` thuần liên kết bằng `<link>`, KHÔNG dùng bundler CSS Modules của React/Webpack. | Không có mẫu trong tài liệu | `slides_drive/22_5.1 Giới thiệu _ Tổng quan CSS.pdf` (tr. 14) |
| CSS | <a id="row-css-04"></a> **Cấu trúc tài liệu HTML nền tảng để gắn quy tắc CSS** | **Nội dung tài liệu:** Điểm khởi đầu của tạo kiểu CSS là một tài liệu HTML chuẩn có `<!doctype html>`, `<head>` và `<body>` chứa các phần tử ngữ nghĩa lồng nhau (`<h1>`, `<p>`, `<span>`, `<a>`, `<ul>`, `<li>`, `<em>`) làm đối tượng cho selector CSS truy vấn.<br>**Áp dụng UIT Discovery:** Tất cả 5 trang của UIT Discovery dùng HTML5 chuẩn (`<!DOCTYPE html>`, `<html lang="vi">`, `<meta charset="utf-8">`, `<meta name="viewport">`) với cấu trúc landmark `<header>`, `<main id="main-content">`, `<section>`, `<nav>`, `<footer>` để CSS bám vào các class BEM ổn định thay vì thẻ thô. | [Xem CODE-CSS-02](#code-css-02) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 2; slide 16) |
| CSS | <a id="row-css-05"></a> **Liên kết CSS ngoài từ phần `<head>` bằng `<link rel="stylesheet">`** | **Nội dung tài liệu:** Phương pháp thông dụng nhất để HTML nhận quy tắc CSS là đặt thẻ `<link rel="stylesheet" href="styles.css">` bên trong `<head>`, trong đó `rel="stylesheet"` báo cho trình duyệt đây là bảng kiểu và `href` chỉ định đường dẫn đến tệp `.css`.<br>**Áp dụng UIT Discovery:** Mỗi trang HTML của UIT Discovery nạp theo đúng thứ tự trong `<head>`: `reset.css` trước, sau đó `style.css`, và cuối cùng file CSS riêng của trang (`topics.css`, `topic-detail.css`, `lecturers.css`, `lecturer-detail.css`) để bảo đảm tầng ghi đè đúng chuẩn. | `<link rel="stylesheet" href="styles.css">` | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 3–5; slide 17–19) |
| CSS | <a id="row-css-06"></a> **Type Selector (Bộ chọn theo tên phần tử HTML)** | **Nội dung tài liệu:** Type selector (element selector) chọn và áp dụng quy tắc cho mọi phần tử HTML có tên thẻ khớp trực tiếp (ví dụ `p` chọn toàn bộ thẻ `<p>` trong tài liệu).<br>**Áp dụng UIT Discovery:** UIT Discovery chỉ dùng Type selector ở mức nền tảng trong `reset.css` và `style.css` (`html`, `body`, `h1`, `h2`, `h3`, `a`, `button`, `input`, `select`, `label`, `dialog`), còn mọi thành phần giao diện chi tiết đều dùng Class selector BEM để tránh ảnh hưởng chéo ngoài ý muốn. | [Xem CODE-CSS-03](#code-css-03) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 6; slide 20) |
| CSS | <a id="row-css-07"></a> **Selector List (Nhóm nhiều selector bằng dấu phẩy `,`)** | **Nội dung tài liệu:** Có thể chọn nhiều loại phần tử hoặc nhiều selector áp dụng cùng một khối khai báo bằng cách liệt kê và phân tách các selector bởi dấu phẩy `,`.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng selector list rất nhiều để giữ DRY CSS: ví dụ `body, h1, h2, h3, h4, p, ul, ol, dl, dd...` trong `reset.css`, `h1, h2, h3` và `.badge, .lecturer-tag` trong `style.css`, `#page-home .home__concept--knowledge, #page-home .home__concept--mentor` và `#page-topic-detail .badge--level-root, ...`. | [Xem CODE-CSS-04](#code-css-04) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 6; slide 20); `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) |
| CSS | <a id="row-css-08"></a> **Thay đổi định dạng mặc định của trình duyệt (User-Agent Override)** | **Nội dung tài liệu:** Các trình duyệt hiện đại áp dụng bộ kiểu mặc định (User-Agent stylesheet) gần giống nhau cho HTML (như dấu chấm đầu dòng trên `<ul>`/`<li>`). CSS cho phép chọn phần tử đó để đặt lại định dạng mặc định, ví dụ bỏ dấu đầu dòng bằng `list-style-type: none;`.<br>**Áp dụng UIT Discovery:** UIT Discovery đặt một `assets/css/reset.css` riêng để ghi đè margin mặc định của tiêu đề/đoạn văn/danh sách, đồng thời đặt `list-style: none; padding: 0; margin: 0;` cho `.site-nav__list`, `.home__step-list`, `.related-topics-list`, `.knowledge-list` và reset `appearance`/viền mặc định của nút/dialog. | [Xem CODE-CSS-05](#code-css-05) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 7; slide 21) |
| CSS | <a id="row-css-09"></a> **Class Selector (`.className`) để chọn tập hợp con có chủ đích** | **Nội dung tài liệu:** Khi muốn tạo kiểu cho một tập con các phần tử mà không ảnh hưởng toàn bộ thẻ cùng loại, ta gắn thuộc tính `class` vào phần tử HTML và dùng selector bắt đầu bằng dấu chấm `.` trong CSS (ví dụ `.special`).<br>**Áp dụng UIT Discovery:** Class selector là xương sống của UIT Discovery theo chuẩn BEM (`block__element--modifier`): ví dụ `.btn`, `.btn--outline`, `.btn--quiet`, `.topic-row`, `.topic-row__title`, `.lecturer-card`, `.mindmap-node--pillar`. Nhờ đặt class BEM nhất quán, CSS tái sử dụng được mà không phụ thuộc cấu trúc thẻ HTML cứng nhắc. | [Xem CODE-CSS-06](#code-css-06) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 8–9; slide 22–23) |
| CSS | <a id="row-css-10"></a> **Descendant Combinator (Bộ chọn con cháu - khoảng trắng)** | **Nội dung tài liệu:** Descendant combinator dùng một khoảng trắng giữa hai selector (ví dụ `li em`) để chỉ chọn các phần tử hậu duệ (`<em>`) nằm bên trong phần tử tổ tiên (`<li>`) ở bất kỳ cấp lồng nào.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng descendant combinator kết hợp `#page-*` ID cha để scope toàn bộ CSS trang con (`#page-topics .topics-list`, `#page-lecturers .lecturer-card`, `#page-topic-detail .mindmap-viewport`, `#page-lecturer-detail .profile-header`), ngăn rò rỉ style giữa 5 trang. Tuy nhiên trong một component BEM, tránh lồng quá sâu để giữ specificity thấp. | [Xem CODE-CSS-07](#code-css-07) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 10; slide 24) |
| CSS | <a id="row-css-11"></a> **Adjacent Sibling Combinator (Bộ chọn anh em liền kề `+`)** | **Nội dung tài liệu:** Dấu `+` giữa hai selector (ví dụ `h1 + p`) chọn phần tử đứng ngay sau một phần tử anh em khác ở cùng cấp phân cấp trong DOM (ví dụ đoạn `<p>` nằm ngay sau thẻ `<h1>`).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng rất hiệu quả `+` để tạo đường kẻ ngăn giữa các mục liên tiếp mà không dư viền ở mục đầu tiên: `.topic-row + .topic-row { border-top: 1px solid var(--color-border); }` (`style.css`), `.related-topic-item + .related-topic-item`, `.profile-section + .profile-section` (`lecturer-detail.css`), `.mindmap-drawer__section + .mindmap-drawer__section` (`topic-detail.css`). | [Xem CODE-CSS-08](#code-css-08) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 11; slide 25) |
| CSS | <a id="row-css-12"></a> **Tạo kiểu liên kết theo trạng thái cơ bản (`a:link`, `a:visited`)** | **Nội dung tài liệu:** Thẻ neo `<a>` tồn tại nhiều trạng thái tương tác (chưa truy cập, đã truy cập, di chuột qua, lấy tiêu điểm bàn phím, đang kích hoạt click) và được tạo kiểu qua pseudo-classes như `a:link` và `a:visited`.<br>**Áp dụng UIT Discovery:** UIT Discovery giữ màu liên kết nhất quán với token `--color-link` (`#165f9b` ở Light mode, `#8cc7ff` ở Dark mode) cho thẻ `<a>`, không đổi màu tím gắt ở `:visited` để giữ tính đồng nhất học thuật; phần trạng thái tương tác đầy đủ (`:hover`, `:focus-visible`, `:active`) được triển khai rõ ở `style.css`. | [Xem CODE-CSS-09](#code-css-09) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 12; slide 26) |
| CSS | <a id="row-css-13"></a> **Kết hợp nhiều Selector, Combinator và chú thích CSS (`/* ... */`)** | **Nội dung tài liệu:** CSS cho phép xâu chuỗi nhiều selector và combinator (ví dụ `article p span`, `h1 + ul + p`, `body h1 + p .special`) để nhắm tới phần tử ở vị trí ngữ cảnh rất cụ thể, đồng thời dùng cặp `/* ... */` để viết ghi chú giải thích trong stylesheet.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, tránh viết chuỗi selector dài như `body h1 + p .special` vì phụ thuộc cấu trúc HTML và tăng specificity khó bảo trì; thay vào đó ưu tiên `#page-<tên> .block__element`. Ngược lại, CSS comment `/* ... */` được dùng bắt buộc ở đầu mỗi file và đầu mỗi khối chức năng (`reset.css`, `style.css`, `topics.css`, `topic-detail.css`, `lecturers.css`, `lecturer-detail.css`) phục vụ tiêu chí Chất lượng code (30%). | [Xem CODE-CSS-10](#code-css-10) | `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 13; slide 27) |
| CSS | <a id="row-css-14"></a> **External Stylesheet và điều chỉnh đường dẫn tương đối (`<link>`)** | **Nội dung tài liệu:** External stylesheet chứa toàn bộ CSS trong tệp `.css` tách biệt, dùng một tệp định kiểu cho nhiều trang web. Khi tệp CSS và HTML nằm ở thư mục khác nhau, thuộc tính `href` của `<link>` phải điều chỉnh đường dẫn tương đối (`styles/style.css`, `styles/general/style.css`, `../styles/style.css`).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng 100% External Stylesheet và điều chỉnh đường dẫn tương đối chính xác theo độ sâu thư mục: trang chủ `index.html` dùng `href="assets/css/style.css"`, các trang cấp 1 (`topics/index.html`, `lecturers/index.html`) dùng `../assets/css/...`, còn trang cấp 2 (`topics/detail/index.html`, `lecturers/detail/index.html`) dùng `../../assets/css/...` (giúp deploy GitHub Pages/Netlify subpath không lỗi 404). | [Xem CODE-CSS-11](#code-css-11) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 2–5; slide 29–32) |
| CSS | <a id="row-css-15"></a> **Internal Stylesheet (thẻ `<style>` trong `<head>`)** | **Nội dung tài liệu:** Internal stylesheet đặt mã CSS trực tiếp bên trong cặp thẻ `<style>...</style>` nằm trong `<head>` của tài liệu HTML. Hữu ích khi làm việc với hệ thống quản lý nội dung (CMS) bị chặn sửa tệp CSS ngoài, nhưng kém hiệu quả với website nhiều trang vì phải lặp lại ở mọi trang HTML. Trong thực hành Lab 2, toàn bộ CSS tạo kiểu bố cục cũng được nhúng trực tiếp qua `<style>` trong `<head>` (tương tự hướng dẫn chèn CSS vào `<head>` ở Lab 1).<br>**Áp dụng UIT Discovery:** KHÔNG DÙNG trong UIT Discovery: đồ án có 5 trang dùng chung thiết kế (`reset.css`, `style.css`), nên Internal stylesheet sẽ gây trùng lặp mã, mất cơ chế browser cache tệp `.css` và vi phạm cấu trúc thư mục chuẩn `assets/css/` của IE104. | [Xem CODE-CSS-12](#code-css-12) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 6–7; slide 33–34); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 8–97) |
| CSS | <a id="row-css-16"></a> **Inline Styles (thuộc tính HTML `style="..."`)** | **Nội dung tài liệu:** Inline styles là các khai báo CSS đặt trực tiếp trong thuộc tính `style` của từng phần tử HTML riêng lẻ. Đây là cách kém hiệu quả nhất cho bảo trì vì mỗi lần đổi giao diện phải sửa nhiều chỗ và làm trộn lẫn mã trình bày (CSS) với nội dung (HTML).<br>**Áp dụng UIT Discovery:** HẠN CHẾ TỐI ĐA / KHÔNG DÙNG trong HTML tĩnh của UIT Discovery: các file `.html` hoàn toàn sạch, không có `style="..."` inline. (Chỉ cho phép JavaScript gán thuộc tính vị trí/tọa độ động tức thời như `left`/`top`/`transform` trong sơ đồ mindmap nếu không thể viết tĩnh trước trong CSS). | [Xem CODE-CSS-13](#code-css-13) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 8–9; slide 35–36) |
| CSS | <a id="row-css-17"></a> **ID Selector (`#idName`)** | **Nội dung tài liệu:** Selector bắt đầu bằng dấu `#` (ví dụ `#onething`) chọn phần tử HTML có thuộc tính `id` tương ứng duy nhất trên trang.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, ID selector có hai vai trò rất rõ: (1) Scope CSS theo từng trang ở thẻ `<body>` (`#page-home`, `#page-topics`, `#page-topic-detail`, `#page-lecturers`, `#page-lecturer-detail`) để tránh xung đột giữa các trang; (2) Một số phần tử trạng thái đặc thù như `#results-status`, `#btn-pan-mode[aria-pressed="true"]`, `#btn-fullscreen`. Ngược lại, không dùng ID selector để tạo kiểu cho component lặp lại vì specificity quá cao và không tái sử dụng được.<br>*Ghi chú nguồn:* Slide 37 liệt kê danh sách các selector hợp lệ không kèm thân khối `{ }`. | `#onething` | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) |
| CSS | <a id="row-css-18"></a> **Universal Selector (`*`)** | **Nội dung tài liệu:** Ký tự `*` (Universal selector) khớp với mọi phần tử trong cây tài liệu HTML.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `*` đúng chỗ trong hai ngữ cảnh chuẩn: (1) `*, *::before, *::after { box-sizing: border-box; }` ở `reset.css` (tương tự `style.css` Lab 3); (2) `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { ... } }` ở `style.css` để tắt chuyển động cho người dùng nhạy cảm. Không dùng `*` để reset tùy tiện `margin`/`padding` toàn trang. | `*` | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) |
| CSS | <a id="row-css-19"></a> **Structural Pseudo-class `:first-child` và tổ hợp danh sách selector hợp lệ** | **Nội dung tài liệu:** Pseudo-class `:first-child` (ví dụ `.box p:first-child`) chọn phần tử `<p>` là con đầu tiên trong phần tử cha của nó (nằm bên trong `.box`). Slide 37 tổng hợp các selector hợp lệ gồm type (`h1`), pseudo-class (`a:link`), class (`.manythings`), ID (`#onething`), universal (`*`), descendant (`.box p`), pseudo-class kết hợp (`.box p:first-child`) và selector list (`h1, h2, .intro`).<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng `:first-child` và `:last-child` để bo góc đầu/cuối cho hàng danh sách bên trong container có `border-radius`: `#page-topics .topic-row:first-child` / `:last-child` (`topics.css` dòng 148–156) và `#page-lecturer-detail .related-topic-item:first-child .topic-row` / `:last-child` (`lecturer-detail.css` dòng 249–257). | [Xem CODE-CSS-14](#code-css-14) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) |
| CSS | <a id="row-css-20"></a> **Specificity (Độ ưu tiên của Selector khi có xung đột quy tắc)** | **Nội dung tài liệu:** Khi nhiều selector cùng trỏ vào một phần tử HTML và khai báo các giá trị xung đột nhau, CSS dùng quy tắc Specificity để phân thắng bại: selector cụ thể hơn sẽ thắng. Trong ví dụ slide 38–39, class selector `.special` cụ thể hơn type selector `p`, nên đoạn `<p class="special">` nhận `color: red;` dù `.special` viết trước `p`.<br>**Áp dụng UIT Discovery:** UIT Discovery kiểm soát Specificity có chủ đích: phần CSS dùng chung ở `style.css` dùng class (`.topic-row` -> `0,1,0`), còn file trang chi tiết dùng `#page-lecturer-detail .topic-row` (`1,1,0`) để ghi đè bố cục hàng riêng cho trang hồ sơ mà KHÔNG phải dùng `!important`. Đồng thời UIT Discovery tuân thủ quy tắc đồ án CẤM lạm dụng `!important` (chỉ xuất hiện ở `[hidden]` và `prefers-reduced-motion` để bảo toàn khả năng tiếp cận). | [Xem CODE-CSS-15](#code-css-15) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 11–12; slide 38–39) |
| CSS | <a id="row-css-21"></a> **Cascade (Quy tắc tầng — thứ tự nguồn trong stylesheet)** | **Nội dung tài liệu:** Khi hai quy tắc có cùng mức specificity nhắm đến cùng phần tử (ví dụ hai rule `p` cùng đặt `color`), quy tắc xuất hiện sau trong stylesheet sẽ ghi đè các khai báo xung đột xuất hiện trước đó. Đây là cơ chế Cascade.<br>**Áp dụng UIT Discovery:** UIT Discovery tận dụng quy tắc Cascade theo nhiều lớp: (1) Nạp `<link>` theo thứ tự `reset.css` -> `style.css` -> `<page>.css`; (2) Trong `style.css`, các token `:root[data-theme="dark"]` và `@media (min-width: 768px)` / `1024px` viết theo hướng mobile-first từ nhỏ lên lớn để breakpoint sau tự ghi đè giá trị mặc định mobile; (3) Trong `topic-detail.css`, `height: clamp(320px, 56vh, 560px);` viết trước `height: clamp(320px, 56dvh, 560px);` làm fallback cho trình duyệt cũ. | [Xem CODE-CSS-16](#code-css-16) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 13; slide 40) |
| CSS | <a id="row-css-22"></a> **Giải phẫu thành phần CSS: Thuộc tính, Giá trị, Khai báo, Khối khai báo và Bộ quy tắc** | **Nội dung tài liệu:** Ở mức cấu tạo cơ bản: Thuộc tính (Property, vd `color`, `font-size`, `width`, `background-color`) xác định đặc tính cần sửa; Giá trị (Value) gán cho thuộc tính; mỗi cặp `color: blue;` là một Khai báo CSS (Declaration); tập hợp nằm trong `{ ... }` là Khối khai báo CSS (Declaration block); cả selector kèm khối khai báo tạo thành một Bộ quy tắc CSS (Ruleset).<br>**Áp dụng UIT Discovery:** Giúp đội ngũ UIT Discovery giao tiếp và kiểm tra code thống nhất khi review PR (tách từng declaration rõ ràng mỗi dòng một thuộc tính, kiểm tra thừa/thiếu `;` trong declaration block). | [Xem CODE-CSS-17](#code-css-17) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 14; slide 41) |
| CSS | <a id="row-css-23"></a> **CSS Functions — Hàm tính toán kích thước `calc()`** | **Nội dung tài liệu:** Ngoài giá trị từ khóa và số, CSS hỗ trợ giá trị dạng hàm (function). Hàm `calc()` cho phép thực hiện phép tính hỗn hợp giữa các đơn vị khác nhau (ví dụ `width: calc(90% - 30px);`).<br>**Áp dụng UIT Discovery:** UIT Discovery ứng dụng trực tiếp `calc()` ở nhiều vị trí cần trừ bù khoảng cách: `calc(var(--radius-card) - 1px)` ở bo góc hàng đầu/cuối trong `topics.css`, `calc(100% - 32px)` và `calc(100dvh - 32px)` ở `.mindmap-drawer`, `calc(100vw - 32px)` ở `.topic-picker` (`topic-detail.css`), cùng các hàm CSS3 hiện đại khác như `var()`, `clamp()`, `min()`, `rgb()`, `linear-gradient()`. | [Xem CODE-CSS-18](#code-css-18) | `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 15; slide 42) |
| CSS | <a id="row-css-24"></a> **Quy trình trình duyệt xử lý CSS, cây DOM và Render Tree** | **Nội dung tài liệu:** Trình duyệt hiển thị trang qua 6 bước: (1) Tải HTML; (2) Phân tích HTML thành cây DOM (Document Object Model — nơi mỗi phần tử, thuộc tính, văn bản là một nút DOM); (3) Nạp các tài nguyên liên kết như CSS; (4) Phân tích cú pháp CSS và sắp xếp quy tắc theo selector để gắn kiểu vào từng nút DOM; (5) Bố trí Render Tree sau khi áp kiểu; (6) Vẽ hiển thị lên màn hình. Hiểu DOM giúp thiết kế và gỡ lỗi CSS hiệu quả.<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, các trang nạp sẵn `theme.js` đồng bộ ngay trong `<head>` trước khi parse `<body>` và đặt CSS trong `<head>` để tránh nháy màn hình sai theme (FOUC/FOUT) và giảm CLS (Cumulative Layout Shift) khi Render Tree dựng khung lần đầu, đạt điểm Lighthouse cao.<br>*Ghi chú nguồn:* Slide 43 trình bày sơ đồ quy trình Load HTML -> Parse HTML -> Create DOM tree + Load CSS -> Parse CSS -> Attach style to DOM nodes -> Display. | Không có mẫu trong tài liệu | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 1–2; slide 43–44) |
| CSS | <a id="row-css-25"></a> **Thuộc tính `background-color` và các hệ màu CSS (`#hex`, tên màu, `rgba()`)** | **Nội dung tài liệu:** Thuộc tính `background-color` đặt màu nền cho bất kỳ phần tử CSS nào và chấp nhận mọi giá trị `<color>` hợp lệ như mã hex (`#567895`), tên màu (`black`, `white`) hoặc hàm màu có kênh alpha trong suốt (`rgba(255,255,255,.5)`).<br>**Áp dụng UIT Discovery:** UIT Discovery quản lý toàn bộ màu nền và màu chữ qua CSS custom properties tại `:root` trong `assets/css/style.css` (`--color-bg`, `--color-surface`, `--color-surface-muted`, `--color-accent-soft`, và 6 cặp `--color-domain-1..6-bg` / `-accent`), dùng mã hex cho theme sáng/tối và `rgb(r g b / alpha)` cho backdrop modal/bóng đổ. | [Xem CODE-CSS-19](#code-css-19) | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 4; slide 46) |
| CSS | <a id="row-css-26"></a> **Thuộc tính `background-image` và hàm `url()`** | **Nội dung tài liệu:** Thuộc tính `background-image` cùng hàm `url(...)` cho phép hiển thị hình ảnh làm nền của phần tử (mặc định ảnh nền tự lặp lại theo cả hai chiều nếu nhỏ hơn khung phần tử).<br>**Áp dụng UIT Discovery:** UIT Discovery hướng tới giao diện học thuật phẳng tối giản (`--shadow-soft: none`, nền đơn sắc `--color-bg` / `--color-surface`), chỉ dùng `linear-gradient(...)` nhẹ cho khung `.home__visual` trên `index.html`, không dùng `background-image` họa tiết gây nhiễu chữ và tăng dung lượng tải trang. | [Xem CODE-CSS-20](#code-css-20) | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 5; slide 47) |
| CSS | <a id="row-css-27"></a> **Thuộc tính đường viền `border` (shorthand và từng cạnh/kiểu nét)** | **Nội dung tài liệu:** Thuộc tính viết tắt `border` đặt đồng thời độ dày (`width`), kiểu nét (`style`: `solid`, `dotted`, `dashed`, `double`) và màu sắc (`color`) trong một dòng; có thể ghi đè riêng từng cạnh hoặc thành phần bằng `border-top`, `border-bottom`, `border-bottom-style`.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `border: 1px solid var(--color-border)` làm đường phân tách chủ đạo thay cho đổ bóng nặng (card giảng viên, danh sách đề tài, input, nút outline, khung mindmap), đồng thời dùng `border-left: 3px solid var(--color-primary)` để nhấn mạnh node trụ cột `.mindmap-node--pillar` và `border-style: dashed` cho nút `.topics-groups__more`. | [Xem CODE-CSS-21](#code-css-21) | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 6; slide 48) |
| CSS | <a id="row-css-28"></a> **Kiểm soát tỷ lệ ảnh trong hộp bằng `object-fit: cover` và `object-fit: contain`** | **Nội dung tài liệu:** Mọi phần tử trong CSS đều tạo ra một hộp; nếu đặt ảnh vào hộp khác kích thước nội tại, ảnh có thể nhỏ hơn hoặc tràn hộp. Khi ép `width: 100%; height: 100%;`, `object-fit: cover` cắt khít ảnh lấp đầy hộp mà không méo tỷ lệ, còn `object-fit: contain` thu trọn toàn bộ ảnh vào bên trong hộp giữ nguyên tỷ lệ.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng chuẩn xác cả hai giá trị trong `assets/css/`: `.site-header__logo-img` dùng `object-fit: contain` (`style.css` dòng 301) để logo UIT luôn nguyên vẹn không bị cắt mép, còn ảnh đại diện giảng viên `.lecturer-card__avatar img` (`lecturers.css` dòng 127) và `.profile-header__avatar img` (`lecturer-detail.css` dòng 62) dùng `object-fit: cover` để ảnh chân dung vừa khít khung tròn 40×40 / 56×56 mà không méo hình. | [Xem CODE-CSS-22](#code-css-22) | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 7–8; slide 49–50) |
| CSS | <a id="row-css-29"></a> **Tạo kiểu biểu mẫu (Form Styling) và Attribute Selector (`input[type="..."]`)** | **Nội dung tài liệu:** Các điều khiển biểu mẫu (`<input>`, `<textarea>`, `<fieldset>`, `<legend>`, `<label>`) có thể được chọn đích danh theo thuộc tính bằng Attribute selector như `input[type="text"]`, `input[type="email"]`, `input[type="submit"]`, kết hợp `border`, `border-radius`, `padding`, `margin`, `width: 100%` và pseudo-class `:hover`.<br>**Áp dụng UIT Discovery:** UIT Discovery chuẩn hóa `input, select` trong `style.css` (dòng 417–439) với `display: block; width: 100%; min-height: 44px; padding: 9px 12px; border-radius: var(--radius-sm);` và `input::placeholder`, dùng chung cho ô tìm kiếm `#topic-search` (`topics/index.html`) và bộ lọc `#lecturer-search`, `#lecturer-group` (`lecturers/index.html`), đồng thời kế thừa `font: inherit; color: inherit;` trong `reset.css`. Attribute selector còn được dùng cho `[hidden]`, `[aria-current="page"]`, `[aria-pressed="true"]`, `[data-domain-tone="1..6"]`. | [Xem CODE-CSS-23](#code-css-23) | `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 9–10; slide 51–52) |
| CSS | <a id="row-css-30"></a> **Thuộc tính `color` (Màu nội dung tiền cảnh)** | **Nội dung tài liệu:** Thuộc tính `color` đặt màu cho nội dung tiền cảnh (foreground) của phần tử được chọn, chủ yếu là văn bản (và là giá trị mặc định cho `currentColor` của đường viền/SVG nếu không chỉ định màu riêng).<br>**Áp dụng UIT Discovery:** UIT Discovery đặt `color: var(--color-text)` trên `body` và dùng biến ngữ nghĩa `--color-muted`, `--color-link`, `--color-on-primary`, `--color-domain-*-accent` để tự động đảm bảo tỷ lệ tương phản WCAG AA trên cả hai nền Light và Dark mode. | [Xem CODE-CSS-24](#code-css-24) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 5–7; slide 57–59) |
| CSS | <a id="row-css-31"></a> **Thuộc tính `font-family`, Web Safe Fonts, 5 Generic Fonts và Font Stacks** | **Nội dung tài liệu:** Thuộc tính `font-family` chỉ định phông chữ áp dụng; trình duyệt chỉ hiển thị phông có sẵn trên máy người dùng nếu không có sẽ rơi về phông mặc định. CSS định nghĩa 5 tên chung (generic families): `serif`, `sans-serif`, `monospace`, `cursive`, `fantasy`. Vì không thể đảm bảo mọi phông đều có mặt, ta dùng font stack liệt kê theo thứ tự ưu tiên từ tên phông cụ thể (tên có khoảng trắng đặt trong ngoặc kép) đến tên generic ở cuối ngăn xếp.<br>**Áp dụng UIT Discovery:** UIT Discovery định nghĩa font stack hệ thống tối ưu hiệu năng ngay trong `:root` (`style.css` dòng 27–28): `--font-body: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;` và `--font-heading: var(--font-body);`. Dùng system font stack giúp hiển thị sắc nét chữ tiếng Việt có dấu ngay lập tức (zero font-download latency, FCP/LCP tối ưu). | [Xem CODE-CSS-25](#code-css-25) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 8–12; slide 60–64); `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 8; slide 103) |
| CSS | <a id="row-css-32"></a> **Thuộc tính `font-size` và các đơn vị kích thước (`px`, `em`, `rem`)** | **Nội dung tài liệu:** Ba đơn vị kích thước phổ biến cho văn bản: `px` (đơn vị tuyệt đối theo pixel), `em` (1em bằng `font-size` của phần tử cha, dễ tích lũy khi lồng nhau), và `rem` (1rem luôn bằng `font-size` của phần tử gốc `<html>` nên dễ tính toán). Slide 66 minh họa kỹ thuật đặt `html { font-size: 10px; }` để `5rem` = 50px và `1.5rem` = 15px.<br>**Áp dụng UIT Discovery:** UIT Discovery hiện dùng `px` trực tiếp (với `font-size: 16px` ở `body`, `h1` 26px/32px, `h2` 22px, `h3` 18px) kết hợp `clamp()` co giãn mượt (`clamp(32px, 4vw, 52px)` trên `#page-home h1`) thay vì thủ thuật `html { font-size: 10px; }` (vì ép `html` xuống `10px` có thể ghi đè cỡ chữ mặc định của người dùng nếu không đổi lại bằng `%`). Nếu nâng cấp quy mô chữ theo tùy chọn trình duyệt, nên dùng `rem` dựa trên mặc định `100%` (`16px`). | [Xem CODE-CSS-26](#code-css-26) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 13–14; slide 65–66) |
| CSS | <a id="row-css-33"></a> **Thuộc tính `font-style` (`normal`, `italic`, `oblique`)** | **Nội dung tài liệu:** `font-style` dùng để bật hoặc tắt kiểu chữ nghiêng: `normal` (bình thường), `italic` (dùng phiên bản chữ nghiêng thực thụ thiết kế sẵn trong font), `oblique` (nghiêng mô phỏng từ chữ đứng).<br>**Áp dụng UIT Discovery:** UIT Discovery ưu tiên giữ chữ đứng dễ đọc cho nội dung nghiên cứu và chú thích học thuật; nếu cần nhấn thuật ngữ hoặc trích dẫn dùng thẻ HTML ngữ nghĩa `<em>` (mặc định trình duyệt là `italic`) kết hợp `font-style: italic` khi cần ghi chú phụ. | Không có mẫu trong tài liệu | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 15–16; slide 67–68) |
| CSS | <a id="row-css-34"></a> **Thuộc tính `font-weight` (Độ đậm chữ)** | **Nội dung tài liệu:** `font-weight` đặt độ đậm chữ với các từ khóa `normal`, `bold`, giá trị tương đối so với phần tử cha (`lighter`, `bolder`) hoặc thang số chi tiết `100–900` (400 là normal, 700 là bold).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng thang số `500` (`.badge`, `.lecturer-tag`, `.lecturers-status`), `600` (`.site-nav__link`, `.btn`, `.topic-row__title`, `.mindmap-node--root`, `.mindmap-node--pillar`) và `700` (`h1`, `h2`, `h3`, `.eyebrow`, `.metric-card__value`) để phân cấp thị giác rõ ràng mà không cần nhiều màu sắc sặc sỡ. | [Xem CODE-CSS-27](#code-css-27) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 17, 20; slide 69, 72) |
| CSS | <a id="row-css-35"></a> **Thuộc tính `text-transform` (Biến đổi chữ hoa/thường)** | **Nội dung tài liệu:** `text-transform` chuyển đổi hiển thị kiểu chữ hoa/thường trên CSS mà không thay đổi nội dung HTML gốc: `none`, `uppercase`, `lowercase`, `capitalize`, `full-width` (chủ yếu cho ký tự Á Đông rộng cố định).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, các nhãn eyebrow (`UIT DISCOVERY · KHỞI ĐẦU NGHIÊN CỨU`, `ĐIỂM KHỞI ĐẦU`) được viết hoa trực tiếp trong HTML kèm `letter-spacing: 1.4px`. Nên giữ thói quen dùng `text-transform: uppercase` trong CSS nếu muốn tách hiển thị khỏi văn bản gốc tiếng Việt để trình đọc màn hình đọc tự nhiên theo từng từ thay vì đánh vần. | [Xem CODE-CSS-28](#code-css-28) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 18, 20; slide 70, 72) |
| CSS | <a id="row-css-36"></a> **Thuộc tính `text-decoration` (Trang trí gạch chân/gạch ngang văn bản)** | **Nội dung tài liệu:** `text-decoration` đặt hoặc hủy đường trang trí chữ: `none`, `underline`, `overline`, `line-through`, và có thể kết hợp nhiều giá trị đồng thời.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `text-decoration: none` cho nút `.btn`, `.site-header__brand`, `.site-nav__link`, `.topic-row__title a`, `.lecturer-card__email` và bật `text-decoration: underline` khi `:hover` (kết hợp `text-underline-offset: 3px; text-decoration-thickness: 2px;` trên `a`), giúp nhận diện liên kết rõ ràng mà vẫn gọn mắt.<br>*Ghi chú nguồn:* Slide 71 liệt kê 4 giá trị của text-decoration bằng sơ đồ; ví dụ dùng text-decoration: none xuất hiện ở 28_6.3 slide 101. | Không có mẫu trong tài liệu | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 19–20; slide 71–72) |
| CSS | <a id="row-css-37"></a> **Thuộc tính `text-shadow` (Đổ bóng văn bản đơn và nhiều lớp bóng)** | **Nội dung tài liệu:** `text-shadow` đổ bóng cho chữ với 4 tham số: độ lệch ngang (`offset-x`), độ lệch dọc (`offset-y`), bán kính mờ (`blur-radius`) và màu bóng; hỗ trợ áp dụng nhiều lớp bóng chồng nhau bằng cách phân tách bởi dấu phẩy.<br>**Áp dụng UIT Discovery:** UIT Discovery không dùng `text-shadow` vì phong cách giao diện học thuật phẳng, độ tương phản cao giữa chữ và nền giúp văn bản dễ đọc và không gây nhòe trên màn hình độ phân giải thấp hoặc Dark mode. | [Xem CODE-CSS-29](#code-css-29) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 21–22; slide 73–74) |
| CSS | <a id="row-css-38"></a> **Thuộc tính `text-align` (Căn lề văn bản)** | **Nội dung tài liệu:** `text-align` kiểm soát cách căn chỉnh nội dung văn bản/inline bên trong hộp khối: `left`, `right`, `center`, `justify`.<br>**Áp dụng UIT Discovery:** UIT Discovery chủ yếu căn trái mặc định cho văn bản tiếng Việt dài để tránh tạo khoảng trắng loang lổ (không dùng `justify`), chỉ dùng `text-align: center` cho trạng thái rỗng `.topics-empty`, `.lecturers-empty` và `text-align: left` cho nút `.mindmap-node__card`.<br>*Ghi chú nguồn:* Slide 75 nêu text-align: center cho `<h1>` và hiển thị kết quả căn giữa (không in khối code CSS riêng); ví dụ code đầy đủ có ở 28_6.3 slide 101 (text-align: center;). | Không có mẫu trong tài liệu | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 23; slide 75) |
| CSS | <a id="row-css-39"></a> **Thuộc tính `line-height` (Chiều cao dòng văn bản)** | **Nội dung tài liệu:** `line-height` thiết lập chiều cao mỗi dòng văn bản, nhận đơn vị độ dài hoặc giá trị không đơn vị (unitless) — khi không có đơn vị, trình duyệt lấy giá trị đó nhân với `font-size` của phần tử để tính chiều cao dòng.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng giá trị `line-height` không đơn vị chuẩn xác trên toàn hệ thống: `1.6` trên `body`, `1.3` cho tiêu đề `h1..h3`, `1.5` cho mô tả ngắn `.topic-row__summary` và node mindmap, `1.7` cho `.mindmap-drawer__text`, giúp văn bản tiếng Việt có dấu (mũ/dấu nặng) không bị dính dòng. | `line-height: 1.6;` | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 24; slide 76) |
| CSS | <a id="row-css-40"></a> **Thuộc tính `letter-spacing` và `word-spacing` (Khoảng cách chữ cái và từ)** | **Nội dung tài liệu:** `letter-spacing` điều chỉnh khoảng cách giữa các ký tự và `word-spacing` điều chỉnh khoảng cách giữa các từ trong văn bản.<br>**Áp dụng UIT Discovery:** UIT Discovery tinh chỉnh `letter-spacing` tinh tế theo cỡ chữ: kéo chặt nhẹ cho tiêu đề lớn (`-0.8px` trên `.page-header h1`, `-1.4px` trên `#page-home h1`, `-0.5px` trên `.site-header__brand`) và nới thoáng cho chữ nhỏ viết hoa (`.eyebrow` `1.4px`, `.home__visual-label` `1.5px`, `.lecturer-card__avatar` `0.4px`). | [Xem CODE-CSS-30](#code-css-30) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 25; slide 77) |
| CSS | <a id="row-css-41"></a> **Pseudo-element `::first-line` (Tạo kiểu dòng đầu tiên của đoạn văn)** | **Nội dung tài liệu:** Pseudo-element dùng hai dấu hai chấm `::` (như `p::first-line`) chọn một phần ảo bên trong phần tử — cụ thể là dòng đầu tiên hiển thị thực tế của đoạn `<p>` (tự động co giãn theo độ rộng khung chứa).<br>**Áp dụng UIT Discovery:** UIT Discovery chưa cần `::first-line` cho giao diện tra cứu thẻ ngắn gọn, nhưng sử dụng rộng rãi các pseudo-element cùng họ `::before`, `::after`, `::backdrop`, `::placeholder` (`reset.css`, `topics.css` `::before` cho dấu `✓`, `topic-detail.css` `::before` cho `+`/`−` và `::backdrop` cho `<dialog>`). | [Xem CODE-CSS-31](#code-css-31) | `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 25; slide 77) |
| CSS | <a id="row-css-42"></a> **Định dạng mặc định (Box spacing) của các thẻ danh sách (`<ul>`, `<ol>`, `<li>`, `<dl>`, `<dd>`)** | **Nội dung tài liệu:** Trình duyệt áp dụng mặc định cho `<ul>` và `<ol>`: `margin` trên/dưới 16px (`1em`) và `padding-left` 40px (`2.5em`); `<li>` không có khoảng cách mặc định; `<dl>` có lề trên/dưới 16px (`1em`) không padding; `<dd>` có `margin-left` 40px (`2.5em`); `<p>` có lề trên/dưới 16px (`1em`).<br>**Áp dụng UIT Discovery:** Nắm rõ định dạng mặc định này giải thích vì sao `reset.css` của UIT Discovery xóa `margin: 0` trên `ul, ol, dl, dd, p` nhưng giữ nguyên `padding-left` mặc định (hoặc đặt `padding-left: 20px`/`22px` trong `.reading-guide ol`, `.profile-areas`, `.mindmap-drawer__prereqs`), còn các danh sách làm menu/thẻ (`.site-nav__list`, `.home__step-list`) xóa cả `padding: 0` và `list-style: none`.<br>*Ghi chú nguồn:* Slide 80 liệt kê HTML mẫu danh sách `<ul>` và `<ol>`; slide 81 trình bày bảng thông số mặc định trình duyệt. | Không có mẫu trong tài liệu | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 2–4; slide 79–81) |
| CSS | <a id="row-css-43"></a> **Đồng bộ khoảng cách & nhịp dọc (Vertical Rhythm) cho danh sách và đoạn văn** | **Nội dung tài liệu:** Để trang có sự nhất quán thị giác: (1) Đặt phông chữ và `font-size: 10px` cơ sở ở `html` để mọi phần tử con kế thừa; (2) Đặt `font-size` tương đối cho tiêu đề (`2rem`), danh sách và đoạn văn (`ul,ol,dl,p { font-size: 1.5rem; }`) để giữ tỷ lệ chữ và lề trên/dưới đồng nhất; (3) Đặt cùng `line-height: 1.5` trên `li, p` và `dd, dt`; (4) Tô đậm `dt { font-weight: bold; }` để nổi bật thuật ngữ trong `<dl>`.<br>**Áp dụng UIT Discovery:** UIT Discovery đồng bộ nhịp dọc qua hệ token `--space-1..--space-8` (`4px` đến `48px`) và giữ cùng `font-size`/`line-height` giữa văn bản đoạn `<p>` và mục danh sách `<li>` trong `.reading-guide` (`style.css` dòng 562–570) cũng như `.mindmap-drawer__prereqs` (`topic-detail.css` dòng 489–496). | [Xem CODE-CSS-32](#code-css-32) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 5–7; slide 82–84) |
| CSS | <a id="row-css-44"></a> **Inheritance (Cơ chế kế thừa thuộc tính CSS và từ khóa `inherit`)** | **Nội dung tài liệu:** Một số thuộc tính CSS (đặc biệt là kiểu chữ như `font-family`, `font-size`, `color`, `line-height`) khi khai báo ở phần tử cha/gốc `html` sẽ tự động được các phần tử con cháu kế thừa xuống dưới (slide 82); ngược lại, các thuộc tính bố cục như `float` hay `height` mặc định không kế thừa nhưng có thể ép kế thừa rõ ràng từ phần tử cha bằng từ khóa `inherit` (như `float: inherit` ở slide 116 hoặc `height: inherit` ở Lab 6).<br>**Áp dụng UIT Discovery:** UIT Discovery khai thác mạnh cơ chế kế thừa: đặt `font-family`, `font-size`, `line-height`, `color` ở `body` cho toàn trang tự thừa hưởng, và bắt buộc dùng `font: inherit; color: inherit;` trong `reset.css` (dòng 56–62) cho `input, button, textarea, select` vì các điều khiển biểu mẫu không tự kế thừa font/màu từ `body` theo mặc định trình duyệt. | [Xem CODE-CSS-33](#code-css-33) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 5; slide 82); `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 12; slide 116); `LABs/12_LAB 6_Lab6-1-start/style.css` (dòng 10–13) |
| CSS | <a id="row-css-45"></a> **Thuộc tính `list-style-type` (Kiểu dấu đầu dòng danh sách)** | **Nội dung tài liệu:** `list-style-type` quy định kiểu ký hiệu đầu dòng cho `<ul>` hoặc `<ol>`, chẳng hạn hình vuông, hình tròn, chữ cái, số La Mã in hoa (`upper-roman`) hoặc `none` để ẩn dấu đầu dòng.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `list-style: none` cho danh sách điều hướng/bước/đề tài (`.site-nav__list`, `.home__step-list`, `.related-topics-list`, `.knowledge-list`) và giữ kiểu đánh số/bullet mặc định (hoặc `padding-left: 20px`) cho danh sách nội dung thực thụ như `.reading-guide ol`, `.profile-areas`, `.mindmap-drawer__prereqs`. | [Xem CODE-CSS-34](#code-css-34) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 8–9; slide 85–86) |
| CSS | <a id="row-css-46"></a> **Thuộc tính `list-style-position` (`inside` / `outside`)** | **Nội dung tài liệu:** `list-style-position` đặt vị trí dấu đầu dòng nằm bên ngoài khối nội dung mục danh sách (`outside` — mặc định) hoặc thụt vào bên trong dòng đầu tiên của mục danh sách (`inside`).<br>**Áp dụng UIT Discovery:** Khi hiển thị các danh sách dài như lĩnh vực nghiên cứu `.profile-areas` hay kiến thức tiên quyết `.mindmap-drawer__prereqs`, UIT Discovery giữ mặc định `outside` để các dòng văn bản dài thẳng cột lề trái gọn gàng, không bị lệch thẳng dưới dấu chấm. | [Xem CODE-CSS-35](#code-css-35) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 10; slide 87) |
| CSS | <a id="row-css-47"></a> **Tùy chỉnh biểu tượng danh sách bằng `list-style-image` và kỹ thuật `background-*` thay thế** | **Nội dung tài liệu:** `list-style-image` cho phép dùng ảnh làm bullet nhưng khó kiểm soát kích thước và vị trí. Giải pháp tốt hơn là ẩn bullet mặc định (`list-style-type: none;`), chỉnh `padding-left` cho `<ul>` và `ul li`, rồi dùng `background-image`, `background-position: 0 0;`, `background-size`, `background-repeat: no-repeat;` trên `<li>`.<br>**Áp dụng UIT Discovery:** Thay vì dùng `list-style-image` khó căn chỉnh hoặc tải ảnh raster cho bullet, UIT Discovery dùng đánh số CSS/DOM rõ ràng (`.home__step-number` ô số `01/02/03`) hoặc dấu pseudo-element `::before` nhẹ bằng ký tự/CSS thuần (`✓`, `+`, `−`), đạt độ sắc nét trên mọi DPI và tự đổi màu theo theme sáng/tối. | [Xem CODE-CSS-36](#code-css-36) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 11–14; slide 88–91) |
| CSS | <a id="row-css-48"></a> **Thuộc tính viết tắt `list-style` (Shorthand)** | **Nội dung tài liệu:** Cả ba thuộc tính `list-style-type`, `list-style-image` và `list-style-position` có thể viết gộp trong một thuộc tính viết tắt duy nhất là `list-style` (theo thứ tự giá trị bất kỳ).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `list-style: none` trong `.site-nav__list`, `.home__step-list`, `.related-topics-list`, `.knowledge-list` và `.knowledge-section__summary` (vì thẻ `<summary>` mặc định `display: list-item` có mũi tên tam giác nên dùng `list-style: none` + `::-webkit-details-marker { display: none; }` để thay bằng icon `+`/`−` đồng bộ). | [Xem CODE-CSS-37](#code-css-37) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 15; slide 92) |
| CSS | <a id="row-css-49"></a> **Kiểm soát đánh số danh sách `<ol>` với thuộc tính HTML `start`, `reversed`, `value`** | **Nội dung tài liệu:** Thuộc tính HTML trên `<ol>` và `<li>` giúp điều khiển cách đếm của danh sách có thứ tự: `start` đặt số bắt đầu khác 1, `reversed` đếm ngược xuống thay vì tăng lên, và `value` đặt giá trị số cụ thể cho từng thẻ `<li>`.<br>**Áp dụng UIT Discovery:** UIT Discovery hiện dùng `<ol class="home__step-list">` (hành trình 3 bước `01`, `02`, `03` tạo kiểu riêng qua `.home__step-number`) và `<ol>` trong `.reading-guide`. Nếu cần hiển thị danh sách bước tiếp nối nhiều đoạn hoặc bảng xếp hạng ngược, có thể áp dụng trực tiếp `start`/`reversed` mà không cần JS đếm thủ công. | [Xem CODE-CSS-38](#code-css-38) | `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 16–18; slide 93–95) |
| CSS | <a id="row-css-50"></a> **Pseudo-classes trạng thái liên kết theo thứ tự (`:link`, `:visited`, `:focus`, `:hover`, `:active`)** | **Nội dung tài liệu:** Liên kết `<a>` tồn tại 5 trạng thái tương tác được định nghĩa theo trình tự `a:link`, `a:visited`, `a:focus`, `a:hover`, `a:active` (thứ tự LVFHA giúp trạng thái sau như `:hover` và `:active` không bị `:visited` hay `:link` ghi đè khi cùng specificity).<br>**Áp dụng UIT Discovery:** UIT Discovery triển khai đầy đủ trạng thái tương tác cho liên kết và nút: `:hover` (đổi độ dày gạch chân / màu chữ), `:focus-visible` (`outline: 3px solid var(--color-focus); outline-offset: 3px;` để giữ tiếp cận bàn phím rõ nét mà không hiện khung khi click chuột), `:active:not(:disabled)` (`filter: brightness(0.9)`), kèm `transition` 150ms mượt. | [Xem CODE-CSS-39](#code-css-39) | `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 2–3; slide 97–98) |
| CSS | <a id="row-css-51"></a> **Chèn biểu tượng liên kết ngoài bằng Attribute Substring Selector (`[href*="..."]`) và `background`** | **Nội dung tài liệu:** Kết hợp Attribute selector (ví dụ `a[href*="#"]` hoặc `[href^="http"]`) với `background: url(...) no-repeat 100% 0;`, `background-size: 16px 16px;` và `padding-right: 19px;` để hiển thị biểu tượng chỉ báo loại đích đến ở cuối liên kết.<br>**Áp dụng UIT Discovery:** Trong `lecturers/detail/index.html` (các link hồ sơ ngoài như Google Scholar, ORCID, trang khoa UIT), thay vì dùng ảnh PNG nền cố định màu đen dễ chìm trên Dark mode như slide 99, UIT Discovery nên giữ mũi tên Unicode `↗` (đã dùng ở nút CTA trang chủ `Khám phá chủ đề ↗`) hoặc SVG inline kế thừa `currentColor`, đồng thời bảo đảm `rel="noopener noreferrer"`. | [Xem CODE-CSS-40](#code-css-40) | `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 4; slide 99) |
| CSS | <a id="row-css-52"></a> **Biến liên kết thành dạng nút bấm (Button-style Links) và Pseudo-class `:last-child`** | **Nội dung tài liệu:** Liên kết `<a>` trong thanh điều hướng có thể tạo kiểu trông giống nút bấm nhờ `text-decoration: none;`, `display: inline-block;`, `width`, `margin-right`, `text-align: center;`, `line-height: 3;`, kết hợp `li:last-child a { margin-right: 0; }` để loại bỏ lề phải của phần tử cuối cùng và đặt màu nền cho `:link/:visited/:focus/:hover/:active`.<br>**Áp dụng UIT Discovery:** UIT Discovery kế thừa tư duy biến thẻ `<a>` thành nút ở hai nơi: (1) Thanh điều hướng `.site-nav__link` (dùng Flexbox `display: flex; align-items: center; min-height: 44px; border-radius: var(--radius-sm);` cùng `gap: 8px` trên `.site-nav__list` thay cho tính % thủ công + `li:last-child` kiểu cũ); (2) Các nút CTA điều hướng `<a class="btn">` và `<a class="btn btn--outline">`. LƯU Ý QUAN TRỌNG: KHÔNG sao chép `outline: none;` từ slide 101 vì làm mất vòng tiêu điểm bàn phím, thay bằng `:focus-visible` trong `style.css`. | [Xem CODE-CSS-41](#code-css-41) | `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 5–6; slide 100–101) |
| CSS | <a id="row-css-53"></a> **Web Fonts với quy tắc `@font-face` và định dạng `.woff2`** | **Nội dung tài liệu:** CSS cho phép nhúng các tệp phông chữ từ web để mọi trình duyệt tải về và hiển thị đồng nhất thông qua quy tắc `@font-face` đặt ở đầu CSS (khai báo tên `font-family` và đường dẫn `src: url("myFont.woff2");`), sau đó gọi tên đó kèm fallback stack trong `html`.<br>**Áp dụng UIT Discovery:** UIT Discovery chủ động KHÔNG tải web font ngoài qua `@font-face` hoặc Google Fonts để đạt điểm Performance tối đa (không tốn request font nặng, không bị FOIT/CLS khi mạng chậm) mà dùng `--font-body: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;`. Nếu về sau cần gắn phông thương hiệu riêng, nên tự host file `.woff2` cục bộ với `@font-face` và thêm `font-display: swap;`. | [Xem CODE-CSS-42](#code-css-42) | `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 9; slide 104) |
| CSS | <a id="row-css-54"></a> **Chuẩn hóa mô hình hộp với `box-sizing: border-box` (Lab 3)** | **Nội dung tài liệu:** Trong tệp khởi đầu Lab 3, quy tắc `* { box-sizing: border-box; }` tính cả `padding` và `border` vào bên trong `width`/`height` đã khai báo của mọi phần tử, giúp việc chia tỷ lệ cột (như 50% + 30% + 20% kèm `padding: 20px`) không bị tràn tổng chiều rộng 100%.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng nguyên vẹn kỹ thuật này ngay đầu `assets/css/reset.css` (dòng 9–13) mở rộng thêm pseudo-element: `*, *::before, *::after { box-sizing: border-box; }`, đảm bảo mọi thẻ, card, input và lưới CSS Grid không bị vỡ kích thước do padding/border. | [Xem CODE-CSS-43](#code-css-43) | `LABs/06_LAB 3_Lab3-1-start/style.css` (dòng 3–5) |
| CSS | <a id="row-css-55"></a> **Khung trang `min-width`/`max-width`, `margin: 0 auto` và bố cục 3 cột `float`/`clear` trong file khởi đầu Lab 3** | **Nội dung tài liệu:** Tệp khởi đầu Lab 3 định kích thước khung `body` bằng `margin: 0 auto; min-width: 1000px; max-width: 1400px;`, chia bố cục 3 cột bằng `float: left;` (`section` 50%, `aside` 30%, `nav` 20%) và dùng `footer { clear: both; }` cùng `header, footer { border-top/bottom: 5px solid #a66; }`.<br>**Áp dụng UIT Discovery:** ÁP DỤNG CÓ CHỌN LỌC & CẤM PHẦN BỐ CỤC CŨ: UIT Discovery giữ tư duy căn giữa container (`max-width: var(--container-max); margin-inline: auto;` trong `.container`), nhưng TUYỆT ĐỐI CẤM dùng `float: left` để chia 3 cột layout và CẤM đặt `min-width: 1000px` trên `body` (vì gây thanh cuộn ngang trên mobile/tablet; `style.css` đặt `body { min-width: 0; }` và dùng Flexbox/CSS Grid + Media Queries). | [Xem CODE-CSS-44](#code-css-44) | `LABs/06_LAB 3_Lab3-1-start/style.css` (dòng 7–43); `slides_drive/29_IE104 _ LAB 3.pdf` / `LABs/05_LAB 3_BT3.1.2.pdf` (tr. 1–2) |
| CSS | <a id="row-css-56"></a> **Yêu cầu thực hành Lab 3: `@font-face`, tỷ lệ chữ `10px`/`rem`, `text-indent` sau tiêu đề** | **Nội dung tài liệu:** Đề Lab 3 yêu cầu thực hành kết hợp kiến thức Chương 5–6: tải font miễn phí (serif cho văn bản, sans-serif hoặc slab-serif cho tiêu đề) khai báo bằng `@font-face`; đặt cỡ chữ trang `10px` và dùng đơn vị tương đối (`rem`/`em`) cho tiêu đề và `line-height`; canh giữa `<h1>`; tăng `letter-spacing` tiêu đề và `letter-spacing`/`word-spacing` body; thụt lề đoạn đầu tiên ngay sau mỗi tiêu đề trong `<section>` (ví dụ `20px` qua `text-indent` và combinator `+`).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, kiểu thụt lề `text-indent: 20px` phù hợp cho bài báo in dài cổ điển nhưng KHÔNG phù hợp cho giao diện thẻ/danh mục ngắn kiểu web hiện đại — dự án ưu tiên dùng khoảng cách `margin`/`gap` giữa các khối và giới hạn độ dài dòng `max-width: 65ch` / `75ch` / `80ch` (`.page-header__desc`, `.reading-guide`, `.profile-section__text`) để tối ưu khả năng đọc lướt.<br>*Ghi chú nguồn:* Mục 3.1 và 3.2 của đề Lab 3 mô tả yêu cầu bằng văn bản (không in code đáp án trong PDF). | Không có mẫu trong tài liệu | `slides_drive/29_IE104 _ LAB 3.pdf` / `LABs/05_LAB 3_BT3.1.2.pdf` (tr. 2) |
| CSS | <a id="row-css-57"></a> **Yêu cầu thực hành Lab 3: Trạng thái liên kết, xóa focus outline, icon external-link và menu điều hướng** | **Nội dung tài liệu:** Mục 3.3–3.5 đề Lab 3 yêu cầu: đồng bộ màu `link`, `visited`, `focus`, `hover` với màu viền trang (`#a66`); mặc định có gạch chân, mất gạch chân khi `hover`/`focus`; xóa `focus outline` mặc định; tạo kiểu nổi bật cho `:active`; gắn `external-link-52.png` sau liên kết ngoài; đồng bộ khoảng cách danh sách như đoạn văn và thiết kế thanh điều hướng `<nav>` dạng khối nút dọc (như ảnh tham khảo trang 4).<br>**Áp dụng UIT Discovery:** UIT Discovery kế thừa phần đồng bộ màu liên kết với hệ màu chủ đạo và thiết kế điều hướng dạng nút, nhưng CẢI TIẾN VỀ ACCESSIBILITY: KHÔNG xóa focus outline toàn cục (vì vi phạm WCAG nếu không có thay thế); UIT Discovery dùng `:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 3px; }` để người dùng bàn phím luôn thấy vị trí focus và giữ trạng thái trang hiện tại bằng `[aria-current="page"]`. | Không có mẫu trong tài liệu | `slides_drive/29_IE104 _ LAB 3.pdf` / `LABs/05_LAB 3_BT3.1.2.pdf` (tr. 2–4) |
| CSS | <a id="row-css-58"></a> **Tổng quan các kỹ thuật bố cục CSS và khái niệm phối hợp đa kỹ thuật** | **Nội dung tài liệu:** Bố cục trang CSS gồm 8 kỹ thuật: Normal flow, thuộc tính `display`, Flexbox, Grid Layout, Floats, Positioning, Table layout và Multi-column layout. Mỗi kỹ thuật có công dụng, ưu/nhược điểm riêng và không có kỹ thuật nào được thiết kế để sử dụng cô lập một mình.<br>**Áp dụng UIT Discovery:** UIT Discovery phối hợp đúng mục đích các kỹ thuật hiện đại: Normal Flow cho dòng văn bản tự nhiên, Flexbox cho header/nav/pagination/toolbar/footer, CSS Grid cho bố cục 2–3 cột và lưới thẻ giảng viên, và Positioning cho các lớp tương tác đặc thù (`.skip-link`, `.home__orbit`, `.mindmap-stage`, `.mindmap-node`, `.mindmap-component--expanded`). Loại bỏ hoàn toàn `float` và `display: table`. | [Xem CODE-CSS-45](#code-css-45) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 3–4; slide 107–108) |
| CSS | <a id="row-css-59"></a> **Thuộc tính `display` (`inline`, `inline-block`, `block`)** | **Nội dung tài liệu:** Các phương pháp bố cục CSS đều xoay quanh thuộc tính `display` nhằm thay đổi hành vi hiển thị mặc định: `inline` (nằm cùng dòng văn bản, bỏ qua `width`/`height`), `inline-block` (nằm trên dòng nhưng cho phép đặt `width`/`height` và padding/margin đầy đủ), `block` (chiếm trọn dòng mới, tự xuống hàng).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng chuẩn xác cả 3 giá trị: `display: block` cho `img, svg, canvas`, `input, select` để xếp đầy chiều rộng và bỏ khoảng hở baseline dưới ảnh; `display: inline-block` cho `.badge`, `.lecturer-tag`, `.topics-summary`; và `display: inline-flex` / `flex` / `grid` cho nút bấm, thẻ, bố cục.<br>*Ghi chú nguồn:* Slide 109–111 chỉ ghi tiêu đề 'display: inline', 'display: inline-block', 'display: block' kèm ảnh minh họa hộp màu vàng trong đoạn văn. | Không có mẫu trong tài liệu | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 5–7; slide 109–111) |
| CSS | <a id="row-css-60"></a> **Giới thiệu Flexbox (`display: flex`, `flex: 1`) và Child Combinator (`>`)** | **Nội dung tài liệu:** Flexbox (Flexible Box Layout) sắp xếp các phần tử theo một chiều (một hàng hoặc một cột). Đặt `display: flex;` ở phần tử cha và dùng `flex: 1;` trên các phần tử con trực tiếp (chọn qua child combinator `.wrapper > div`) cho phép phần tử tự mở rộng hoặc thu nhỏ chia đều không gian có sẵn.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng rộng rãi Child combinator `>` kết hợp `display: flex` và `flex: 1`: `main { flex: 1; }` đẩy footer xuống đáy trang (sticky footer), `.mindmap-node__card { flex: 1; }`, `.knowledge-section__title { flex: 1; }`, và `#page-topic-detail .topic-picker > :not(.topic-picker__list) { flex-shrink: 0; }` (`topic-detail.css` dòng 645). | [Xem CODE-CSS-46](#code-css-46) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 8–9; slide 112–113) |
| CSS | <a id="row-css-61"></a> **Giới thiệu CSS Grid (`display: grid`, `grid-template-columns`, `grid-template-rows`, `grid-gap`)** | **Nội dung tài liệu:** CSS Grid Layout được thiết kế cho bố cục hai chiều theo cả hàng và cột. Container khai báo `display: grid;`, định nghĩa cột/hàng qua `grid-template-columns`, `grid-template-rows` và khoảng cách qua `grid-gap`. Có thể chỉ định vị trí rõ ràng cho từng ô bằng `grid-column` và `grid-row` thay vì tự động sắp xếp.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng CSS Grid làm xương sống cho mọi bố cục 2 chiều: Hero 2 cột (`#page-home .home__hero`), lưới 3 bước (`#page-home .home__step-list`), lưới danh bạ giảng viên (`#page-lecturers .lecturers-grid`), bộ lọc (`#page-lecturers .lecturers-filter`), hàng đề tài (`.topic-row`). Lưu ý: dùng `gap` (chuẩn hiện đại) thay cho tên cũ `grid-gap` trong slide 114–115. | [Xem CODE-CSS-47](#code-css-47) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 10–11; slide 114–115) |
| CSS | <a id="row-css-62"></a> **Giới thiệu Positioning và vị trí mặc định trong Normal Flow (`static`)** | **Nội dung tài liệu:** Positioning cho phép dời một phần tử ra khỏi vị trí mặc định trong normal flow. Slide nhấn mạnh Positioning KHÔNG phải là phương pháp để tạo bố cục chính của trang web mà chỉ dùng để tinh chỉnh vị trí các mục cụ thể. Mặc định (`static`), phần tử nằm tuần tự theo normal flow.<br>**Áp dụng UIT Discovery:** UIT Discovery tuân thủ đúng cảnh báo của slide 118: không dùng `position` để xếp layout chính (Header/Main/Footer/Grid đều dùng Flex/Grid), chỉ dùng `position` cho các thành phần phủ/neo cụ thể như `.skip-link`, `.home__orbit`, `.mindmap-node`, `.mindmap-component--expanded`, `.mindmap-drawer`, `.knowledge-help`. | [Xem CODE-CSS-48](#code-css-48) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 14–15; slide 118–119) |
| CSS | <a id="row-css-63"></a> **CSS Table Layout (`display: table`, `table-row`, `table-cell`, `table-caption`, `caption-side`)** | **Nội dung tài liệu:** Các thuộc tính hiển thị bảng (`display: table`, `table-row`, `table-cell`, `table-caption` và `caption-side: bottom`) có thể dùng để căn chỉnh thẳng cột cho phần tử không phải bảng như biểu mẫu `<form>` (chú thích `<p>` chạy xuống đáy như `<caption>`).<br>**Áp dụng UIT Discovery:** KHÔNG KHUYẾN NGHỊ / KHÔNG DÙNG trong UIT Discovery: kỹ thuật CSS Table Layout là giải pháp lịch sử trước khi có Flexbox và CSS Grid, kém linh hoạt khi chuyển bố cục 1 cột trên mobile. UIT Discovery thay thế hoàn toàn bằng CSS Grid và Flexbox cho bộ lọc `#lecturer-filter` (`lecturers.css`) và `.form-group` (`style.css`). | [Xem CODE-CSS-49](#code-css-49) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 20–21; slide 124–125) |
| CSS | <a id="row-css-64"></a> **Normal Flow (Luồng tài liệu chuẩn: Block-level, Inline và Margin Collapsing)** | **Nội dung tài liệu:** Theo mặc định trong Normal Flow: phần tử cấp khối (block-level) chiếm 100% chiều rộng khả dụng của phần tử cha, xếp chồng theo chiều dọc và tách nhau bởi margin (các margin dọc liền kề gộp lại theo Margin Collapsing thành chiều rộng của margin lớn hơn chứ không cộng dồn); phần tử nội tuyến (inline) chỉ có kích thước theo nội dung, xếp cùng dòng với nhau và không đặt trực tiếp được `width`/`height` trừ khi đổi sang `display: block` hoặc `display: inline-block`.<br>**Áp dụng UIT Discovery:** UIT Discovery dựa vào Normal Flow cho bố cục dọc bên trong nội dung bài/thẻ (`<p>`, `<h1>..<h3>`, `.breadcrumb`, `.page-header`, `.roadmap-header`), đồng thời lưu ý cơ chế `display: inline-flex` ở các link (`.topic-row__title a`, `.breadcrumb a`, `.lecturer-card__email`) để đạt kích thước chạm tối thiểu `min-height: 44px` trên di động. | [Xem CODE-CSS-50](#code-css-50) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 1–2; slide 127–128) |
| CSS | <a id="row-css-65"></a> **Mô hình trục Flexbox (Main Axis, Cross Axis, Flex Container & Flex Item)** | **Nội dung tài liệu:** Flexbox hoạt động quanh 2 trục vuông góc: Main axis (trục chính chạy theo hướng bố trí flex item, từ `main start` tới `main end`) và Cross axis (trục phụ vuông góc với main axis, từ `cross start` tới `cross end`). Phần tử cha có `display: flex` gọi là Flex container; các con trực tiếp bên trong là Flex item.<br>**Áp dụng UIT Discovery:** UIT Discovery vận dụng trục linh hoạt trên nhiều breakpoint: chẳng hạn `.site-header__inner` và `#page-lecturer-detail .profile-header` giữ trục ngang mặc định (`row`) trên desktop nhưng đổi sang trục dọc (`flex-direction: column`) trên mobile ở `.profile-header` (`lecturer-detail.css` dòng 346) hoặc cho `.site-nav` xuống hàng mới qua `order: 3; flex-basis: 100%;` (`style.css` dòng 307–308).<br>*Ghi chú nguồn:* Slide 130 trình bày sơ đồ giải phẫu flex container, flex item, main axis/size/start/end và cross axis/size/start/end. | Không có mẫu trong tài liệu | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 3–4; slide 129–130) |
| CSS | <a id="row-css-66"></a> **Ngắt dòng trong Flexbox (`flex-wrap: wrap` và kích thước cơ sở `flex: 200px`)** | **Nội dung tài liệu:** Khi các flex item có kích thước cố định vượt quá bề rộng vùng chứa, chúng sẽ làm tràn container và phá vỡ bố cục. Khắc phục bằng cách thêm `flex-wrap: wrap;` ở flex container (cho phép các item tự xuống dòng mới) và đặt kích thước mục tiêu như `flex: 200px;` trên flex item.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `flex-wrap: wrap;` trên hầu hết các hàng nút, tag và bộ lọc (`#page-home .home__actions`, `#page-topics .topics-groups`, `#page-topics .topics-pagination`, `#page-lecturers .lecturer-card__tags`, `#page-topic-detail .mindmap-toolbar`, `#page-lecturer-detail .metrics-grid`) để không bao giờ bị tràn ngang trên màn hình 320px–375px. | [Xem CODE-CSS-51](#code-css-51) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 5–6; slide 131–132) |
| CSS | <a id="row-css-67"></a> **Chia tỷ lệ Flex Item (`flex: <grow> <basis>`) và Pseudo-class `:nth-of-type()`** | **Nội dung tài liệu:** Thuộc tính viết tắt `flex` kết hợp tỷ lệ tăng kích thước (`flex-grow`) với kích thước cơ sở (`flex-basis`), ví dụ `flex: 1 200px;` và `article:nth-of-type(3) { flex: 2 200px; }`: mọi item có tối thiểu 200px trước, sau đó không gian dư chia theo tỷ lệ 1 : 1 : 2. Pseudo-class `:nth-of-type(3)` chọn phần tử thứ 3 cùng loại thẻ trong cha.<br>**Áp dụng UIT Discovery:** UIT Discovery tận dụng cú pháp shorthand `flex` đầy đủ (`flex: 1 1 160px` ở `.topics-groups__label`, `flex: 0 0 auto` ở `.topics-groups__button` và `.mindmap-node__toggle`, `flex: 0 0 40px` ở `.lecturer-card__avatar`, `flex: 1 1 auto` ở `#btn-zoom-reset` trên mobile) để kiểm soát phần tử nào được co giãn và phần tử nào giữ kích thước cố định. | [Xem CODE-CSS-52](#code-css-52) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 7; slide 133) |
| CSS | <a id="row-css-68"></a> **Căn chỉnh trục trong Flexbox (`align-items` và `justify-content`)** | **Nội dung tài liệu:** `align-items` căn chỉnh flex item dọc theo cross axis (`stretch`, `center`, `flex-start`, `flex-end`), còn `justify-content` căn chỉnh và phân phối khoảng trống dọc theo main axis (`flex-start`, `flex-end`, `center`, `space-around`, `space-between`).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `align-items: center; justify-content: center;` cho mọi nút/phân trang/avatar (`.btn`, `.theme-toggle`, `.lecturers-pagination__button`, `.mindmap-tool-btn`, `.home__step-number`), và `justify-content: space-between;` cho thanh công cụ/tiêu đề (`.mindmap-toolbar`, `.mindmap-drawer__header`, `.topic-footer`, `.lecturer-card__footer`). | [Xem CODE-CSS-53](#code-css-53) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 8–9; slide 134–135) |
| CSS | <a id="row-css-69"></a> **Lồng nhiều Flexbox (Nested Flexboxes) và thuộc tính viết tắt `flex-flow`** | **Nội dung tài liệu:** Một phần tử vừa có thể là flex item của cha vừa là flex container cho các con bên trong, cho phép dựng bố cục phức tạp. Thuộc tính `flex-flow` gộp chung `flex-direction` và `flex-wrap` (như `flex-flow: column;` hoặc `flex-flow: row wrap;`), kết hợp `flex: 1 auto;` và pseudo-class `:first-child`.<br>**Áp dụng UIT Discovery:** UIT Discovery lồng Flexbox hợp lý cho các thanh thành phần đa tầng như `.site-header__inner` (flex container ngang) chứa `.site-nav__list` (flex container con), hay `#page-topic-detail .mindmap-component--expanded` (`flex-direction: column`) chứa `.mindmap-toolbar` (`flex-wrap: wrap`, `justify-content: space-between`) chứa `.mindmap-toolbar__views` và `.mindmap-toolbar__controls`. | [Xem CODE-CSS-54](#code-css-54) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 10–12; slide 136–138) |
| CSS | <a id="row-css-70"></a> **Định nghĩa CSS Grid (`display: grid` và `grid-template-columns` cố định)** | **Nội dung tài liệu:** Grid là tập hợp các đường ngang và dọc tạo cấu trúc đồng nhất gồm hàng (rows), cột (columns) và khoảng trống giữa chúng (gutters). Đặt `display: grid;` lên container và khai báo kích thước cột bằng `grid-template-columns` (vd `200px 200px 200px`).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, tránh cứng hóa lưới bằng pixel tuyệt đối (`200px 200px 200px`) vì dễ tràn trên mobile; thay vào đó dùng kết hợp `minmax(0, 1fr)` và `repeat(...)` theo Media Queries (`1fr` trên mobile -> `repeat(2, minmax(0, 1fr))` ở `>= 768px` -> `repeat(3, minmax(0, 1fr))` ở `>= 1024px` cho `.lecturers-grid`). Chú ý `minmax(0, 1fr)` tránh lỗi nội dung dài làm phình cột vượt khung! | [Xem CODE-CSS-55](#code-css-55) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 14–15; slide 140–141) |
| CSS | <a id="row-css-71"></a> **Đơn vị `fr` (Fraction Unit) trong CSS Grid** | **Nội dung tài liệu:** Đơn vị `fr` đại diện cho một phần phân số của không gian còn dư khả dụng trong grid container, cho phép chia tỷ lệ cột/hàng linh hoạt theo độ rộng khung nhìn (vd `2fr 1fr 1fr` chia thành 4 phần bằng nhau với cột 1 chiếm 2 phần).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng đơn vị `fr` xuyên suốt cho lưới co giãn: `#page-home .home__hero` dùng `grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);` (`style.css` dòng 1026), `#page-lecturers .lecturers-grid` dùng `repeat(2/3, minmax(0, 1fr))`, `#page-lecturers .lecturers-filter` dùng `minmax(0, 1fr) 240px auto`, và `.topic-row` dùng `minmax(0, 1fr) auto`. | [Xem CODE-CSS-56](#code-css-56) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 16; slide 142) |
| CSS | <a id="row-css-72"></a> **Khoảng cách rãnh lưới (`gap`, `column-gap`, `row-gap`)** | **Nội dung tài liệu:** Tạo khoảng cách (gutter) giữa các cột và dòng trong Grid bằng `column-gap`, `row-gap` hoặc thuộc tính gộp `gap` (ví dụ `gap: 20px;`).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng chuẩn `gap`, `row-gap`/`column-gap` (và hỗ trợ cả trong Flexbox lẫn CSS Grid): `gap: 4px 12px` ở `.site-header__inner`, `column-gap: 24px` ở `.topic-row` desktop, `gap: 16px` ở `.lecturers-grid`, `gap: clamp(32px, 4vw, 52px)` ở `.home__hero` desktop. | [Xem CODE-CSS-57](#code-css-57) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 17; slide 143) |
| CSS | <a id="row-css-73"></a> **Định vị phần tử theo đường lưới (Line-based Grid Placement: `grid-column`, `grid-row`)** | **Nội dung tài liệu:** Có thể đặt item vào vùng lưới chỉ định bằng 4 thuộc tính lẻ (`grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`) hoặc 2 thuộc tính viết tắt `grid-column` và `grid-row` phân tách đường bắt đầu và kết thúc bởi dấu `/` (vd `grid-column: 1 / 3;`).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng thành thạo đặt vị trí theo grid line và `span`: `.home__visual-label`, `.home__concept--main`, `.home__visual-caption` dùng `grid-column: 1 / -1;` trải full chiều ngang khung minh họa (`style.css`); `.topic-row` trên desktop đặt `.topic-row__title/summary/meta` vào `grid-column: 1; grid-row: 1/2/3;` còn `.topic-row__group` vào `grid-column: 2; grid-row: 1;` (`style.css` dòng 694–713), và ở `lecturer-detail.css` dòng 289 dùng `grid-row: 1 / span 2;`. | [Xem CODE-CSS-58](#code-css-58) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 18–19; slide 144–145) |
| CSS | <a id="row-css-74"></a> **Bố cục vùng đặt tên trong CSS Grid (`grid-template-areas` và `grid-area`)** | **Nội dung tài liệu:** Thuộc tính `grid-template-areas` trên container mô tả trực quan sơ đồ lưới theo tên từng vùng (dạng chuỗi hàng), còn từng phần tử con dùng `grid-area` để gán vào vùng tên tương ứng.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng `grid-column: 1 / -1` và `grid-column`/`grid-row` cho các lưới nhỏ (`home__hero`, `home__visual`, `topic-row`). Với bố cục trang tổng thể nhiều vùng phức tạp hơn (vd thêm sidebar cố định), `grid-template-areas` là công cụ rất sạch để tái sắp xếp vùng trên mobile mà không đổi HTML. | [Xem CODE-CSS-59](#code-css-59) | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 20; slide 146) |
| CSS | <a id="row-css-75"></a> **Khái niệm Grid Framework 12/16 cột và đánh số Grid Line âm/dương** | **Nội dung tài liệu:** Các hệ lưới thường dựa trên 12 hoặc 16 cột; trên lưới CSS Grid 12 cột, các đường lưới dọc được đánh số dương từ `1` đến `13` (trái sang phải) và số âm từ `-13` đến `-1` (phải sang trái), giúp trải phần tử chạm mép cuối dễ dàng bằng `-1`.<br>**Áp dụng UIT Discovery:** UIT Discovery KHÔNG sử dụng hệ lưới 12 cột của framework CSS như Bootstrap (bị CẤM theo quy chuẩn IE104), nhưng áp dụng trực tiếp mẹo đánh số grid line âm `grid-column: 1 / -1;` của CSS Grid thuần để phần tử tiêu đề/chú thích luôn kéo hết chiều ngang lưới bất kể số cột.<br>*Ghi chú nguồn:* Slide 147 minh họa sơ đồ lưới 12 cột với đánh số line 1..13 và -13..-1. | Không có mẫu trong tài liệu | `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 21; slide 147) |
| CSS | <a id="row-css-76"></a> **Công dụng và cơ chế `float` cho văn bản bao quanh phần tử (Simple Float)** | **Nội dung tài liệu:** `float` ban đầu ra đời để làm nổi một ảnh/khối bên trong cột văn bản cho chữ bao quanh trái hoặc phải, sau đó được mở rộng dùng tạo bố cục nhiều cột cổ điển. Khi chỉ định `float: left;` cho `.box`, các đoạn `<p>` kế tiếp chảy vòng quanh; hộp nền của `.special` thực chất vẫn kéo rộng bên dưới `.box` nhưng chữ bên trong bị đẩy né `.box`.<br>**Áp dụng UIT Discovery:** HẠN CHẾ / CẤM CHIA BỐ CỤC CHÍNH: Trong UIT Discovery tuyệt đối cấm dùng `float` để dựng bố cục nhiều cột (đã dùng Flexbox và CSS Grid thay thế hoàn toàn). Chỉ cho phép `float` đúng nguyên bản nếu có hình minh họa nằm trong khối văn bản cần chữ chảy bao quanh. | [Xem CODE-CSS-60](#code-css-60) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 12–13; slide 116–117); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 2–7; slide 149–154) |
| CSS | <a id="row-css-77"></a> **Thuộc tính `clear` (`left`, `right`, `both`) — Ngắt luồng Float** | **Nội dung tài liệu:** Thuộc tính `clear` ngăn một phần tử xuất hiện cạnh phần tử đang float trước đó và đẩy nó xuống bên dưới phần tử float, nhận các giá trị `left`, `right`, `both`.<br>**Áp dụng UIT Discovery:** Vì UIT Discovery không dùng `float` trong toàn bộ 6 file CSS nên không phát sinh nhu cầu `.clearfix` hay `clear: both`. Nếu có bài viết dùng `float` cho ảnh nội dòng, cần bọc container bằng `display: flow-root` (hoặc `clear: both`) để tránh sập chiều cao khối cha. | [Xem CODE-CSS-61](#code-css-61) | `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 8; slide 155) |
| CSS | <a id="row-css-78"></a> **Định vị tương đối `position: relative`** | **Nội dung tài liệu:** `position: relative` giữ nguyên chỗ của phần tử trong normal flow nhưng cho phép dịch chuyển nó tương đối so với vị trí mặc định thông qua `top`, `right`, `bottom`, `left` (có thể chồng lên phần tử khác mà không đẩy các phần tử xung quanh dịch theo); đồng thời làm gốc tọa độ (containing block) cho phần tử con `position: absolute`.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `position: relative` chủ yếu làm containing block gốc tọa độ cho các lớp con `position: absolute` bên trong: `.home__visual` (`style.css` dòng 800, kèm `.home__visual-label`, `.home__concept`, `.home__visual-caption` có `position: relative; z-index: 1;` để nổi lên trên `.home__orbit`), `.profile-page` (`lecturer-detail.css`), `.topic-detail` và `.mindmap-viewport` (`topic-detail.css`). | [Xem CODE-CSS-62](#code-css-62) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 16; slide 120); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 9; slide 156) |
| CSS | <a id="row-css-79"></a> **Định vị tuyệt đối `position: absolute`** | **Nội dung tài liệu:** `position: absolute` tách phần tử hoàn toàn khỏi normal flow (không còn chiếm chỗ trong luồng) và định vị nó bằng khoảng cách tới các cạnh của khối chứa được định vị gần nhất (positioned ancestor) hoặc khung chứa khởi đầu.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng `position: absolute` chuẩn xác cho các phần tử phủ/trang trí/tọa độ tự do (kết hợp `z-index` để kiểm soát lớp chồng, chú ý `z-index` là kỹ thuật bổ sung ngoài slide): `.skip-link` (`top: -100px; z-index: 100;` ẩn ngoài màn hình và hiện khi focus), `.sr-only`, `.home__orbit` (`z-index: 0; transform: translate(-50%, -50%)`), `.home__concept-mark`, `.topic-detail__loading`, `.mindmap-stage` (`inset: 0`), `.mindmap-svg`, `.mindmap-nodes`, `.mindmap-node`. | [Xem CODE-CSS-63](#code-css-63) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 17; slide 121); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 10; slide 157) |
| CSS | <a id="row-css-80"></a> **Định vị cố định theo viewport `position: fixed`** | **Nội dung tài liệu:** `position: fixed` tách phần tử khỏi normal flow và ghim cố định vị trí của nó tương đối với khung nhìn (viewport) của trình duyệt, nên không trôi đi khi người dùng cuộn trang (ví dụ thanh menu cố định hoặc tiêu đề ghim).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng `position: fixed` cho các lớp phủ toàn khung nhìn cần độc lập với vị trí cuộn: `.mindmap-component--expanded` (`inset: 0; z-index: 90;` giả lập fullscreen trên trình duyệt không hỗ trợ Fullscreen API), `.mindmap-drawer` (`inset: 0; margin: auto;`) và `.knowledge-help` tooltip (`z-index: 100`). Header `.site-header` cố tình giữ normal flow để tiết kiệm không gian dọc trên màn hình nhỏ. | [Xem CODE-CSS-64](#code-css-64) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 18; slide 122); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 11; slide 158) |
| CSS | <a id="row-css-81"></a> **Định vị kết hợp tĩnh và cố định `position: sticky`** | **Nội dung tài liệu:** `position: sticky` kết hợp định vị tĩnh và cố định: phần tử cuộn theo luồng bình thường cho tới khi chạm tới ngưỡng độ lệch (`top`/`left`...) so với viewport thì dính cố định tại vị trí đó trong phạm vi phần tử cha.<br>**Áp dụng UIT Discovery:** UIT Discovery hiện không đặt `.site-header` hay thanh lọc ở trạng thái `sticky` để giữ không gian đọc tối đa cho danh sách và sơ đồ tư duy trên laptop/điện thoại. Nếu về sau cần giữ thanh công cụ `.mindmap-toolbar` hoặc mục lục dài luôn trong tầm mắt khi cuộn, có thể áp dụng `position: sticky; top: 0;` (lưu ý tránh đặt `overflow: hidden` ở phần tử tổ tiên vì sẽ vô hiệu hóa `sticky`). | [Xem CODE-CSS-65](#code-css-65) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 19; slide 123); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 12; slide 159) |
| CSS | <a id="row-css-82"></a> **Multiple-column Layout (`column-count` và `column-width`)** | **Nội dung tài liệu:** Multi-column Layout cho phép chia dòng văn bản liên tục thành nhiều cột như trang báo bằng `column-count` (chỉ định số cột cố định, vd `3`) hoặc `column-width` (chỉ định bề rộng tối thiểu mỗi cột, vd `200px`, để trình duyệt tự tính số cột vừa màn hình).<br>**Áp dụng UIT Discovery:** KHÔNG PHÙ HỢP cho giao diện thẻ/danh sách của UIT Discovery: Multi-column chảy nội dung từ trên xuống dưới rồi vắt sang cột tiếp theo khiến người dùng phải cuộn lên xuống liên tục để đọc từng mục, không phù hợp với danh sách đề tài (`.topics-list`), lưới giảng viên (`.lecturers-grid`) hay thẻ lộ trình — dùng CSS Grid tốt hơn hẳn. | [Xem CODE-CSS-66](#code-css-66) | `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 22; slide 126); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 13–14; slide 160–161) |
| CSS | <a id="row-css-83"></a> **CSS khởi đầu Lab 4: Shorthand `font`, `img { max-width: 100%; display: block; }` & căn giữa `.grid`** | **Nội dung tài liệu:** Tệp khởi đầu Lab 4 minh họa: thuộc tính viết tắt `font: 1.2em / 1.2 Arial, Helvetica, sans-serif;` (cỡ chữ / chiều cao dòng + font stack); reset ảnh đáp ứng `img { max-width: 100%; display: block; }` chống tràn khung và bỏ khoảng hở chân dòng; căn giữa `.logo` và `.grid` với `max-width: 980px; margin: 0 auto;`; `list-style: none;` cho `nav ul` và `.photos`.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng toàn bộ nền tảng này: `<meta name="viewport" content="width=device-width, initial-scale=1" />` trên cả 5 trang HTML, `img, picture, svg, video, canvas { display: block; max-width: 100%; height: auto; }` trong `reset.css` (dòng 45–53), và `max-width: var(--container-max); margin-inline: auto;` trong `.container` (`style.css` dòng 245–250). Kết hợp thêm `@media` queries (kỹ thuật responsive mở rộng ngoài slide) tại `359px`, `360px`, `767px`, `768px`, `1024px`. | [Xem CODE-CSS-67](#code-css-67) | `LABs/08_LAB 4_Lab4-1-start/Lab4-1-start/styles.css` (dòng 1–51) |
| CSS | <a id="row-css-84"></a> **Tổng hợp kỹ thuật bố cục thực hành Lab 4: Sticky Nav, Flex Nav, Float ảnh trong `<article>`, Grid 2 cột & lưới ảnh `1px`** | **Nội dung tài liệu:** Bài tập Lab 4 yêu cầu không sửa HTML mà phối hợp 4 kỹ thuật bố cục CSS (Positioning, Float, Flexbox, CSS Grid) để giải quyết 5 bài toán thực tế: (3.1) Menu `<nav>` nằm ngang khoảng cách đều bằng Flexbox; (3.2) `<nav>` cuộn cùng trang rồi ghim ở đầu viewport bằng `position: sticky; top: 0;`; (3.3) Ảnh `.feature` trong `<article>` có chữ bao quanh bằng `float: left;`; (3.4) Bố cục 2 cột `<article>` và `<aside>` co giãn linh hoạt bằng Grid/Flex; (3.5) Lưới ảnh `.photos` 2 cột với `gap: 1px;` bằng CSS Grid.<br>**Áp dụng UIT Discovery:** Định hướng phối hợp kỹ thuật của Lab 4 khớp trực tiếp với kiến trúc UIT Discovery: dùng Flexbox cho điều hướng `.site-nav__list` (yêu cầu 3.1), dùng CSS Grid cho bố cục 2–3 cột co giãn (yêu cầu 3.4 & 3.5 — tránh dùng `float` chia 2 cột hay lưới ảnh như thời Lab 1/Lab 2), và chỉ giữ `float` ở đúng phạm vi ảnh nội dòng trong bài viết dài nếu có (yêu cầu 3.3).<br>*Ghi chú nguồn:* Tài liệu PDF Lab 4 mô tả 5 yêu cầu (3.1–3.5) bằng lời và ảnh kết quả tham khảo ở trang 2; đề khuyến khích thử nhiều kỹ thuật và tự nhận xét phương án tối ưu. | Không có mẫu trong tài liệu | `slides_drive/33_IE104 _ LAB 4.pdf` / `LABs/07_LAB 4_BT4.1.2.pdf` (tr. 1–2) |
| CSS | <a id="row-css-85"></a> **Định kiểu thư học thuật bằng class `.sender-column`, `max-width` và tỷ lệ `em` (Lab 1 Bài 1)** | **Nội dung tài liệu:** Bài 1 của Lab 1 cung cấp bộ CSS cơ bản đặt vào `<style>` trong `<head>` để định kiểu bức thư: căn giữa khung nội dung tối đa `800px` (`max-width: 800px; margin: 0 auto;`), tạo class `.sender-column { text-align: right; }` để đẩy địa chỉ người gửi sang phải, và dùng đơn vị tương đối `em` (`1.5em`, `1.3em`, `1.1em`) cùng `line-height: 1.5` cho văn bản, danh sách, `<address>`.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng tương tự mẫu `max-width` + `margin-inline: auto` cho `.container` (`--container-max: 1200px`) và `line-height: 1.5–1.6` cho toàn trang, nhưng đặt CSS ở tệp ngoài trong `assets/css/` thay vì `<style>` nội bộ và đặt tên class theo BEM thay vì `.sender-column`. | [Xem CODE-CSS-68](#code-css-68) | `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 3, 5) |
| CSS | <a id="row-css-86"></a> **Kỹ thuật Flexbox đa tầng & Universal Child Selector (`body > *`) trong Lab 1** | **Nội dung tài liệu:** Tệp CSS mẫu Lab 1 Bài 2 minh họa bố cục nhiều tầng bằng Flexbox thuần (`flex-flow: row wrap;` trên `<header>`, `flex: 5` cho `<h1>`, `flex: 100%` cho `<nav>`, `flex: 4` cho `<article>, <section>` và `flex: 1` cho `<aside>`), sử dụng `body > *` chọn mọi con trực tiếp của `<body>`, và dùng `aside a { display: block; float: left; width: 50%; }` xếp lưới ảnh 2 cột.<br>**Áp dụng UIT Discovery:** UIT Discovery kế thừa cách dùng Flexbox tỷ lệ và `flex-basis: 100%` (`.site-nav { order: 3; flex-basis: 100%; }` trong `style.css` dòng 306–309 để đưa thanh điều hướng xuống hàng dưới ở mobile), nhưng LOẠI BỎ `min-width: 800px` trên `body` và thay `float: left; width: 50%` bằng CSS Grid (`repeat(2, minmax(0, 1fr))`), cũng như tránh `body > *` để không tạo quy tắc rộng quá mức ngoài ý muốn. | [Xem CODE-CSS-69](#code-css-69) | `LABs/02_LAB 1_Lab1-2-start/assets/style.css` (dòng 53–62, 80–84, 126–130) |
| CSS | <a id="row-css-87"></a> **Bóng đổ nội tại đa lớp (`box-shadow: inset ...`), `.clearfix` và định vị logo tuyệt đối (Lab 2 Bài 1)** | **Nội dung tài liệu:** Khối `<style>` trong file khởi đầu Lab 2 Bài 1 dùng nền lặp `background: url(pattern.png);`, gắn `position: relative` trên `body` để định vị `header img { position: absolute; right: 32.5px; top: 32.5px; }`, tạo hiệu ứng viền chìm hai cạnh trên/dưới bằng hai `box-shadow` kiểu `inset` phân cách dấu phẩy, và dùng `<div class="clearfix"></div>` với `clear: both;` để đóng hàng `float: left; width: 25%;`.<br>**Áp dụng UIT Discovery:** UIT Discovery chỉ giữ token `--shadow-overlay` cho `<dialog>` và tooltip nổi (`.mindmap-drawer`, `.knowledge-help`), giữ `--shadow-soft: none` cho card để đạt thẩm mỹ học thuật tối giản; đồng thời TUYỆT ĐỐI KHÔNG dùng `.clearfix` + `float: left; width: 25%` cho hàng liên kết mà dùng CSS Grid/Flexbox với `gap`. | [Xem CODE-CSS-70](#code-css-70) | `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 69–89) |
| CSS | <a id="row-css-88"></a> **Tạo kiểu bảng dữ liệu (`border-collapse: collapse`, `tr:nth-child(even/odd)`, `<col>`, `tbody`, `tfoot`) từ Lab 2 & Chương 4** | **Nội dung tài liệu:** Để trình bày bảng HTML gọn gàng: dùng `border-collapse: collapse;` gộp viền kép giữa các ô thành một nét duy nhất; đồng bộ `border` và `padding` cho `td, th`; tô nền khác biệt cho `th` và xen kẽ sọc ngựa vằn các hàng dữ liệu bằng `tr:nth-child(even) td` và `tr:nth-child(odd) td`; kết hợp `tbody`, `tfoot` và `<col style="...">` để tạo kiểu theo nhóm hàng hoặc cột.<br>**Áp dụng UIT Discovery:** UIT Discovery hiện không trình bày danh sách đề tài/giảng viên bằng `<table>` (vì thẻ/hàng CSS Grid `.topic-row` co giãn responsive trên mobile tốt hơn bảng nhiều cột). Tuy nhiên, nếu đồ án mở rộng thêm bảng thống kê/so sánh số liệu nghiên cứu theo nhóm ngành, cần áp dụng bộ quy tắc `border-collapse: collapse` + `tr:nth-child(even/odd)` dùng biến `--color-border` và `--color-surface-muted` bọc trong vùng cuộn ngang `overflow-x: auto` trên mobile. | [Xem CODE-CSS-71](#code-css-71) | `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 6–7); `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 7; slide 120); `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 3; slide 126) |
| CSS | <a id="row-css-89"></a> **Ẩn/hiện giữ khung với `visibility: hidden` và lớp phủ tương tác `.overlay` + `cursor: pointer` (Lab 5)** | **Nội dung tài liệu:** Lab 5 Bài 1 dùng `visibility: hidden;` trên `<p class="story">` (ẩn phần tử về mặt hiển thị nhưng vẫn giữ nguyên khoảng không gian nó chiếm trong bố cục, khác với `display: none`). Lab 5 Bài 2 dùng `.full-img { position: relative; }` bao bọc `.overlay { position: absolute; top: 0; left: 0; width: 640px; height: 480px; background-color: rgba(0,0,0,0); }` và `button { position: absolute; cursor: pointer; top: 2px; left: 2px; }`.<br>**Áp dụng UIT Discovery:** UIT Discovery phân biệt rất chuẩn hai cơ chế ẩn phần tử này: dùng `[hidden] { display: none !important; }` (`reset.css` dòng 65–67) để ẩn hẳn khối không chiếm diện tích như `.topics-empty`, `#reset-filters`, `.mindmap-cards-view`; ngược lại dùng `visibility: hidden` cho `[aria-busy="true"] > :not(*__loading)` (`topic-detail.css` dòng 10–12, `lecturer-detail.css` dòng 11–13) để giữ khung trang ổn định trong lúc nạp JSON, tránh giật bố cục (CLS)! Cũng dùng `cursor: pointer` cho `button`, `summary`, `.mindmap-node__card` và `cursor: grab` / `grabbing` cho `.mindmap-viewport`. | [Xem CODE-CSS-72](#code-css-72) | `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/style.css` (dòng 11–36); `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 1–2) |
| CSS | <a id="row-css-90"></a> **Bố cục toàn màn hình `overflow: hidden`, `height: inherit` và chữ `color: transparent` (Lab 6)** | **Nội dung tài liệu:** Tệp `style.css` Lab 6 kết hợp `html { height: 100%; }` và `body { overflow: hidden; height: inherit; }` (kế thừa chiều cao 100% từ phần tử cha `html` và cắt bỏ thanh cuộn khi canvas phủ toàn màn hình), đồng thời đặt tiêu đề `<h1>` và bộ đếm `<p>` ở góc trên phải bằng `position: absolute; top: ...; right: 5px;` cùng hiệu ứng viền sáng `color: transparent; text-shadow: 0 0 4px white;`.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng kỹ thuật kiểm soát tràn và khóa cuộn đúng ngữ cảnh: `overflow: hidden` dùng cục bộ cho `.home__visual` (cắt phần vòng tròn `.home__orbit` vượt khung bo góc), `.mindmap-viewport` (cắt phần sơ đồ nằm ngoài vùng nhìn), `.lecturer-card__avatar`, `.sr-only`, và `#page-topic-detail.mindmap-scroll-locked { overflow: hidden; }` khi mở chế độ toàn màn hình. Tuyệt đối KHÔNG đặt `overflow: hidden` lên `body` ở trang đọc thông thường vì làm mất khả năng cuộn trang. | [Xem CODE-CSS-73](#code-css-73) | `LABs/12_LAB 6_Lab6-1-start/style.css` (dòng 5–25); `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 1–2, 11) |
| JS | <a id="row-js-01"></a> **JavaScript trong mô hình 3 lớp công nghệ Web (HTML - CSS - JavaScript)** | **Nội dung tài liệu:** JavaScript là ngôn ngữ lập trình kịch bản phía client, đóng vai trò lớp thứ ba chồng lên HTML (cấu trúc, ngữ nghĩa) và CSS (kiểu dáng, bố cục). JS cho phép tạo nội dung cập nhật động, điều khiển đa phương tiện, hoạt hình 2D / đồ họa 3D và tương tác người dùng (ví dụ nhấn vào thẻ `<p>` để mở hộp thoại prompt() và cập nhật textContent).<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng chuẩn mô hình 3 lớp tách biệt: HTML5 ngữ nghĩa ở 5 trang, CSS3 thuần theo BEM và Vanilla ES6+ JS trong assets/js/. Dự án dùng querySelector(), addEventListener() và textContent tương tự ví dụ nhập môn, nhưng không dùng prompt()/alert() chặn luồng người dùng mà dùng input/select/`<dialog>` và vùng status DOM. | [Xem CODE-JS-01](#code-js-01) | `slides_drive/34_8.1 Giới thiệu JavaScript cơ bản.pdf` (tr. 5–8) |
| JS | <a id="row-js-02"></a> **Phân loại Web APIs: Browser APIs vs Third-party APIs** | **Nội dung tài liệu:** APIs là tập hợp các khối mã xây dựng sẵn trên nền JavaScript phía máy khách. Gồm 2 nhóm chính: Browser APIs tích hợp sẵn trong trình duyệt (như DOM API, Geolocation API) và Third-party APIs của bên thứ ba phải nạp từ bên ngoài web (như Twitter API, Google Maps API).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng 100% Browser APIs tích hợp sẵn (DOM API, Fetch API, Web Storage API, History API, Fullscreen API, Pointer Events API, URL & URLSearchParams) và không tích hợp Third-party JS API hay SDK ngoài để đảm bảo gọn nhẹ, không phụ thuộc dịch vụ ngoài và tuân thủ quy chuẩn Vanilla IE104. | Không có mẫu trong tài liệu | `slides_drive/34_8.1 Giới thiệu JavaScript cơ bản.pdf` (tr. 9–11) |
| JS | <a id="row-js-03"></a> **Cơ chế nạp và thực thi tuần tự của JavaScript trong trình duyệt** | **Nội dung tài liệu:** Khi tải trang web, trình duyệt chạy mã HTML, CSS và JS bên trong tab trình duyệt theo thứ tự xuất hiện trên trang. Nếu JavaScript được tải và chạy trước khi phần tử HTML/CSS mà nó dự định truy vấn hoặc sửa đổi được phân tích xong thì có thể phát sinh lỗi.<br>**Áp dụng UIT Discovery:** UIT Discovery xử lý triệt để thứ tự thực thi: theme.js nạp đồng bộ trong `<head>` để đặt data-theme lên document.documentElement trước khi vẽ giao diện (chống nháy theme), còn việc gắn sự kiện nút .theme-toggle hoãn tới DOMContentLoaded; các script nghiệp vụ dùng `<script type="module">` (trì hoãn tương tự defer) kết hợp DOMContentLoaded. | Không có mẫu trong tài liệu | `slides_drive/34_8.1 Giới thiệu JavaScript cơ bản.pdf` (tr. 12–13) |
| JS | <a id="row-js-04"></a> **Internal JavaScript (`<script>` trong `<head>`) & Sự kiện DOMContentLoaded** | **Nội dung tài liệu:** Có thể chèn JavaScript trực tiếp trong phần tử `<script>` trước thẻ đóng `</head>`. Khi đặt trong `<head>`, cần bọc mã trong document.addEventListener("DOMContentLoaded", function() { ... }) để đợi DOM phân tích xong trước khi gọi querySelectorAll('button'), createElement('p') và appendChild(para).<br>**Áp dụng UIT Discovery:** Tất cả 5 trang của UIT Discovery tuân thủ quy chuẩn dùng document.addEventListener("DOMContentLoaded", ...) làm hàm khởi tạo chính (theme.js, home.js, topics.js, topic-detail.js, lecturers.js, lecturer-detail.js). Dự án tránh viết Internal JS trong HTML mà tách toàn bộ ra tệp .js riêng. | [Xem CODE-JS-02](#code-js-02) | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 3–5; slide 16–18) |
| JS | <a id="row-js-05"></a> **External JavaScript (`<script src="..." defer>` trong `<head>` & `<script>` cuối `<body>`)** | **Nội dung tài liệu:** Tách mã JS sang tệp riêng (script.js) và liên kết bằng `<script src="script.js" defer></script>`. Thuộc tính defer giúp trình duyệt tải song song script mà không chặn quá trình parse HTML và thực thi sau khi tài liệu sẵn sàng; giúp HTML sạch dễ đọc và tái sử dụng script trên nhiều trang. Ngoài cách đặt `<script src="script.js" defer>` trong `<head>`, các file starter Lab 5–6 đặt `<script src="...">` ngay trước thẻ đóng `</body>` để DOM phía trên được tạo xong trước khi mã chạy.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng External JS toàn phần (assets/js/*.js). Các script chính nhúng qua `<script type="module" src="...">` (theo chuẩn trình duyệt, ES Modules tự động có hành vi như defer), riêng assets/js/theme.js là classic script không defer trong `<head>` để áp dụng theme tức thời trước paint đầu tiên. | [Xem CODE-JS-03](#code-js-03) | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 6–7; slide 19–20); `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 25–26); `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 13–14) |
| JS | <a id="row-js-06"></a> **Inline JavaScript (onclick trong HTML) — Phản mẫu cần tránh** | **Nội dung tài liệu:** Slide minh họa cách viết JavaScript nội tuyến trực tiếp trong thuộc tính sự kiện của thẻ HTML (như `<button onclick="createParagraph()">`) và khuyến cáo KHÔNG nên dùng vì tổ chức mã nguồn kém và không hiệu quả.<br>**Áp dụng UIT Discovery:** UIT Discovery tuân thủ nghiêm ngặt khuyến cáo này: toàn bộ 5 tệp HTML (index.html, topics/, topics/detail/, lecturers/, lecturers/detail/) hoàn toàn không chứa thuộc tính onclick hay mã JS inline. | `<button onclick="createParagraph()">Click me!</button>` | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 8; slide 21) |
| JS | <a id="row-js-07"></a> **Tách biệt hành vi với addEventListener()** | **Nội dung tài liệu:** Thay vì nhúng sự kiện vào HTML, dùng JavaScript thuần chọn danh sách phần tử và gọi addEventListener('click', createParagraph) để gắn bộ lắng nghe sự kiện linh hoạt cho mọi phần tử hiện có cũng như dễ bảo trì khi thêm/xóa phần tử.<br>**Áp dụng UIT Discovery:** Mọi tương tác trong UIT Discovery (nút đổi theme, bộ lọc nhóm, phân trang, nút zoom/pan/fullscreen sơ đồ Mind Map, mở/đóng drawer, nút chuyển chủ đề nhanh) đều gắn hoàn toàn bằng addEventListener(), tận dụng thêm các tùy chọn hiện đại như { once: true } và { passive: true }. | [Xem CODE-JS-04](#code-js-04) | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 9; slide 22) |
| JS | <a id="row-js-08"></a> **Chú thích mã nguồn (Comments // và /* ... */)** | **Nội dung tài liệu:** JavaScript hỗ trợ chú thích một dòng (//) và nhiều dòng (/* ... */). Trình duyệt bỏ qua phần chú thích khi chạy, giúp giải thích luồng hoạt động cho lập trình viên, đặc biệt hữu ích trong các ứng dụng lớn.<br>**Áp dụng UIT Discovery:** Bắt buộc theo quy chuẩn chấm điểm Chất lượng code (30%) của môn IE104: mọi hàm trong assets/js/*.js của UIT Discovery đều có JSDoc block comment (/** ... @param ... @returns ... */) và inline comment (//) giải thích logic xử lý, điều kiện đặc biệt hoặc công thức bố cục. | [Xem CODE-JS-05](#code-js-05) | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 10; slide 23) |
| JS | <a id="row-js-09"></a> **Khắc phục sự cố JavaScript: Lỗi cú pháp vs Lỗi logic & 5 SyntaxError phổ biến** | **Nội dung tài liệu:** Phân biệt Lỗi cú pháp (làm chương trình không chạy hoặc dừng từng phần, thường có thông báo lỗi) và Lỗi logic (cú pháp đúng, chương trình chạy nhưng cho kết quả sai, khó gỡ hơn). Liệt kê 5 lỗi phổ biến: SyntaxError: missing ; before statement, missing ) after argument list, missing : after property id, missing } after function body, expected expression got 'string' / unterminated string literal.<br>**Áp dụng UIT Discovery:** UIT Discovery kiểm soát lỗi chặt chẽ qua cấu trúc code rõ ràng, kiểm tra điều kiện biên dữ liệu JSON (invalidGroup, invalidLecturer trong data.js), bọc try/catch khi gọi fetch() hoặc truy cập localStorage, đảm bảo không có lỗi runtime trong DevTools Console. | Không có mẫu trong tài liệu | `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 11–13; slide 24–26) |
| JS | <a id="row-js-10"></a> **Khái niệm biến, Khai báo (var/let) và Khởi tạo biến** | **Nội dung tài liệu:** Biến là vùng chứa giá trị (chuỗi, số, boolean, cấu trúc phức tạp hoặc hàm). Để sử dụng cần khai báo biến bằng var hoặc let (let myName;) rồi khởi tạo giá trị bằng dấu '=' (myName = 'Chris';) hoặc gộp cả hai (let myDog = 'Rover';). Ví dụ dùng prompt() lấy tên lưu vào biến name rồi gán vào headingA.textContent.<br>**Áp dụng UIT Discovery:** UIT Discovery khai báo biến rõ ràng bằng const/let theo ngữ nghĩa cụ thể. Dự án không dùng hàm chặn luồng prompt()/alert() như ví dụ nhập môn mà đọc giá trị từ ô tìm kiếm/bộ lọc DOM hoặc query URL (URLSearchParams). | [Xem CODE-JS-06](#code-js-06) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 2–6; slide 28–32) |
| JS | <a id="row-js-11"></a> **Sự khác biệt giữa var và let & Cơ chế Hoisting** | **Nội dung tài liệu:** var tồn tại từ bản JS đầu tiên, cho phép khai báo trùng tên nhiều lần và hoạt động theo cơ chế hoisting (ví dụ gán myName = 'Chris' và gọi logName() trước dòng var myName;). let ra đời trong JS hiện đại giúp khắc phục các vấn đề nhầm lẫn của var và không cho phép khai báo lại cùng biến; khuyến nghị ưu tiên dùng let.<br>**Áp dụng UIT Discovery:** Toàn bộ mã nguồn ES6+ Vanilla JS của UIT Discovery loại bỏ hoàn toàn từ khóa var, chỉ dùng const (mặc định) và let (cho biến đếm/trạng thái thay đổi như currentPage, preference, nodeCount) để đảm bảo phạm vi khối (block scope) an toàn. | [Xem CODE-JS-07](#code-js-07) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 7–8; slide 33–34) |
| JS | <a id="row-js-12"></a> **Cập nhật giá trị biến & Quy tắc đặt tên biến (camelCase)** | **Nội dung tài liệu:** Biến sau khi khởi tạo có thể gán lại giá trị mới (myName = 'Bob'; myAge = 40;). Khi đặt tên nên chỉ dùng ký tự Latinh (0-9, a-z, A-Z) và dấu '_', áp dụng camelCase (ví dụ hợp lý: age, myAge, initialColor, finalOutputValue, audio1; ví dụ không hợp lý: 1, a, _12, myage, MYAGE, var, Document, skjfndskjfnbdskjfb, thisisareallylongstupidvariablenameman).<br>**Áp dụng UIT Discovery:** UIT Discovery tuân thủ tuyệt đối quy ước camelCase cho mọi tên biến/hàm (researchGroups, groupToneMap, currentTopic, renderLecturers) theo quy chuẩn JS của IE104 và tránh tên tối nghĩa hoặc trùng từ khóa hệ thống. | [Xem CODE-JS-08](#code-js-08) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 9–10; slide 35–36) |
| JS | <a id="row-js-13"></a> **Các kiểu dữ liệu trong biến: Numbers, Strings, Booleans, Arrays, Objects** | **Nội dung tài liệu:** JavaScript không yêu cầu khai báo trước kiểu dữ liệu cho biến. Hỗ trợ lưu trữ số nguyên/số thập phân (Numbers), văn bản trong nháy đơn hoặc nháy kép (Strings), giá trị logic true/false (Booleans), danh sách giá trị trong [] (Arrays, truy cập qua chỉ số [0]) và cấu trúc mô hình hóa đối tượng thực tế với {} (Objects, truy cập qua dog.name).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng đầy đủ 5 kiểu dữ liệu này cùng cấu trúc ES6 hiện đại bổ sung như Set (lọc trùng email giảng viên, chọn nhóm OR trong topics.js) và Map (bộ nhớ đệm cache JSON và ánh xạ groupToneMap trong data.js). | [Xem CODE-JS-09](#code-js-09) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 11–14; slide 37–40) |
| JS | <a id="row-js-14"></a> **Dynamic Typing & Toán tử kiểm tra kiểu typeof** | **Nội dung tài liệu:** Do có kiểu động (Dynamic typing), cùng một biến có thể chứa kiểu chuỗi hoặc số tùy giá trị được gán (ví dụ '500' vẫn là kiểu string dù chứa chữ số, chỉ thành number khi gán 500). Có thể kiểm tra kiểu hiện tại bằng toán tử typeof.<br>**Áp dụng UIT Discovery:** Vì JS có kiểu động, UIT Discovery kiểm tra kiểu tường minh trước khi xử lý dữ liệu từ JSON hoặc tham số hàm, chẳng hạn dùng typeof fallbackIndex === "number" && Number.isFinite(fallbackIndex) trong resolveGroupTone() và Array.isArray() trong countTopicNodes() (data.js). | [Xem CODE-JS-10](#code-js-10) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 15; slide 41) |
| JS | <a id="row-js-15"></a> **Hằng số trong JavaScript (const)** | **Nội dung tài liệu:** Từ khóa const trong JavaScript hiện đại dùng để lưu các giá trị không thay đổi (hằng số), giúp tăng tính bảo mật, dễ gỡ lỗi và làm rõ ý nghĩa mã nguồn.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng const làm từ khóa mặc định cho hầu hết biến tham chiếu DOM, hàm nhập từ module, bảng cấu hình CONFIG (topic-detail.js), PAGE_SIZE (lecturers.js) và cache Map (data.js) để ngăn gán lại ngoài ý muốn. | [Xem CODE-JS-11](#code-js-11) | `slides_drive/36_8.3 Biến (variable).pdf` (tr. 16; slide 42) |
| JS | <a id="row-js-16"></a> **Số (Number), phương thức toFixed() và ép kiểu Number()** | **Nội dung tài liệu:** Trình bày khái niệm số nguyên, số dấu phẩy động và số thực độ chính xác kép. Đối tượng Number cung cấp phương thức toFixed(n) để làm tròn đến n chữ số thập phân cố định. Khi số nằm trong chuỗi ('74'), dùng hàm tạo Number(myNumber) để chuyển về kiểu số thực hiện phép tính.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng Number(pageCount) kết hợp Math.floor(), Math.max(), Math.min() trong getVisiblePages() (data.js) và tính toán tỷ lệ thu phóng scale / tọa độ SVG trong topic-detail.js. | [Xem CODE-JS-12](#code-js-12) | `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 2–4; slide 44–46) |
| JS | <a id="row-js-17"></a> **Toán tử số học, Tăng/giảm (++/--) và Toán tử gán (+=, -=, *=, /=)** | **Nội dung tài liệu:** Các toán tử số học cơ bản (+, -, *, /, %, **), toán tử tăng/giảm 1 đơn vị (++, --) và toán tử gán kết hợp (+=, -=, *=, /=) giúp tính toán và cập nhật giá trị biến ngắn gọn.<br>**Áp dụng UIT Discovery:** Dùng xuyên suốt trong UIT Discovery: tính toán số lượng node đệ quy (nodeCount++), băm chỉ số sắc độ nhóm ((index % 6) + 1 trong resolveGroupTone()), cộng dồn vị trí kéo thả panX += dx / panY += dy và căn chỉnh khung sơ đồ Mind Map trong topic-detail.js. | [Xem CODE-JS-13](#code-js-13) | `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 5–6; slide 47–48) |
| JS | <a id="row-js-18"></a> **Toán tử so sánh chặt (===, !==, <, >, <=, >=)** | **Nội dung tài liệu:** Toán tử so sánh dùng kiểm tra điều kiện trả về true/false để rẽ nhánh thực thi, nhấn mạnh phép so sánh bằng chặt === và khác chặt !==. Ví dụ kiểm tra btn.textContent === 'Start machine' để đảo trạng thái nút và đoạn văn.<br>**Áp dụng UIT Discovery:** UIT Discovery bắt buộc dùng so sánh chặt === và !== (ví dụ theme === "dark" trong theme.js, entry.group.id === query.group trong data.js, total <= 7 trong getVisiblePages()) nhằm tránh lỗi ép kiểu ngầm định của ==. | [Xem CODE-JS-14](#code-js-14) | `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 7–8; slide 49–50) |
| JS | <a id="row-js-19"></a> **Xử lý văn bản cơ bản (nháy đơn/kép) & Nối chuỗi (+)** | **Nội dung tài liệu:** Chuỗi văn bản được bao bởi nháy đơn '...' hoặc nháy kép "...". Dùng toán tử + để nối các chuỗi với nhau; khi nối chuỗi với số ('Front ' + 242), trình duyệt tự chuyển số thành chuỗi rồi ghép lại.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng chuẩn nháy kép nhất quán trong toàn bộ JS, kết hợp toán tử + ("data/" + file) và Template Literals ES6 (`${groupCount} nhóm chủ đề · ${topicCount} đề tài · ${lecturerCount} giảng viên` trong home.js) để ghép nhãn động sạch sẽ. | [Xem CODE-JS-15](#code-js-15) | `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 10–12; slide 52–54) |
| JS | <a id="row-js-20"></a> **Phương thức & thuộc tính chuỗi: length, [index], indexOf(), slice(), toLowerCase(), toUpperCase(), replace()** | **Nội dung tài liệu:** Cung cấp bộ thao tác chuỗi thiết yếu: .length lấy độ dài, [0] / [length-1] truy cập ký tự, .indexOf('zilla') tìm vị trí chuỗi con (-1 nếu không có), .slice(0,3) cắt chuỗi, .toLowerCase() / .toUpperCase() chuẩn hóa hoa thường (hữu ích trước khi lưu/so khớp), và .replace('moz','van') thay thế chuỗi con.<br>**Áp dụng UIT Discovery:** Áp dụng cốt lõi trong assets/js/data.js: searchText() chuỗi hóa .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().trim() để tìm kiếm tiếng Việt không dấu; normalizeEmail() dùng .trim().toLowerCase() chuẩn hóa email giảng viên. | [Xem CODE-JS-16](#code-js-16) | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 2–5; slide 56–59) |
| JS | <a id="row-js-21"></a> **Mảng (Arrays): Khởi tạo, Mảng nhiều chiều, Truy cập [] & Duyệt mảng với .length** | **Nội dung tài liệu:** Mảng chứa danh sách giá trị (có thể khác kiểu hoặc lồng mảng nhiều chiều như random[2][2]) trong cặp ngoặc vuông []. Truy cập từng phần tử theo chỉ mục từ 0, lấy số phần tử bằng .length và duyệt qua từng phần tử bằng vòng lặp for.<br>**Áp dụng UIT Discovery:** Toàn bộ danh mục nhóm, đề tài, danh bạ giảng viên và cây kiến thức phân cấp children[] trong research-data.json được xử lý bằng Array kết hợp các phương thức ES6+ (map, filter, flatMap, reduce, some, find, sort) trong data.js, topics.js, lecturers.js và topic-detail.js. | [Xem CODE-JS-17](#code-js-17) | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 7–9; slide 61–63) |
| JS | <a id="row-js-22"></a> **Câu lệnh điều kiện (if, else if, else, switch)** | **Nội dung tài liệu:** Cho phép thực hiện các nhánh hành động khác nhau dựa trên điều kiện logic thông qua cấu trúc if, if ... else, if ... else if ... else và switch (expression) { case ... break; default: ... }.<br>**Áp dụng UIT Discovery:** Dùng rộng rãi để xử lý luồng phân trang (getVisiblePages()), kiểm tra hợp lệ dữ liệu, ẩn/hiện trạng thái rỗng/lỗi, và rẽ nhánh phím điều hướng (switch/if theo e.key trong handleViewportKeydown của topic-detail.js). | [Xem CODE-JS-18](#code-js-18) | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 11–12; slide 65–66) |
| JS | <a id="row-js-23"></a> **Vòng lặp (for, for/in, for/of, while, do/while)** | **Nội dung tài liệu:** JavaScript hỗ trợ 5 loại vòng lặp: for (lặp số lần xác định), for/in (lặp thuộc tính đối tượng), for/of (lặp giá trị của iterable như Array/NodeList), while (kiểm tra điều kiện trước) và do/while (thực thi ít nhất 1 lần).<br>**Áp dụng UIT Discovery:** UIT Discovery ưu tiên for...of khi duyệt NodeList và mảng (for (const button of document.querySelectorAll(".theme-toggle")) trong theme.js, duyệt keywords trong countTopicNodes() của data.js) để mã gọn và an toàn; dùng for truyền thống khi cần chỉ mục tính hash chuỗi. | [Xem CODE-JS-19](#code-js-19) | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 13–14; slide 67–68) |
| JS | <a id="row-js-24"></a> **Hàm (JavaScript Functions)** | **Nội dung tài liệu:** Hàm là khối mã được thiết kế để thực hiện một tác vụ cụ thể và chỉ thực thi khi được gọi, nhận danh sách tham số đầu vào trong dấu ngoặc tròn.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng nguyên tắc Single Responsibility bắt buộc của môn IE104: tách nhỏ logic thành các hàm đơn nhiệm (loadResearch, flattenTopics, filterTopics, renderLecturers, buildMindMapTree), gắn JSDoc đầy đủ tham số và giá trị trả về. | [Xem CODE-JS-20](#code-js-20) | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 15; slide 69) |
| JS | <a id="row-js-25"></a> **Khái niệm Sự kiện HTML (HTML Events)** | **Nội dung tài liệu:** Sự kiện HTML là các tương tác xảy ra trên phần tử HTML (như click, load, thay đổi giá trị); JavaScript cho phép gắn mã thực thi phản hồi khi các sự kiện này được phát hiện.<br>**Áp dụng UIT Discovery:** Thay vì gắn thuộc tính sự kiện trực tiếp vào thẻ HTML như cú pháp tổng quát trên slide 70, UIT Discovery tách hoàn toàn phần lắng nghe sự kiện vào các file JS qua addEventListener() (click, input, change, submit, reset, pointerdown/move/up, keydown, wheel, fullscreenchange, storage).<br>*Ghi chú nguồn:* Trích nguyên văn cú pháp tổng quát trên slide 70 (pdf_page 16); slide 70 còn minh họa dạng dùng nháy kép. | `<element event='some JavaScript'>` | `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 16; slide 70) |
| JS | <a id="row-js-26"></a> **Đối tượng (Object Literal) & Truy xuất thuộc tính (Dot & Bracket Notation)** | **Nội dung tài liệu:** Đối tượng là tập hợp dữ liệu (thuộc tính name:value) và chức năng liên quan. Có thể khởi tạo bằng object literal { ... } và truy xuất thuộc tính theo hai cách: ký hiệu dấu chấm (objectName.propertyName) hoặc dấu ngoặc vuông (objectName["propertyName"]).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng Object literal để quản lý trạng thái trang (state trong topics.js và topic-detail.js), cấu hình hằng số (CONFIG, defaultGroupTones) và đọc dữ liệu lồng nhau từ research-data.json và lecturers.json (dùng bracket lookup defaultGroupTones[id] và dot notation topic.lecturer.email). | [Xem CODE-JS-21](#code-js-21) | `slides_drive/39_9.1 Kiến thức cơ bản hướng đối tượng.pdf` (tr. 3–10; slide 73–80) |
| JS | <a id="row-js-27"></a> **Phương thức đối tượng & Từ khóa "this"** | **Nội dung tài liệu:** Phương thức là hành động của đối tượng, lưu dưới dạng định nghĩa hàm trong thuộc tính và gọi qua objectName.methodName(). Trong định nghĩa phương thức, từ khóa this tham chiếu đến đối tượng 'sở hữu' (owner) hàm đó — ví dụ this.firstName truy xuất firstName của person.<br>**Áp dụng UIT Discovery:** UIT Discovery hiểu rõ cơ chế ràng buộc ngữ cảnh this (tránh mất ngữ cảnh khi truyền phương thức làm callback trong addEventListener như đã gặp ở Lab 6) và ưu tiên kiến trúc module/hàm thuần nhận tham số tường minh (topic, state) để giảm lỗi phụ thuộc this động. | [Xem CODE-JS-22](#code-js-22) | `slides_drive/39_9.1 Kiến thức cơ bản hướng đối tượng.pdf` (tr. 11–14; slide 81–84) |
| JS | <a id="row-js-28"></a> **ES6 class, phương thức constructor() & phương thức thể hiện** | **Nội dung tài liệu:** ECMAScript 2015 (ES6) giới thiệu từ khóa class làm khuôn mẫu tạo đối tượng. Phương thức constructor() phải đúng tên, tự động chạy khi gọi new ClassName(...) để khởi tạo thuộc tính (nếu bỏ trống JS tự tạo constructor rỗng). Các phương thức khác trong lớp nhận tham số và dùng cú pháp rút gọn như age(x).<br>**Áp dụng UIT Discovery:** Quy chuẩn IE104 định hướng dùng ES6 class (PascalCase như SlideShow) cho các component UI tái sử dụng. Trong UIT Discovery hiện tại, các trang dùng module ES6 chuyên biệt kết hợp cấu trúc @typedef JSDoc (MapNode, MapLink trong topic-detail.js), sẵn sàng đóng gói thành class nếu nhân bản widget sang nhiều trang. | [Xem CODE-JS-23](#code-js-23) | `slides_drive/40_9.2 JavaScript hướng đối tượng.pdf` (tr. 2–7; slide 86–91) |
| JS | <a id="row-js-29"></a> **Phương thức tĩnh (static) trong ES6 class** | **Nội dung tài liệu:** Phương thức static được định nghĩa trên chính lớp chứ không thuộc thể hiện: chỉ có thể gọi qua Car.hello(), nếu gọi myCar.hello() trên đối tượng sẽ phát sinh lỗi. Nếu muốn thao tác với dữ liệu thể hiện bên trong phương thức static, phải truyền đối tượng đó làm tham số (Car.hello(myCar)).<br>**Áp dụng UIT Discovery:** Các hàm tiện ích dùng chung không phụ thuộc trạng thái cá nhân trong UIT Discovery (như normalizeEmail, searchText, resolveGroupTone ở data.js) đóng vai trò tương đương các static utility methods nhưng được export trực tiếp dưới dạng ES Module functions để cây mã gọn và dễ tree-shake. | [Xem CODE-JS-24](#code-js-24) | `slides_drive/40_9.2 JavaScript hướng đối tượng.pdf` (tr. 8–10; slide 92–94) |
| JS | <a id="row-js-30"></a> **Object Constructor Function & Chuỗi nguyên mẫu (Object prototype)** | **Nội dung tài liệu:** JavaScript là ngôn ngữ dựa trên nguyên mẫu (prototype-based): mọi đối tượng kế thừa thuộc tính/phương thức từ prototype của nó, với Object.prototype ở đỉnh chuỗi (Date -> Date.prototype -> Object.prototype, Array -> Array.prototype -> Object.prototype). Có thể dùng hàm dựng function Person(...) cùng new Person(...) và gắn thuộc tính/phương thức chung vào Person.prototype. Slide cảnh báo: KHÔNG bao giờ sửa đổi prototype của các đối tượng JS tiêu chuẩn.<br>**Áp dụng UIT Discovery:** UIT Discovery khai thác đúng chuỗi nguyên mẫu chuẩn của JS (phương thức trên Array.prototype, String.prototype, Map.prototype, Set.prototype) và tuân thủ tuyệt đối cảnh báo không mở rộng/ghi đè các prototype built-in như Array.prototype hay Object.prototype. | [Xem CODE-JS-25](#code-js-25) | `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 2–7; slide 96–101) |
| JS | <a id="row-js-31"></a> **Kế thừa cơ bản trong JS (mượn constructor bằng .call)** | **Nội dung tài liệu:** Kế thừa các thuộc tính và phương thức khai báo trong thân hàm dựng cha bằng cách gọi this.super_ = Animal; this.super_.call(this, name);. Tuy nhiên cách này KHÔNG kế thừa các phương thức gắn trên Animal.prototype (nên gọi myDog.sayName() sẽ ném TypeError).<br>**Áp dụng UIT Discovery:** Kiến thức nền tảng giúp nhóm hiểu rõ hạn chế của việc chỉ gọi hàm dựng cha nếu quên nối prototype chain (như bài thực hành Lab 6 cần ghép cả Shape.call() lẫn Object.create(Shape.prototype)). | [Xem CODE-JS-26](#code-js-26) | `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 8–10; slide 102–104) |
| JS | <a id="row-js-32"></a> **Kế thừa prototype với Object.create()** | **Nội dung tài liệu:** Để kế thừa cả thuộc tính/phương thức trong constructor lẫn phương thức trên prototype của lớp cha, sử dụng Object.create(parent.prototype, { constructor: { value: child, enumerable: false, writable: true, configurable: true } }) nhằm tạo chuỗi nguyên mẫu đúng chuẩn và khôi phục con trỏ constructor.<br>**Áp dụng UIT Discovery:** Là kỹ thuật trực tiếp được yêu cầu trong Lab 6 để cho Ball và EvilCircle kế thừa Shape. Trong UIT Discovery, cấu trúc cây kiến thức xử lý bằng đệ quy và composition nên không cần dựng prototype inheritance thủ công. | [Xem CODE-JS-27](#code-js-27) | `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 11; slide 105) |
| JS | <a id="row-js-33"></a> **Kế thừa ES6 với class ... extends và super()** | **Nội dung tài liệu:** ES6 cung cấp từ khóa extends và hàm super(...) để thực hiện kế thừa prototype với cú pháp ngắn gọn, trực quan hơn nhiều so với Object.create() và .call().<br>**Áp dụng UIT Discovery:** Nếu UIT Discovery mở rộng nhiều loại nút hoặc lớp vẽ đồ họa kế thừa hành vi chung, nên dùng class ... extends / super() theo chuẩn ES6+ thay cho cú pháp prototype ES5 thủ công. | [Xem CODE-JS-28](#code-js-28) | `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 12; slide 106) |
| JS | <a id="row-js-34"></a> **Khái niệm & Cú pháp dữ liệu JSON** | **Nội dung tài liệu:** JSON (JavaScript Object Notation) là định dạng trao đổi dữ liệu văn bản nhẹ, độc lập ngôn ngữ, tự mô tả, đơn giản và dễ truy vấn hơn XML. Cú pháp là tập con của ký hiệu đối tượng JS: dữ liệu dạng cặp "tên": giá trị (tên đặt trong nháy kép), ngăn cách bằng dấu phẩy, mảng đặt trong [].<br>**Áp dụng UIT Discovery:** UIT Discovery dùng định dạng JSON cho toàn bộ tầng dữ liệu tĩnh cục bộ theo đúng chuẩn IE104: data/research-data.json (nhóm nghiên cứu, đề tài, cây keywords phân tầng) và data/lecturers.json (danh bạ giảng viên). | [Xem CODE-JS-29](#code-js-29) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 2–4; slide 108–110) |
| JS | <a id="row-js-35"></a> **Chuyển đổi dữ liệu JSON: JSON.stringify() & JSON.parse()** | **Nội dung tài liệu:** JavaScript cung cấp 2 phương thức chuẩn: JSON.stringify() chuyển JS Object thành chuỗi JSON, và JSON.parse() chuyển chuỗi JSON thành JS Object. Khi cần chỉnh sửa JSON trong JS, chuyển thành Object để sửa rồi stringify lại.<br>**Áp dụng UIT Discovery:** Khi nạp dữ liệu qua fetch() trong data.js, UIT Discovery dùng response.json() (tương đương cơ chế JSON.parse() trên luồng phản hồi). Khi cần lưu trạng thái đối tượng phức tạp vào localStorage/sessionStorage (ví dụ chủ đề yêu thích nếu mở rộng), phải kết hợp JSON.stringify() và JSON.parse() bọc try/catch. | [Xem CODE-JS-30](#code-js-30) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 5–6; slide 111–112) |
| JS | <a id="row-js-36"></a> **JSON Array & Truy xuất mảng trong đối tượng JSON** | **Nội dung tài liệu:** Mảng JSON tương tự mảng JS nhưng phần tử chỉ được mang kiểu chuỗi, số, đối tượng, mảng, boolean hoặc null (không chứa hàm, ngày tháng, undefined như JS Array). Sau khi JSON.parse(), có thể truy cập trực tiếp mảng lồng bên trong đối tượng như myObj.cars[0].<br>**Áp dụng UIT Discovery:** Cấu trúc data/research-data.json của UIT Discovery dùng mảng JSON lồng nhiều tầng (groups[] -> topics[] -> keywords[] -> children[], subjects[]) và xử lý thành công nhờ bảo đảm chỉ dùng kiểu JSON chuẩn (string, array, object). | [Xem CODE-JS-31](#code-js-31) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 7–9; slide 113–115) |
| JS | <a id="row-js-37"></a> **Trao đổi JSON với máy chủ (JSON Server & AJAX với XMLHttpRequest)** | **Nội dung tài liệu:** JSON thường dùng để gửi/nhận dữ liệu giữa trình duyệt và máy chủ web. Dữ liệu nhận về luôn ở dạng chuỗi nên cần JSON.parse(this.responseText). Có thể gửi dữ liệu đã JSON.stringify() hoặc dùng AJAX (XMLHttpRequest) để tải tệp JSON từ máy chủ.<br>**Áp dụng UIT Discovery:** UIT Discovery trao đổi dữ liệu JSON hoàn toàn không reload trang, nhưng nâng cấp từ XMLHttpRequest lên Fetch API (loadJson() trong data.js) và dùng URLSearchParams thay vì ghép chuỗi URL thô như ví dụ window.location ở slide 117 để đảm bảo mã hóa URL an toàn. | [Xem CODE-JS-32](#code-js-32) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 10–13; slide 116–119) |
| JS | <a id="row-js-38"></a> **Bất đồng bộ trong JS: Single-thread, Call Stack, Web APIs, Event Loop & Message Queue** | **Nội dung tài liệu:** JavaScript là ngôn ngữ đơn luồng (single-thread): tại một thời điểm chỉ xử lý 1 lệnh trên Call Stack. Để không chặn giao diện khi đợi request API hay tác vụ chậm, trình duyệt đẩy tác vụ sang Web APIs (setTimeout(), DOM Events, Fetch); khi xong callback đi vào Message Queue và được Event Loop đưa lại Call Stack khi Call Stack trống.<br>**Áp dụng UIT Discovery:** UIT Discovery vận dụng đúng mô hình bất đồng bộ không chặn luồng: trang chủ, danh bạ giảng viên và hồ sơ giảng viên tải song song JSON qua Promise.all([loadResearch(), loadLecturers()]) và trang chi tiết dùng requestAnimationFrame() điều phối vẽ Mind Map mượt. | [Xem CODE-JS-33](#code-js-33) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 14–16; slide 120–122) |
| JS | <a id="row-js-39"></a> **Hàm bất đồng bộ setTimeout()** | **Nội dung tài liệu:** Hàm setTimeout() lên lịch thực thi một hàm hoặc đoạn mã đúng một lần sau khoảng thời gian trễ tính bằng mili-giây (ví dụ 3000ms = 3 giây).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery hiện tại, các thao tác đồng bộ khung hình UI ưu tiên requestAnimationFrame (như applyResetState() trong lecturers.js và buildMapFrame() trong topic-detail.js). Nếu bổ sung tính năng tìm kiếm debounce hoặc thông báo toast tự ẩn, cần dùng setTimeout() kết hợp clearTimeout(). | [Xem CODE-JS-34](#code-js-34) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 17; slide 123) |
| JS | <a id="row-js-40"></a> **Hàm lặp định kỳ setInterval()** | **Nội dung tài liệu:** Hàm setInterval() lên lịch gọi lặp lại một hàm theo chu kỳ thời gian cố định (ví dụ cập nhật đồng hồ mỗi 1000ms bằng new Date()).<br>**Áp dụng UIT Discovery:** UIT Discovery không dùng setInterval() chạy nền liên tục để tối ưu pin/hiệu suất và giữ điểm Google Lighthouse cao; mọi cập nhật giao diện đều kích hoạt theo sự kiện người dùng (event-driven) hoặc đồng bộ khung hình bằng requestAnimationFrame(). | [Xem CODE-JS-35](#code-js-35) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 18; slide 124) |
| JS | <a id="row-js-41"></a> **Callback Function trong tải tài nguyên bất đồng bộ** | **Nội dung tài liệu:** Callback là hàm truyền vào một hàm khác để thực thi sau khi hàm kia hoàn tất (ví dụ nạp tệp bên ngoài qua XMLHttpRequest chưa thể dùng ngay nội dung trước khi tải xong). Trong ví dụ, myDisplayer được truyền làm myCallback cho getFile() để hiển thị kết quả hoặc mã lỗi status.<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng callback rộng rãi trong addEventListener(), Array.prototype.map/filter/sort; riêng phần tải tài nguyên mạng đã nâng cấp từ mô hình callback XMLHttpRequest sang Promise + async/await (loadJson() trong data.js) để mã mạch lạc và dễ bắt lỗi qua try/catch. | [Xem CODE-JS-36](#code-js-36) | `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 19–20; slide 125–126) |
| JS | <a id="row-js-42"></a> **Lab 5 - Bài 1: Silly story generator (Biến, Mảng, Math.random/floor/round, replace & Radio)** | **Nội dung tài liệu:** Bài thực hành áp dụng JS cơ bản: tham chiếu phần tử DOM, chọn ngẫu nhiên phần tử mảng với Math.floor(Math.random()*array.length), giữ nguyên chuỗi mẫu storyText bằng cách sao chép sang newStory, thay thế placeholder (:insertx:, :inserty:, :insertz:, Bob) với replace() / regex global (/.../g), kiểm tra radio UK (.checked) và chuyển đơn vị làm tròn bằng Math.round(), hiển thị qua story.textContent và story.style.visibility = 'visible'.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng đúng tư duy không làm biến đổi dữ liệu nguồn gốc (giữ nguyên JSON gốc, tạo mảng/chuỗi mới khi lọc và chuẩn hóa trong searchText(), flattenTopics()), dùng Math.floor() phân trang và textContent để cập nhật văn bản an toàn. | [Xem CODE-JS-37](#code-js-37) | `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 1–7) |
| JS | <a id="row-js-43"></a> **Lab 5 - Bài 2: Image Gallery — getAttribute(), setAttribute(), overlay & Event Delegation** | **Nội dung tài liệu:** Yêu cầu xây dựng thư viện ảnh bằng JS: lặp tạo 5 thẻ `<img>` chèn vào .thumb-bar, gắn sự kiện click trên từng thumbnail (hoặc gợi ý gắn 1 listener tại thumbBar — Event Delegation) để cập nhật src cho .displayed-img, và xử lý nút Darken/Lighten đọc/đổi class bằng getAttribute()/setAttribute(), đổi textContent và overlay.style.backgroundColor.<br>**Áp dụng UIT Discovery:** Kỹ thuật Event Delegation (gắn 1 listener ở phần tử cha như #group-pills ở topics.js và #lecturers-pagination ở lecturers.js) được UIT Discovery áp dụng trực tiếp để giảm số lượng event listener và tối ưu bộ nhớ. Chuyển đổi chế độ Sáng/Tối trong theme.js cũng tương đồng logic nhưng dùng data-theme trên `<html>`, aria-pressed và biến CSS thay cho style inline. | [Xem CODE-JS-38](#code-js-38) | `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 8–11) |
| JS | <a id="row-js-44"></a> **Mã nguồn thực hành Lab 5: Cấu trúc HTML Image Gallery & vị trí `<script>` cuối `<body>`** | **Nội dung tài liệu:** File HTML khung cho bài 2 Lab 5 gồm tiêu đề `<h1>`, vùng hiển thị ảnh lớn .full-img (.displayed-img, .overlay, `<button class="dark">`), vùng chứa ảnh thu nhỏ .thumb-bar và thẻ `<script src="main.js"></script>` đặt ngay trước thẻ đóng `</body>` để bảo đảm DOM đã dựng xong trước khi main.js chạy.<br>**Áp dụng UIT Discovery:** UIT Discovery giữ quy tắc tách rời HTML/CSS/JS nhưng chuẩn hóa cao hơn về SEO & Accessibility: thêm lang="vi", `<meta name="viewport">`, `<meta name="description">`, thuộc tính alt và loading="lazy" cho mọi ảnh (điểm mà thẻ `<img>` dòng 16 trong starter Lab 5 còn thiếu), và nhúng JS ở `<head>` bằng type="module". | [Xem CODE-JS-39](#code-js-39) | `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 1–27) |
| JS | <a id="row-js-45"></a> **Mã nguồn thực hành Lab 5: Script khởi tạo Gallery (querySelector, createElement, setAttribute, appendChild)** | **Nội dung tài liệu:** Tệp main.js khởi đầu dùng document.querySelector() tham chiếu .displayed-img, .thumb-bar, button, .overlay và cung cấp mẫu tạo node động document.createElement('img'), gán thuộc tính setAttribute('src', xxx) và chèn cuối phần tử cha qua thumbBar.appendChild(newImage) để sinh viên đưa vào vòng lặp.<br>**Áp dụng UIT Discovery:** Quy trình querySelector -> createElement -> gán thuộc tính -> appendChild là nền tảng của toàn bộ hàm dựng DOM động trong UIT Discovery (hàm element() và avatar() trong data.js, tạo nút lọc trong topics.js, dựng thẻ và node Mind Map trong topic-detail.js — kết hợp thêm DocumentFragment để chèn hàng loạt chỉ với 1 lần reflow). | [Xem CODE-JS-40](#code-js-40) | `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/main.js` (dòng 1–13) |
| JS | <a id="row-js-46"></a> **Web APIs (Browser/Server/Third-party API) & Phân biệt Library vs Framework ("Inversion of Control")** | **Nội dung tài liệu:** Web API là cầu nối cung cấp sẵn các hàm giúp tăng tốc phát triển và đơn giản hóa chức năng phức tạp (Browser API mở rộng trình duyệt như DOM, Geolocation; Server API mở rộng máy chủ). Slide 133–134 phân biệt 4 lớp: JavaScript -> Browser APIs -> Third-party APIs -> JS Tools gồm Libraries (jQuery, React, Mootools) và Frameworks (Angular, Ember). Điểm khác biệt cốt lõi giữa Library và Framework là "Inversion of Control" (đảo ngược quyền điều khiển).<br>**Áp dụng UIT Discovery:** UIT Discovery tận dụng triệt để Browser APIs có sẵn và TUYỆT ĐỐI KHÔNG sử dụng JS Libraries (jQuery, React...) hay Frameworks (Angular, Ember...) để giữ quyền kiểm soát toàn bộ luồng thực thi bằng Vanilla JS chuẩn IE104. | Không có mẫu trong tài liệu | `slides_drive/44_10.1 API Web.pdf` (tr. 2–8; slide 128–134) |
| JS | <a id="row-js-47"></a> **Mô hình cây HTML DOM (W3C Document Object Model) & Thuộc tính vs Phương thức** | **Nội dung tài liệu:** Khi tải trang, trình duyệt dựng cây đối tượng HTML DOM (Document -> Root `<html>` -> `<head>`/`<body>` -> Element, Attribute, Text nodes). DOM là chuẩn W3C trung lập nền tảng/ngôn ngữ, định nghĩa phần tử HTML là đối tượng có Thuộc tính (giá trị truy vấn/sửa đổi) và Phương thức (hành động thêm/xóa phần tử), cho phép JS tạo HTML động toàn diện.<br>**Áp dụng UIT Discovery:** Mọi hiển thị dữ liệu động trên UIT Discovery đều vận hành thông qua việc thao tác trực tiếp cây DOM chuẩn W3C (tạo node bằng createElement/createElementNS, thay đổi nội dung, lớp BEM, thuộc tính ARIA và thêm/xóa nhánh cây Mind Map).<br>*Ghi chú nguồn:* Slides 136–140 trình bày sơ đồ cây HTML DOM Tree of Objects và định nghĩa lý thuyết. | Không có mẫu trong tài liệu | `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 2–6; slide 136–140) |
| JS | <a id="row-js-48"></a> **Truy xuất DOM theo ID (getElementById) & Thuộc tính innerHTML** | **Nội dung tài liệu:** Phương thức phổ biến nhất để lấy một phần tử HTML là document.getElementById("id"), và thuộc tính innerHTML cho phép đọc hoặc thay thế nội dung HTML bên trong phần tử đó.<br>**Áp dụng UIT Discovery:** UIT Discovery dùng rất nhiều document.getElementById() (như "home-stats", "group-pills", "lecturers-pagination", "btn-zoom-in", "drawer-close"). Tuy nhiên dự án KHÔNG gán chuỗi dữ liệu JSON vào .innerHTML để phòng chống XSS mà sử dụng .textContent và helper element() trong data.js. | [Xem CODE-JS-41](#code-js-41) | `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 7, 9; slide 141, 143) |
| JS | <a id="row-js-49"></a> **Truy xuất nhiều phần tử DOM: getElementsByTagName() & getElementsByClassName()** | **Nội dung tài liệu:** Tìm tập hợp phần tử theo tên thẻ (document.getElementsByTagName("p")) hoặc theo tên lớp (document.getElementsByClassName("intro")), kết quả trả về danh sách giống mảng truy xuất theo chỉ mục (như element[0].innerHTML).<br>**Áp dụng UIT Discovery:** Trong UIT Discovery, nhóm hàm lấy HTMLCollection động này được thay thế bằng querySelectorAll() (trả về NodeList tĩnh, duyệt trực tiếp được bằng for...of như ở theme.js) để code nhất quán theo chuẩn CSS Selector. | [Xem CODE-JS-42](#code-js-42) | `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 8, 10–11; slide 142, 144–145) |
| JS | <a id="row-js-50"></a> **Truy xuất DOM bằng CSS Selectors (querySelectorAll) & HTML Object Collections (document.forms)** | **Nội dung tài liệu:** document.querySelectorAll("p.intro") tìm tất cả phần tử khớp bộ chọn CSS. Ngoài ra HTML Object Collections (như document.forms["frm1"]) cho phép duyệt tập các điều khiển trong form qua x.elements[i].value.<br>**Áp dụng UIT Discovery:** querySelector() và querySelectorAll() là cách truy vấn chủ lực trong UIT Discovery (ví dụ querySelectorAll(".theme-toggle"), querySelector("[data-empty-reset]")). Với form lọc ở lecturers.js và topics.js, dự án truy cập trực tiếp các input theo id hoặc thuộc tính form qua addEventListener('input'/'change'/'reset'). | [Xem CODE-JS-43](#code-js-43) | `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 12–13; slide 146–147) |
| JS | <a id="row-js-51"></a> **Gắn sự kiện DOM: HTML Event Attribute vs Thuộc tính đối tượng DOM (.onclick)** | **Nội dung tài liệu:** Minh họa hai cách gắn xử lý sự kiện: (1) chèn JS vào thuộc tính HTML như onclick="changeText(this)" hoặc onclick="displayDate()", và (2) gán tham chiếu hàm qua thuộc tính DOM trong script (document.getElementById("myBtn").onclick = displayDate;).<br>**Áp dụng UIT Discovery:** UIT Discovery tránh hoàn toàn HTML event attributes và cũng ưu tiên addEventListener() thay cho gán .onclick = ... (vì addEventListener không bị ghi đè khi nhiều module cùng lắng nghe và hỗ trợ { once: true }, { passive: true }). | [Xem CODE-JS-44](#code-js-44) | `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 1–4; slide 148–151) |
| JS | <a id="row-js-52"></a> **Sự kiện vòng đời onload / onunload & Kiểm tra Cookie (navigator.cookieEnabled)** | **Nội dung tài liệu:** Các sự kiện onload và onunload kích hoạt khi người dùng truy cập hoặc rời trang web, thường dùng kiểm tra cookie (navigator.cookieEnabled) hoặc khởi tạo trạng thái ban đầu.<br>**Áp dụng UIT Discovery:** UIT Discovery ưu tiên DOMContentLoaded thay cho onload (vì DOMContentLoaded không cần đợi toàn bộ ảnh tải xong, giúp trang tương tác nhanh hơn theo khuyến nghị IE104). Thay cho cookie, dự án dùng localStorage ("ie104.theme" trong theme.js) kết hợp sự kiện window "storage" để đồng bộ giữa các tab, luôn bọc try/catch đề phòng trình duyệt chặn storage. | [Xem CODE-JS-45](#code-js-45) | `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 5; slide 152) |
| JS | <a id="row-js-53"></a> **Sự kiện form onchange (Chuẩn hóa & xác nhận dữ liệu đầu vào)** | **Nội dung tài liệu:** Sự kiện onchange kích hoạt khi giá trị trường nhập thay đổi và người dùng rời khỏi ô nhập, thường dùng kết hợp xác nhận hoặc chuẩn hóa dữ liệu đầu vào (như x.value = x.value.toUpperCase()).<br>**Áp dụng UIT Discovery:** UIT Discovery dùng sự kiện "change" cho thẻ `<select id="lecturer-group">` (lecturers.js) kết hợp sự kiện "input" cho ô tìm kiếm từ khóa (topics.js, lecturers.js, quick topic switcher trong topic-detail.js) để lọc kết quả tức thời ngay khi người dùng gõ mà không phải chờ blur. | [Xem CODE-JS-46](#code-js-46) | `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 6; slide 153) |
| JS | <a id="row-js-54"></a> **Sự kiện chuột: onmouseover / onmouseout và onmousedown / onmouseup** | **Nội dung tài liệu:** onmouseover và onmouseout kích hoạt khi con trỏ chuột di chuyển vào hoặc rời khỏi phần tử; onmousedown, onmouseup và onclick biểu diễn các pha nhấn giữ và thả chuột trong một cú nhấp.<br>**Áp dụng UIT Discovery:** UIT Discovery áp dụng hiệu ứng hover phần lớn bằng CSS (:hover) để nhẹ CPU; với tương tác kéo thả 2D sơ đồ Mind Map và đóng modal khi nhấn ngoài vùng chọn trong topic-detail.js, dự án nâng cấp từ mouse events sang Pointer Events (pointerdown, pointermove, pointerup, pointercancel + setPointerCapture) kết hợp mouseenter/mouseleave cho tooltip trợ giúp. | [Xem CODE-JS-47](#code-js-47) | `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 7–8; slide 154–155) |
| JS | <a id="row-js-55"></a> **Mô hình AJAX & Lưu trữ dữ liệu cục bộ phía client (Client-side Caching)** | **Nội dung tài liệu:** AJAX (Asynchronous JavaScript and XML) dùng Web API làm proxy trao đổi dữ liệu với máy chủ để cập nhật từng phần trang web mà không phải tải lại toàn bộ trang, cải thiện mạnh hiệu suất. Slide 159 bổ sung chiến lược lưu bản sao dữ liệu trên máy người dùng (local cache) sau lần tải đầu tiên để các lần sau dùng bản cục bộ và chỉ tải lại khi dữ liệu thay đổi.<br>**Áp dụng UIT Discovery:** UIT Discovery hiện thực trực tiếp mô hình này trong assets/js/data.js: nạp research-data.json và lecturers.json bất đồng bộ không tải lại trang, đồng thời dùng Map cache (cache.has(file) / cache.set(file, request)) tránh gọi fetch() lặp lại trong phiên và xóa cache khi lỗi để cho phép thử lại. | Không có mẫu trong tài liệu | `slides_drive/47_10.4 Nạp dữ liệu từ máy chủ.pdf` (tr. 2–4; slide 157–159) |
| JS | <a id="row-js-56"></a> **Đối tượng XMLHttpRequest (readyState, status, responseText)** | **Nội dung tài liệu:** Đối tượng XMLHttpRequest dùng để yêu cầu, nhận hoặc gửi dữ liệu tới máy chủ ở chế độ nền sau khi trang đã tải xong. Kiểm tra this.readyState == 4 && this.status == 200 trong onreadystatechange trước khi đọc this.responseText.<br>**Áp dụng UIT Discovery:** UIT Discovery không dùng XMLHttpRequest vì đã chuyển hoàn toàn sang Fetch API hiện đại (gọn cú pháp, trả về Promise tích hợp response.ok và response.json()). | [Xem CODE-JS-48](#code-js-48) | `slides_drive/47_10.4 Nạp dữ liệu từ máy chủ.pdf` (tr. 5–6; slide 160–161) |
| JS | <a id="row-js-57"></a> **Fetch API với async / await** | **Nội dung tài liệu:** Fetch API cung cấp giao diện đơn giản hơn XMLHttpRequest để trình duyệt thực hiện các yêu cầu HTTP đến máy chủ web, kết hợp từ khóa async/await để đợi phản hồi và đọc nội dung (như myObject.text()).<br>**Áp dụng UIT Discovery:** Là kỹ thuật nạp dữ liệu TRUNG TÂM của UIT Discovery: data.js dùng fetch(new URL("data/" + file, projectRoot)), kiểm tra response.ok và parse response.json(); kết hợp async/await và Promise.all() trên cả 5 trang. | [Xem CODE-JS-49](#code-js-49) | `slides_drive/47_10.4 Nạp dữ liệu từ máy chủ.pdf` (tr. 7; slide 162) |
| JS | <a id="row-js-58"></a> **Phần tử HTML `<canvas>` & Ngữ cảnh 2D getContext("2d") (moveTo, lineTo, stroke)** | **Nội dung tài liệu:** Phần tử `<canvas>` là vùng chứa hình chữ nhật không viền mặc định trên HTML (có thể đặt nội dung văn bản dự phòng bên trong thẻ); mọi thao tác vẽ phải thực hiện qua JavaScript bằng ngữ cảnh c.getContext("2d"). Slide 165 minh họa vẽ đường thẳng từ (0,0) đến (200,100) với moveTo(), lineTo() và stroke().<br>**Áp dụng UIT Discovery:** UIT Discovery lựa chọn kiến trúc SVG (document.createElementNS("http://www.w3.org/2000/svg", ...)) kết hợp các nút HTML DOM thay cho `<canvas>` cho sơ đồ Mind Map ở topics/detail/ để văn bản sắc nét ở mọi mức zoom, hỗ trợ Tab bàn phím và Screen Reader ARIA; `<canvas>` phù hợp hơn cho đồ họa game pixel như Lab 6. | [Xem CODE-JS-50](#code-js-50) | `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 1–3; slide 163–165) |
| JS | <a id="row-js-59"></a> **Vẽ hình tròn trên Canvas 2D (beginPath, arc, stroke)** | **Nội dung tài liệu:** Sử dụng ctx.beginPath() để mở đường dẫn mới, ctx.arc(x, y, r, startAngle, endAngle) với góc kết thúc 2*Math.PI để vẽ cung tròn khép kín và ctx.stroke() để vẽ nét viền.<br>**Áp dụng UIT Discovery:** Được dùng trực tiếp trong bài thực hành Lab 6 (Bouncing Balls) với ctx.fill() và ctx.stroke(). Trên UIT Discovery, các đường cong và đầu mũi tên chỉ hướng tiên quyết trong Mind Map được vẽ bằng phần tử SVG `<path>` và `<marker>` thay cho Canvas 2D. | [Xem CODE-JS-51](#code-js-51) | `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 4; slide 166) |
| JS | <a id="row-js-60"></a> **Vẽ văn bản trên Canvas 2D (font, fillText, strokeText)** | **Nội dung tài liệu:** Thiết lập kiểu chữ bằng ctx.font = "30px Arial" và vẽ văn bản tô đặc với ctx.fillText("Hello World", 10, 50) hoặc chữ nét viền rỗng với ctx.strokeText("Hello World", 10, 50).<br>**Áp dụng UIT Discovery:** UIT Discovery hiển thị văn bản trong node sơ đồ bằng phần tử HTML `<button>`/`<span>` thực thay cho Canvas text, giúp người dùng bôi đen, tìm kiếm Ctrl+F và trình đọc màn hình tiếp cận được hoàn toàn. | [Xem CODE-JS-52](#code-js-52) | `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 5–6; slide 167–168) |
| JS | <a id="row-js-61"></a> **Vẽ Gradient trên Canvas 2D (createLinearGradient, addColorStop, fillStyle, fillRect)** | **Nội dung tài liệu:** Tạo dải màu chuyển sắc tuyến tính qua ctx.createLinearGradient(x0,y0,x1,y1), thêm các điểm dừng màu bằng grd.addColorStop(offset, color), gán cho ctx.fillStyle rồi tô hình chữ nhật bằng ctx.fillRect(x,y,w,h).<br>**Áp dụng UIT Discovery:** UIT Discovery sử dụng gradient bằng CSS3 thuần (linear-gradient/radial-gradient) cho các khối trang trí giao diện (như home__visual) và dùng fillRect với nền bán trong suốt trong Lab 6. | [Xem CODE-JS-53](#code-js-53) | `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 7–8; slide 169–170) |
| JS | <a id="row-js-62"></a> **Tổng quan Client-Side Frameworks & Hệ sinh thái thư viện JavaScript** | **Nội dung tài liệu:** Trong 3 công nghệ HTML, CSS, JavaScript thì JavaScript khó nhất vì gắn với lập trình, giải thuật, tổ chức code và can thiệp HTML/CSS (được dùng trên >95% website). Các công cụ tái sử dụng được đóng gói thành thư viện; còn Framework là thư viện cung cấp kiến trúc/ý tưởng đồng nhất cách xây dựng ứng dụng quy mô lớn mà vẫn bảo trì được.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Đồ án IE104 nghiêm cấm sử dụng bất kỳ thư viện/framework JS bên ngoài nào. UIT Discovery tự cài đặt tính đồng nhất và khả năng bảo trì bằng ES Modules thuần (import/export), tách rạch ròi tầng dữ liệu/tiện ích (data.js) khỏi logic hiển thị từng trang. | Không có mẫu trong tài liệu | `slides_drive/49_11.1 Tổng quan Framework.pdf` (tr. 5–7) |
| JS | <a id="row-js-63"></a> **Giới thiệu sơ lược 4 Framework/Library: Ember, Angular, Vue, React (MVC, MVVM, Virtual DOM)** | **Nội dung tài liệu:** Tóm lược 4 công cụ phổ biến: (1) Ember (12/2011) ổn định, mô hình Route/Model/Controller/View/Template; (2) Angular (Google, 9/2016) viết lại từ AngularJS, dùng TypeScript, mô hình MVC đơn giản hóa, Data Binding, SPA; (3) Vue (Evan You, 2014) mở rộng HTML dựa trên JS hiện đại theo sơ đồ View–ViewModel (DOM Listeners, Data Bindings)–Model; (4) React (Facebook, 2013) bản chất là thư viện UI kết hợp ReactDOM, nổi bật với Virtual DOM đối chiếu trước khi cập nhật Real DOM.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Tuyệt đối cấm dùng Ember, Angular, Vue, React hay ReactDOM. UIT Discovery tự cài đặt các cơ chế tương đương bằng Vanilla JS thuần: lưu state tập trung trong biến module, tạo mới hàng loạt node trong bộ nhớ qua DocumentFragment rồi thay một lần bằng replaceChildren() (giảm DOM reflow tương tự mục tiêu của Virtual DOM).<br>*Ghi chú nguồn:* Sơ đồ kiến trúc MVC (Ember), Simplified MVC (Angular), MVVM (Vue) và Virtual DOM vs Real DOM (React) nằm trong hình ảnh ở slides 8–11. | Không có mẫu trong tài liệu | `slides_drive/49_11.1 Tổng quan Framework.pdf` (tr. 8–11) |
| JS | <a id="row-js-64"></a> **Công dụng, Ưu điểm & Nhược điểm của Client-Side Framework** | **Nội dung tài liệu:** Ưu điểm & Công dụng: mã nguồn mở, tài liệu/cộng đồng phong phú, hạn chế lặp code, tăng hiệu suất, tích hợp công cụ/CSDL, bảo mật và nhất quán nhờ code đã kiểm thử trước. Nhược điểm: lỗ hổng của framework ảnh hưởng mọi site dùng nó, giới hạn quy tắc cứng không sửa được lõi, tốn thời gian học, và kích thước lớn nên KHÔNG thích hợp cho các website nhỏ.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Chính nhược điểm cồng kềnh với website nhỏ và yêu cầu hiểu sâu bản chất web khiến IE104 cấm framework. UIT Discovery đạt được tái sử dụng code và tránh trùng lặp nhờ các helper chuẩn trong data.js với dung lượng nhẹ tối đa, giúp đạt điểm hiệu năng Lighthouse cao.<br>*Ghi chú nguồn:* Slides 12–16 liệt kê các mục công dụng, ưu điểm và nhược điểm dạng văn bản. | Không có mẫu trong tài liệu | `slides_drive/49_11.1 Tổng quan Framework.pdf` (tr. 12–16) |
| JS | <a id="row-js-65"></a> **Tiêu chí lựa chọn Framework, DSLs (TypeScript, JSX, Handlebars, Pug) & Browser Support / Polyfills** | **Nội dung tài liệu:** Chọn framework phụ thuộc vào trình duyệt hỗ trợ (ví dụ bảng slide 19: Angular IE9+, React Modern IE9+ with Polyfills, Vue IE9+, Ember Modern), cộng đồng/tài liệu và Domain-Specific Languages (DSLs — biến thể trên JS/HTML như TypeScript, JSX, HTML-based, Handlebars, Pug) để không gây rào cản cho người dùng hay đội ngũ phát triển.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Cấm dùng TypeScript, JSX, Handlebars, Pug hay các bộ biên dịch/bundler/polyfill ngoài (như Babel/Webpack). Thay vào đó, UIT Discovery kiểm tra kiểu bằng JSDoc (@typedef, @param, @returns), viết HTML5 thuần, và tự viết fallback trình duyệt bằng Vanilla JS (như pseudo-fullscreen CSS fallback khi iOS Safari thiếu requestFullscreen). | Không có mẫu trong tài liệu | `slides_drive/49_11.1 Tổng quan Framework.pdf` (tr. 17–19) |
| JS | <a id="row-js-66"></a> **Ember.js: Convention over Configuration, Ember CLI & Kiến trúc Router/Route/Model/Handlebars** | **Nội dung tài liệu:** Ember.js do Yehuda Katz phát triển theo triết lý 'Convention over Configuration' (quy ước vượt trên cấu hình), end-to-end opinionated, tương thích ngược nghiêm ngặt, hỗ trợ bởi LinkedIn/Yahoo, nổi bật với thư viện dữ liệu bất đồng bộ và Ember CLI. Sơ đồ slide 23 minh họa luồng URL -> router.js -> routes/*.js (async model()) -> Model -> templates/*.hbs (Handlebars) -> Component.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Cấm dùng Ember.js và Ember CLI. UIT Discovery vận dụng tinh thần quy ước tổ chức thư mục rõ ràng (`<page>`/index.html, assets/css/`<page>`.css, assets/js/`<page>`.js) và tự cài đặt điều phối tham số route bằng URLSearchParams (readTopicQuery(), topicUrl(), lecturerUrl()) cùng nạp dữ liệu async/await trong data.js. | [Xem CODE-JS-54](#code-js-54) | `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 1–4; slide 20–23) |
| JS | <a id="row-js-67"></a> **Angular: SPA doanh nghiệp, TypeScript, Angular CLI, Engine Ivy & Chu trình Digest** | **Nội dung tài liệu:** Google tạo ra Angular làm framework SPA end-to-end cho ứng dụng doanh nghiệp, tiên phong đưa TypeScript trở nên phổ biến, tách template khỏi styling và logic, có Angular CLI mạnh, tính năng bảo mật tích hợp và Engine Ivy (từ Angular 9) tối ưu thời gian khởi động & kích thước gói. Sơ đồ slide 27 minh họa Browser Event Queue -> Angular Context (ng-click, $http, $timeout, $apply) -> Digest Process (Watch list) -> Update UI/DOM.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Cấm dùng Angular, AngularJS, TypeScript và Angular CLI. UIT Discovery chọn kiến trúc đa trang (MPA) HTML thuần gọn nhẹ thay cho SPA nặng, tự cập nhật DOM tường minh đúng vùng thay đổi theo sự kiện thay vì dùng cơ chế Watch list / Digest Cycle.<br>*Ghi chú nguồn:* Slide 25–26 nói về Angular/TypeScript/Angular 9 Ivy, trong khi ảnh sơ đồ ở slide 27 (pdf_page 8) minh họa kiến trúc AngularJS Digest Process ($http, $timeout, $apply). | Không có mẫu trong tài liệu | `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 5–8; slide 24–27) |
| JS | <a id="row-js-68"></a> **Vue.js: Progressive Framework, Two-way Data Binding, Reactivity (Getter/Setter/Watcher) & Directive** | **Nội dung tài liệu:** Vue.js kết hợp View Layer của AngularJS và Virtual DOM của React thành một progressive framework (dùng linh hoạt từ View Layer tới end-to-end với Routing và State management, hỗ trợ JS/TypeScript, Two-way data binding, Event Sourcing). Sơ đồ slide 31 mô tả cơ chế Reactivity: getter/setter <-> Watcher a.b (Collect Dependencies, Notify) -> Directive v-text="a.b" (Update) -> DOM {{a.b}}.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Cấm dùng Vue.js. UIT Discovery tự cài đặt luồng cập nhật giao diện theo trạng thái bằng Vanilla JS thuần: lắng nghe sự kiện input/change/click, cập nhật state cục bộ của trang, rồi gọi trực tiếp hàm render tương ứng (renderTopics(), renderLecturers(), applyTheme()) để ghi vào textContent. | Không có mẫu trong tài liệu | `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 9–12; slide 28–31) |
| JS | <a id="row-js-69"></a> **React: Component-based, Dòng dữ liệu một chiều, Functional/Declarative, Immutable State, Virtual DOM & SSR** | **Nội dung tài liệu:** React (Jordan Walke, Facebook) là thư viện / unopinionated framework dựa trên Component với dòng dữ liệu một chiều, thúc đẩy lập trình hàm (functional), khai báo (declarative), trạng thái bất biến (immutable state) và Virtual DOM tối ưu hiệu suất. Dùng cho Web (React), Mobile (React Native qua Bridge Android/iOS), Desktop (Electron), Back-end (Node.js) và hỗ trợ tốt Server-Side Rendering (SSR) cho SEO.<br>**Áp dụng UIT Discovery:** [BỊ CẤM DÙNG TRONG ĐỒ ÁN IE104] Cấm dùng React, JSX, React Native, Electron hay SSR framework. Tuy nhiên UIT Discovery học hỏi tư duy Component-based (hàm dựng thẻ createTopicRow, component Mind Map & Drawer độc lập), dữ liệu bất biến ([...people].sort(), không sửa mảng JSON gốc) và tối ưu SEO trực tiếp bằng HTML5 tĩnh ngữ nghĩa có sẵn `<h1>` và meta description thay vì cần SSR. | [Xem CODE-JS-55](#code-js-55) | `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 13–17; slide 32–36) |
| JS | <a id="row-js-70"></a> **Lab 6 - Phiên bản ES6 class Ball (main-finished-es6.js trong tài liệu Lab 6)** | **Nội dung tài liệu:** Tài liệu Lab 6 cung cấp song song bản mã nguồn theo cú pháp ES6 (main-finished-es6.js) cho game Bouncing Balls: dùng class Ball với constructor(x, y, velX, velY, color, size) cùng các phương thức draw(), update(), collisionDetect() viết theo method shorthand, giữ nguyên logic vẽ Canvas 2D và phát hiện va chạm hình tròn.<br>**Áp dụng UIT Discovery:** UIT Discovery ưu tiên cú pháp ES6+ hiện đại (Arrow/Method shorthand, const/let, ES Modules, JSDoc) thay cho var hay Prototype ES5 rời rạc. Khác với bản ES6 này còn dùng var balls = []; ở trang 6, toàn bộ mã nguồn UIT Discovery cấm dùng var và chỉ dùng const/let. | [Xem CODE-JS-56](#code-js-56) | `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 4–7) |
| JS | <a id="row-js-71"></a> **Lab 6 - Bài tập Bouncing Balls OOP nâng cao: Shape, Ball, EvilCircle, setControls (_this) & Bộ đếm** | **Nội dung tài liệu:** Đề Lab 6 cung cấp mã khởi đầu theo cả phong cách Prototype (main-finished.js) và ES6 class (main-finished-es6.js), yêu cầu tái cấu trúc Ball thành lớp cha Shape(x, y, velX, velY, exists), cho Ball và EvilCircle (velX=20, velY=20, color='white', size=10) kế thừa Shape qua Shape.call() + prototype, cài draw() nét viền (strokeStyle, lineWidth=3, stroke()), checkBounds(), setControls() dùng let _this = this để giữ ngữ cảnh trong window.onkeydown (w/a/s/d), collisionDetect() ăn bóng (exists = false) và hiển thị số bóng còn lại vào `<p>`.<br>**Áp dụng UIT Discovery:** Kỹ thuật điều khiển bàn phím qua e.key, tính va chạm/biên giới hạn khung hình và xử lý giữ ngữ cảnh trong event handler được UIT Discovery ứng dụng trực tiếp trong topic-detail.js (handleViewportKeydown điều khiển pan/zoom bằng phím, giới hạn vùng nodeBounds và đóng mở nhánh cây Mind Map). | [Xem CODE-JS-57](#code-js-57) | `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 1–3, 7–12) |
| JS | <a id="row-js-72"></a> **Mã nguồn thực hành Lab 6: Khung HTML Canvas game Bouncing Balls (index-finished.html)** | **Nội dung tài liệu:** Tài liệu HTML tối giản gồm `<h1>`bouncing balls`</h1>`, phần tử `<canvas></canvas>` làm bề mặt vẽ toàn màn hình và nạp script game ở cuối `<body>`.<br>**Áp dụng UIT Discovery:** UIT Discovery kế thừa cách cấu trúc tối giản phần tử tương tác chính nhưng bổ sung đầy đủ chuẩn HTML5 W3C & SEO còn thiếu trong file starter này: lang="vi", `<meta name="viewport">`, `<meta name="description">`, thẻ ngữ nghĩa `<main>`/`<section>` và kiểm tra đúng đường dẫn tệp script. | [Xem CODE-JS-58](#code-js-58) | `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 1–15) |
| JS | <a id="row-js-73"></a> **Mã nguồn hoàn chỉnh Lab 6 (Phần 1): Thiết lập Canvas 2D toàn màn hình & Hàm random(min, max)** | **Nội dung tài liệu:** Chọn thẻ `<canvas>`, lấy ngữ cảnh 2D bằng canvas.getContext('2d'), gán đồng thời canvas.width = window.innerWidth và canvas.height = window.innerHeight vào các hằng width, height; đồng thời định nghĩa hàm random(min, max) sinh số nguyên ngẫu nhiên trong đoạn [min, max].<br>**Áp dụng UIT Discovery:** UIT Discovery cũng đọc kích thước khung nhìn window.innerWidth kết hợp sự kiện window.addEventListener("resize", resizeMap) (topic-detail.js) để tự động co giãn khung chứa sơ đồ Mind Map khi thay đổi kích thước màn hình (thay vì gán cứng một lần lúc tải trang như Lab 6). | [Xem CODE-JS-59](#code-js-59) | `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 1–14) |
| JS | <a id="row-js-74"></a> **Mã nguồn hoàn chỉnh Lab 6 (Phần 2): Constructor Ball & các phương thức prototype (draw, update, collisionDetect)** | **Nội dung tài liệu:** Định nghĩa hàm dựng Ball(x, y, velX, velY, color, size) và 3 phương thức trên Ball.prototype: draw() vẽ hình tròn đặc (beginPath, fillStyle, arc, fill); update() xử lý nảy khi chạm 4 biên width/height và cộng vận tốc vào tọa độ; collisionDetect() tính khoảng cách Euclid Math.sqrt(dx * dx + dy * dy) giữa từng cặp bóng khác nhau và đổi màu ngẫu nhiên khi khoảng cách nhỏ hơn tổng bán kính.<br>**Áp dụng UIT Discovery:** Tư duy tính tọa độ, kích thước và phát hiện biên giới hạn hình học 2D tương đồng với bộ tính toán layout cây Mind Map (đo bounding box, chống chồng lấn dọc NODE_MARGIN_Y, căn chỉnh view) trong topic-detail.js; về cú pháp, UIT Discovery ưu tiên JSDoc đầy đủ và tránh prototype thủ công kiểu cũ. | [Xem CODE-JS-60](#code-js-60) | `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 16–73) |
| JS | <a id="row-js-75"></a> **Mã nguồn hoàn chỉnh Lab 6 (Phần 3): Khởi tạo mảng 25 bóng & Animation Loop với requestAnimationFrame()** | **Nội dung tài liệu:** Dùng vòng lặp while(balls.length < 25) sinh 25 đối tượng new Ball(...) trong phạm vi cách biên canvas tối thiểu bằng bán kính size. Hàm loop() phủ nền đen bán trong suốt 'rgba(0,0,0,0.25)' qua fillRect() tạo hiệu ứng vệt chuyển động, vẽ và cập nhật từng quả bóng rồi lặp vô hạn đồng bộ nhịp màn hình bằng requestAnimationFrame(loop).<br>**Áp dụng UIT Discovery:** Browser API requestAnimationFrame() được UIT Discovery dùng trực tiếp tại topic-detail.js (dòng 548, 564: buildMapFrame, finishMapLayout để đồng bộ đo kích thước DOM và vẽ dây nối SVG mượt trong một chu kỳ render) và lecturers.js (dòng 138: requestAnimationFrame(applyResetState) đợi form reset hoàn tất). | [Xem CODE-JS-61](#code-js-61) | `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 75–109) |

---

## <a id="phu-luc-code-mau"></a>4. Phụ lục Code Mẫu từ Bài giảng & Thực hành (`196` khối mã nguyên bản)

> Mọi đoạn mã dưới đây được chép nguyên văn từ ảnh chụp slide, PDF Lab hoặc tệp mã nguồn thực hành trong `source - tài liệu học/`. Các lỗi cú pháp/gõ nhầm sẵn có của nguồn được giữ nguyên và ghi rõ tại dòng **Ghi chú nguồn**.

### 4.1. Code mẫu phần HTML (`62` khối)

#### <a id="code-html-01"></a>CODE-HTML-01 — Tổng quan HTML và 3 chức năng cơ bản
- **Nguồn:** `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 4–5) · [↩ Quay lại bảng (HTML #01)](#row-html-01)

```html
<!DOCTYPE html>
<html>

    <head>
        <title>My First Webpage</title>
    </head>

    <body>
        <h1>
            My First Webpage
        </h1>
        <p>This is a paragraph...</p>
    </body>

</html>
```

#### <a id="code-html-02"></a>CODE-HTML-02 — Lồng phần tử HTML (Nesting elements) hợp lệ và lỗi chồng chéo thẻ
- **Nguồn:** `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 10–11) · [↩ Quay lại bảng (HTML #03)](#row-html-03)

```html
<p>My cat is <strong>very</strong> grumpy.</p>

<p>My cat is <strong>very grumpy.</p></strong>
```

#### <a id="code-html-03"></a>CODE-HTML-03 — Phần tử cấp khối (Block-level) và phần tử nội tuyến (Inline)
- **Nguồn:** `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 12–13) · [↩ Quay lại bảng (HTML #04)](#row-html-04)

```html
<em>first</em><em>second</em><em>third</em>

<p>fourth</p><p>fifth</p><p>sixth</p>
```

#### <a id="code-html-04"></a>CODE-HTML-04 — Phần tử trống (Empty / Void elements)
- **Nguồn:** `slides_drive/07_2.1 Giới thiệu _ Phần tử HTML.pdf` (tr. 14–15) · [↩ Quay lại bảng (HTML #05)](#row-html-05)

```html
<img src="https://raw.githubusercontent.com/mdn/beginner-html-site/gh-pages/images/firefox-icon.png">
```

#### <a id="code-html-05"></a>CODE-HTML-05 — Thuộc tính HTML (Attributes) và quy tắc cú pháp
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 1–2; slide 16–17) · [↩ Quay lại bảng (HTML #06)](#row-html-06)
- **Ghi chú nguồn:** Đã ghép hai mẫu ví dụ minh họa cú pháp thuộc tính trên slide 16 và slide 17 (có thuộc tính đơn và đa thuộc tính).

```html
<p class="editor-note">My cat is very grumpy</p>

<p>A link to my <a href="https://www.mozilla.org/" title="The Mozilla homepage"
target="_blank">favorite website</a>.</p>
```

#### <a id="code-html-06"></a>CODE-HTML-06 — Thuộc tính Boolean (Boolean attributes)
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 3; slide 18) · [↩ Quay lại bảng (HTML #07)](#row-html-07)

```html
<!-- using the disabled attribute prevents the end user from entering text into the input box -->
<input type="text" disabled>

<!-- text input is allowed, as it doesn't contain the disabled attribute -->
<input type="text">
```

#### <a id="code-html-07"></a>CODE-HTML-07 — Dấu ngoặc kép, dấu ngoặc đơn và bỏ ngoặc quanh giá trị thuộc tính
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 4–6; slide 19–21) · [↩ Quay lại bảng (HTML #08)](#row-html-08)

```html
<a href=https://www.mozilla.org/>favorite website</a>

<a href=https://www.mozilla.org/ title=The Mozilla homepage>favorite website</a>

<a href="https://www.example.com" title="Isn't this fun?">A link to my example.</a>

<a href='https://www.example.com' title='Isn't this fun?'>A link to my example.</a>

<a href='https://www.example.com' title='Isn&apos;t this fun?'>A link to my example.</a>
```

#### <a id="code-html-08"></a>CODE-HTML-08 — Cấu trúc chuẩn một tài liệu HTML (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 7; slide 22) · [↩ Quay lại bảng (HTML #09)](#row-html-09)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```

#### <a id="code-html-09"></a>CODE-HTML-09 — Cơ chế rút gọn khoảng trắng (Whitespace collapsing) trong HTML
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 8; slide 23) · [↩ Quay lại bảng (HTML #10)](#row-html-10)

```html
<p>Dogs are silly.</p>

<p>Dogs        are
         silly.</p>
```

#### <a id="code-html-10"></a>CODE-HTML-10 — Ký tự đặc biệt và tham chiếu thực thể HTML (&lt;, &gt;, &quot;, &apos;, &amp;)
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 9–10; slide 24–25) · [↩ Quay lại bảng (HTML #11)](#row-html-11)

```html
<p>In HTML, you define a paragraph using the <p> element.</p>

<p>In HTML, you define a paragraph using the &lt;p&gt; element.</p>
```

#### <a id="code-html-11"></a>CODE-HTML-11 — Chú thích trong HTML (`<!-- ... -->`)
- **Nguồn:** `slides_drive/08_2.2 Thuộc tính _ Ký tự đặc biệt _ Comment.pdf` (tr. 11; slide 26) · [↩ Quay lại bảng (HTML #12)](#row-html-12)

```html
<p>I'm not inside a comment</p>

<!-- <p>I am!</p> -->
```

#### <a id="code-html-12"></a>CODE-HTML-12 — Phần tử `<head>` và siêu dữ liệu tài liệu
- **Nguồn:** `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 1–2; slide 27–28) · [↩ Quay lại bảng (HTML #13)](#row-html-13)

```html
<head>
  <meta charset="utf-8">
  <title>My test page</title>
</head>
```

#### <a id="code-html-13"></a>CODE-HTML-13 — Siêu dữ liệu `<meta>` với thuộc tính name và content (description, author)
- **Nguồn:** `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 5–6; slide 31–32) · [↩ Quay lại bảng (HTML #16)](#row-html-16)

```html
<meta name="description" content="The MDN Web Docs site
provides information about Open Web technologies
including HTML, CSS, and APIs for both Web sites and
progressive web apps.">
```

#### <a id="code-html-14"></a>CODE-HTML-14 — Giao thức siêu dữ liệu Open Graph Data (`<meta property="og:...">`)
- **Nguồn:** `slides_drive/09_2.3 Thẻ Head _ Metadata tron HTML.pdf` (tr. 7–8; slide 33–34) · [↩ Quay lại bảng (HTML #17)](#row-html-17)

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

#### <a id="code-html-15"></a>CODE-HTML-15 — Đoạn văn bản `<p>` và sáu cấp độ tiêu đề `<h1>`–`<h6>`
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 1–2; slide 37–38) · [↩ Quay lại bảng (HTML #21)](#row-html-21)

```html
<p>I am a paragraph, oh yes I am.</p>

<h1>I am the title of the story.</h1>
```

#### <a id="code-html-16"></a>CODE-HTML-16 — Phân cấp cấu trúc tiêu đề (Heading hierarchy: `<h1>` → `<h2>` → `<h3>`)
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 3–4; slide 39–40) · [↩ Quay lại bảng (HTML #22)](#row-html-22)

```html
<h1>The Crushing Bore</h1>

<p>By Chris Mills</p>

<h2>Chapter 1: The dark night</h2>

<p>It was a dark night. Somewhere, an owl hooted. The rain lashed down on the ...</p>

<h2>Chapter 2: The eternal silence</h2>

<p>Our protagonist could not so much as a whisper out of the shadowy figure ...</p>

<h3>The specter speaks</h3>
```

#### <a id="code-html-17"></a>CODE-HTML-17 — Danh sách không có thứ tự `<ul>` và mục `<li>`
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 5; slide 41) · [↩ Quay lại bảng (HTML #23)](#row-html-23)

```html
<ul>
  <li>milk</li>
  <li>eggs</li>
  <li>bread</li>
  <li>hummus</li>
</ul>
```

#### <a id="code-html-18"></a>CODE-HTML-18 — Danh sách có thứ tự `<ol>` và mục `<li>`
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 6; slide 42) · [↩ Quay lại bảng (HTML #24)](#row-html-24)

```html
<ol>
  <li>Drive to the end of the road</li>
  <li>Turn right</li>
  <li>Go straight across the first two roundabouts</li>
  <li>Turn left at the third roundabout</li>
  <li>The school is on your right, 300 meters up the road</li>
</ol>
```

#### <a id="code-html-19"></a>CODE-HTML-19 — Danh sách lồng vào nhau (Nested lists)
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 7; slide 43) · [↩ Quay lại bảng (HTML #25)](#row-html-25)

```html
<ol>
  <li>Remove the skin from the garlic, and chop coarsely.</li>
  <li>Remove all the seeds and stalk from the pepper, and chop coarsely.</li>
  <li>Add all the ingredients into a food processor.</li>
  <li>Process all the ingredients into a paste.
    <ul>
      <li>If you want a coarse "chunky" hummus, process it for a short time.</li>
      <li>If you want a smooth hummus, process it for a longer time.</li>
    </ul>
  </li>
</ol>
```

#### <a id="code-html-20"></a>CODE-HTML-20 — Định dạng văn bản ngữ nghĩa: nhấn mạnh `<em>` và quan trọng `<strong>`
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 8; slide 44) · [↩ Quay lại bảng (HTML #26)](#row-html-26)

```html
<p>I am <em>glad</em> you weren't <em>late</em>.</p>

<p>This liquid is <strong>highly toxic</strong>.</p>

<p>I am counting on you. <strong>Do not</strong> be late!</p>
```

#### <a id="code-html-21"></a>CODE-HTML-21 — Tạo siêu liên kết `<a>` với thuộc tính href và title
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 9–10; slide 45–46) · [↩ Quay lại bảng (HTML #27)](#row-html-27)

```html
<p>I'm creating a link to
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
</p>
```

#### <a id="code-html-22"></a>CODE-HTML-22 — URL và đường dẫn tương đối (Relative paths)
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 11; slide 47) · [↩ Quay lại bảng (HTML #28)](#row-html-28)

```html
<p>Visit my <a href="projects/index.html">project homepage</a>.</p>

<p>A link to my <a href="../pdfs/project-brief.pdf">project brief</a>.</p>
```

#### <a id="code-html-23"></a>CODE-HTML-23 — Thực hành đặt văn bản liên kết rõ nghĩa (Descriptive link text)
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 12; slide 48) · [↩ Quay lại bảng (HTML #29)](#row-html-29)

```html
<p><a href="https://firefox.com/">
  Download Firefox
</a></p>

<p><a href="https://firefox.com/">
  Click here
</a>
to download Firefox</p>
```

#### <a id="code-html-24"></a>CODE-HTML-24 — Liên kết tới tài nguyên không phải HTML và thuộc tính target="_blank"
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 13; slide 49) · [↩ Quay lại bảng (HTML #30)](#row-html-30)

```html
<p><a href="https://www.example.com/large-report.pdf">
  Download the sales report (PDF, 10MB)
</a></p>

<p><a href="https://www.example.com/video-stream/" target="_blank">
  Watch the video (stream opens in separate tab, HD quality)
</a></p>

<p><a href="https://www.example.com/car-game">
  Play the car game (requires Flash)
</a></p>
```

#### <a id="code-html-25"></a>CODE-HTML-25 — Thuộc tính download trên liên kết `<a>`
- **Nguồn:** `slides_drive/10_2.4 Nguyên tắc định dạng _ Siêu liên kết.pdf` (tr. 14; slide 50) · [↩ Quay lại bảng (HTML #31)](#row-html-31)

```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
   download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```

#### <a id="code-html-26"></a>CODE-HTML-26 — Nhúng Google Fonts qua `<link>` và tái cấu trúc HTML thô sang thẻ ngữ nghĩa
- **Nguồn:** `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 7–9); `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 6, 15–45) · [↩ Quay lại bảng (HTML #50)](#row-html-50)

```html
<h1>Birdwatching</h1>
      <img src="dove.png" alt="a simple dove logo">


      <ul>
        <li><span>Home</span></li>
        <li><a href="#">Get started</a></li>
        <li><a href="#">Photos</a></li>
        <li><a href="#">Gear</a></li>
        <li><a href="#">Forum</a></li>
      </ul>


      <h2>Welcome</h2>

      <p>Welcome to our fake birdwatching site. If this were a real site, it would be the ideal place to come to learn more about birdwatching, whether you are a beginner looking to learn how to get into birding, or an expert wanting to share ideas, tips, and photos with other like-minded people.</p>

      <p>So don't waste time! Get what you need, then turn off that computer and get out into the great outdoors!</p>

      <h2>Favourite photos</h2>

      <a href="favorite-1.jpg"><img src="favorite-1_th.jpg" alt="Small black bird, black claws, long black slender beak, links to larger version of the image"></a>
      <a href="favorite-2.jpg"><img src="favorite-2_th.jpg" alt="Top half of a pretty bird with bright blue plumage on neck, light colored beak, blue headdress, links to larger version of the image"></a>
      <a href="favorite-3.jpg"><img src="favorite-3_th.jpg" alt="Top half of a large bird with white plumage, very long curved narrow light colored break, links to larger version of the image"></a>
      <a href="favorite-4.jpg"><img src="favorite-4_th.jpg" alt="Large bird, mostly white plumage with black plumage on back and rear, long straight white beak, links to larger version of the image"></a>


      <p>This fake website example is CC0 — any part of this code may be reused in any way you wish. Original example written by Chris Mills, 2016.</p>

      <p><a href="http://game-icons.net/lorc/originals/dove.html">Dove icon</a> by Lorc.</p>
```

#### <a id="code-html-27"></a>CODE-HTML-27 — Conditional Comment `<!--`[if lt IE 9]> và polyfill html5shiv.js
- **Nguồn:** `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 8–10) · [↩ Quay lại bảng (HTML #51)](#row-html-51)

```html
<!--[if lt IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
    <![endif]-->
```

#### <a id="code-html-28"></a>CODE-HTML-28 — Phần tử nội tuyến phi ngữ nghĩa `<span>` trong thanh điều hướng/văn bản
- **Nguồn:** `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 19–25) · [↩ Quay lại bảng (HTML #52)](#row-html-52)

```html
<ul>
        <li><span>Home</span></li>
        <li><a href="#">Get started</a></li>
        <li><a href="#">Photos</a></li>
        <li><a href="#">Gear</a></li>
        <li><a href="#">Forum</a></li>
      </ul>
```

#### <a id="code-html-29"></a>CODE-HTML-29 — Liên kết ảnh thu nhỏ (Thumbnail `<img>` lồng trong `<a>`) kèm alt mô tả
- **Nguồn:** `LABs/02_LAB 1_Lab1-2-start/assets/index.html` (dòng 36–39); `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 7) · [↩ Quay lại bảng (HTML #53)](#row-html-53)

```html
<a href="favorite-1.jpg"><img src="favorite-1_th.jpg" alt="Small black bird, black claws, long black slender beak, links to larger version of the image"></a>
      <a href="favorite-2.jpg"><img src="favorite-2_th.jpg" alt="Top half of a pretty bird with bright blue plumage on neck, light colored beak, blue headdress, links to larger version of the image"></a>
      <a href="favorite-3.jpg"><img src="favorite-3_th.jpg" alt="Top half of a large bird with white plumage, very long curved narrow light colored break, links to larger version of the image"></a>
      <a href="favorite-4.jpg"><img src="favorite-4_th.jpg" alt="Large bird, mostly white plumage with black plumage on back and rear, long straight white beak, links to larger version of the image"></a>
```

#### <a id="code-html-30"></a>CODE-HTML-30 — Phần tử `<img>` và thuộc tính src (đường dẫn tương đối vs URL tuyệt đối)
- **Nguồn:** `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 4–7; slide 61–64) · [↩ Quay lại bảng (HTML #55)](#row-html-55)

```html
<img src="dinosaur.jpg">

<img src="images/dinosaur.jpg">

<img src="https://www.example.com/images/dinosaur.jpg">
```

#### <a id="code-html-31"></a>CODE-HTML-31 — Thuộc tính alt (văn bản thay thế) trên `<img>`
- **Nguồn:** `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 8–9; slide 65–66) · [↩ Quay lại bảng (HTML #56)](#row-html-56)

```html
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth">
```

#### <a id="code-html-32"></a>CODE-HTML-32 — Thuộc tính width và height trên `<img>` (nguy cơ méo/mờ ảnh)
- **Nguồn:** `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 10–11; slide 67–68) · [↩ Quay lại bảng (HTML #57)](#row-html-57)

```html
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
     width="400"
     height="341">
```

#### <a id="code-html-33"></a>CODE-HTML-33 — Thuộc tính title trên phần tử `<img>`
- **Nguồn:** `slides_drive/13_3.1 Tổng quan về đa phương tiện.pdf` (tr. 12; slide 69) · [↩ Quay lại bảng (HTML #58)](#row-html-58)

```html
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
     width="400"
     height="341"
     title="A T-Rex on display in the Manchester University Museum">
```

#### <a id="code-html-34"></a>CODE-HTML-34 — Chú thích hình ảnh ngữ nghĩa với `<figure>` và `<figcaption>`
- **Nguồn:** `slides_drive/14_3.2 Hình ảnh.pdf` (tr. 1–2; slide 70–71) · [↩ Quay lại bảng (HTML #59)](#row-html-59)
- **Ghi chú nguồn:** Ví dụ đầu tiên (slide 70) là mẫu cách làm kém ngữ nghĩa dùng để so sánh với giải pháp `<figure>`/`<figcaption>` ở slide 71.

```html
<div class="figure">
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">

  <p>A T-Rex on display in the Manchester University Museum.</p>
</div>

<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">

  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

#### <a id="code-html-35"></a>CODE-HTML-35 — Phân biệt ảnh nội dung HTML (`<img>`) và ảnh nền trang trí CSS (background-image)
- **Nguồn:** `slides_drive/14_3.2 Hình ảnh.pdf` (tr. 3–4; slide 72–73) · [↩ Quay lại bảng (HTML #60)](#row-html-60)
- **Ghi chú nguồn:** Slide 72 minh họa đoạn quy tắc CSS background-image bên trong bài giảng HTML đa phương tiện.

```html
p {
  background-image: url("images/dinosaur.jpg");
}
```

#### <a id="code-html-36"></a>CODE-HTML-36 — Phần tử `<video>`, thuộc tính src, controls và nội dung dự phòng
- **Nguồn:** `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 1–3; slide 74–76) · [↩ Quay lại bảng (HTML #61)](#row-html-61)

```html
<video src="rabbit320.webm" controls>
  <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a></p>
</video>
```

#### <a id="code-html-37"></a>CODE-HTML-37 — Thuộc tính nâng cao của `<video>` và thẻ `<source>` đa định dạng
- **Nguồn:** `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 4–5; slide 77–78) · [↩ Quay lại bảng (HTML #62)](#row-html-62)

```html
<video controls width="400" height="400"
       autoplay loop muted preload="auto"
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>Your browser doesn't support HTML video. Here is a <a href="rabbit320.mp4">link to the video</a></p>
</video>
```

#### <a id="code-html-38"></a>CODE-HTML-38 — Phần tử `<audio>` và `<source>` nhúng âm thanh
- **Nguồn:** `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 6–7; slide 79–80) · [↩ Quay lại bảng (HTML #63)](#row-html-63)

```html
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
</audio>
```

#### <a id="code-html-39"></a>CODE-HTML-39 — Phụ đề/văn bản theo thời gian WebVTT và phần tử `<track>`
- **Nguồn:** `slides_drive/15_3.3 Video _ Âm thanh.pdf` (tr. 8–10; slide 81–83) · [↩ Quay lại bảng (HTML #64)](#row-html-64)
- **Ghi chú nguồn:** Slide 81 cũng minh họa nội dung tệp WEBVTT (mốc 00:00:22.230 `-->` 00:00:24.606).

```html
<video controls>
  <source src="example.mp4" type="video/mp4">
  <source src="example.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish">
</video>
```

#### <a id="code-html-40"></a>CODE-HTML-40 — Phần tử `<iframe>` nhúng tài liệu web khác và các thuộc tính bảo mật
- **Nguồn:** `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 1–3; slide 84–86) · [↩ Quay lại bảng (HTML #65)](#row-html-65)

```html
<head>
  <style> iframe { border: none } </style>
</head>
<body>
  <iframe src="https://developer.mozilla.org/en-US/docs/Glossary"
          width="100%" height="500" allowfullscreen sandbox>
    <p>
      <a href="/en-US/docs/Glossary">
        Fallback link for browsers that don't support iframes
      </a>
    </p>
  </iframe>
</body>
```

#### <a id="code-html-41"></a>CODE-HTML-41 — Phần tử `<embed>` nhúng nội dung plugin ngoài
- **Nguồn:** `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 4–6; slide 87–89) · [↩ Quay lại bảng (HTML #66)](#row-html-66)

```html
<embed src="whoosh.swf" quality="medium"
       bgcolor="#ffffff" width="550" height="400"
       name="whoosh" align="middle" allowScriptAccess="sameDomain"
       allowFullScreen="false" type="application/x-shockwave-flash"
       pluginspage="http://www.macromedia.com/go/getflashplayer">
```

#### <a id="code-html-42"></a>CODE-HTML-42 — Phần tử `<object>` (và `<param>`) nhúng tệp ngoài/PDF và khuyến nghị thay thế
- **Nguồn:** `slides_drive/16_3.4 Object _ iframe.pdf` (tr. 4–5, 7; slide 87–88, 90) · [↩ Quay lại bảng (HTML #67)](#row-html-67)

```html
<object data="mypdf.pdf" type="application/pdf"
        width="800" height="1200">
  <p>You don't have a PDF plugin, but you can
    <a href="mypdf.pdf">download the PDF file.
    </a>
  </p>
</object>
```

#### <a id="code-html-43"></a>CODE-HTML-43 — Ngôn ngữ SVG và các phần tử đồ họa (`<svg>`, `<rect>`, `<circle>`, `<feColorMatrix>`, `<animate>`, `<mask>`)
- **Nguồn:** `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 4–7; slide 94–97) · [↩ Quay lại bảng (HTML #69)](#row-html-69)

```svg
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

#### <a id="code-html-44"></a>CODE-HTML-44 — Nhúng tệp SVG qua phần tử `<img>`
- **Nguồn:** `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 8–9; slide 98–99) · [↩ Quay lại bảng (HTML #70)](#row-html-70)

```html
<img
  src="equilateral.svg"
  alt="triangle with all three sides equal"
  height="87"
  width="100" />
```

#### <a id="code-html-45"></a>CODE-HTML-45 — Nhúng mã SVG nội tuyến (Inline `<svg>` trong HTML và `<foreignObject>`)
- **Nguồn:** `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 10–12; slide 100–102) · [↩ Quay lại bảng (HTML #71)](#row-html-71)

```html
<svg width="300" height="200">
  <rect width="100%" height="100%" fill="green" />
</svg>
```

#### <a id="code-html-46"></a>CODE-HTML-46 — Nhúng SVG bằng `<iframe>` (và lý do hạn chế sử dụng)
- **Nguồn:** `slides_drive/17_3.5 Đồ hoạ vector.pdf` (tr. 13–14; slide 103–104) · [↩ Quay lại bảng (HTML #72)](#row-html-72)

```html
<iframe src="triangle.svg" width="500" height="500" sandbox>
  <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```

#### <a id="code-html-47"></a>CODE-HTML-47 — Xây dựng bảng cơ bản với `<table>`, hàng `<tr>` và ô dữ liệu `<td>`
- **Nguồn:** `slides_drive/18_4.1 Tổng quan về Bảng (Table).pdf` (tr. 6–9; slide 110–113) · [↩ Quay lại bảng (HTML #74)](#row-html-74)
- **Ghi chú nguồn:** Slide 110–111 trình bày riêng thẻ `<table></table>` và 4 thẻ `<td>` trước khi bọc vào `<tr>` ở slide 112.

```html
<tr>
  <td>Hi, I'm your first cell.</td>
  <td>I'm your second cell.</td>
  <td>I'm your third cell.</td>
  <td>I'm your fourth cell.</td>
</tr>
```

#### <a id="code-html-48"></a>CODE-HTML-48 — Gộp ô nhiều cột (colspan) và nhiều hàng (rowspan) trong bảng
- **Nguồn:** `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 4–5; slide 117–118) · [↩ Quay lại bảng (HTML #76)](#row-html-76)

```html
<table>
  <tr>
    <th>Animals</th>
  </tr>
  <tr>
    <th>Hippopotamus</th>
  </tr>
  <tr>
    <th>Horse</th>
    <td>Mare</td>
  </tr>
  <tr>
    <td>Stallion</td>
  </tr>
  <tr>
    <th>Crocodile</th>
  </tr>
  <tr>
    <th>Chicken</th>
    <td>Hen</td>
  </tr>
  <tr>
    <td>Rooster</td>
  </tr>
</table>
```

#### <a id="code-html-49"></a>CODE-HTML-49 — Định kiểu cột dùng chung với `<colgroup>`, `<col>` và thuộc tính span
- **Nguồn:** `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 6–8; slide 119–121) · [↩ Quay lại bảng (HTML #77)](#row-html-77)
- **Ghi chú nguồn:** Slide 120 minh họa `<colgroup>`/`<col>` áp dụng cho cột 2; slide 121 minh họa dùng span="2" cho cả hai cột.

```html
<table>
  <colgroup>
    <col>
    <col style="background-color: yellow">
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td>Jazz</td>
  </tr>
</table>

<colgroup>
  <col style="background-color: yellow" span="2">
</colgroup>
```

#### <a id="code-html-50"></a>CODE-HTML-50 — Chú thích bảng `<caption>` và thuộc tính summary lỗi thời trong HTML5
- **Nguồn:** `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 9–10; slide 122–123) · [↩ Quay lại bảng (HTML #78)](#row-html-78)

```html
<table>
  <caption>Dinosaurs in the Jurassic period</caption>
  ...
</table>
```

#### <a id="code-html-51"></a>CODE-HTML-51 — Bảng lồng nhau (Nesting Tables) và nhược điểm bảo trì
- **Nguồn:** `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 5–6; slide 128–129) · [↩ Quay lại bảng (HTML #80)](#row-html-80)

```html
<table id="table1">
  <tr>
    <th>title1</th>
    <th>title2</th>
    <th>title3</th>
  </tr>
  <tr>
    <td id="nested">
      <table id="table2">
        <tr>
          <td>cell1</td>
          <td>cell2</td>
          <td>cell3</td>
        </tr>
      </table>
    </td>
    <td>cell2</td>
    <td>cell3</td>
  </tr>
  <tr>
    <td>cell4</td>
    <td>cell5</td>
    <td>cell6</td>
  </tr>
</table>
```

#### <a id="code-html-52"></a>CODE-HTML-52 — Khả năng truy cập bảng với thuộc tính scope (col, row, colgroup, rowgroup)
- **Nguồn:** `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 7–10; slide 130–133) · [↩ Quay lại bảng (HTML #81)](#row-html-81)
- **Ghi chú nguồn:** Đã ghép ví dụ scope="col" (slide 131) và scope="row" (slide 132).

```html
<thead>
  <tr>
    <th scope="col">Purchase</th>
    <th scope="col">Location</th>
    <th scope="col">Date</th>
    <th scope="col">Evaluation</th>
    <th scope="col">Cost (€)</th>
  </tr>
</thead>

<tr>
  <th scope="row">Haircut</th>
  <td>Hairdresser</td>
  <td>12/09</td>
  <td>Great idea</td>
  <td>30</td>
</tr>
```

#### <a id="code-html-53"></a>CODE-HTML-53 — Khả năng truy cập bảng phức tạp bằng cặp thuộc tính id và headers
- **Nguồn:** `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 11–13; slide 134–136) · [↩ Quay lại bảng (HTML #82)](#row-html-82)

```html
<thead>
  <tr>
    <th id="purchase">Purchase</th>
    <th id="location">Location</th>
    <th id="date">Date</th>
    <th id="evaluation">Evaluation</th>
    <th id="cost">Cost (€)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th id="haircut">Haircut</th>
    <td headers="location haircut">Hairdresser</td>
    <td headers="date haircut">12/09</td>
    <td headers="evaluation haircut">Great idea</td>
    <td headers="cost haircut">30</td>
  </tr>
  ...
</tbody>
```

#### <a id="code-html-54"></a>CODE-HTML-54 — Thẻ `<meta name="viewport">` hỗ trợ Responsive Web Design
- **Nguồn:** `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 5); `LABs/08_LAB 4_Lab4-1-start/Lab4-1-start/index.html` (dòng 6) · [↩ Quay lại bảng (HTML #83)](#row-html-83)

```html
<meta name="viewport" content="width=device-width">

  <meta name="viewport" content="width=device-width, initial-scale=1">
```

#### <a id="code-html-55"></a>CODE-HTML-55 — Hình ảnh đáp ứng (Responsive Images) với srcset và sizes trên `<img>`
- **Nguồn:** `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 1–3); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 118–133) · [↩ Quay lại bảng (HTML #84)](#row-html-84)

```html
<div class="further-info">
        <!-- insert images with srcsets and sizes -->
        <a href="https://www.mozilla.org/en-US/firefox/new/">
          <img>
        </a>
        <a href="https://www.mozilla.org/">
          <img>
        </a>
        <a href="https://addons.mozilla.org/">
          <img>
        </a>
        <a href="https://developer.mozilla.org/en-US/">
          <img>
        </a>
        <div class="clearfix"></div>
      </div>
```

#### <a id="code-html-56"></a>CODE-HTML-56 — Chuyển hướng nghệ thuật (Art Direction) với phần tử `<picture>` và `<source>`
- **Nguồn:** `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 2–5); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 135–137) · [↩ Quay lại bảng (HTML #85)](#row-html-85)
- **Ghi chú nguồn:** Trong file khởi đầu Lab 2-1start/index.html chỉ đặt khung `<div>` và dòng comment giữ chỗ để sinh viên tự viết `<picture>` theo đề bài PDF Lab 2 tr. 3.

```html
<div class="red-panda">
        <!-- insert picture element -->
      </div>
```

#### <a id="code-html-57"></a>CODE-HTML-57 — Nhúng video YouTube qua `<iframe>` và tối ưu dung lượng ảnh (TinyPNG)
- **Nguồn:** `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 1–2); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 108–109) · [↩ Quay lại bảng (HTML #86)](#row-html-86)
- **Ghi chú nguồn:** File khởi đầu chỉ chứa comment giữ chỗ; yêu cầu cụ thể (URL video YouTube, chiều rộng 400px, tối ưu ảnh qua tinypng.com) nằm ở PDF Lab 2 tr. 1–2.

```html
<article>
        <!-- insert iframe from youtube -->
```

#### <a id="code-html-58"></a>CODE-HTML-58 — Cấu trúc tệp SVG phức hợp (viewBox, `<g>`, `<defs>`, `<linearGradient>`, `<stop>`, `<polygon>`, `<path>`, `<clipPath>`, `<use>`)
- **Nguồn:** `LABs/04_LAB 2_Lab2-1start/originals/mdn.svg` (dòng 1–15, 46–66) · [↩ Quay lại bảng (HTML #87)](#row-html-87)
- **Ghi chú nguồn:** Trích nguyên văn hai đoạn đại diện (dòng 1–15 và dòng 46–66) trong tổng số 175 dòng của tệp mdn.svg; phần đóng thẻ `</g></svg>` nằm ở cuối tệp (dòng 170–175).

```svg
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 13.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 14948)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="400px" height="300px" viewBox="0 0 400 300" enable-background="new 0 0 400 300" xml:space="preserve">
<g>
	
		<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-102.1206" y1="-471.7104" x2="-102.1206" y2="-365.8784" gradientTransform="matrix(1.98 0 0 -1.98 402.04 -684.3301)">
		<stop  offset="0" style="stop-color:#2075BC"/>
		<stop  offset="1" style="stop-color:#29AAE1"/>
	</linearGradient>
	<polygon fill="url(#SVGID_1_)" points="259.074,40.269 259.074,39.898 259.074,40.269 258.706,39.898 258.706,40.269 
		199.839,63.594 140.604,40.269 140.604,39.898 140.236,40.269 140.236,39.898 140.236,40.269 81,63.963 81,249.447 
		140.236,226.861 199.839,249.447 199.839,249.447 199.839,249.447 199.839,249.447 199.839,249.447 259.074,226.861 
		318.686,249.447 318.686,63.963 	"/>

					<defs>
						<path id="SVGID_6_" d="M284.621,148.745c-2.22-6.294-1.482-17.03-2.589-18.511c-7.035-9.626-32.214-11.107-43.689-23.696
							c1.852-6.292-2.22-11.106-6.291-15.178c-6.298-4.443-14.809-2.592-21.476-0.741c-7.404-1.48-14.44-4.443-21.843-6.294
							c-16.288-1.851-32.579,9.626-32.579,9.626c-11.848,7.405-29.987,22.955-38.874,31.84c2.224,0.371,4.443-1.48,7.036-1.48
							l17.029-4.443c-7.032,5.924-21.841,15.92-26.284,24.064c5.181-1.851,16.288-7.775,21.841-8.515
							c-4.812,4.073-14.809,12.217-18.139,17.399c0.369,0.372,0,0.741,0,1.11c4.071-2.221,14.067-8.145,18.88-8.515
							c-4.812,4.812-13.327,14.44-15.178,20.735c4.071-2.593,14.437-8.146,18.88-9.629c-1.11,2.592-3.33,4.443-4.812,6.664
							c-2.22,3.333-7.036,7.404-7.036,11.479c3.702-3.334,8.146-6.295,12.589-8.514c-1.851,4.07-5.553,7.404-6.664,12.584
							c2.961-2.961,8.515-4.443,12.217-5.553l-0.369,0.373c-0.373,0.368-4.443,3.329-7.404,6.662c2.588,0,0.737-0.371,4.071,0.369
							h1.851c-0.741,0.373-1.851,1.11-2.961,1.482l0,0c-1.482,0.741-3.333,1.852-4.812,2.592
							c7.032,8.884,15.547,16.288,25.543,21.101c12.958,6.294,27.025,8.519,41.463,6.667c0-0.741-0.368-1.482-0.736-2.592l0,0l0,0
							c-0.369-1.11-0.746-1.852-0.746-2.962l0,0l0,0c4.816-8.887,2.228-24.437,14.81-30.731c8.519-4.439,9.255-6.663,18.888-4.812
							c5.177,1.11,16.66,4.812,21.837,3.703c4.815-2.593,7.404-4.071,11.852-7.032c5.185,1.11,7.036,0.368,8.887-2.224
							c-1.851,2.592,3.326-9.625,5.554-14.068L284.621,148.745z"/>
					</defs>
					<clipPath id="SVGID_7_">
						<use xlink:href="#SVGID_6_"  overflow="visible"/>
					</clipPath>
					<path clip-path="url(#SVGID_7_)" fill="#FFFFFF" d="M199.839,74.701c60.935,0,110.329,33.481,110.329,74.785
						c0,41.305-49.395,74.783-110.329,74.783c-60.926,0-110.324-33.479-110.324-74.783
						C89.515,108.182,138.913,74.701,199.839,74.701z"/>
```

#### <a id="code-html-59"></a>CODE-HTML-59 — Thực hành tổng hợp bảng dữ liệu phức tạp (Planets data) và `<sup>` / `<a>` trong bảng
- **Nguồn:** `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 6–9) · [↩ Quay lại bảng (HTML #88)](#row-html-88)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Table template</title>
    <link href="minitable-table.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <h1>Table template</h1>


  </body>
</html>

Mass (10<sup>24</sup>kg)
Density (kg/m<sup>3</sup>)
Gravity (m/s<sup>2</sup>)
Distance from Sun (10<sup>6</sup>km)

Data about the planets of our solar system (Planetary facts taken from <a href="http://nssdc.gsfc.nasa.gov/planetary/factsheet/">Nasa's Planetary Fact Sheet - Metric</a>).
```

#### <a id="code-html-60"></a>CODE-HTML-60 — Tham chiếu thực thể ký tự bản quyền &copy; trong `<footer>`
- **Nguồn:** `LABs/06_LAB 3_Lab3-1-start/index.html` (dòng 75–79) · [↩ Quay lại bảng (HTML #89)](#row-html-89)

```html
<footer>

    <p>&copy; 2021 University of Information Technology</p>

  </footer>
```

#### <a id="code-html-61"></a>CODE-HTML-61 — Phần tử `<button>` dùng cho tương tác DOM/JS
- **Nguồn:** `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 15–19) · [↩ Quay lại bảng (HTML #90)](#row-html-90)

```html
<div class="full-img">
      <img class="displayed-img" src="images/pic1.jpg">
      <div class="overlay"></div>
      <button class="dark">Darken</button>
    </div>
```

#### <a id="code-html-62"></a>CODE-HTML-62 — Phần tử đồ họa HTML5 `<canvas>`
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 9–14) · [↩ Quay lại bảng (HTML #91)](#row-html-91)

```html
<body>
    <h1>bouncing balls</h1>
    <canvas></canvas>

    <script src="main-finished-es6.js"></script>
  </body>
```

### 4.2. Code mẫu phần CSS (`73` khối)

#### <a id="code-css-01"></a>CODE-CSS-01 — Cú pháp CSS cơ bản: Selector, khối `{ }` và cặp `property: value;`
- **Nguồn:** `slides_drive/22_5.1 Giới thiệu _ Tổng quan CSS.pdf` (tr. 11–13) · [↩ Quay lại bảng (CSS #02)](#row-css-02)

```css
h1 {
    color: red;
    font-size: 5em;
}

p {
    color: black;
}
```

#### <a id="code-css-02"></a>CODE-CSS-02 — Cấu trúc tài liệu HTML nền tảng để gắn quy tắc CSS
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 2; slide 16) · [↩ Quay lại bảng (CSS #04)](#row-css-04)

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Getting started with CSS</title>
</head>

<body>

    <h1>I am a level one heading</h1>

    <p>This is a paragraph of text. In the text is a <span>span element</span>
and also a <a href="https://example.com">link</a>.</p>

    <p>This is the second paragraph. It contains an <em>emphasized</em> element.</p>

    <ul>
        <li>Item <span>one</span></li>
        <li>Item two</li>
        <li>Item <em>three</em></li>
    </ul>

</body>

</html>
```

#### <a id="code-css-03"></a>CODE-CSS-03 — Type Selector (Bộ chọn theo tên phần tử HTML)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 6; slide 20) · [↩ Quay lại bảng (CSS #06)](#row-css-06)

```css
p {
    color: green;
}
```

#### <a id="code-css-04"></a>CODE-CSS-04 — Selector List (Nhóm nhiều selector bằng dấu phẩy `,`)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 6; slide 20); `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) · [↩ Quay lại bảng (CSS #07)](#row-css-07)

```css
p, li {
    color: green;
}
```

#### <a id="code-css-05"></a>CODE-CSS-05 — Thay đổi định dạng mặc định của trình duyệt (User-Agent Override)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 7; slide 21) · [↩ Quay lại bảng (CSS #08)](#row-css-08)

```css
li {
    list-style-type: none;
}
```

#### <a id="code-css-06"></a>CODE-CSS-06 — Class Selector (`.className`) để chọn tập hợp con có chủ đích
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 8–9; slide 22–23) · [↩ Quay lại bảng (CSS #09)](#row-css-09)
- **Ghi chú nguồn:** HTML đi kèm trên slide 23: `<ul><li>`Item one`</li><li class="special">`Item two`</li><li>`Item `<em>`three`</em></li></ul>`.

```css
.special {
    color: orange;
    font-weight: bold;
}
```

#### <a id="code-css-07"></a>CODE-CSS-07 — Descendant Combinator (Bộ chọn con cháu - khoảng trắng)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 10; slide 24) · [↩ Quay lại bảng (CSS #10)](#row-css-10)

```css
li em {
    color: rebeccapurple;
}
```

#### <a id="code-css-08"></a>CODE-CSS-08 — Adjacent Sibling Combinator (Bộ chọn anh em liền kề `+`)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 11; slide 25) · [↩ Quay lại bảng (CSS #11)](#row-css-11)

```css
h1 + p {
    font-size: 200%;
}
```

#### <a id="code-css-09"></a>CODE-CSS-09 — Tạo kiểu liên kết theo trạng thái cơ bản (`a:link`, `a:visited`)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 12; slide 26) · [↩ Quay lại bảng (CSS #12)](#row-css-12)

```css
a:link {
    color: pink;
}

a:visited {
    color: green;
}
```

#### <a id="code-css-10"></a>CODE-CSS-10 — Kết hợp nhiều Selector, Combinator và chú thích CSS (`/* ... */`)
- **Nguồn:** `slides_drive/23_5.2 Bắt đầu với CSS.pdf` (tr. 13; slide 27) · [↩ Quay lại bảng (CSS #13)](#row-css-13)

```css
/* selects any <span> that is inside a <p>, which is inside an <article> */
article p span { ... }

/* selects any <p> that comes directly after a <ul>, which comes directly after an <h1> */
h1 + ul + p { ... }

body h1 + p .special {
    color: yellow;
    background-color: black;
    padding: 5px;
}
```

#### <a id="code-css-11"></a>CODE-CSS-11 — External Stylesheet và điều chỉnh đường dẫn tương đối (`<link>`)
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 2–5; slide 29–32) · [↩ Quay lại bảng (CSS #14)](#row-css-14)

```html
<!-- Inside a subdirectory called styles inside the current directory -->
<link rel="stylesheet" href="styles/style.css">

<!-- Inside a subdirectory called general, which is in a subdirectory called styles,
<link rel="stylesheet" href="styles/general/style.css">

<!-- Go up one directory level, then inside a subdirectory called styles -->
<link rel="stylesheet" href="../styles/style.css">
```

#### <a id="code-css-12"></a>CODE-CSS-12 — Internal Stylesheet (thẻ `<style>` trong `<head>`)
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 6–7; slide 33–34); `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 8–97) · [↩ Quay lại bảng (CSS #15)](#row-css-15)
- **Ghi chú nguồn:** Ở `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 8–97) chứa khối `<style>` dài 90 dòng — chi tiết các quy tắc nổi bật (`box-shadow: inset`, `.clearfix`, định vị logo) được tách riêng tại mục cuối phần CSS từ Lab 2; dòng 7 file Lab 2 còn dùng `type="text/css"` trên `<link>` (không bắt buộc trong HTML5).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
    <style>
      h1 {
        color: blue;
        background-color: yellow;
        border: 1px solid black;
      }

      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first CSS example</p>
  </body>
</html>
```

#### <a id="code-css-13"></a>CODE-CSS-13 — Inline Styles (thuộc tính HTML `style="..."`)
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 8–9; slide 35–36) · [↩ Quay lại bảng (CSS #16)](#row-css-16)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My CSS experiment</title>
  </head>
  <body>
    <h1 style="color: blue;background-color: yellow;border: 1px solid black;">Hello World!</h1>
    <p style="color:red;">This is my first CSS example</p>
  </body>
</html>
```

#### <a id="code-css-14"></a>CODE-CSS-14 — Structural Pseudo-class `:first-child` và tổ hợp danh sách selector hợp lệ
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 10; slide 37) · [↩ Quay lại bảng (CSS #19)](#row-css-19)

```css
h1
a:link
.manythings
#onething
*
.box p
.box p:first-child
h1, h2, .intro
```

#### <a id="code-css-15"></a>CODE-CSS-15 — Specificity (Độ ưu tiên của Selector khi có xung đột quy tắc)
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 11–12; slide 38–39) · [↩ Quay lại bảng (CSS #20)](#row-css-20)

```css
.special {
  color: red;
}

p {
  color: blue;
}
```

#### <a id="code-css-16"></a>CODE-CSS-16 — Cascade (Quy tắc tầng — thứ tự nguồn trong stylesheet)
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 13; slide 40) · [↩ Quay lại bảng (CSS #21)](#row-css-21)

```css
p {
  color: red;
}

p {
  color: blue;
}
```

#### <a id="code-css-17"></a>CODE-CSS-17 — Giải phẫu thành phần CSS: Thuộc tính, Giá trị, Khai báo, Khối khai báo và Bộ quy tắc
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 14; slide 41) · [↩ Quay lại bảng (CSS #22)](#row-css-22)

```css
h1 {
  color: blue;
  background-color: yellow;
}

p {
  color: red;
}
```

#### <a id="code-css-18"></a>CODE-CSS-18 — CSS Functions — Hàm tính toán kích thước `calc()`
- **Nguồn:** `slides_drive/24_5.3 Cách cấu trúc CSS.pdf` (tr. 15; slide 42) · [↩ Quay lại bảng (CSS #23)](#row-css-23)
- **Ghi chú nguồn:** HTML đi kèm slide 42: `<div class="outer"><div class="box">`The inner box is 90% - 30px.`</div></div>`.

```css
.outer {
  border: 5px solid black;
}

.box {
  padding: 10px;
  width: calc(90% - 30px);
  background-color: rebeccapurple;
  color: white;
}
```

#### <a id="code-css-19"></a>CODE-CSS-19 — Thuộc tính `background-color` và các hệ màu CSS (`#hex`, tên màu, `rgba()`)
- **Nguồn:** `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 4; slide 46) · [↩ Quay lại bảng (CSS #25)](#row-css-25)
- **Ghi chú nguồn:** HTML đi kèm slide 46: `<div class="box"><h2>`Background Colors`</h2><p>`Try changing the background `<span>`colors`</span>`.`</p></div>`.

```css
.box {
  background-color: #567895;
}

h2 {
  background-color: black;
  color: white;
}
span {
  background-color: rgba(255,255,255,.5);
}
```

#### <a id="code-css-20"></a>CODE-CSS-20 — Thuộc tính `background-image` và hàm `url()`
- **Nguồn:** `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 5; slide 47) · [↩ Quay lại bảng (CSS #26)](#row-css-26)
- **Ghi chú nguồn:** HTML đi kèm slide 47: `<div class="wrapper"><div class="box a"></div><div class="box b"></div></div>`.

```css
.a {
  background-image: url(balloons.jpg);
}

.b {
  background-image: url(star.png);
}
```

#### <a id="code-css-21"></a>CODE-CSS-21 — Thuộc tính đường viền `border` (shorthand và từng cạnh/kiểu nét)
- **Nguồn:** `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 6; slide 48) · [↩ Quay lại bảng (CSS #27)](#row-css-27)
- **Ghi chú nguồn:** HTML đi kèm slide 48: `<div class="box"><h2>`Borders`</h2><p>`Try changing the borders.`</p></div>`.

```css
.box {
  background-color: #567895;
  border: 5px solid #0b385f;
  border-bottom-style: dashed;
  color: #fff;
}

h2 {
  border-top: 2px dotted rebeccapurple;
  border-bottom: 1em double rgb(24, 163, 78);
}
```

#### <a id="code-css-22"></a>CODE-CSS-22 — Kiểm soát tỷ lệ ảnh trong hộp bằng `object-fit: cover` và `object-fit: contain`
- **Nguồn:** `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 7–8; slide 49–50) · [↩ Quay lại bảng (CSS #28)](#row-css-28)
- **Ghi chú nguồn:** HTML đi kèm slide 50: `<div class="wrapper"><div class="box"><img src="balloons.jpg" alt="balloons" class="cover"></div><div class="box"><img src="balloons.jpg" alt="balloons" class="contain"></div></div>`.

```css
.box {
  width: 200px;
  height: 200px;
}

img {
  height: 100%;
  width: 100%;
}

.cover {
  object-fit: cover;
}

.contain {
  object-fit: contain;
}
```

#### <a id="code-css-23"></a>CODE-CSS-23 — Tạo kiểu biểu mẫu (Form Styling) và Attribute Selector (`input[type="..."]`)
- **Nguồn:** `slides_drive/25_5.4 Cách CSS hoạt động _ Xây dựng block trong CSS.pdf` (tr. 9–10; slide 51–52) · [↩ Quay lại bảng (CSS #29)](#row-css-29)
- **Ghi chú nguồn:** HTML đi kèm slide 52: form chứa label+input text, email và div.buttons > input submit.

```css
input[type="text"],
input[type="email"] {
  border: 2px solid #000;
  margin: 0 0 1em 0;
  padding: 10px;
  width: 100%;
}

input[type="submit"] {
  border: 3px solid #333;
  background-color: #999;
  border-radius: 5px;
  padding: 10px 2em;
  font-weight: bold;
  color: #fff;
}

input[type="submit"]:hover {
  background-color: #333;
}
```

#### <a id="code-css-24"></a>CODE-CSS-24 — Thuộc tính `color` (Màu nội dung tiền cảnh)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 5–7; slide 57–59) · [↩ Quay lại bảng (CSS #30)](#row-css-30)
- **Ghi chú nguồn:** Slide 57 phân chia thuộc tính tạo kiểu chữ thành 2 nhóm: Font styles và Text layout styles; slide 58 là HTML mẫu 'Tommy the cat'.

```css
p {
  color: red;
}
```

#### <a id="code-css-25"></a>CODE-CSS-25 — Thuộc tính `font-family`, Web Safe Fonts, 5 Generic Fonts và Font Stacks
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 8–12; slide 60–64); `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 8; slide 103) · [↩ Quay lại bảng (CSS #31)](#row-css-31)
- **Ghi chú nguồn:** Slide 61 minh họa font-family: arial;; slide 64 minh họa font-family: Helvetica, Arial, sans-serif;; slide 103 (28_6.3) minh họa Helvetica, "Trebuchet MS", Verdana, sans-serif;.

```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

#### <a id="code-css-26"></a>CODE-CSS-26 — Thuộc tính `font-size` và các đơn vị kích thước (`px`, `em`, `rem`)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 13–14; slide 65–66) · [↩ Quay lại bảng (CSS #32)](#row-css-32)

```css
html {
  font-size: 10px;
}

h1 {
  font-size: 5rem;
}

p {
  font-size: 1.5rem;
  color: red;
  font-family: Helvetica, Arial, sans-serif;
}
```

#### <a id="code-css-27"></a>CODE-CSS-27 — Thuộc tính `font-weight` (Độ đậm chữ)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 17, 20; slide 69, 72) · [↩ Quay lại bảng (CSS #34)](#row-css-34)
- **Ghi chú nguồn:** Slide 69 giải thích normal/bold, lighter/bolder, 100–900; ví dụ code dùng bold xuất hiện ở slide 72.

```css
h1 + p {
  font-weight: bold;
}
```

#### <a id="code-css-28"></a>CODE-CSS-28 — Thuộc tính `text-transform` (Biến đổi chữ hoa/thường)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 18, 20; slide 70, 72) · [↩ Quay lại bảng (CSS #35)](#row-css-35)

```css
h1 {
  font-size: 5rem;
  text-transform: capitalize;
}
```

#### <a id="code-css-29"></a>CODE-CSS-29 — Thuộc tính `text-shadow` (Đổ bóng văn bản đơn và nhiều lớp bóng)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 21–22; slide 73–74) · [↩ Quay lại bảng (CSS #37)](#row-css-37)
- **Ghi chú nguồn:** Slide 73 minh họa bóng đơn, slide 74 minh họa multiple shadows.

```css
text-shadow: 4px 4px 5px red;

text-shadow: 1px 1px 1px red,
             2px 2px 1px red;
```

#### <a id="code-css-30"></a>CODE-CSS-30 — Thuộc tính `letter-spacing` và `word-spacing` (Khoảng cách chữ cái và từ)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 25; slide 77) · [↩ Quay lại bảng (CSS #40)](#row-css-40)

```css
p::first-line {
  letter-spacing: 4px;
  word-spacing: 4px;
}
```

#### <a id="code-css-31"></a>CODE-CSS-31 — Pseudo-element `::first-line` (Tạo kiểu dòng đầu tiên của đoạn văn)
- **Nguồn:** `slides_drive/26_6.1 Văn bản cơ bản _ Kiểu phông chữ.pdf` (tr. 25; slide 77) · [↩ Quay lại bảng (CSS #41)](#row-css-41)

```css
p::first-line {
  letter-spacing: 4px;
  word-spacing: 4px;
}
```

#### <a id="code-css-32"></a>CODE-CSS-32 — Đồng bộ khoảng cách & nhịp dọc (Vertical Rhythm) cho danh sách và đoạn văn
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 5–7; slide 82–84) · [↩ Quay lại bảng (CSS #43)](#row-css-43)

```css
/* General styles */

html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 10px;
}

h2 {
  font-size: 2rem;
}

ul,ol,dl,p {
  font-size: 1.5rem;
}

li, p {
  line-height: 1.5;
}

/* Description list styles */

dd, dt {
  line-height: 1.5;
}

dt {
  font-weight: bold;
}
```

#### <a id="code-css-33"></a>CODE-CSS-33 — Inheritance (Cơ chế kế thừa thuộc tính CSS và từ khóa `inherit`)
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 5; slide 82); `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 12; slide 116); `LABs/12_LAB 6_Lab6-1-start/style.css` (dòng 10–13) · [↩ Quay lại bảng (CSS #44)](#row-css-44)
- **Ghi chú nguồn:** Slide 82 nêu nguyên tắc kế thừa xuống mọi phần tử trên trang và phần tử con của danh sách; slide 116 (30_7.1 p.12) giới thiệu giá trị float: inherit; Lab 6 (LABs/12_LAB 6_Lab6-1-start/style.css dòng 10–13) dùng height: inherit;.

```css
html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 10px;
}
```

#### <a id="code-css-34"></a>CODE-CSS-34 — Thuộc tính `list-style-type` (Kiểu dấu đầu dòng danh sách)
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 8–9; slide 85–86) · [↩ Quay lại bảng (CSS #45)](#row-css-45)

```css
ol {
  list-style-type: upper-roman;
}
```

#### <a id="code-css-35"></a>CODE-CSS-35 — Thuộc tính `list-style-position` (`inside` / `outside`)
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 10; slide 87) · [↩ Quay lại bảng (CSS #46)](#row-css-46)

```css
ol {
  list-style-type: upper-roman;
  list-style-position: inside;
}
```

#### <a id="code-css-36"></a>CODE-CSS-36 — Tùy chỉnh biểu tượng danh sách bằng `list-style-image` và kỹ thuật `background-*` thay thế
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 11–14; slide 88–91) · [↩ Quay lại bảng (CSS #47)](#row-css-47)
- **Ghi chú nguồn:** Slide 88 minh họa list-style-image: url(star.svg);. Slide 89 văn bản ghi 'xuống 20px', tương ứng 2rem khi đặt html { font-size: 10px; }.

```css
ul {
  padding-left: 2rem;
  list-style-type: none;
}

ul li {
  padding-left: 2rem;
  background-image: url(star.svg);
  background-position: 0 0;
  background-size: 1.6rem 1.6rem;
  background-repeat: no-repeat;
}
```

#### <a id="code-css-37"></a>CODE-CSS-37 — Thuộc tính viết tắt `list-style` (Shorthand)
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 15; slide 92) · [↩ Quay lại bảng (CSS #48)](#row-css-48)
- **Ghi chú nguồn:** Slide 92 minh họa chuyển đổi từ 3 thuộc tính tách rời sang 1 dòng shorthand.

```css
ul {
  list-style-type: square;
  list-style-image: url(example.png);
  list-style-position: inside;
}

ul {
  list-style: square url(example.png) inside;
}
```

#### <a id="code-css-38"></a>CODE-CSS-38 — Kiểm soát đánh số danh sách `<ol>` với thuộc tính HTML `start`, `reversed`, `value`
- **Nguồn:** `slides_drive/27_6.2 Tạo kiểu danh sách.pdf` (tr. 16–18; slide 93–95) · [↩ Quay lại bảng (CSS #49)](#row-css-49)
- **Ghi chú nguồn:** Slide 93 minh họa start="4", slide 94 minh họa start="4" reversed, slide 95 minh họa `<li value="2/4/6/8">`.

```html
<ol start="4" reversed>
  <li>Toast pita, leave to cool, then slice down the edge.</li>
  <li>Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
  <li>Wash and chop the salad.</li>
  <li>Fill pita with salad, hummus, and fried halloumi.</li>
</ol>
```

#### <a id="code-css-39"></a>CODE-CSS-39 — Pseudo-classes trạng thái liên kết theo thứ tự (`:link`, `:visited`, `:focus`, `:hover`, `:active`)
- **Nguồn:** `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 2–3; slide 97–98) · [↩ Quay lại bảng (CSS #50)](#row-css-50)
- **Ghi chú nguồn:** Slide 98 minh họa đúng thứ tự 5 trạng thái (Link -> Visited -> Focus -> Hover -> Active), dù không ghi chữ viết tắt 'LVFHA'.

```css
a:link {
  color: #265301;
}

a:visited {
  color: #437A16;
}

a:focus {
  border-bottom: 1px solid;
  background: #BAE498;
}

a:hover {
  border-bottom: 1px solid;
  background: #CDFEAA;
}

a:active {
  background: #265301;
  color: #CDFEAA;
}
```

#### <a id="code-css-40"></a>CODE-CSS-40 — Chèn biểu tượng liên kết ngoài bằng Attribute Substring Selector (`[href*="..."]`) và `background`
- **Nguồn:** `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 4; slide 99) · [↩ Quay lại bảng (CSS #51)](#row-css-51)

```css
a:link {
  color: blue;
}

a:visited {
  color: purple;
}

a:focus, a:hover {
  border-bottom: 1px solid;
}

a:active {
  color: red;
}

a[href*="#"] {
  background: url('external-link-52.png') no-repeat 100% 0;
  background-size: 16px 16px;
  padding-right: 19px;
}
```

#### <a id="code-css-41"></a>CODE-CSS-41 — Biến liên kết thành dạng nút bấm (Button-style Links) và Pseudo-class `:last-child`
- **Nguồn:** `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 5–6; slide 100–101) · [↩ Quay lại bảng (CSS #52)](#row-css-52)

```css
a {
  outline: none;
  text-decoration: none;
  display: inline-block;
  width: 19.5%;
  margin-right: 0.625%;
  text-align: center;
  line-height: 3;
  color: black;
}

li:last-child a {
  margin-right: 0;
}

a:link, a:visited, a:focus {
  background: yellow;
}

a:hover {
  background: orange;
}

a:active {
  background: red;
  color: white;
}
```

#### <a id="code-css-42"></a>CODE-CSS-42 — Web Fonts với quy tắc `@font-face` và định dạng `.woff2`
- **Nguồn:** `slides_drive/28_6.3 Tạo kiểu liên kết _ Phông chữ web.pdf` (tr. 9; slide 104) · [↩ Quay lại bảng (CSS #53)](#row-css-53)

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.woff2");
}

html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```

#### <a id="code-css-43"></a>CODE-CSS-43 — Chuẩn hóa mô hình hộp với `box-sizing: border-box` (Lab 3)
- **Nguồn:** `LABs/06_LAB 3_Lab3-1-start/style.css` (dòng 3–5) · [↩ Quay lại bảng (CSS #54)](#row-css-54)

```css
* {
  box-sizing: border-box;
}
```

#### <a id="code-css-44"></a>CODE-CSS-44 — Khung trang `min-width`/`max-width`, `margin: 0 auto` và bố cục 3 cột `float`/`clear` trong file khởi đầu Lab 3
- **Nguồn:** `LABs/06_LAB 3_Lab3-1-start/style.css` (dòng 7–43); `slides_drive/29_IE104 _ LAB 3.pdf` / `LABs/05_LAB 3_BT3.1.2.pdf` (tr. 1–2) · [↩ Quay lại bảng (CSS #55)](#row-css-55)
- **Ghi chú nguồn:** File khởi đầu Lab 3 cung cấp sẵn phần CSS khung 3 cột để sinh viên viết bổ sung phần typography/link/list/menu từ dòng 45 trở xuống.

```css
body {
  margin: 0 auto;
  min-width: 1000px;
  max-width: 1400px;
}

/* Layout */

section {
  float: left;
  width: 50%;
}

aside {
  float: left;
  width: 30%;
}

nav {
  float: left;
  width: 20%;
}

footer {
  clear: both;
}

header, section, aside, nav, footer {
  padding: 20px;
}

/* header and footer */

header, footer {
  border-top: 5px solid #a66;
  border-bottom: 5px solid #a66;
}
```

#### <a id="code-css-45"></a>CODE-CSS-45 — Tổng quan các kỹ thuật bố cục CSS và khái niệm phối hợp đa kỹ thuật
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 3–4; slide 107–108) · [↩ Quay lại bảng (CSS #58)](#row-css-58)
- **Ghi chú nguồn:** Slide 108 dùng đoạn HTML thuần trên để minh họa Normal flow mặc định trước khi áp các kỹ thuật bố cục CSS.

```html
<p>I love my cat.</p>

<ul>
  <li>Buy cat food</li>
  <li>Exercise</li>
  <li>Cheer up friend</li>
</ul>

<p>The end!</p>
```

#### <a id="code-css-46"></a>CODE-CSS-46 — Giới thiệu Flexbox (`display: flex`, `flex: 1`) và Child Combinator (`>`)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 8–9; slide 112–113) · [↩ Quay lại bảng (CSS #60)](#row-css-60)
- **Ghi chú nguồn:** Slide 112 minh họa riêng .wrapper { display: flex; }; slide 113 bổ sung .wrapper > div { flex: 1; }.

```css
.wrapper {
  display: flex;
}

.wrapper > div {
  flex: 1;
}
```

#### <a id="code-css-47"></a>CODE-CSS-47 — Giới thiệu CSS Grid (`display: grid`, `grid-template-columns`, `grid-template-rows`, `grid-gap`)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 10–11; slide 114–115) · [↩ Quay lại bảng (CSS #61)](#row-css-61)
- **Ghi chú nguồn:** Slide 114 minh họa auto-placement 6 hộp (box1..box6), slide 115 minh họa đặt vị trí tường minh 3 hộp (box1..box3). Thuộc tính grid-gap là tên cũ trước khi chuẩn hóa thành gap.

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}

.box1 {
  grid-column: 2 / 4;
  grid-row: 1;
}

.box2 {
  grid-column: 1;
  grid-row: 1 / 3;
}

.box3 {
  grid-row: 2;
  grid-column: 3;
}
```

#### <a id="code-css-48"></a>CODE-CSS-48 — Giới thiệu Positioning và vị trí mặc định trong Normal Flow (`static`)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 14–15; slide 118–119) · [↩ Quay lại bảng (CSS #62)](#row-css-62)

```css
body {
  width: 500px;
  margin: 0 auto;
}

p {
  background-color: rgb(207,232,220);
  border: 2px solid rgb(79,185,227);
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
```

#### <a id="code-css-49"></a>CODE-CSS-49 — CSS Table Layout (`display: table`, `table-row`, `table-cell`, `table-caption`, `caption-side`)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 20–21; slide 124–125) · [↩ Quay lại bảng (CSS #63)](#row-css-63)

```css
html {
  font-family: sans-serif;
}

form {
  display: table;
  margin: 0 auto;
}

form div {
  display: table-row;
}

form label, form input {
  display: table-cell;
  margin-bottom: 10px;
}

form label {
  width: 200px;
  padding-right: 5%;
  text-align: right;
}

form input {
  width: 300px;
}

form p {
  display: table-caption;
  caption-side: bottom;
  width: 300px;
  color: #999;
  font-style: italic;
}
```

#### <a id="code-css-50"></a>CODE-CSS-50 — Normal Flow (Luồng tài liệu chuẩn: Block-level, Inline và Margin Collapsing)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 1–2; slide 127–128) · [↩ Quay lại bảng (CSS #64)](#row-css-64)

```css
body {
  width: 500px;
  margin: 0 auto;
}

p {
  background: rgba(255,84,104,0.3);
  border: 2px solid rgb(255,84,104);
  padding: 10px;
  margin: 10px;
}

span {
  background: white;
  border: 1px solid black;
}
```

#### <a id="code-css-51"></a>CODE-CSS-51 — Ngắt dòng trong Flexbox (`flex-wrap: wrap` và kích thước cơ sở `flex: 200px`)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 5–6; slide 131–132) · [↩ Quay lại bảng (CSS #66)](#row-css-66)
- **Ghi chú nguồn:** Slide 132 hướng dẫn thêm flex-wrap: wrap; vào quy tắc `<section>` và flex: 200px; vào quy tắc `<article>`.

```css
flex-wrap: wrap;

flex: 200px;
```

#### <a id="code-css-52"></a>CODE-CSS-52 — Chia tỷ lệ Flex Item (`flex: <grow> <basis>`) và Pseudo-class `:nth-of-type()`
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 7; slide 133) · [↩ Quay lại bảng (CSS #67)](#row-css-67)

```css
article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 2 200px;
}
```

#### <a id="code-css-53"></a>CODE-CSS-53 — Căn chỉnh trục trong Flexbox (`align-items` và `justify-content`)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 8–9; slide 134–135) · [↩ Quay lại bảng (CSS #68)](#row-css-68)

```css
div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
```

#### <a id="code-css-54"></a>CODE-CSS-54 — Lồng nhiều Flexbox (Nested Flexboxes) và thuộc tính viết tắt `flex-flow`
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 10–12; slide 136–138) · [↩ Quay lại bảng (CSS #69)](#row-css-69)

```css
section {
  display: flex;
}

article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 3 200px;
  display: flex;
  flex-flow: column;
}

article:nth-of-type(3) div:first-child {
  flex:1 100px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
}

button {
  flex: 1 auto;
  margin: 5px;
  font-size: 18px;
  line-height: 1.5;
}
```

#### <a id="code-css-55"></a>CODE-CSS-55 — Định nghĩa CSS Grid (`display: grid` và `grid-template-columns` cố định)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 14–15; slide 140–141) · [↩ Quay lại bảng (CSS #70)](#row-css-70)

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
}
```

#### <a id="code-css-56"></a>CODE-CSS-56 — Đơn vị `fr` (Fraction Unit) trong CSS Grid
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 16; slide 142) · [↩ Quay lại bảng (CSS #71)](#row-css-71)

```css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
```

#### <a id="code-css-57"></a>CODE-CSS-57 — Khoảng cách rãnh lưới (`gap`, `column-gap`, `row-gap`)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 17; slide 143) · [↩ Quay lại bảng (CSS #72)](#row-css-72)

```css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
}
```

#### <a id="code-css-58"></a>CODE-CSS-58 — Định vị phần tử theo đường lưới (Line-based Grid Placement: `grid-column`, `grid-row`)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 18–19; slide 144–145) · [↩ Quay lại bảng (CSS #73)](#row-css-73)

```css
header {
  grid-column: 1 / 3;
  grid-row: 1;
}

article {
  grid-column: 2;
  grid-row: 2;
}

aside {
  grid-column: 1;
  grid-row: 2;
}

footer {
  grid-column: 1 / 3;
  grid-row: 3;
}
```

#### <a id="code-css-59"></a>CODE-CSS-59 — Bố cục vùng đặt tên trong CSS Grid (`grid-template-areas` và `grid-area`)
- **Nguồn:** `slides_drive/31_7.2 Normal Flow _ Flexbox _ Grid.pdf` (tr. 20; slide 146) · [↩ Quay lại bảng (CSS #74)](#row-css-74)

```css
.container {
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar content"
      "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

#### <a id="code-css-60"></a>CODE-CSS-60 — Công dụng và cơ chế `float` cho văn bản bao quanh phần tử (Simple Float)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 12–13; slide 116–117); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 2–7; slide 149–154) · [↩ Quay lại bảng (CSS #76)](#row-css-76)

```css
/* Mẫu giới thiệu (Slide 117): */
.box {
  float: left;
  width: 150px;
  height: 150px;
  margin-right: 30px;
}

/* Mẫu đầy đủ (Slide 151–152): */
body {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  font: .9em/1.2 Arial, Helvetica, sans-serif
}

.box {
  float: left;
  margin-right: 15px;
  width: 150px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(207,232,220);
  padding: 1em;
}

.special {
  background-color: rgb(79,185,227);
  padding: 10px;
  color: #fff;
}
```

#### <a id="code-css-61"></a>CODE-CSS-61 — Thuộc tính `clear` (`left`, `right`, `both`) — Ngắt luồng Float
- **Nguồn:** `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 8; slide 155) · [↩ Quay lại bảng (CSS #77)](#row-css-77)

```css
.cleared {
  clear: left;
}
```

#### <a id="code-css-62"></a>CODE-CSS-62 — Định vị tương đối `position: relative`
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 16; slide 120); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 9; slide 156) · [↩ Quay lại bảng (CSS #78)](#row-css-78)

```css
.positioned {
  position: relative;
  background: rgba(255,84,104,.3);
  border: 2px solid rgb(255,84,104);
  top: 30px;
  left: 30px;
}
```

#### <a id="code-css-63"></a>CODE-CSS-63 — Định vị tuyệt đối `position: absolute`
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 17; slide 121); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 10; slide 157) · [↩ Quay lại bảng (CSS #79)](#row-css-79)
- **Ghi chú nguồn:** Slide 157 (32_7.3 p.10) chỉ hiển thị dòng 'position: absolute;'; khối đầy đủ có ở slide 121 (30_7.1 p.17).

```css
.positioned {
  position: absolute;
  background: rgba(255,84,104,.3);
  border: 2px solid rgb(255,84,104);
  top: 30px;
  left: 30px;
}
```

#### <a id="code-css-64"></a>CODE-CSS-64 — Định vị cố định theo viewport `position: fixed`
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 18; slide 122); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 11; slide 158) · [↩ Quay lại bảng (CSS #80)](#row-css-80)
- **Ghi chú nguồn:** Slide 122 (30_7.1 p.18) minh họa .positioned { position: fixed; top: 30px; left: 30px; }; slide 158 (32_7.3 p.11) minh họa h1 { position: fixed; top: 0; ... }.

```css
h1 {
  position: fixed;
  top: 0;
  width: 500px;
  margin-top: 0;
  background: white;
  padding: 10px;
}
```

#### <a id="code-css-65"></a>CODE-CSS-65 — Định vị kết hợp tĩnh và cố định `position: sticky`
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 19; slide 123); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 12; slide 159) · [↩ Quay lại bảng (CSS #81)](#row-css-81)

```css
.positioned {
  position: sticky;
  top: 30px;
  left: 30px;
}
```

#### <a id="code-css-66"></a>CODE-CSS-66 — Multiple-column Layout (`column-count` và `column-width`)
- **Nguồn:** `slides_drive/30_7.1 Giới thiệu các kỹ thuật bố cục CSS.pdf` (tr. 22; slide 126); `slides_drive/32_7.3 Float _ Positioning _ Multi-Column Layout _ Tổng kết.pdf` (tr. 13–14; slide 160–161) · [↩ Quay lại bảng (CSS #82)](#row-css-82)
- **Ghi chú nguồn:** Slide 160 minh họa column-count: 3; và slide 161 (cũng như slide 126 ở 30_7.1) minh họa column-width: 200px;.

```css
.container {
  column-count: 3;
}

.container {
  column-width: 200px;
}
```

#### <a id="code-css-67"></a>CODE-CSS-67 — CSS khởi đầu Lab 4: Shorthand `font`, `img { max-width: 100%; display: block; }` & căn giữa `.grid`
- **Nguồn:** `LABs/08_LAB 4_Lab4-1-start/Lab4-1-start/styles.css` (dòng 1–51) · [↩ Quay lại bảng (CSS #83)](#row-css-83)
- **Ghi chú nguồn:** Thẻ `<meta name="viewport">` trong `LABs/08_LAB 4_Lab4-1-start/Lab4-1-start/index.html` (dòng 6) đã được thống kê tại phần HTML nhằm tránh lặp giữa 2 phân loại.

```css
body {
  background-color: #fff;
  color: #333;
  margin: 0;
  font: 1.2em / 1.2 Arial, Helvetica, sans-serif;
}

img {
  max-width: 100%;
  display: block;
}

.logo {
  font-size: 200%;
  padding: 50px 20px;
  margin: 0 auto;
  max-width: 980px;
}

.grid {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 980px;
}

nav {
  background-color: #000;
  padding: 0.5em;
}

nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.5em 1em;
}

.photos {
  list-style: none;
  margin: 0;
  padding: 0;
}

.feature {
  width: 200px;
}
```

#### <a id="code-css-68"></a>CODE-CSS-68 — Định kiểu thư học thuật bằng class `.sender-column`, `max-width` và tỷ lệ `em` (Lab 1 Bài 1)
- **Nguồn:** `slides_drive/12_LAB 1.pdf` / `LABs/01_LAB 1_BT1.1.2.pdf` (tr. 3, 5) · [↩ Quay lại bảng (CSS #85)](#row-css-85)
- **Ghi chú nguồn:** Mục 3.3 của đề Lab 1 hướng dẫn đặt bộ CSS này vào trong thẻ `<style>` bên trong `<head>`.

```css
body {
  max-width: 800px;
  margin: 0 auto;
}

.sender-column {
  text-align: right;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.3em;
}

p,ul,ol,dl,address {
  font-size: 1.1em;
}

p, li, dd, dt, address {
  line-height: 1.5;
}
```

#### <a id="code-css-69"></a>CODE-CSS-69 — Kỹ thuật Flexbox đa tầng & Universal Child Selector (`body > *`) trong Lab 1
- **Nguồn:** `LABs/02_LAB 1_Lab1-2-start/assets/style.css` (dòng 53–62, 80–84, 126–130) · [↩ Quay lại bảng (CSS #86)](#row-css-86)

```css
header {
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
}

body > * {
  background-color: red;
  padding: 1%;
}

nav {
  height: 50px;
  flex: 100%;
  display: flex;
}

aside a {
  display: block;
  float: left;
  width: 50%;
}
```

#### <a id="code-css-70"></a>CODE-CSS-70 — Bóng đổ nội tại đa lớp (`box-shadow: inset ...`), `.clearfix` và định vị logo tuyệt đối (Lab 2 Bài 1)
- **Nguồn:** `LABs/04_LAB 2_Lab2-1start/index.html` (dòng 69–89) · [↩ Quay lại bảng (CSS #87)](#row-css-87)

```css
.further-info {
  clear: left;
  padding: 40px 0;
  background: #c13832;
  box-shadow: inset 0 3px 2px rgba(0,0,0,0.5),
              inset 0 -3px 2px rgba(0,0,0,0.5);
}

.further-info a {
  width: 25%;
  display: block;
  float: left;
}

.clearfix {
  clear: both;
}
```

#### <a id="code-css-71"></a>CODE-CSS-71 — Tạo kiểu bảng dữ liệu (`border-collapse: collapse`, `tr:nth-child(even/odd)`, `<col>`, `tbody`, `tfoot`) từ Lab 2 & Chương 4
- **Nguồn:** `slides_drive/21_LAB 2.pdf` / `LABs/03_LAB 2_BT2.1.2.pdf` (tr. 6–7); `slides_drive/19_4.2 Các phần tử cơ bản trong Bảng.pdf` (tr. 7; slide 120); `slides_drive/20_4.3 Bảng nâng cao _ Truy cập bảng.pdf` (tr. 3; slide 126) · [↩ Quay lại bảng (CSS #88)](#row-css-88)

```css
table {
  border-collapse: collapse;
  border: 2px solid rgb(200,200,200);
  letter-spacing: 1px;
  font-size: 0.8rem;
}

td, th {
  border: 1px solid rgb(190,190,190);
  padding: 10px 20px;
}

th {
  background-color: rgb(235,235,235);
}

td {
  text-align: center;
}

tr:nth-child(even) td {
  background-color: rgb(250,250,250);
}

tr:nth-child(odd) td {
  background-color: rgb(245,245,245);
}

caption {
  padding: 10px;
}
```

#### <a id="code-css-72"></a>CODE-CSS-72 — Ẩn/hiện giữ khung với `visibility: hidden` và lớp phủ tương tác `.overlay` + `cursor: pointer` (Lab 5)
- **Nguồn:** `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/style.css` (dòng 11–36); `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 1–2) · [↩ Quay lại bảng (CSS #89)](#row-css-89)
- **Ghi chú nguồn:** Trong LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/style.css dòng 28–31 khai báo 'border: 0;' rồi ghi đè ngay sau bởi 'border: 1px solid #999;'; ngoài ra dòng 41 dùng 'float: left;' cho .thumb-bar img. Lab 5 Bài 1 (43_IE104 _ LAB 5.pdf p.2) chứa khối `<style>` với p { visibility: hidden; }.

```css
.full-img {
  position: relative;
  display: block;
  width: 640px;
  height: 480px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 640px;
  height: 480px;
  background-color: rgba(0,0,0,0);
}

button {
  border: 0;
  background: rgba(150,150,150,0.6);
  text-shadow: 1px 1px 1px white;
  border: 1px solid #999;
  position: absolute;
  cursor: pointer;
  top: 2px;
  left: 2px;
}
```

#### <a id="code-css-73"></a>CODE-CSS-73 — Bố cục toàn màn hình `overflow: hidden`, `height: inherit` và chữ `color: transparent` (Lab 6)
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/style.css` (dòng 5–25); `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 1–2, 11) · [↩ Quay lại bảng (CSS #90)](#row-css-90)
- **Ghi chú nguồn:** Tài liệu PDF Lab 6 (51_IE104 _ LAB 6.pdf p.11) còn bổ sung quy tắc: p { position: absolute; margin: 0; top: 35px; right: 5px; color: #aaa; }.

```css
html {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  height: 100%;
}

body {
  overflow: hidden;
  height: inherit;
}

h1 {
  font-size: 2rem;
  letter-spacing: -1px;
  position: absolute;
  margin: 0;
  top: -4px;
  right: 5px;

  color: transparent;
  text-shadow: 0 0 4px white;
}
```

### 4.3. Code mẫu phần JavaScript (`61` khối)

#### <a id="code-js-01"></a>CODE-JS-01 — JavaScript trong mô hình 3 lớp công nghệ Web (HTML - CSS - JavaScript)
- **Nguồn:** `slides_drive/34_8.1 Giới thiệu JavaScript cơ bản.pdf` (tr. 5–8) · [↩ Quay lại bảng (JS #01)](#row-js-01)
- **Ghi chú nguồn:** Code mẫu được đọc trực tiếp từ ảnh chụp trên slide 8 (pdf_page 8).

```javascript
const para = document.querySelector('p');

para.addEventListener('click', updateName);

function updateName() {
  let name = prompt('Enter a new name');
  para.textContent = 'Player 1: ' + name;
}
```

#### <a id="code-js-02"></a>CODE-JS-02 — Internal JavaScript (`<script>` trong `<head>`) & Sự kiện DOMContentLoaded
- **Nguồn:** `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 3–5; slide 16–18) · [↩ Quay lại bảng (JS #04)](#row-js-04)
- **Ghi chú nguồn:** Code mẫu trích nguyên văn từ ảnh trên slide 18 (pdf_page 5), giữ nguyên khoảng trắng trước dấu ';' trong vòng lặp for.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  function createParagraph() {
    let para = document.createElement('p');
    para.textContent = 'You clicked the button!';
    document.body.appendChild(para);
  }

  const buttons = document.querySelectorAll('button');

  for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', createParagraph);
  }
});
```

#### <a id="code-js-03"></a>CODE-JS-03 — External JavaScript (`<script src="..." defer>` trong `<head>` & `<script>` cuối `<body>`)
- **Nguồn:** `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 6–7; slide 19–20); `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 25–26); `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 13–14) · [↩ Quay lại bảng (JS #05)](#row-js-05)

```html
<!-- Cách 1 (Slide 19): đặt trong <head> kèm defer -->
<script src="script.js" defer></script>

<!-- Cách 2 (Lab 5 & Lab 6 starter): đặt ngay trước </body> -->
<script src="main.js"></script>
</body>
```

#### <a id="code-js-04"></a>CODE-JS-04 — Tách biệt hành vi với addEventListener()
- **Nguồn:** `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 9; slide 22) · [↩ Quay lại bảng (JS #07)](#row-js-07)

```javascript
const buttons = document.querySelectorAll('button');

for(let i = 0; i < buttons.length ; i++) {
  buttons[i].addEventListener('click', createParagraph);
}
```

#### <a id="code-js-05"></a>CODE-JS-05 — Chú thích mã nguồn (Comments // và /* ... */)
- **Nguồn:** `slides_drive/35_8.2 Tổng quan các kỹ thuật với Javascript.pdf` (tr. 10; slide 23) · [↩ Quay lại bảng (JS #08)](#row-js-08)
- **Ghi chú nguồn:** Trích nguyên văn từ 2 khung ảnh code trên slide 23 (pdf_page 10).

```javascript
// I am a comment

/*
  I am also
  a comment
*/
```

#### <a id="code-js-06"></a>CODE-JS-06 — Khái niệm biến, Khai báo (var/let) và Khởi tạo biến
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 2–6; slide 28–32) · [↩ Quay lại bảng (JS #10)](#row-js-10)

```javascript
const buttonA = document.querySelector('#button_A');
const headingA = document.querySelector('#heading_A');

buttonA.onclick = function() {
  let name = prompt('What is your name?');
  alert('Hello ' + name + ', nice to see you!');
  headingA.textContent = 'Welcome ' + name;
}
```

#### <a id="code-js-07"></a>CODE-JS-07 — Sự khác biệt giữa var và let & Cơ chế Hoisting
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 7–8; slide 33–34) · [↩ Quay lại bảng (JS #11)](#row-js-11)

```javascript
myName = 'Chris';

function logName() {
  console.log(myName);
}

logName();

var myName;
```

#### <a id="code-js-08"></a>CODE-JS-08 — Cập nhật giá trị biến & Quy tắc đặt tên biến (camelCase)
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 9–10; slide 35–36) · [↩ Quay lại bảng (JS #12)](#row-js-12)
- **Ghi chú nguồn:** Trích từ ảnh trên slide 35 (pdf_page 9). Danh sách tên biến hợp lý/không hợp lý ở slide 36 nằm hoàn toàn trong hình ảnh.

```javascript
myName = 'Bob';
myAge = 40;
```

#### <a id="code-js-09"></a>CODE-JS-09 — Các kiểu dữ liệu trong biến: Numbers, Strings, Booleans, Arrays, Objects
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 11–14; slide 37–40) · [↩ Quay lại bảng (JS #13)](#row-js-13)
- **Ghi chú nguồn:** Tổng hợp nguyên văn các dòng khai báo mẫu từ ảnh trên slides 37–40 (pdf_pages 11–14).

```javascript
let myAge = 17;
let dolphinGoodbye = 'So long and thanks for all the fish';
let iAmAlive = true;
let test = 6 < 3;
let myNameArray = ['Chris', 'Bob', 'Jim'];
let myNumberArray = [10, 15, 40];
let dog = { name : 'Spot', breed : 'Dalmatian' };
```

#### <a id="code-js-10"></a>CODE-JS-10 — Dynamic Typing & Toán tử kiểm tra kiểu typeof
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 15; slide 41) · [↩ Quay lại bảng (JS #14)](#row-js-14)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 41 (pdf_page 15), giữ nguyên ký tự em-dash '—' trong comment.

```javascript
let myNumber = '500'; // oops, this is still a string
typeof myNumber;
myNumber = 500; // much better — now this is a number
typeof myNumber;
```

#### <a id="code-js-11"></a>CODE-JS-11 — Hằng số trong JavaScript (const)
- **Nguồn:** `slides_drive/36_8.3 Biến (variable).pdf` (tr. 16; slide 42) · [↩ Quay lại bảng (JS #15)](#row-js-15)

```javascript
const daysInWeek = 7;
const hoursInDay = 24;
```

#### <a id="code-js-12"></a>CODE-JS-12 — Số (Number), phương thức toFixed() và ép kiểu Number()
- **Nguồn:** `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 2–4; slide 44–46) · [↩ Quay lại bảng (JS #16)](#row-js-16)
- **Ghi chú nguồn:** Trích từ ảnh slide 45 (pdf_page 3). Slide 44 phần văn bản viết thập phân theo dấu phẩy tiếng Việt (12,5; 56,7786543); slide 46 minh họa Number(myNumber) + 3;.

```javascript
let lotsOfDecimal = 1.766584958675746364;
lotsOfDecimal;
let twoDecimalPlaces = lotsOfDecimal.toFixed(2);
twoDecimalPlaces;
```

#### <a id="code-js-13"></a>CODE-JS-13 — Toán tử số học, Tăng/giảm (++/--) và Toán tử gán (+=, -=, *=, /=)
- **Nguồn:** `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 5–6; slide 47–48) · [↩ Quay lại bảng (JS #17)](#row-js-17)

```javascript
x += 4;
x -= 3;
x *= 3;
x /= 5;
```

#### <a id="code-js-14"></a>CODE-JS-14 — Toán tử so sánh chặt (===, !==, <, >, <=, >=)
- **Nguồn:** `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 7–8; slide 49–50) · [↩ Quay lại bảng (JS #18)](#row-js-18)

```javascript
const btn = document.querySelector('button');
const txt = document.querySelector('p');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.textContent === 'Start machine') {
    btn.textContent = 'Stop machine';
    txt.textContent = 'The machine has started!';
  } else {
    btn.textContent = 'Start machine';
    txt.textContent = 'The machine is stopped.';
  }
}
```

#### <a id="code-js-15"></a>CODE-JS-15 — Xử lý văn bản cơ bản (nháy đơn/kép) & Nối chuỗi (+)
- **Nguồn:** `slides_drive/37_8.4 Số _ Toán tử _ Xử lý chuỗi.pdf` (tr. 10–12; slide 52–54) · [↩ Quay lại bảng (JS #19)](#row-js-19)
- **Ghi chú nguồn:** Trích từ ảnh slide 53 (pdf_page 11). Slide 54 minh họa thêm button.onclick kết hợp prompt(), alert() và phép nối chuỗi.

```javascript
let one = 'Hello, ';
let two = 'how are you?';
let joined = one + two;
joined;
```

#### <a id="code-js-16"></a>CODE-JS-16 — Phương thức & thuộc tính chuỗi: length, [index], indexOf(), slice(), toLowerCase(), toUpperCase(), replace()
- **Nguồn:** `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 2–5; slide 56–59) · [↩ Quay lại bảng (JS #20)](#row-js-20)

```javascript
let browserType = 'mozilla';
browserType.length;
browserType[0];
browserType[browserType.length-1];
browserType.indexOf('zilla');
browserType.slice(0,3);
browserType.replace('moz','van');
```

#### <a id="code-js-17"></a>CODE-JS-17 — Mảng (Arrays): Khởi tạo, Mảng nhiều chiều, Truy cập [] & Duyệt mảng với .length
- **Nguồn:** `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 7–9; slide 61–63) · [↩ Quay lại bảng (JS #21)](#row-js-21)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 61 và slide 63 (pdf_pages 7, 9). Slide 62 minh họa thêm mảng lồng mảng random[2][2].

```javascript
let shopping = ['bread', 'milk', 'cheese', 'hummus', 'noodles'];
let sequence = [1, 1, 2, 3, 5, 8, 13];
for (let i = 0; i < sequence.length; i++) {
  console.log(sequence[i]);
}
```

#### <a id="code-js-18"></a>CODE-JS-18 — Câu lệnh điều kiện (if, else if, else, switch)
- **Nguồn:** `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 11–12; slide 65–66) · [↩ Quay lại bảng (JS #22)](#row-js-22)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 66 (pdf_page 12); slide 65 trình bày if và if...else, slide 66 trình bày thêm switch.

```javascript
if (condition1) {
  // block of code to be executed if condition1 is true
} else if (condition2) {
  // block of code to be executed if the condition1 is false and condition2 is true
} else {
  // block of code to be executed if the condition1 is false and condition2 is false
}
```

#### <a id="code-js-19"></a>CODE-JS-19 — Vòng lặp (for, for/in, for/of, while, do/while)
- **Nguồn:** `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 13–14; slide 67–68) · [↩ Quay lại bảng (JS #23)](#row-js-23)
- **Ghi chú nguồn:** Trích nguyên văn 3 khung mẫu trên slide 67 (pdf_page 13); slide 68 trình bày tiếp mẫu while và do...while.

```javascript
for (statement 1; statement 2; statement 3) {
  // code block to be executed
}
for (key in object) {
  // code block to be executed
}
for (variable of iterable) {
  // code block to be executed
}
```

#### <a id="code-js-20"></a>CODE-JS-20 — Hàm (JavaScript Functions)
- **Nguồn:** `slides_drive/38_8.5 Phương thức chuỗi _ Mảng _ Xây dựng khối lệnh.pdf` (tr. 15; slide 69) · [↩ Quay lại bảng (JS #24)](#row-js-24)

```javascript
function name(parameter1, parameter2, parameter3) {
  // code to be executed
}
```

#### <a id="code-js-21"></a>CODE-JS-21 — Đối tượng (Object Literal) & Truy xuất thuộc tính (Dot & Bracket Notation)
- **Nguồn:** `slides_drive/39_9.1 Kiến thức cơ bản hướng đối tượng.pdf` (tr. 3–10; slide 73–80) · [↩ Quay lại bảng (JS #26)](#row-js-26)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 77 (pdf_page 7). Slides 78–80 minh họa thêm person.firstName và person["firstName"].

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

#### <a id="code-js-22"></a>CODE-JS-22 — Phương thức đối tượng & Từ khóa "this"
- **Nguồn:** `slides_drive/39_9.1 Kiến thức cơ bản hướng đối tượng.pdf` (tr. 11–14; slide 81–84) · [↩ Quay lại bảng (JS #27)](#row-js-27)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 84 (pdf_page 14), giữ nguyên khoảng trắng căn cột trước dấu ':'. Slides 82–83 minh họa lời gọi person.fullName().

```javascript
const person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```

#### <a id="code-js-23"></a>CODE-JS-23 — ES6 class, phương thức constructor() & phương thức thể hiện
- **Nguồn:** `slides_drive/40_9.2 JavaScript hướng đối tượng.pdf` (tr. 2–7; slide 86–91) · [↩ Quay lại bảng (JS #28)](#row-js-28)

```javascript
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age(x) {
    return x - this.year;
  }
}

let date = new Date();
let year = date.getFullYear();

let myCar = new Car("Ford", 2014);
document.getElementById("demo").innerHTML=
"My car is " + myCar.age(year) + " years old.";
```

#### <a id="code-js-24"></a>CODE-JS-24 — Phương thức tĩnh (static) trong ES6 class
- **Nguồn:** `slides_drive/40_9.2 JavaScript hướng đối tượng.pdf` (tr. 8–10; slide 92–94) · [↩ Quay lại bảng (JS #29)](#row-js-29)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 93 (pdf_page 9), giữ nguyên chuỗi 'Hello!!' và hai khoảng trắng trong comment 'NOT on  a Car Object'. Slide 94 minh họa truyền myCar vào Car.hello(myCar).

```javascript
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

let myCar = new Car("Ford");
//You can call 'hello()' on the Car Class:
document.getElementById("demo").innerHTML = Car.hello();
// But NOT on  a Car Object:
// document.getElementById("demo").innerHTML = myCar.hello();
// this will raise an error.
```

#### <a id="code-js-25"></a>CODE-JS-25 — Object Constructor Function & Chuỗi nguyên mẫu (Object prototype)
- **Nguồn:** `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 2–7; slide 96–101) · [↩ Quay lại bảng (JS #30)](#row-js-30)

```javascript
function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

Person.prototype.name = function() {
  return this.firstName + " " + this.lastName
};

const myFather = new Person("John", "Doe", 50, "blue");
document.getElementById("demo").innerHTML =
"My father is " + myFather.name();
```

#### <a id="code-js-26"></a>CODE-JS-26 — Kế thừa cơ bản trong JS (mượn constructor bằng .call)
- **Nguồn:** `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 8–10; slide 102–104) · [↩ Quay lại bảng (JS #31)](#row-js-31)
- **Ghi chú nguồn:** Đã phóng đại và kiểm tra từng ký tự từ ảnh nền tối slide 104 (pdf_page 10).

```javascript
function Animal(name) {
  this.type = "Animal";
  this.name = name;
  this.sayType = function () {
    console.log("type: " + this.type);
  };
}

Animal.prototype.sayName = function () {
  console.log("name: " + this.name);
};

function Dog(name) {
  this.super_ = Animal;
  this.super_.call(this, name);

  this.type = "Dog";
  this.shout = function () {
    console.log("shout: " + "Go Go Go !!!");
  };
}

let myDog = new Dog("Rex");
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => TypeError: myDog.sayName is not a function
```

#### <a id="code-js-27"></a>CODE-JS-27 — Kế thừa prototype với Object.create()
- **Nguồn:** `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 11; slide 105) · [↩ Quay lại bảng (JS #32)](#row-js-32)
- **Ghi chú nguồn:** Trích phần code bên phải từ ảnh phóng đại slide 105 (pdf_page 11); phần bên trái lặp lại định nghĩa Animal và Dog. Lời gọi inherits(Dog, Animal) đặt trước function inherits(...) nhờ cơ chế hoisting.

```javascript
inherits(Dog, Animal);

function inherits(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
}

let myDog = new Dog("Rex");
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => name: Rex
```

#### <a id="code-js-28"></a>CODE-JS-28 — Kế thừa ES6 với class ... extends và super()
- **Nguồn:** `slides_drive/41_9.3 Object prototype _ Kế thừa.pdf` (tr. 12; slide 106) · [↩ Quay lại bảng (JS #33)](#row-js-33)
- **Ghi chú nguồn:** Đã phóng đại và xác minh từng dòng từ ảnh slide 106 (pdf_page 12).

```javascript
class Animal {
  constructor(name) {
    this.type = "Animal";
    this.name = name;
  }
  sayType() {
    console.log("type: " + this.type);
  }
  sayName() {
    console.log("name: " + this.name);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    this.type = "Dog";
  }
  shout() {
    console.log("shout: " + "Go Go Go !!!");
  }
}

let myDog = new Dog("Rex");
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => name: Rex
```

#### <a id="code-js-29"></a>CODE-JS-29 — Khái niệm & Cú pháp dữ liệu JSON
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 2–4; slide 108–110) · [↩ Quay lại bảng (JS #34)](#row-js-34)
- **Ghi chú nguồn:** Trích nguyên văn khối JSON từ ảnh trên slide 110 (pdf_page 4). Slide 109 minh họa chuỗi JSON một dòng '{"name":"John", "age":30, "car":null}'.

```json
{
  "type": "laptop",
  "brand": "Sony",
  "operating system": "Windows 7",
  "graphic card": "NVIDIA"
}
```

#### <a id="code-js-30"></a>CODE-JS-30 — Chuyển đổi dữ liệu JSON: JSON.stringify() & JSON.parse()
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 5–6; slide 111–112) · [↩ Quay lại bảng (JS #35)](#row-js-35)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh nền tối trên slide 111 (pdf_page 5).

```javascript
const string = JSON.stringify({ name: "X", born: 1990 });
console.log(string);
// => {"name":"X","born":1990}

const obj = JSON.parse(string);
console.log(obj.name);
// => X
console.log(obj.born);
// => 1990
```

#### <a id="code-js-31"></a>CODE-JS-31 — JSON Array & Truy xuất mảng trong đối tượng JSON
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 7–9; slide 113–115) · [↩ Quay lại bảng (JS #36)](#row-js-36)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 115 (pdf_page 9). Slide 114 minh họa parse trực tiếp chuỗi JSON Array '["Ford", "BMW", "Fiat"]'.

```javascript
const myJSON = '{"name":"John", "age":30, "cars":["Ford", "BMW", "Fiat"]}';
const myObj = JSON.parse(myJSON);

document.getElementById("demo").innerHTML = myObj.cars[0];
```

#### <a id="code-js-32"></a>CODE-JS-32 — Trao đổi JSON với máy chủ (JSON Server & AJAX với XMLHttpRequest)
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 10–13; slide 116–119) · [↩ Quay lại bảng (JS #37)](#row-js-37)
- **Ghi chú nguồn:** Trích nguyên văn đoạn script từ ảnh slide 119 (pdf_page 13). Slide 117 minh họa gửi chuỗi JSON qua URL query 'demo_json.php?x=' + myJSON.

```javascript
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const myObj = JSON.parse(this.responseText);
  document.getElementById("demo").innerHTML = myObj.name;
}
xmlhttp.open("GET", "json_demo.txt");
xmlhttp.send();
```

#### <a id="code-js-33"></a>CODE-JS-33 — Bất đồng bộ trong JS: Single-thread, Call Stack, Web APIs, Event Loop & Message Queue
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 14–16; slide 120–122) · [↩ Quay lại bảng (JS #38)](#row-js-38)
- **Ghi chú nguồn:** Trích nguyên văn từ ảnh slide 122 (pdf_page 16) kèm sơ đồ Call Stack, Web APIs, Event Loop và Message Queue.

```javascript
const networkRequest = function() {
  setTimeout(function timer() {
    console.log('Async Code');
  }, 2000);
};
console.log('Hello World');
networkRequest();
console.log('The End');
```

#### <a id="code-js-34"></a>CODE-JS-34 — Hàm bất đồng bộ setTimeout()
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 17; slide 123) · [↩ Quay lại bảng (JS #39)](#row-js-39)
- **Ghi chú nguồn:** Trích nguyên văn phần script từ ảnh slide 123 (pdf_page 17).

```javascript
setTimeout(function() { myFunction("I love You !!!"); }, 3000);

function myFunction(value) {
  document.getElementById("demo").innerHTML = value;
}
```

#### <a id="code-js-35"></a>CODE-JS-35 — Hàm lặp định kỳ setInterval()
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 18; slide 124) · [↩ Quay lại bảng (JS #40)](#row-js-40)
- **Ghi chú nguồn:** Trích nguyên văn phần script từ ảnh slide 124 (pdf_page 18).

```javascript
setInterval(myFunction, 1000);

function myFunction() {
  let d = new Date();
  document.getElementById("demo").innerHTML=
  d.getHours() + ":" +
  d.getMinutes() + ":" +
  d.getSeconds();
}
```

#### <a id="code-js-36"></a>CODE-JS-36 — Callback Function trong tải tài nguyên bất đồng bộ
- **Nguồn:** `slides_drive/42_9.4 JSON _ Bất đồng bộ.pdf` (tr. 19–20; slide 125–126) · [↩ Quay lại bảng (JS #41)](#row-js-41)
- **Ghi chú nguồn:** Trích nguyên văn phần script từ ảnh slide 126 (pdf_page 20).

```javascript
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

function getFile(myCallback) {
  let req = new XMLHttpRequest();
  req.open('GET', "mycar.html");
  req.onload = function() {
    if (req.status == 200) {
      myCallback(this.responseText);
    } else {
      myCallback("Error: " + req.status);
    }
  }
  req.send();
}

getFile(myDisplayer);
```

#### <a id="code-js-37"></a>CODE-JS-37 — Lab 5 - Bài 1: Silly story generator (Biến, Mảng, Math.random/floor/round, replace & Radio)
- **Nguồn:** `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 1–7) · [↩ Quay lại bảng (JS #42)](#row-js-42)

```javascript
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {

  if(customName.value !== '') {
    let name = customName.value;

  }

  if(document.getElementById("uk").checked) {
    let weight = Math.round(300);
    let temperature =  Math.round(94);

  }

  story.textContent = ;
  story.style.visibility = 'visible';
}
```

#### <a id="code-js-38"></a>CODE-JS-38 — Lab 5 - Bài 2: Image Gallery — getAttribute(), setAttribute(), overlay & Event Delegation
- **Nguồn:** `slides_drive/43_IE104 _ LAB 5.pdf` / `LABs/09_LAB 5_BT5.1.2.pdf` (tr. 8–11) · [↩ Quay lại bảng (JS #43)](#row-js-43)

```javascript
btn.setAttribute('class', xxx);
btn.textContent = xxx;
overlay.style.backgroundColor = xxx;
```

#### <a id="code-js-39"></a>CODE-JS-39 — Mã nguồn thực hành Lab 5: Cấu trúc HTML Image Gallery & vị trí `<script>` cuối `<body>`
- **Nguồn:** `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/index.html` (dòng 1–27) · [↩ Quay lại bảng (JS #44)](#row-js-44)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>Image gallery</title>

    <link rel="stylesheet" href="style.css">
    
  </head>

  <body>
    <h1>Image gallery example</h1>

    <div class="full-img">
      <img class="displayed-img" src="images/pic1.jpg">
      <div class="overlay"></div>
      <button class="dark">Darken</button>
    </div>

    <div class="thumb-bar">


    </div>
    <script src="main.js"></script>
  </body>
</html>
```

#### <a id="code-js-40"></a>CODE-JS-40 — Mã nguồn thực hành Lab 5: Script khởi tạo Gallery (querySelector, createElement, setAttribute, appendChild)
- **Nguồn:** `LABs/10_LAB 5_Lab5-2-start/Lab5-2-start/main.js` (dòng 1–13) · [↩ Quay lại bảng (JS #45)](#row-js-45)

```javascript
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
```

#### <a id="code-js-41"></a>CODE-JS-41 — Truy xuất DOM theo ID (getElementById) & Thuộc tính innerHTML
- **Nguồn:** `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 7, 9; slide 141, 143) · [↩ Quay lại bảng (JS #48)](#row-js-48)

```javascript
const element = document.getElementById("intro");

document.getElementById("demo").innerHTML = 
"The text from the intro paragraph is: " + element.innerHTML;
```

#### <a id="code-js-42"></a>CODE-JS-42 — Truy xuất nhiều phần tử DOM: getElementsByTagName() & getElementsByClassName()
- **Nguồn:** `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 8, 10–11; slide 142, 144–145) · [↩ Quay lại bảng (JS #49)](#row-js-49)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 144 (pdf_page 10). Slide 145 minh họa cú pháp tương tự với document.getElementsByClassName("intro").

```javascript
const element = document.getElementsByTagName("p");

document.getElementById("demo").innerHTML = 'The text in first paragraph (index 0) is: ' + element[0].innerHTML;
```

#### <a id="code-js-43"></a>CODE-JS-43 — Truy xuất DOM bằng CSS Selectors (querySelectorAll) & HTML Object Collections (document.forms)
- **Nguồn:** `slides_drive/45_10.2 Xử lý DOM - 1.pdf` (tr. 12–13; slide 146–147) · [↩ Quay lại bảng (JS #50)](#row-js-50)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 146 (pdf_page 12). Slide 147 minh họa thêm document.forms["frm1"] và vòng lặp đọc x.elements[i].value.

```javascript
const x = document.querySelectorAll("p.intro");
document.getElementById("demo").innerHTML = 
'The first paragraph (index 0) with class="intro" is: ' + x[0].innerHTML;
```

#### <a id="code-js-44"></a>CODE-JS-44 — Gắn sự kiện DOM: HTML Event Attribute vs Thuộc tính đối tượng DOM (.onclick)
- **Nguồn:** `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 1–4; slide 148–151) · [↩ Quay lại bảng (JS #51)](#row-js-51)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 151 (pdf_page 4). Slides 148–150 minh họa gắn sự kiện qua thuộc tính HTML onclick.

```javascript
document.getElementById("myBtn").onclick = displayDate;

function displayDate() {
  document.getElementById("demo").innerHTML = Date();
}
```

#### <a id="code-js-45"></a>CODE-JS-45 — Sự kiện vòng đời onload / onunload & Kiểm tra Cookie (navigator.cookieEnabled)
- **Nguồn:** `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 5; slide 152) · [↩ Quay lại bảng (JS #52)](#row-js-52)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 152 (pdf_page 5); phần HTML đi kèm gọi `<body onload="checkCookies()">`.

```javascript
function checkCookies() {
  var text = "";
  if (navigator.cookieEnabled == true) {
    text = "Cookies are enabled.";
  } else {
    text = "Cookies are not enabled.";
  }
  document.getElementById("demo").innerHTML = text;
}
```

#### <a id="code-js-46"></a>CODE-JS-46 — Sự kiện form onchange (Chuẩn hóa & xác nhận dữ liệu đầu vào)
- **Nguồn:** `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 6; slide 153) · [↩ Quay lại bảng (JS #53)](#row-js-53)

```html
Enter your name: <input type="text" id="fname" onchange="upperCase()">
<p>When you leave the input field, a function is triggered which transforms the input text to upper case.</p>

<script>
function upperCase() {
  const x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
</script>
```

#### <a id="code-js-47"></a>CODE-JS-47 — Sự kiện chuột: onmouseover / onmouseout và onmousedown / onmouseup
- **Nguồn:** `slides_drive/46_10.3 Xử lý DOM - 2.pdf` (tr. 7–8; slide 154–155) · [↩ Quay lại bảng (JS #54)](#row-js-54)
- **Ghi chú nguồn:** Trích phần body và script từ ảnh slide 154 (pdf_page 7). Slide 155 minh họa tương tự với onmousedown="mDown(this)" và onmouseup="mUp(this)".

```html
<div onmouseover="mOver(this)" onmouseout="mOut(this)"
style="background-color:#D94A38;width:120px;height:20px;padding:40px;">
Mouse Over Me</div>

<script>
function mOver(obj) {
  obj.innerHTML = "Thank You"
}

function mOut(obj) {
  obj.innerHTML = "Mouse Over Me"
}
</script>
```

#### <a id="code-js-48"></a>CODE-JS-48 — Đối tượng XMLHttpRequest (readyState, status, responseText)
- **Nguồn:** `slides_drive/47_10.4 Nạp dữ liệu từ máy chủ.pdf` (tr. 5–6; slide 160–161) · [↩ Quay lại bảng (JS #56)](#row-js-56)

```javascript
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "xmlhttp_info.txt", true);
  xhttp.send();
}
```

#### <a id="code-js-49"></a>CODE-JS-49 — Fetch API với async / await
- **Nguồn:** `slides_drive/47_10.4 Nạp dữ liệu từ máy chủ.pdf` (tr. 7; slide 162) · [↩ Quay lại bảng (JS #57)](#row-js-57)

```javascript
getText("fetch_info.txt");

async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  document.getElementById("demo").innerHTML = myText;
}
```

#### <a id="code-js-50"></a>CODE-JS-50 — Phần tử HTML `<canvas>` & Ngữ cảnh 2D getContext("2d") (moveTo, lineTo, stroke)
- **Nguồn:** `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 1–3; slide 163–165) · [↩ Quay lại bảng (JS #58)](#row-js-58)

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML canvas tag.</canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();
</script>
```

#### <a id="code-js-51"></a>CODE-JS-51 — Vẽ hình tròn trên Canvas 2D (beginPath, arc, stroke)
- **Nguồn:** `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 4; slide 166) · [↩ Quay lại bảng (JS #59)](#row-js-59)

```javascript
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
```

#### <a id="code-js-52"></a>CODE-JS-52 — Vẽ văn bản trên Canvas 2D (font, fillText, strokeText)
- **Nguồn:** `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 5–6; slide 167–168) · [↩ Quay lại bảng (JS #60)](#row-js-60)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 167 (pdf_page 5); slide 168 thay fillText bằng strokeText("Hello World",10,50).

```javascript
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World",10,50);
```

#### <a id="code-js-53"></a>CODE-JS-53 — Vẽ Gradient trên Canvas 2D (createLinearGradient, addColorStop, fillStyle, fillRect)
- **Nguồn:** `slides_drive/48_10.5 Vẽ đồ họa.pdf` (tr. 7–8; slide 169–170) · [↩ Quay lại bảng (JS #61)](#row-js-61)
- **Ghi chú nguồn:** Trích phần script từ ảnh slide 169 (pdf_page 7). Trang 8 (slide 170) tổng kết Chương 4 (Cơ bản & Nâng cao) và trang 9 là Question & Answer.

```javascript
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// Create gradient
var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10,10,150,80);
```

#### <a id="code-js-54"></a>CODE-JS-54 — Ember.js: Convention over Configuration, Ember CLI & Kiến trúc Router/Route/Model/Handlebars
- **Nguồn:** `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 1–4; slide 20–23) · [↩ Quay lại bảng (JS #66)](#row-js-66)
- **Ghi chú nguồn:** Trích nguyên văn khối code routes/rentals.js từ ảnh phóng đại sơ đồ kiến trúc trên slide 23 (pdf_page 4); sơ đồ còn chứa router.js và template Handlebars templates/rentals.hbs.

```javascript
export default class RentalsRoute extends Route {
  async model() {
    return this.store.findAll('rental');
  }
}
```

#### <a id="code-js-55"></a>CODE-JS-55 — React: Component-based, Dòng dữ liệu một chiều, Functional/Declarative, Immutable State, Virtual DOM & SSR
- **Nguồn:** `slides_drive/50_11.2 Các Front-end Framework.pdf` (tr. 13–17; slide 32–36) · [↩ Quay lại bảng (JS #69)](#row-js-69)
- **Ghi chú nguồn:** Trích nguyên văn đoạn JSX React Component cho Web từ ảnh phóng đại sơ đồ slide 35 (pdf_page 16). Slide 36 tổng kết logo các framework và trang 18 là Q&A.

```javascript
render: function() {
  return <div>Hi!</div>;
}
```

#### <a id="code-js-56"></a>CODE-JS-56 — Lab 6 - Phiên bản ES6 class Ball (main-finished-es6.js trong tài liệu Lab 6)
- **Nguồn:** `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 4–7) · [↩ Quay lại bảng (JS #70)](#row-js-70)

```javascript
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color =
            "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")";
        }
      }
    }
  }
}
```

#### <a id="code-js-57"></a>CODE-JS-57 — Lab 6 - Bài tập Bouncing Balls OOP nâng cao: Shape, Ball, EvilCircle, setControls (_this) & Bộ đếm
- **Nguồn:** `slides_drive/51_IE104 _ LAB 6.pdf` / `LABs/11_LAB 6_BT6.1.2.pdf` (tr. 1–3, 7–12) · [↩ Quay lại bảng (JS #71)](#row-js-71)

```javascript
let _this = this;
window.onkeydown = function (e) {
  if (e.key === "a") {
    _this.x -= _this.velX;
  } else if (e.key === "d") {
    _this.x += _this.velX;
  } else if (e.key === "w") {
    _this.y -= _this.velY;
  } else if (e.key === "s") {
    _this.y += _this.velY;
  }
};
```

#### <a id="code-js-58"></a>CODE-JS-58 — Mã nguồn thực hành Lab 6: Khung HTML Canvas game Bouncing Balls (index-finished.html)
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/index-finished.html` (dòng 1–15) · [↩ Quay lại bảng (JS #72)](#row-js-72)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bouncing balls</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <h1>bouncing balls</h1>
    <canvas></canvas>

    <script src="main-finished-es6.js"></script>
  </body>
</html>
```

#### <a id="code-js-59"></a>CODE-JS-59 — Mã nguồn hoàn chỉnh Lab 6 (Phần 1): Thiết lập Canvas 2D toàn màn hình & Hàm random(min, max)
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 1–14) · [↩ Quay lại bảng (JS #73)](#row-js-73)
- **Ghi chú nguồn:** Trích nguyên văn dòng 1–14 của LABs/12_LAB 6_Lab6-1-start/main-finished.js

```javascript
// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
```

#### <a id="code-js-60"></a>CODE-JS-60 — Mã nguồn hoàn chỉnh Lab 6 (Phần 2): Constructor Ball & các phương thức prototype (draw, update, collisionDetect)
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 16–73) · [↩ Quay lại bảng (JS #74)](#row-js-74)
- **Ghi chú nguồn:** Trích nguyên văn dòng 16–73 của LABs/12_LAB 6_Lab6-1-start/main-finished.js

```javascript
// define Ball constructor

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};
```

#### <a id="code-js-61"></a>CODE-JS-61 — Mã nguồn hoàn chỉnh Lab 6 (Phần 3): Khởi tạo mảng 25 bóng & Animation Loop với requestAnimationFrame()
- **Nguồn:** `LABs/12_LAB 6_Lab6-1-start/main-finished.js` (dòng 75–109) · [↩ Quay lại bảng (JS #75)](#row-js-75)

```javascript
// define array to store balls and populate it

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  balls.push(ball);
}

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
```

---
## 5. Kiểm chứng Độ phủ & Giới hạn Đọc Tài liệu

### 5.1. Kiểm chứng độ phủ toàn bộ nguồn
- **Độ phủ PDF (`57/57`):**
  - Mục **2 (Nền tảng & Quy định):** bao phủ `6/6` PDF (`57/57` trang của `01_GIỚI THIỆU MÔN HỌC.pdf` và `02_1.1` → `06_1.5`).
  - Mục **3 (Bảng HTML / CSS / JS):** bao phủ `51/51` PDF còn lại (`603` trang, gồm `45` file bài giảng Chương 2–11 và `6` cặp `12` file Lab 1–6) cùng `14/14` file mã nguồn/SVG thực hành.
- **Các trang trang trí / bìa / chuyển mục / Q&A (đã kiểm tra hình ảnh nhưng không tách thành hàng kỹ thuật mới):**
  - `01_GIỚI THIỆU MÔN HỌC.pdf` (tr. 1 trang bìa, tr. 8 *Question & Answer*); `02_1.1` (tr. 1–2 bìa/tên chương); `06_1.5` (tr. 13 *Q&A*); `07_2.1` (tr. 1–2 bìa, tr. 3, 6, 7 mục lục); `20_4.3` (tr. 14 tổng kết slide 137, tr. 15 *Q&A*); `22_5.1` (tr. 1–3, 9–10 bìa/mục lục); `23_5.2` (tr. 1 mục lục); `24_5.3` (tr. 1 mục lục); `25_5.4` (tr. 3 mục lục); `26_6.1` (tr. 1–4 mục lục/chuyển mục); `27_6.2` (tr. 1 mục lục); `28_6.3` (tr. 1, 7 mục lục); `30_7.1` (tr. 1–2 mục lục); `31_7.2` (tr. 3, 13 mục lục); `32_7.3` (tr. 1 mục lục, tr. 15 tổng kết CSS slide 162, tr. 16 *Q&A*); `34_8.1` (tr. 1–2 bìa); `48_10.5` (tr. 8 tổng kết JS slide 170, tr. 9 *Q&A*); `49_11.1` (tr. 1–4 bìa Chương 5/mục lục); `50_11.2` (tr. 17–18 tổng kết logo framework / *Q&A*).
- **Trạng thái đọc trực quan hình ảnh:** Đã kết hợp trích xuất văn bản với rà soát bằng mắt toàn bộ `170` trang ghép (contact sheets phủ `613` trang duy nhất) và phóng đại `65` trang chứa ảnh code/sơ đồ cỡ nhỏ (`23` trang HTML, `34` trang CSS, `8` trang JS). **Không có trang nào bị hỏng hoặc không đọc được (`0` trang mờ).**

### 5.2. Tổng hợp các điểm bất thường sẵn có trong học liệu gốc (giữ nguyên không tự sửa)
1. **Ảnh minh họa bị cắt mép trên slide:** `24_5.3` tr. 5 (slide 32, thiếu `-->` cuối dòng comment thứ 2), `28_6.3` tr. 6 (slide 101, cắt nhẹ dấu `>` của `</li>` cuối và CSS giữ `width: 19.5%` của mẫu 5 nút MDN cho 3 nút), `30_7.1` tr. 13 (slide 117), `31_7.2` tr. 2 (slide 128), `32_7.3` tr. 3 (slide 150) và `40_9.2` tr. 6 (slide 90, `class Car` cắt mép dưới ngay sau `}`).
2. **Lỗi gõ / cú pháp / chú thích trong slide & đề Lab:** `04_1.3` tr. 1 (slide 15, ảnh laptop ghi IP `77.872.67.54`), `04_1.3` tr. 5 (slide 19, văn bản ghi "sáu loại" ISP nhưng sơ đồ vẽ 5 khối), `12_LAB 1` tr. 5 (ghi nhầm *"yếu tốt thích hợp"*, *"phải đặc trong một thẻ `<meta>`"*), `02_LAB 1/.../index.html` dòng 38 (`break` thay cho `beak`), `21_LAB 2` tr. 6 (ghi tên `minitable-table.css`), `29_LAB 3` tr. 1 (ghi `external-link.PNG` thay vì `external-link-52.png`), `32_7.3` tr. 4 (slide 151, thiếu `;` cuối `font: .9em/1.2 ...`), `37_8.4` tr. 5 (slide 47, chú thích `%` là *"Chia lấy nguyên"*), `43_LAB 5` (tr. 5 thiếu `From` trong `randomValueArray`, tr. 7 gõ dấu `.` thay `,` ở `replace(/love/g. ‘like’)`, tr. 10 gõ `thum-bar`/`display-img` khác với HTML/JS gốc), `45_10.2` tr. 9 (slide 143, văn bản ghi `getElementsById`), `50_11.2` tr. 8 (slide 27, mục Angular dùng sơ đồ AngularJS Digest `$http`/`$apply`), `51_LAB 6` / `Lab6-1-start/index-finished.html` (trỏ `main-finished-es6.js` trong khi gói starter chỉ có `main-finished.js` kèm lỗi comment `'adge'` ở dòng 83).

### 5.3. Khoảng trống giữa slide bài giảng và kỹ thuật thực tế của UIT Discovery
Các kỹ thuật sau **đang được sử dụng hợp lệ trong mã nguồn Vanilla của UIT Discovery** nhưng **không được dạy trực tiếp bằng ví dụ chi tiết trong slide bài giảng** (thuộc phần tự nghiên cứu mở rộng theo chuẩn W3C/MDN và hướng dẫn đồ án):
- **HTML5 & Truy cập:** `<dialog>` + `hidden` fallback (`topics/detail/index.html`), `<details>`/`<summary>`, thuộc tính `aria-*` (`aria-pressed`, `aria-expanded`, `aria-live`, `aria-current`, `aria-labelledby`), `<img loading="lazy">`, skip-link `.skip-link`.
- **CSS3 Hiện đại:** `@media` queries (breakpoint Mobile/Tablet/Desktop, `@media (prefers-color-scheme: dark)` cho No-JS Dark Mode, `@media (prefers-reduced-motion: reduce)`), CSS Custom Properties (`:root` token `--color-*` và `[data-theme="dark"]` / `[data-domain-tone="1".."6"]`), quy ước **BEM** + scoping `#page-*` (tránh xung đột CSS nhiều trang).
- **Vanilla ES6+ & Browser APIs:** ES Modules (`import` / `export` với `<script type="module">`), `Promise.all()`, `localStorage`, `History API` (`history.replaceState`), `URLSearchParams`, **Pointer Events API** (kéo/zoom đa chạm mượt trên sơ đồ Mind Map) và **Fullscreen API** (`requestFullscreen` kèm fallback CSS).
