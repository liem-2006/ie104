# Quy trình biên tập dữ liệu chủ đề nghiên cứu

> **Tóm tắt cho thành viên**
>
> | Việc cần làm | Quy ước chung |
> |---|---|
> | Phân công | 4 thành viên chọn **4 trong 5 nhóm**: `nlp`, `cv`, `sec`, `iot`, `data`; mỗi người chịu trách nhiệm một nhóm. |
> | Đầu vào | [Excel gốc](<../../other/Các chủ đề nghiên cứu cho học viên cao học_nghiên cứu sinh.xlsx>) và [JSON chuyển từ Excel](./research-source-2025.json). [Bảng phân nhóm gợi ý](./goi-y-phan-nhom-chu-de.md) chỉ giúp tìm nhanh. |
> | Đầu ra | Mỗi nhóm được chọn nộp **một file `<groupId>.json`**, dựa trên [khung JSON](./group-template.json), có **ít nhất 10 chủ đề riêng biệt** cùng cây keyword kiến thức nền cho từng chủ đề. Tổng tối thiểu là 40 chủ đề. |
> | Quy tắc roadmap | Lấy các đối tượng kiến thức chính từ **tên chủ đề** làm keyword gốc; `children` là kiến thức nền cần biết trước keyword cha, **không giới hạn số cấp**; mỗi nút có `name`, `outcome` và có thể thêm `subjects` để gợi ý môn học. |
> | Giảng viên | Mỗi bản ghi chỉ có một object `lecturer`. Cùng chủ đề có nhiều giảng viên thì tách bản ghi, mỗi người có cây `keywords` riêng. Chỉ liên hệ keyword trong cây của bản ghi đó. |
> | Bàn giao | Giữ nguyên file nguồn, kiểm tra JSON hợp lệ, đối chiếu tên chủ đề và giảng viên với nguồn, rồi nhờ một người khác rà soát. |

## 1. Mục đích và phạm vi

Excel là danh sách nghiên cứu năm 2025 dành cho học viên cao học/nghiên cứu sinh. JSON chuyển đổi là **bản kiểm kê nguyên liệu**, chưa phải dữ liệu hiển thị trực tiếp trên website. Công việc của nhóm là chọn và biên tập các hướng nghiên cứu có trong nguồn thành những chủ đề người học đọc được, kèm cây kiến thức nền để bắt đầu tìm hiểu. Roadmap là gợi ý do nhóm biên soạn; không phải yêu cầu chính thức của giảng viên.

Đây là bước chuẩn bị dữ liệu cho đồ án IE104. Ưu tiên dữ liệu đủ đúng, nhất quán và dùng được trên web; không cần mô tả đầy đủ giáo trình, phương pháp thực nghiệm hay toàn bộ nhánh của một lĩnh vực. Bản web sẽ dùng JSON tĩnh qua `fetch`, theo quy chuẩn code thuần của môn học.

**Chỉ tiêu hiện hành:** mỗi nhóm được chọn có tối thiểu 10 chủ đề sau khi xử lý trùng. Một số tài liệu kế hoạch cũ trong workspace còn ghi khoảng 3 chủ đề mỗi người; với riêng giai đoạn biên tập dữ liệu này, dùng chỉ tiêu 10 chủ đề/nhóm đã thống nhất sau đó. Không cần xuất bản cả 5 nhóm khi chỉ có 4 thành viên.

## 2. Nhóm để chọn

| `group.id` | `group.name` | Số ô chủ đề trong bản phân nhóm gợi ý |
|---|---|---:|
| `nlp` | AI ngôn ngữ | 12 |
| `cv` | Thị giác máy tính | 25 |
| `sec` | An toàn thông tin | 14 |
| `iot` | IoT & hệ nhúng | 18 |
| `data` | Dữ liệu & dự báo | 9 |

