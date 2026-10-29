# Kế hoạch đồ án IE104: bốn người phát triển bốn cụm chủ đề xuyên suốt

> **Áp dụng cho:** [Đặc tả website định hướng chủ đề NCKH](./de-tai-nckh-chi-tiet.md)  
> **Nhóm:** 4 người, gồm nhóm trưởng. Mỗi người theo một cụm nghiên cứu từ dữ liệu đến kiểm thử.  
> **Lịch học:** LT1 → LT2 → TH1 → LT3 → LT4 → TH2 → LT5 → LT6 → TH3 → LT7 → TH4 → LT8 → LT9 → TH5 → LT10 → LT11 → TH6 → khoảng đệm hoàn thiện.  
> **Nguyên tắc:** Nhóm trưởng định hình cấu trúc và làm một mẫu chạy được trước mỗi chặng; các thành viên dùng cùng hợp đồng để tự làm cụm của mình.

## 1. Căn cứ và mục tiêu

- [Hướng dẫn đồ án IE104](<../Hướng dẫn thực hiện đồ án/IE104_Project_Guide.pdf>) gợi ý 11 tuần: đầu kỳ chọn đề tài và thiết kế, tiếp theo HTML/CSS, sau đó JavaScript, cuối kỳ nộp và bảo vệ. Kế hoạch này giữ các mốc đầu ra nhưng theo **thứ tự buổi học thực tế** do nhóm cung cấp, không gán ngày hoặc tuần giả định.
- [Đề cương IE104](<../Đề cương môn học/[DC] Internet va cong nghe web.pdf>) đi từ Web/Internet qua HTML, CSS đến JavaScript, DOM, JSON, Web APIs và đồ họa. Sáu buổi thực hành lần lượt gắn với HTML cơ bản/nâng cao, CSS cơ bản/nâng cao, JavaScript cơ bản/nâng cao. Nếu lớp dạy một chủ đề ở buổi khác, nhóm chuyển việc áp dụng sang sau buổi thực học chủ đề đó, nhưng giữ thứ tự và điều kiện nghiệm thu của các chặng.
- [Quy chuẩn IE104](<../.agents/skills/ie104-web-project-guidelines/SKILL.md>) yêu cầu HTML5/CSS3/JavaScript thuần, không thư viện/framework/template, BEM, responsive, JSDoc cho mọi hàm, dữ liệu JSON cục bộ và kiểm thử W3C/Lighthouse.
- [Excel nguồn](<../other/Các chủ đề nghiên cứu cho học viên cao học_nghiên cứu sinh.xlsx>), sheet 2025, là nguồn duy nhất cho tên hướng nghiên cứu và thông tin giảng viên. Roadmap là nội dung nhóm tự biên soạn và phải được người khác rà soát.

Bản nộp dự kiến có khoảng **12 chủ đề với roadmap đầy đủ**, chia đều khoảng 3 chủ đề/người, cùng danh bạ các giảng viên liên quan. Đây là mục tiêu lập lịch, không phải số lượng chủ đề có sẵn trong Excel. Chỉ công bố chủ đề có nguồn truy vết và roadmap đã được duyệt. Website phục vụ sinh viên tìm hiểu và chuẩn bị kiến thức để bắt đầu trao đổi về hướng nghiên cứu; không thể hiện các hàng dữ liệu 2025 như chỉ tiêu tuyển sinh hiện hành.

## 2. Sở hữu công việc và quy tắc tích hợp

