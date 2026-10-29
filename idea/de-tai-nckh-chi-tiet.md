# Đặc tả đồ án IE104: Website định hướng chủ đề nghiên cứu khoa học

> **Trạng thái:** Bản đặc tả làm việc cho nhóm; tên sản phẩm chính thức chưa chốt.
> **Đối tượng chính:** Sinh viên UIT tự tìm hiểu một hướng nghiên cứu trước khi trao đổi với giảng viên.
> **Nguồn dữ liệu đề tài và giảng viên:** File Excel do nhóm cung cấp, sheet `2025`.
> **Phạm vi kỹ thuật:** Website tĩnh, HTML5 + CSS3 + JavaScript thuần, không dùng thư viện/framework/template có sẵn.

## 1. Mục đích của tài liệu

Tài liệu này là điểm xuất phát chung cho thành viên nhóm và agent thực hiện các phần việc nhỏ. Đọc tài liệu này trước khi thiết kế giao diện, biên soạn nội dung hoặc viết code. Các quyết định đã được nhóm thống nhất được ghi rõ; mục chưa chốt được đánh dấu **Cần chốt**. Không tự mở rộng dữ liệu chủ đề/giảng viên sang khoa khác.

Tài liệu liên quan:

- [File dữ liệu chủ đề và giảng viên](<../other/Các chủ đề nghiên cứu cho học viên cao học_nghiên cứu sinh.xlsx>)
- [Hướng dẫn thực hiện đồ án IE104](<../Hướng dẫn thực hiện đồ án/IE104_Project_Guide.pdf>)
- [Đề cương môn học IE104](<../Đề cương môn học/[DC] Internet va cong nghe web.pdf>)
- [Quy chuẩn code trong workspace](<../.agents/skills/ie104-web-project-guidelines/SKILL.md>)
- [Kế hoạch triển khai theo chặng học cho nhóm 4 người](./de-tai-nckh-plan.md)

## 2. Bối cảnh và vấn đề

Sinh viên quan tâm nghiên cứu khoa học thường gặp bốn trở ngại: có quá nhiều thuật ngữ/hướng mới; không biết học từ đâu; không thấy quan hệ giữa các kiến thức cần học; và khó hình dung giảng viên nào gắn với hướng mình quan tâm. Một danh sách tên chủ đề chỉ giải quyết được bước khám phá ban đầu.

Website cần giúp người dùng trả lời tuần tự:

1. Có những hướng nghiên cứu nào trong nguồn dữ liệu của khoa?
2. Hướng này giải quyết bài toán gì, phù hợp với sở thích nào?
3. Trước khi bắt đầu, mình cần nắm những kiến thức và kỹ năng gì?
4. Nên học chúng theo thứ tự nào và tự kiểm tra tiến độ ra sao?
5. Giảng viên nào có chủ đề liên quan, và có thể liên hệ qua kênh nào trong dữ liệu?

**Giới hạn ý nghĩa:** Roadmap đưa sinh viên đến mức có nền tảng để bắt đầu tìm hiểu và trao đổi về đề tài. Nó không hứa hẹn người học đã đủ khả năng hoàn thành một công trình nghiên cứu, cũng không thay thế tư vấn của giảng viên.

## 3. Tuyên bố sản phẩm

Một website giúp sinh viên **khám phá hướng nghiên cứu, xem bản đồ kiến thức cần học và tìm giảng viên liên quan** từ danh sách của Khoa Khoa học và Kỹ thuật Thông tin. Trọng tâm khác biệt là mỗi hướng được phát hành có lộ trình học hoàn chỉnh cho **một sinh viên tự học**: phần kiến thức chung theo lĩnh vực cộng với nhánh kiến thức riêng của hướng đó.

Website là công cụ **định hướng**. Danh sách trong Excel có tiêu đề dành cho học viên cao học/nghiên cứu sinh; không được trình bày các hàng đó như lời mời đăng ký đề tài NCKH dành cho sinh viên đại học, không khẳng định chỉ tiêu hay tình trạng tiếp nhận còn hiệu lực. Trên giao diện phải có câu giải thích ngắn về tính chất tham khảo của danh sách.