Các con số trên là **số ô nguồn, không phải số chủ đề độc lập**. Một ô có thể chứa nhiều hướng; nhiều ô cũng có thể mô tả cùng một hướng. Trước khi nhận nhóm `data`, người phụ trách cần kiểm tra xem 9 ô có thể tách ra ít nhất 10 chủ đề **thực sự có trong nguồn** hay không. Nếu không đủ, chọn nhóm khác hoặc cả nhóm thống nhất lại chỉ tiêu; tuyệt đối không tự tạo chủ đề chỉ để đạt số lượng.

Bảng phân nhóm chỉ là gợi ý, không phải phân loại chính thức của khoa. Mỗi hướng đã chọn được đặt vào một nhóm đầu ra chính để tránh đếm lặp giữa các file.

## 3. Đầu vào và cách đọc

| Tài liệu | Vai trò | Cách sử dụng |
|---|---|---|
| [Excel gốc](<../../other/Các chủ đề nghiên cứu cho học viên cao học_nghiên cứu sinh.xlsx>) | Nguồn xác thực tên hướng nghiên cứu và giảng viên, sheet `2025` | Mở lại khi `topicRaw` có nhiều dòng, tiêu đề bao quát, hoặc chỗ nào khó hiểu. Không sửa file này. |
| [research-source-2025.json](./research-source-2025.json) | Bản chuyển đổi để tìm, lọc và đối chiếu nhanh | Đọc mảng `topicEntries`; dùng `topicRaw`, `lecturerNameRaw`, `lecturerEmailRaw`. `sourceRef` giúp người biên tập quay lại nguồn khi cần. Không sửa tay file này. |
| [goi-y-phan-nhom-chu-de.md](./goi-y-phan-nhom-chu-de.md) | Chỉ mục gợi ý các ô thuộc từng nhóm | Dùng để bắt đầu tìm, rồi đọc nội dung `topicRaw` đầy đủ trước khi chọn và đặt tên chủ đề. |
| [group-template.json](./group-template.json) | Khung cấu trúc file đầu ra với ba ví dụ thuộc nhóm `sec` | Sao chép cấu trúc; thay `group` nếu làm nhóm khác, rồi biên tập danh sách chủ đề của nhóm mình. Các ví dụ chưa phải một nhóm hoàn chỉnh. |

`topicEntries` có 78 **ô** chủ đề từ nguồn, không tương đương 78 chủ đề đã chuẩn hóa. Một bản ghi còn có `requirementRaw`, `capacityRaw` và các địa chỉ ô để kiểm tra nguồn. Các trường đó **không** được tự động đưa vào file thành phẩm: yêu cầu và chỉ tiêu trong bảng dành cho bối cảnh cao học/nghiên cứu sinh năm 2025, không chứng minh một giảng viên đang nhận sinh viên đại học hoặc còn chỗ ở hiện tại. Địa chỉ ô Excel chỉ dùng trong lúc biên tập, không cần xuất hiện trong thẻ chủ đề của website hay JSON nhóm.

Nếu một ô liệt kê nhiều hướng, hãy đọc cả ô và tách thành các chủ đề riêng **chỉ khi từng hướng đủ rõ trong nguồn**. Nếu ô chỉ ghi một lĩnh vực rất rộng như “AI trong an toàn thông tin”, đừng tự suy ra một bài toán cụ thể mà nguồn không nêu. Có thể giữ tên rộng nếu cây keyword nền vẫn hữu ích, hoặc ưu tiên những hướng cụ thể hơn trong cùng nhóm.

## 4. File đầu ra và hợp đồng dữ liệu

Mỗi thành viên nộp một file `<groupId>.json`, ví dụ `sec.json`. Khi phần web được dựng, nhóm tích hợp các file này vào `assets/data/` và tải qua `fetch`. Không tạo thêm một file giảng viên riêng, danh mục keyword chung, danh sách cạnh, hoặc ID cho từng chủ đề/nút ở giai đoạn này.

**Cách dùng template:** đọc schema và bảng quy tắc bên dưới, sao chép template thành `<groupId>.json` rồi thay dữ liệu ví dụ bằng nội dung đã kiểm chứng. File chỉ có hai trường cấp cao nhất là `group` và `topics`. Không thêm comment `//` hoặc `/* ... */` vì JSON chuẩn không hỗ trợ. Lưu file bằng UTF-8, dùng dấu nháy kép và không đặt dấu phẩy sau phần tử cuối.