| Người | Cụm nghiên cứu phụ trách xuyên suốt | Trách nhiệm chung ngoài cụm |
|---|---|---|
| **N1 — nhóm trưởng** | Ngôn ngữ, LLM và AI Agent | Chốt hợp đồng dữ liệu, khung trang, mẫu ở đầu từng chặng; điều phối backlog, tích hợp và demo. |
| **N2** | Thị giác máy tính và dữ liệu đa phương thức | Điều phối wireframe, thiết kế trực quan, CSS dùng chung và kiểm tra responsive. |
| **N3** | An toàn thông tin, mã độc và blockchain | Hợp nhất kiểm kê Excel, kiểm tra ID/liên kết dữ liệu, tìm kiếm và lọc. |
| **N4** | IoT, thiết bị nhúng và xử lý tín hiệu | Mẫu hiển thị roadmap, quan hệ tiên quyết, trạng thái học và lưu trên thiết bị. |

Bốn cụm là **phân loại biên tập của nhóm**, không phải tên đơn vị hoặc phân loại chính thức của khoa. N1–N4 là vị trí tạm; thay bằng tên thật khi phân công. Mỗi người đọc Excel, chọn hướng, viết roadmap, dựng phần HTML/CSS, nối dữ liệu và kiểm thử cho **cụm mình**. Trách nhiệm chung chỉ xác định người làm đầu mối cho phần dùng chung; không chia website thành bốn bản độc lập. Mỗi trang, component, hàm và tệp JSON dùng chung chỉ có một bản tích hợp.

Trước mỗi chặng, N1 công bố: (1) quy tắc đặt tên/cấu trúc; (2) một mẫu có thể mở hoặc chạy được; (3) đầu vào, đầu ra; (4) checklist nghiệm thu. Cả nhóm đọc, chạy thử và xác nhận hiểu mẫu rồi mới làm đồng loạt. Mẫu của N1 có thể do thành viên khác cùng hiện thực phần dùng chung theo phân công; N1 chịu trách nhiệm chốt giao diện bàn giao. Nếu phát hiện mẫu không áp dụng tốt cho cụm khác, sửa mẫu và quy tắc chung trước, sau đó cập nhật các phần đã làm.

Rà soát chéo theo cặp **N1 ↔ N2** và **N3 ↔ N4**; N1 không tự duyệt cụm của mình. Sau mỗi TH, cả nhóm tích hợp, demo một phiên bản chạy được và ghi lỗi, người sửa, hạn sửa. Mỗi người phải giải thích được hành trình người dùng, dữ liệu đi từ Excel tới giao diện, cấu trúc roadmap và các chức năng JS chính của toàn website.

## 3. Hợp đồng đầu vào/đầu ra dùng chung

### 3.1. Nguồn và tiền xử lý

Không sửa Excel gốc. Sheet 2025 có vùng dữ liệu hàng 8–99, 25 ô tên giảng viên và 78 ô chủ đề có nội dung theo lần kiểm kê ban đầu; **ô chủ đề không đồng nghĩa một đề tài đơn nhất**. Mỗi ô có nội dung ở cột chủ đề đã trở thành một bản ghi trong [JSON kiểm kê nguồn](./data-work/research-source-2025.json); [hướng dẫn dữ liệu](./data-work/README.md) nêu cách tái tạo và sử dụng. Đây là dữ liệu nguồn để cả nhóm phân loại và chọn hướng, chưa phải tệp chủ đề đã biên tập để phát hành:

| Trường trong bản ghi kiểm kê | Ý nghĩa |
|---|---|
| sourceRef: {file, sheet, cell} | Vị trí ô chủ đề gốc, ví dụ sheet 2025 và ô C12. |
| topicRaw, requirementRaw, capacityRaw | Văn bản gốc của hướng, yêu cầu và chỉ tiêu năm 2025; giữ xuống dòng và thuật ngữ gốc. |
| lecturerSourceCell, lecturerNameRaw, lecturerEmailRaw | Ô tên giảng viên sau khi đọc cấu trúc ô gộp, tên và email gốc. |
| sourceCells | Vị trí ô STT, giảng viên, yêu cầu và chỉ tiêu để đối chiếu khi cần. |