## 4. Người dùng và hành trình chính

### 4.1. Người dùng mục tiêu

Sinh viên đi cá nhân, chưa biết hoặc mới biết sơ bộ một lĩnh vực. Có thể dùng website trên điện thoại để tìm hiểu ban đầu và trên máy tính để xem bản đồ kiến thức rộng hơn. Việc chia nhánh lộ trình cũng có thể giúp một nhóm phân công học, nhưng không tạo chức năng quản trị nhóm ở bản đồ án.

### 4.2. Hành trình quan trọng nhất để demo

1. Sinh viên vào trang chủ, hiểu website hỗ trợ việc gì.
2. Tìm/lọc danh mục theo từ khóa hoặc lĩnh vực.
3. Mở một hướng nghiên cứu và đọc mô tả dễ hiểu, ứng dụng, kiến thức cần có.
4. Xem roadmap từ nền tảng chung đến nhánh chuyên biệt; bấm từng nút để thấy mục tiêu học và dấu hiệu đã nắm được kiến thức.
5. Đánh dấu từng nút là `Chưa học`, `Đang học` hoặc `Đã biết`; website chỉ ra các nút tiên quyết cần học tiếp.
6. Lưu hướng quan tâm trên trình duyệt và mở hồ sơ giảng viên liên quan.

Không yêu cầu đăng nhập, gửi email tự động hay trao đổi với giảng viên qua hệ thống.

## 5. Nguồn dữ liệu và cách biên tập

### 5.1. Cấu trúc dữ liệu gốc

Sheet `2025` của file Excel có sáu cột ở hàng 7: STT, họ tên giảng viên, các chủ đề nghiên cứu, yêu cầu đối với học viên/nghiên cứu sinh, số lượng HV/NCS và email liên hệ GV. Qua kiểm tra, vùng dữ liệu hàng 8–99 có **25 ô tên giảng viên** và **78 ô chủ đề có nội dung**. Đây là số ô, không đồng nghĩa 78 đề tài đơn nhất: có ô chứa nhiều hướng hoặc đoạn mô tả dài. Nhiều dòng tiếp theo để trống tên giảng viên vì thuộc cùng nhóm hàng; khi chuyển sang JSON phải gắn đúng chủ đề với giảng viên gần nhất ở phía trên. Không biến số lượng HV/NCS trong bản năm 2025 thành chỉ tiêu hiện tại.

### 5.2. Ba lớp thông tin phải phân biệt

| Lớp | Ví dụ | Quy tắc hiển thị |
|---|---|---|
| Dữ liệu gốc | Tên chủ đề, tên GV, email, yêu cầu từ Excel | Giữ nguyên ý nghĩa, lưu vị trí ô nguồn. |
| Dữ liệu chuẩn hóa | Nhóm lĩnh vực, tên ngắn dễ đọc, từ khóa, quan hệ chủ đề–GV | Ghi đây là cách phân loại của nhóm, có thể sửa sau. |
| Nội dung nhóm biên soạn | Giải thích nhập môn, nút kiến thức, thứ tự học, bài tập tự kiểm tra | Gắn nhãn “Lộ trình tham khảo do nhóm biên soạn”; rà soát trước khi xuất bản. |

Không suy đoán năm sinh, khoa công tác, lịch nhận hướng dẫn, mức độ nổi tiếng hoặc phương pháp làm việc của giảng viên từ tên và email. Những trường này chỉ hiển thị khi nhóm có thông tin chính xác để bổ sung. Không dùng “độ hot” như một điểm số không có định nghĩa hoặc nguồn đo. Có thể thay bằng mô tả “lĩnh vực ứng dụng” và “từ khóa liên quan”.

### 5.3. Quy trình tạo nội dung