**Schema tóm tắt:** các trường đều bắt buộc, trừ những trường ghi tùy chọn.

```text
group: object
  id: string
  name: string
topics: array
  mỗi phần tử:
    name: string
    lecturer: object
      name: string
      email: string
    keywords: array<Keyword>

Keyword:
  name: string
  outcome: string
  subjects: array<string> — tùy chọn
  children: array<Keyword> — tùy chọn, đệ quy không giới hạn cấp
```

| Trường | Kiểu | Quy tắc |
|---|---|---|
| `group` | object | Gồm đúng `id` và `name` theo bảng nhóm ở mục 2. Đây là nơi duy nhất cần ID. |
| `topics` | array | Các bản ghi chủ đề–giảng viên thuộc nhóm, bao phủ tối thiểu 10 chủ đề khác nhau. Số bản ghi có thể lớn hơn số chủ đề khi có nhiều giảng viên. |
| `topics[].name` | string | Tên rõ nghĩa cho người học, bám sát một hướng thực có trong Excel. |
| `topics[].lecturer` | object | Đúng một giảng viên, gồm `name` và `email`; đối chiếu với nguồn. Email là khóa tự nhiên để nhận diện khi cần. Cùng chủ đề nhưng khác giảng viên thì tạo bản ghi riêng với cây keyword riêng. |
| `topics[].keywords` | array | Các keyword gốc, chọn từ những đối tượng kiến thức chính trong tên chủ đề. Không chèn keyword nền chung vào đây chỉ để đủ số lượng. |
| `name` của keyword | string | Tên kiến thức ngắn gọn, dễ nhận biết; có thể dùng chữ viết tắt quen thuộc như `IDS`, `ML`, `DL` khi nghĩa đã rõ. |
| `outcome` của keyword | string | Một câu ngắn về điều sinh viên **có thể hiểu/giải thích** sau khi tìm hiểu keyword; không chỉ lặp lại tên keyword. |
| `subjects` của keyword | array of string, tùy chọn | Danh sách tên môn học tại trường có thể hỗ trợ học keyword, cùng cấp với `name`, `outcome`, `children`. Có thể đặt ở bất kỳ cấp nào. Chỉ điền tên môn đã đối chiếu chương trình đào tạo/đề cương của trường; chưa xác minh thì bỏ trường này. |
| `children` của keyword | array, tùy chọn | Các keyword nền cần biết **trước** keyword cha. Mỗi nút con dùng lại cùng cấu trúc `name`, `outcome`, `subjects` tùy chọn và `children` tùy chọn. **Không giới hạn số cấp** trong hợp đồng dữ liệu; mỗi cây thực tế phải hữu hạn. Bỏ trường này ở nút lá. |

File mẫu minh họa ba chủ đề thực từ nhóm `sec`, bao gồm cây nhiều cấp và nút có `subjects`. **Đây chỉ là demo về format và cách bắt đầu phân tích, không phải độ chi tiết tối đa của roadmap hay file `sec` hoàn chỉnh.** Thành viên có thể bổ sung những keyword nền và quan hệ tiên quyết thực sự cần thiết sau khi tìm hiểu chủ đề; vẫn giữ cây ở mức định hướng kiến thức nền, tránh mở rộng chỉ để trông đầy đủ. **Ba ví dụ chưa đạt chỉ tiêu tối thiểu 10 chủ đề**. Tên môn trong template chỉ minh họa cách điền, cần đối chiếu chương trình đào tạo áp dụng trước khi đưa vào dữ liệu thành phẩm.