Khi một ô được tách thành nhiều chủ đề ứng viên, các ứng viên cùng trỏ về sourceRef của ô đó và có số thứ tự phần trong **tệp biên tập riêng**; không sửa JSON kiểm kê được sinh tự động. Không suy đoán năm sinh, khoa công tác, tình trạng nhận hướng dẫn hoặc chỉ tiêu hiện tại. Bảng kiểm kê là tài liệu làm việc để truy vết, không phải dữ liệu hiển thị nguyên trạng trên website.

### 3.2. Dữ liệu website

Dữ liệu biên tập cuối cùng dự kiến đặt trong `assets/data/`. **Định dạng, số tệp và tên trường chưa chốt**; nhóm sẽ thống nhất sau khi xem một bản phác thảo ngắn và kiểm tra bằng một chủ đề thật. Đầu vào là JSON kiểm kê nguồn và phần nội dung roadmap do nhóm biên soạn. Đầu ra cần giữ được liên kết cụm chủ đề → đề tài → kiến thức/roadmap và đề tài → giảng viên, cùng vị trí ô Excel gốc. ID cần ổn định, không lấy từ số dòng Excel.

Trước khi cả nhóm nhập dữ liệu, N1 trình bày định dạng đề xuất để mọi người duyệt; N3 kiểm tra khả năng đối chiếu Excel và các liên kết. Chỉ đưa chủ đề lên giao diện chính sau khi roadmap đã được người khác rà soát. Cấu trúc roadmap cần thể hiện được kiến thức nào nên học trước và không tạo vòng lặp.

### 3.3. Giao diện giữa các phần kỹ thuật

- Các trang và URL theo sitemap trong đặc tả; trang chi tiết đọc ID từ tham số ?id=...; ID không có dữ liệu phải hiện thông báo và đường quay lại.
- HTML chứa vùng nội dung và trạng thái đang tải/rỗng/lỗi; JS đọc JSON bằng fetch, xử lý dữ liệu rồi render vào vùng tương ứng. Nội dung của bốn cụm đi qua cùng một hàm/component hiển thị.
- CSS dùng BEM; CSS riêng trang scope theo ID trang. N2 duy trì quy tắc đặt class và kích thước responsive, không để từng cụm tự tạo hệ thống giao diện riêng.
- localStorage chỉ lưu ID chủ đề đã lưu và trạng thái các nút kiến thức, có khóa phiên bản chung do N1 chốt. Dữ liệu cũ/hỏng được bỏ qua an toàn. Không dùng localStorage làm nguồn tên chủ đề hoặc nội dung roadmap.
- Mọi hàm JS có một nhiệm vụ và JSDoc; khởi tạo DOM bằng DOMContentLoaded. N1 duyệt mẫu hàm trước chặng JS để cả nhóm viết cùng kiểu.

## 4. Các chặng gắn với lịch học