1. **Sao lưu và ghi nguồn:** Không sửa file Excel gốc; với mỗi bản ghi lưu sheet, hàng/cột gốc.
2. **Chuẩn hóa:** Tách ô chứa nhiều hướng nếu có căn cứ rõ; giữ bản văn gốc để đối chiếu. Gắn ID ổn định, lĩnh vực và từ khóa.
3. **Chọn phạm vi phát hành:** Chọn tập chủ đề đại diện, cân đối giữa lĩnh vực và khối lượng viết. Chỉ đưa một chủ đề lên giao diện chính khi roadmap của nó đã hoàn chỉnh.
4. **Biên soạn roadmap:** Viết nền tảng chung theo lĩnh vực trước, sau đó nhánh riêng cho từng chủ đề. Tránh sao chép lại cùng nội dung ở nhiều nhánh.
5. **Rà soát chéo:** Người khác người viết kiểm tra quan hệ tiên quyết, từ ngữ dễ hiểu, lỗi dữ liệu và nguồn.

**Mốc nội dung đề xuất cho bản nộp:** Bắt đầu với khoảng 12 chủ đề được biên tập và có roadmap hoàn chỉnh, chia cho 4 người theo 4 cụm lĩnh vực; hồ sơ các giảng viên liên quan. Có thể mở rộng tới 16 chủ đề nếu mọi roadmap bổ sung đều qua cùng checklist. Đây là mốc chất lượng để lập lịch, không phải giới hạn của file dữ liệu. Không xuất bản hàng loạt thẻ chủ đề dẫn tới trang roadmap còn trống.

## 6. Hệ thống roadmap

### 6.1. Cấu trúc ba tầng

1. **Tầng nền tảng chung:** Kỹ năng học thuật và kỹ thuật nền liên quan đến nhiều lĩnh vực, ví dụ đọc tài liệu tiếng Anh, lập trình, xử lý dữ liệu, toán cơ bản. Không ép mọi chủ đề dùng cùng một danh sách.
2. **Tầng nhánh/lĩnh vực:** Kiến thức chung cho một nhánh trong cụm, ví dụ IDS trong an toàn thông tin. Danh sách lĩnh vực và nhánh cụ thể chốt sau khi phân loại file Excel.
3. **Tầng chủ đề:** Những khái niệm, kỹ thuật và bài toán xuất phát trực tiếp từ một hướng nghiên cứu trong Excel.

Roadmap của một chủ đề là tập các nút từ cả ba tầng, sắp theo quan hệ **“nên hiểu A trước khi học B”**. Đây là đồ thị có hướng, không có vòng lặp. Một nhánh có thể học song song sau khi các điều kiện tiên quyết đã đáp ứng; cách vẽ cho thấy điều này nhưng lộ trình vẫn dùng được khi chỉ có một người học.

### 6.2. Nội dung nút kiến thức và vị trí trong roadmap

- Tên ngắn, mô tả bằng ngôn ngữ sinh viên mới tiếp cận hiểu được.
- Vì sao kiến thức này liên quan đến **hướng đang xem**; cách lưu sẽ thống nhất khi chốt định dạng.
- Kiến thức nên có trước; roadmap phải thể hiện được quan hệ và các nhánh có thể học song song.
- Kết quả học tập có thể quan sát được, viết dưới dạng “sau bước này, bạn có thể…”.
- Một việc nhỏ để tự kiểm tra, ví dụ giải thích khái niệm, chạy ví dụ, đọc biểu đồ hoặc so sánh hai cách làm.
- Mức độ `cơ bản` / `trung gian` / `chuyên biệt`, có tiêu chí nội bộ nhất quán.
- Tài liệu bắt đầu nếu nhóm đã chọn và kiểm tra; không hiển thị link rỗng.

Quy ước mức độ: `cơ bản` là kiến thức có thể bắt đầu khi đã biết kiến thức phổ thông và thao tác máy tính/lập trình nhập môn; `trung gian` cần một hoặc nhiều nút cơ bản; `chuyên biệt` chỉ phục vụ một cụm/hướng nghiên cứu và cần nền tảng lĩnh vực. Mức độ mô tả **vị trí trong lộ trình**, không phải điểm đánh giá năng lực của sinh viên.

### 6.3. Ví dụ cách trình bày một hướng