**Một bản ghi = một chủ đề với một giảng viên và một roadmap.** Nếu cùng một chủ đề xuất hiện ở hai giảng viên, tạo hai phần tử trong `topics`, mỗi phần tử có một object `lecturer` và mảng `keywords` riêng. Có thể giữ cùng tên chủ đề; giao diện hiển thị thêm tên giảng viên để phân biệt. Hai cây có thể giống nhau nếu nền tảng thực sự giống nhau; không tự bịa khác biệt hoặc trình bày cây do nhóm biên soạn như yêu cầu chính thức của giảng viên. Chỉ gộp bản ghi khi cùng bài toán, đối tượng, đầu ra và cùng email giảng viên. Không đoán hoặc tự bổ sung email. Khi tính KPI 10 chủ đề khác nhau, các bản ghi cùng chủ đề nhưng khác giảng viên chỉ tính là một chủ đề.

### Quy tắc cho keyword ở mọi cấp

- Dùng cùng tên trường `children` ở mọi cấp; không tạo `children2`, `level3` hay ID cho nút con.
- `name` là tên khái niệm/danh từ ngắn, cụ thể, có thể hiểu độc lập, ví dụ `ML`, `Xác suất và thống kê`, `Biến ngẫu nhiên`. Không đặt tên `Kiến thức cơ bản`, `Phần 1`, `Bước 2` hay ghép đường dẫn cha vào tên.
- Cùng khái niệm dùng cùng cách viết trong file; tên không phải khóa duy nhất. Không lặp cùng một khái niệm trên đường từ gốc xuống lá hoặc lặp nút anh em để kéo dài cây.
- Với mỗi nút, chỉ thêm con khi kiến thức đó thực sự cần học trước để đạt `outcome` của nút cha. Không dùng quan hệ con để chỉ “thuộc nội dung của” hoặc “là một loại của”. Dừng khi đã đủ nền cho người học mục tiêu; không giới hạn cấp không có nghĩa phải phân rã mọi kiến thức.
- `subjects` là gợi ý học phần hỗ trợ, không phải điều kiện bắt buộc hoặc cam kết một môn bao phủ toàn bộ keyword. Bỏ trường nếu chưa có gợi ý đã xác minh; khi có thì dùng mảng tên không rỗng, không trùng, không dùng chuỗi ngăn cách bằng dấu phẩy.

Website đọc JSON tĩnh và render nút bằng cùng một hàm đệ quy cho mọi cấp, không viết cố định cho hai hoặc ba cấp. Mỗi bản ghi chủ đề được mở riêng; không cần backend hay cơ chế ghép roadmap giữa các giảng viên.

**Chất lượng quan trọng hơn việc đủ số bằng cách tạo hàng loạt.** AI có thể hỗ trợ gợi ý tên, keyword và `outcome`, nhưng kết quả sinh hàng loạt dễ thiếu kiến thức nền, thêm quan hệ tiên quyết sai, gộp nhầm đề tài hoặc gán sai giảng viên. Với từng chủ đề, người phụ trách phải đối chiếu tên và giảng viên với nguồn, tự kiểm tra cây keyword và sửa đầu ra kiến thức trước khi đưa vào file. Mốc **ít nhất 10 chủ đề/nhóm** là mức bàn giao tối thiểu cho những chủ đề đã được kiểm chứng, không phải lý do để công bố 10 bản ghi chưa đạt chất lượng.

Trong cây, quan hệ duy nhất là **tiên quyết**: con → cha. Hai keyword gốc cùng cấp có thể là hai nhánh học song song; thứ tự phần tử trong mảng không tạo quan hệ bắt buộc. Không dùng `children` để gom một mảng “các loại của X” nếu chúng không phải kiến thức cần học trước X. Không nối keyword giữa các chủ đề; nếu hai chủ đề cùng cần `ML`, mỗi chủ đề tự có nút `ML` trong cây của mình.

## 5. Quy trình làm cho từng nhóm