| Chặng và mốc | Đầu vào | Mẫu/việc chung trước khi chia việc | Đầu ra của từng người và gate tích hợp |
|---|---|---|---|
| **0. Tiền xử lý dữ liệu — ngoài lịch học, bắt đầu ngay** | Excel gốc, JSON kiểm kê và đặc tả | N1 đề xuất quy tắc phân loại, ID và định dạng biên tập để cả nhóm duyệt; N3 đối chiếu JSON kiểm kê với Excel, kiểm tra mọi ô chủ đề/giảng viên. | Mỗi người phân loại các ô thuộc cụm mình, đề xuất khoảng 3 chủ đề và một roadmap mẫu chung để thống nhất cách viết. **Gate 0:** JSON kiểm kê đầy đủ; khoảng 12 ứng viên có sourceRef; định dạng dữ liệu và mẫu được 4 người hiểu và chấp nhận. Các roadmap còn lại viết tiếp ở những chặng sau. |
| **1. Định hình sản phẩm — LT1** | Đặc tả và kiểm kê ban đầu | N1 chốt hành trình sinh viên, sitemap, backlog, repo và quy tắc review; N2 điều phối wireframe. | Mỗi người mô tả nội dung cụm mình theo hành trình chung. **Gate 1:** sitemap, phạm vi trang, luồng demo và phân công được cả nhóm duyệt. |
| **2. HTML — LT2 → TH1 → LT3 → LT4 → TH2** | Sitemap, wireframe, một bộ JSON mẫu | N1 chốt khung trang và trang chi tiết chủ đề mẫu; N2 chốt wireframe; cả nhóm cùng tạo các trang dùng chung. | Mỗi người đưa nội dung mẫu cụm mình vào cùng cấu trúc HTML, liên kết tới GV đúng, có roadmap dạng danh sách. **Gate TH1:** khung trang và điều hướng chạy. **Gate TH2:** toàn bộ luồng chủ đề → roadmap → GV đọc được khi chưa có JS; semantic HTML, một h1/trang, form có nhãn. |
| **3. CSS — LT5 → LT6 → TH3 → LT7 → TH4** | HTML qua Gate TH2, mockup | N1 duyệt bộ component mẫu; N2 chốt màu/chữ/khoảng cách, BEM, CSS chung và mốc mobile/tablet/desktop. | Mỗi người áp giao diện chung cho nội dung cụm mình, thử tiêu đề dài và roadmap nhiều nhánh. **Gate TH3:** desktop thống nhất, CSS không đè nhầm. **Gate TH4:** ba cỡ màn hình dùng được, không cuộn ngang ngoài ý muốn; khoảng nửa số roadmap có bản nháp. |
| **4. JavaScript cơ bản — LT8 → LT9 → TH5** | HTML/CSS ổn định, JSON đã chuẩn hóa | N1 chốt mẫu fetch → xử lý → render → sự kiện, quy tắc JSDoc/lỗi; N3 làm logic kiểm tra dữ liệu, tìm kiếm/lọc dùng chung. | Mỗi người nối dữ liệu cụm mình vào cùng trang/component, kiểm tra tìm/lọc, chi tiết và GV. **Gate TH5:** hành trình chính chạy bằng JSON thật, có trạng thái tải/rỗng/lỗi, không có lỗi console; 12 roadmap có bản nháp. |
| **5. JavaScript nâng cao — LT10 → LT11 → TH6** | Luồng JS cơ bản, roadmap đã rà soát vòng đầu | N1 chốt hợp đồng sự kiện và localStorage; N4 làm một roadmap tương tác mẫu với quan hệ tiên quyết, chi tiết nút và dạng danh sách. | Mỗi người tích hợp và thử roadmap cụm mình, sửa nội dung theo review chéo; lưu tiến độ và chủ đề quan tâm. **Gate TH6:** 12 roadmap đã duyệt, dùng được bằng chuột/bàn phím, lưu đúng sau tải lại; bản deploy chạy đủ luồng, đóng băng tính năng. |
| **6. Hoàn thiện — khoảng đệm sau TH6** | Bản deploy đã đóng băng, bằng chứng tích lũy | N1 chốt checklist, dàn ý báo cáo và kịch bản demo; cả nhóm kiểm tra W3C, Lighthouse, console, URL, bàn phím, responsive. | Mỗi người kiểm thử cụm mình và một phần của người khác, viết báo cáo phần mình, cung cấp ảnh/kết quả kiểm thử, tập thuyết trình. **Gate nộp:** repo, website, README, Kanban, video, báo cáo PDF, slide và thông tin nhóm đầy đủ. |

**Đối chiếu hướng dẫn 11 tuần:** chặng 0–1 tương ứng chuẩn bị và thiết kế đầu kỳ; chặng HTML/CSS là khối xây dựng giao diện; chặng JavaScript là khối chức năng; chặng 6 phục vụ nộp và bảo vệ. Nếu lịch lớp giãn hoặc rút, giữ thứ tự phụ thuộc và giảm số chủ đề công bố trước khi bỏ kiểm thử hoặc đưa roadmap dở lên website.