Với hướng “Phân loại mã độc bằng học sâu” trong Excel, màn hình có thể cho thấy tuyến: **lập trình và xử lý dữ liệu → nền tảng học máy → khái niệm học sâu → kiến thức về mã độc và dữ liệu mẫu → cách đọc kết quả đánh giá mô hình**. Đây chỉ là phác thảo để minh họa cấu trúc; nội dung cuối phải được nhóm biên soạn và rà soát. Sau tuyến kiến thức, trang đưa ra câu hỏi gợi mở để sinh viên trao đổi với giảng viên, thay vì khẳng định một phương án nghiên cứu đã được chấp thuận.

### 6.4. Trực quan hóa và khả năng truy cập

Ưu tiên **bản đồ quan hệ kiến thức** bằng SVG/HTML/CSS/JavaScript thuần. Đường nối có ý nghĩa tiên quyết, màu sắc có chú giải. Người dùng có thể bấm nút để mở nội dung, xem trạng thái học và quay lại. Trên màn hình hẹp, cung cấp danh sách/chuỗi bước theo thứ tự học cùng nội dung với bản đồ; các thao tác phải dùng được bằng bàn phím. Không dùng đồ họa “neuron” chỉ để trang trí nếu nó làm mờ thứ tự học.

## 7. Chức năng và trang

### 7.1. Sitemap đề xuất

```text
Trang chủ /
├── Khám phá chủ đề /topics/
│   └── Chi tiết chủ đề + roadmap /topics/detail/?id=...
├── Giảng viên /lecturers/
│   └── Hồ sơ giảng viên /lecturers/detail/?id=...
├── Danh sách đã lưu /saved/
├── Giới thiệu & phương pháp biên soạn /about/
└── Trang 404 /404.html
```

Có thể gộp trang đã lưu vào trang khám phá nếu lịch phát triển chật. Điều kiện bắt buộc là website có ít nhất ba trang khác chức năng theo hướng dẫn đồ án.

### 7.2. Chức năng ưu tiên

| Mức | Chức năng | Hoàn thành khi |
|---|---|---|
| P0 | Danh mục chủ đề, tìm kiếm, lọc lĩnh vực | Người dùng tìm được chủ đề bằng từ khóa tiếng Việt/Anh có trong dữ liệu; trạng thái không có kết quả rõ ràng. |
| P0 | Trang chủ đề | Hiện mô tả, lĩnh vực, kiến thức nền, roadmap, giảng viên liên quan và ghi chú nguồn. |
| P0 | Roadmap tương tác | Có quan hệ tiên quyết đúng, mở được từng nút, có dạng danh sách trên mobile. |
| P0 | Danh bạ và hồ sơ giảng viên | Tìm được GV theo tên/lĩnh vực, thấy chủ đề liên quan và email nếu file có. |
| P0 | Đường dẫn qua lại chủ đề–giảng viên | Từ một chủ đề mở được GV liên quan và từ GV quay lại chủ đề. |
| P1 | Tự đánh dấu kiến thức | Lưu `Chưa học`/`Đang học`/`Đã biết` trên thiết bị; chỉ ra nút tiên quyết còn thiếu. |
| P1 | Lưu chủ đề quan tâm | Có thể thêm, bỏ và mở lại sau khi tải lại trang. |
| P1 | Trang phương pháp | Giải thích nguồn Excel, cách nhóm biên soạn roadmap và giới hạn của dữ liệu. |
| P2 | So sánh hai hướng, xuất checklist | Chỉ làm khi P0/P1 đã ổn định và có thời gian. |

**Không thuộc phạm vi bản đồ án:** Tài khoản thật, đăng ký đề tài, kiểm tra chỉ tiêu còn trống, gửi tin nhắn/email từ website, đề xuất bằng AI, thu thập dữ liệu cá nhân, chấm điểm “phù hợp” như một kết luận khách quan, quản trị nội dung có backend.

### 7.3. Nội dung từng trang để triển khai thống nhất