1. **Chốt nhóm và kiểm tra khả năng đạt chỉ tiêu.** Bốn người chọn bốn mã khác nhau. Người phụ trách đọc toàn bộ các ô gợi ý thuộc nhóm và rà thêm JSON nguồn nếu một hướng giao thoa có vẻ được xếp chưa hợp lý. Lập danh sách tạm các hướng đủ cụ thể; kiểm tra có thể đạt ít nhất 10 hướng thật sau khi xử lý trùng.
2. **Tách và chuẩn hóa chủ đề.** Với ô chứa tiêu đề lớn, gạch đầu dòng hoặc nhiều bài toán, chỉ tách những hướng có thể đặt tên trung thành với `topicRaw`. Bỏ số thứ tự, xuống dòng và cách viết thừa; giữ đúng ý nghĩa nghiên cứu. Gộp các ô mô tả cùng một bài toán, cùng đối tượng và cùng đầu ra nghiên cứu khi cùng giảng viên; khác giảng viên thì giữ bản ghi riêng ở bước 3. Chỉ cùng lĩnh vực, cùng keyword hoặc cùng giảng viên thì **chưa đủ** để gọi là trùng.
3. **Gắn giảng viên và tách bản ghi.** Chuyển `lecturerNameRaw` và `lecturerEmailRaw` vào object `lecturer`. Mỗi giảng viên của cùng chủ đề có một phần tử riêng trong `topics` với cây `keywords` riêng. Bước gộp trùng chỉ áp dụng trong cùng giảng viên; giữ các bản ghi khác giảng viên. Kiểm tra lại email trước khi bàn giao.
4. **Chọn keyword gốc từ tên chủ đề.** Gạch ra các đối tượng kiến thức chính mà người học phải hiểu để đọc được tên đề tài. Ví dụ “Phát hiện tấn công mạng bằng học sâu” có hai gốc `IDS` (bài toán phát hiện xâm nhập) và `DL` (học sâu); “Phân loại mã độc bằng học sâu” có `Mã độc` và `DL`; “Phát hiện gian lận và dữ liệu đa phương thức giả” có `Phát hiện gian lận` và `Dữ liệu đa phương thức`. Dùng thuật ngữ ngắn nhưng không đổi nghĩa nguồn.
5. **Thêm kiến thức nền trực tiếp.** Với từng gốc, hỏi “người mới cần hiểu kiến thức nào để bắt đầu học gốc này?”. Thêm các nút con thiết yếu, ở mức đại cương. Chẳng hạn `Mạng máy tính` có thể là nền cho `IDS`; `ML` có thể là nền cho `DL`. Không dựng chuỗi trung gian dài chỉ vì có thể phân cấp, và không thêm thuật toán, công cụ hay bước thực nghiệm chi tiết khi chưa cần để định hướng.
6. **Viết đầu ra kiến thức và gợi ý môn học.** Mỗi nút có một `outcome` ngắn, có thể quan sát qua việc sinh viên giải thích được khái niệm/vai trò/đầu vào, đầu ra cơ bản. Tiếp tục xét kiến thức tiên quyết cho từng nút con theo cùng quy tắc nếu cần, không giới hạn số cấp. Có thể thêm `subjects` tại bất kỳ nút nào sau khi đối chiếu tên môn với chương trình đào tạo/đề cương của trường. Không hứa rằng học xong cây là đã đủ năng lực triển khai nghiên cứu độc lập.
7. **Điền và rà soát.** Sao chép cấu trúc JSON, thay các ví dụ bằng chủ đề của nhóm mình, kiểm tra cú pháp, số chủ đề và tính nhất quán. Nếu dùng AI để tạo nháp nhiều chủ đề, rà từng chủ đề như bước 2–6 trước khi tính vào chỉ tiêu. Một thành viên khác kiểm tra chéo nội dung trước khi nhóm trưởng đưa file vào web.

## 6. Ví dụ đọc quan hệ cây, không phải file demo

Với chủ đề “Phát hiện tấn công mạng bằng học sâu”, một phần định hướng ở mức nền có thể đọc như sau:

```text
Chủ đề: Phát hiện tấn công mạng bằng học sâu
├── IDS — hiểu IDS nhằm phát hiện điều gì và nhận thông tin gì
│   └── Mạng máy tính — hiểu khái quát dữ liệu và hoạt động truyền thông mạng
└── DL — hiểu học sâu là gì và được dùng cho bài toán này ra sao
    └── ML — hiểu mô hình học từ dữ liệu và cách đánh giá ở mức cơ bản
        └── Xác suất và thống kê — hiểu phân bố và các đại lượng thống kê cơ bản
            └── Biến ngẫu nhiên — hiểu cách biểu diễn giá trị của một hiện tượng
```