## 5. Nhịp làm việc, nội dung và nghiệm thu

Sau mỗi LT, nhóm ghi kiến thức vừa học có thể áp dụng vào chặng hiện tại. Trước mỗi TH, từng người chuẩn bị đầu ra của cụm mình theo mẫu; trong/sau TH, nhóm tích hợp một phiên bản có thể demo. Bảng việc tối thiểu có đầu việc, người làm, người rà soát, đầu vào, đầu ra, trạng thái, link commit/ảnh và lỗi còn mở. Việc chỉ là Done khi đã có mặt trên bản tích hợp và được người khác xem.

Mốc nội dung đi song song: trước HTML có một roadmap mẫu đã duyệt; sau TH2 có nền chung và một nhánh lĩnh vực hoàn chỉnh; sau TH4 có khoảng 6 roadmap bản nháp; sau TH5 có 12 bản nháp; trước TH6 toàn bộ roadmap công bố đã được rà soát chéo trong giao diện thật. Mỗi roadmap cần mục tiêu, lý do cần học từng nút, quan hệ tiên quyết, kết quả học và cách tự kiểm tra; đủ để sinh viên bắt đầu tìm hiểu hướng nghiên cứu một mình.

Checklist xuất bản một chủ đề:

1. Tên, GV và email nếu có đối chiếu được với Excel; sourceRef đúng ô và không trình bày chỉ tiêu 2025 như thông tin hiện hành.
2. Giải thích dễ hiểu chủ đề, lĩnh vực, ứng dụng, giới hạn và lộ trình nền chung → lĩnh vực → nhánh riêng.
3. Mọi nút có nội dung đầy đủ; không có ID thiếu, quan hệ vòng tròn hoặc bước nhảy kiến thức khó giải thích.
4. Luồng tìm → mở chủ đề → xem roadmap → mở GV hoạt động trên desktop/mobile và bằng bàn phím.
5. Người khác người viết đã đọc nội dung trên giao diện, xác nhận reviewStatus và ghi bằng chứng review.

Ma trận kiểm thử tối thiểu gồm: ô Excel nhiều hướng và dòng GV để trống; tiếng Việt có dấu/không dấu khi tìm; không có kết quả; dữ liệu JSON thiếu/hỏng; ID URL không tồn tại; roadmap có nhánh song song và nhiều điều kiện; localStorage cũ/hỏng; màn hình nhỏ, zoom, focus; đường dẫn trang và JSON sau deploy. Báo cáo lưu ảnh wireframe, dữ liệu mẫu, sơ đồ roadmap, lịch commit/review, lỗi đã sửa, kết quả W3C/Lighthouse và thử nghiệm người dùng.

## 6. Hồ sơ nộp và quản lý thay đổi

- Repo GitHub public có README hướng dẫn chạy bằng server tĩnh, cấu trúc dữ liệu, nguồn Excel, thành viên và link demo; bảng Kanban có lịch sử công việc và mức đóng góp.
- Website deploy; video demo đưa lên YouTube chế độ unlisted; GroupX.docx theo hướng dẫn có nhóm, thành viên/MSSV, phần trăm đóng góp tổng 100%, link repo, bảng việc và video.
- Báo cáo PDF 15–40 trang, slide và phần thuyết trình 10–15 phút; mỗi người trình bày được cụm mình và giải thích được cấu trúc chung.

Khi muốn thay cấu trúc dữ liệu, component hoặc cách lưu trạng thái, N1 cập nhật **hợp đồng và mẫu trước**, cả nhóm đánh giá ảnh hưởng, rồi mỗi người cập nhật cụm mình. Khi muốn thêm chức năng, chỉ nhận nếu hành trình khám phá → hiểu kiến thức → tìm GV đã ổn định và còn thời gian sau Gate TH5. Nếu lịch hoặc yêu cầu của giảng viên thay đổi, cập nhật mốc tương ứng tại đây để cả nhóm dùng một kế hoạch.