| Trang | Nội dung phải thấy | Tương tác và trạng thái cần xử lý |
|---|---|
| Trang chủ | Câu giới thiệu một dòng, cách dùng ba bước, một số chủ đề đại diện, đường dẫn vào danh mục | Nút khám phá dẫn đúng trang; không tự chạy hiệu ứng nặng che nội dung. |
| Danh mục chủ đề | Ô tìm kiếm, bộ lọc lĩnh vực, số kết quả, thẻ có tên/mô tả ngắn/lĩnh vực/GV | Kết hợp tìm kiếm và bộ lọc; nút xóa điều kiện; trạng thái đang tải, không có kết quả, lỗi dữ liệu. |
| Chi tiết chủ đề | Tên gốc/tên dễ hiểu, giải thích bài toán, ứng dụng, roadmap, ghi chú nguồn, GV liên quan | Mở chi tiết nút, đổi trạng thái học, lưu chủ đề; ID trên URL không tồn tại dẫn tới thông báo và link quay lại. |
| Danh bạ giảng viên | Danh sách GV trong phạm vi phát hành, học hàm/học vị nếu có, hướng liên quan | Tìm theo tên và chủ đề; không hiển thị trường chưa có thông tin. |
| Hồ sơ giảng viên | Thông tin có trong Excel, các hướng liên quan, email liên hệ nếu có | Link quay lại chủ đề; `mailto:` mở ứng dụng email của người dùng, website không tự gửi. |
| Đã lưu | Các hướng đã lưu trên thiết bị | Bỏ lưu, mở lại chi tiết, trạng thái trống và giải thích dữ liệu chỉ nằm trên trình duyệt này. |
| Giới thiệu/phương pháp | Nguồn Excel, năm dữ liệu, cách nhóm viết roadmap, giới hạn sử dụng, thông tin nhóm thực hiện | Link đến các phần chính và hướng dẫn sử dụng ngắn. |

## 8. Mô hình dữ liệu và cấu trúc mã nguồn

### 8.1. Các thực thể dữ liệu

| Thực thể | Trường cốt lõi | Ghi chú |
|---|---|---|
| `lecturer` | `id`, `name`, `academicTitle`, `email`, `sourceRef` | `faculty`, `profileUrl` tùy chọn, chỉ thêm khi đã có dữ liệu; danh sách chủ đề được suy ra từ `topic.lecturerIds`. |
| `topic` | `id`, `title`, `originalText`, `summary`, `scopeNote`, `fieldId`, `lecturerIds`, `roadmapId`, `sourceRef` | Một ô gốc có thể sinh nhiều hướng đã chuẩn hóa; giữ liên hệ về ô gốc. |
| `field` | `id`, `name`, `description` | Cụm lĩnh vực do nhóm biên tập. |
| `knowledgeNode` | Mã nút, nội dung kiến thức, kết quả học, cách tự kiểm tra | Nội dung kiến thức có thể dùng lại giữa nhiều roadmap. |
| `roadmap` | Mã đề tài, các nút kiến thức, quan hệ học trước–sau, trạng thái rà soát | Diễn đạt lộ trình cho một đề tài và có thể có các nhánh học song song. |

`sourceRef` cần cho phép truy về ô Excel gốc. ID không lấy từ số dòng Excel vì số dòng có thể đổi khi file cập nhật. **Bảng trên chỉ mô tả các thực thể cần có; định dạng JSON và cách lưu quan hệ chưa được nhóm chốt.** Khi triển khai, nhóm thống nhất một cấu trúc rồi mới tạo dữ liệu biên tập. Trạng thái học trong `localStorage` cần có khóa phiên bản; dữ liệu trình duyệt hỏng phải được bỏ qua an toàn thay vì làm trang lỗi.

### 8.2. Cấu trúc thư mục gợi ý

```text
project-root/
├── index.html
├── topics/index.html
├── topics/detail/index.html
├── lecturers/index.html
├── lecturers/detail/index.html
├── saved/index.html
├── about/index.html
├── 404.html
├── assets/
│   ├── css/reset.css, style.css, topics.css, roadmap.css, lecturers.css
│   ├── js/main.js, data.js, topics.js, roadmap.js, lecturers.js, storage.js
│   ├── data/ (các tệp JSON biên tập; cấu trúc sẽ chốt sau)
│   └── images/
├── README.md
└── .gitignore
```