Hai gốc `IDS` và `DL` được suy ra từ tên chủ đề. `Mạng máy tính` và `ML` là kiến thức nền nên nằm bên dưới gốc tương ứng. Đây là cách đọc quan hệ **học nền trước khi học gốc**, không phải khẳng định người học phải hoàn tất toàn bộ nhánh `IDS` rồi mới sang `DL`. Khi điền JSON, mỗi dòng keyword vẫn cần `outcome` cụ thể như trong bảng hợp đồng.

## 7. Kiểm tra trước khi bàn giao

- [ ] File có tên đúng mã nhóm, `group.id` và `group.name` khớp bảng; không giữ nguyên ví dụ từ template nếu chúng không thuộc nhóm được giao.
- [ ] Có ít nhất 10 chủ đề thực sự khác nhau trong **mỗi nhóm được chọn**; nếu nguồn có thêm hướng phù hợp, liệt kê tiếp thay vì dừng máy móc ở 10.
- [ ] Mỗi tên chủ đề tìm được ý tương ứng trong Excel/`topicRaw`; các ô nhiều hướng đã tách đúng; bản ghi trùng cùng giảng viên đã gộp, khác giảng viên giữ riêng. Không lấy số ô hoặc số bản ghi làm số chủ đề khác nhau.
- [ ] Mỗi bản ghi có đúng một object `lecturer` với tên và email đúng nguồn; cùng chủ đề khác giảng viên đã tách bản ghi và roadmap riêng. Không đếm các bản ghi đó thành nhiều chủ đề khác nhau để đạt KPI.
- [ ] Mọi cấp keyword dùng cùng cấu trúc; tên cụ thể, nhất quán; không lặp khái niệm trên cùng đường gốc–lá. Cây hữu hạn và mọi cạnh con → cha đều là tiên quyết.
- [ ] `subjects`, nếu có, là mảng tên môn đã xác minh, không rỗng và không trùng; nằm cùng cấp với `outcome`. Không tự suy đoán tên môn tại trường từ tên keyword.
- [ ] Keyword gốc phản ánh các đối tượng chính của **tên chủ đề**; mỗi nút có `name`, `outcome` không rỗng. `children` chỉ biểu diễn kiến thức nền tiên quyết trong cùng chủ đề.
- [ ] Cây dừng ở mức kiến thức nền cơ bản, không có quan hệ xuyên chủ đề hay chi tiết thừa làm roadmap khó đọc.
- [ ] Mỗi chủ đề, kể cả bản nháp do AI hỗ trợ, đã được người phụ trách kiểm chứng về nguồn, keyword, quan hệ tiên quyết và `outcome`; chỉ đếm các chủ đề đạt chất lượng vào mốc tối thiểu 10.
- [ ] JSON phân tích cú pháp được. Trong PowerShell có thể thử: `Get-Content -Raw 'sec.json' | ConvertFrom-Json | Out-Null` (đổi tên file theo nhóm).
- [ ] Chỉ giữ `group` và `topics` ở cấp cao nhất. `keywords` không rỗng; các trường bắt buộc có nội dung; `children` nếu có là mảng không rỗng. File lưu UTF-8. Kiểm tra cú pháp JSON không thay thế việc rà soát nội dung.
- [ ] Một thành viên khác rà soát lại chủ đề, giảng viên và cây keyword. Nhóm trưởng kiểm tra định dạng thống nhất trước khi tích hợp vào website.

Nếu áp dụng khung vào nhóm khác mà gặp trường hợp không biểu diễn được, cả nhóm trao đổi và sửa **khung chung trước**, rồi đồng bộ các file đã viết. Mục tiêu là một giao diện và một cách đọc dữ liệu cho toàn website.