Dữ liệu JSON cục bộ nạp bằng `fetch`. Trong quá trình phát triển phải chạy qua web server tĩnh cục bộ; mở `index.html` bằng `file://` có thể làm `fetch` thất bại. Các trang phải dùng đường dẫn tương đối hợp lý để deploy trên GitHub Pages/Netlify.

## 9. Quy chuẩn triển khai IE104

- Chỉ HTML5, CSS3, JavaScript thuần. Không Bootstrap, Tailwind, jQuery, React, D3, Chart.js, plugin hoặc template tải sẵn.
- HTML ngữ nghĩa; một `<h1>` mỗi trang; `title`, `description`, `viewport`; ảnh có `alt`, ảnh dưới vùng đầu trang dùng `loading="lazy"`.
- CSS theo BEM, Grid/Flexbox, media query cho mobile/tablet/desktop; CSS riêng trang đặt dưới ID trang.
- JS chia hàm nhỏ theo một nhiệm vụ; `camelCase`; khởi tạo DOM trong `DOMContentLoaded`; JSDoc cho mọi hàm, giải thích logic khó bằng inline comment. Xử lý trạng thái tải dữ liệu lỗi và dữ liệu rỗng, không để lỗi runtime trong console.
- `localStorage` chỉ lưu trạng thái học và chủ đề đã lưu trên thiết bị; không giả làm hệ thống tài khoản đồng bộ.
- Kiểm tra HTML/CSS bằng W3C Validator, responsive và bàn phím, Lighthouse, link/ảnh sau deploy. Điểm Lighthouse 90+ là **mục tiêu nội bộ**, không phải ngưỡng điểm được nêu trong hướng dẫn đồ án.

## 10. Tiêu chí nghiệm thu sản phẩm

Một bản nộp đạt khi người ngoài nhóm có thể tự thực hiện hành trình ở mục 4.2 mà không cần hướng dẫn miệng. Cụ thể:

1. Các chủ đề xuất bản đều có tên, mô tả dễ hiểu, lĩnh vực, roadmap đầy đủ và liên kết GV đúng từ dữ liệu đã chuẩn hóa.
2. Roadmap không có vòng lặp, không trỏ tới nút thiếu; thứ tự học và trạng thái cá nhân hoạt động sau khi tải lại trang.
3. Tìm kiếm/lọc có kết quả đúng và các trạng thái rỗng/lỗi dữ liệu có thông báo rõ.
4. Giao diện dùng được ở mobile, tablet, desktop; tương tác chính dùng được bằng chuột và bàn phím.
5. Không có lỗi console, link hỏng, ảnh thiếu `alt`, lỗi HTML nghiêm trọng hoặc dữ liệu giả được trình bày như thông tin đang có hiệu lực.
6. README, repo GitHub, bảng phân công, website deploy, video demo, báo cáo PDF và slide được chuẩn bị theo hướng dẫn đồ án.

## 11. Các quyết định đã chốt và mục cần chốt sau

**Đã chốt:** Một nguồn Excel trong workspace; hướng tới sinh viên đi cá nhân; roadmap kết thúc ở mức chuẩn bị nền tảng; cấu trúc nền tảng chung + nhánh riêng; website quy mô vừa/nhỏ, chú trọng chất lượng của lộ trình. Nhóm có 4 người, mỗi người phụ trách một cụm chủ đề xuyên suốt; nhóm trưởng chốt cấu trúc và mẫu trước mỗi chặng, sau đó cả nhóm triển khai theo cùng hợp đồng. Có giai đoạn tiền xử lý dữ liệu ngoài lịch học; tiến độ phát triển gắn với các chặng HTML, CSS và JavaScript của IE104.

**Cần chốt ở chặng tiền xử lý và LT1:** Tên sản phẩm; tên người phụ trách từng cụm; danh sách chủ đề cụ thể của bản phát hành đầu sau kiểm kê; lịch thật của lớp và hạn nộp. Những quyết định này không thay đổi mục tiêu sản phẩm nêu trên.
