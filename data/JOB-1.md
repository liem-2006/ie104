# TV3 — Chuẩn bị data/lecturers.json

Đặt file lecturers.json ngay trong thư mục này. Đọc [quy tắc chung](../idea/job-1-rules.md) và [task TV3](../lecturers/JOB-1.md).

## Đầu vào, đầu ra và phạm vi

- Đầu vào: research-data.json cùng thư mục, 16 email giảng viên duy nhất.
- Đầu ra: lecturers.json theo schema dưới đây; giữ nguyên research-data.json.
- Lọc trùng theo email; lấy tên/email từ nguồn, chưa có thông tin mở rộng thì bỏ trường tùy chọn.
- Kiểm tra JSON hợp lệ, đủ 16 email duy nhất, thông tin bổ sung có nguồn; không đưa placeholder vào dữ liệu thật.
- Job 1 chỉ chuẩn bị dữ liệu và HTML tĩnh; chưa fetch hoặc viết JavaScript.

## Schema bắt buộc thống nhất

Ví dụ cấu trúc dưới đây dùng placeholder, không phải thông tin thật để copy vào bản bàn giao:

```json
{
  "lecturers": [
    {
      "name": "Tên từ dữ liệu nghiên cứu",
      "email": "email từ dữ liệu nghiên cứu",
      "profile": {
        "affiliation": "Đơn vị công tác đã xác minh",
        "bio": "Giới thiệu ngắn có nguồn",
        "researchAreas": ["Lĩnh vực nghiên cứu"],
        "sourceUrl": "https://example.org/profile",
        "checkedAt": "YYYY-MM-DD"
      },
      "photo": {
        "path": "assets/images/lecturers/ten-file.jpg",
        "alt": "Chân dung giảng viên ...",
        "sourceUrl": "https://example.org/photo",
        "usageNote": "Căn cứ cho phép sử dụng ảnh"
      },
      "researchProfiles": [
        { "label": "Google Scholar", "url": "https://example.org/scholar" }
      ],
      "metrics": [
        {
          "sourceName": "Google Scholar",
          "sourceUrl": "https://example.org/scholar",
          "asOf": "YYYY-MM-DD",
          "scope": "all-time",
          "citations": 123,
          "hIndex": 10,
          "i10Index": 5
        }
      ]
    }
  ]
}
```

- Chỉ `name`, `email` bắt buộc. `profile`, `photo`, `researchProfiles`, `metrics` đều tùy chọn; chưa biết thì bỏ trường, không điền 0 thay cho dữ liệu thiếu, null, chuỗi giả hoặc URL example.org vào dữ liệu thật. Số 0 thực sự được nguồn ghi nhận vẫn hợp lệ.
- `profile`: có ít nhất một trong affiliation/bio/researchAreas; sourceUrl và checkedAt bắt buộc nếu có profile. Nội dung cùng object phải được nguồn đó hỗ trợ; nếu không đủ thì bỏ phần chưa xác minh.
- `photo`: đủ path/alt/sourceUrl/usageNote khi có ảnh. path tính từ gốc repo; HTML ở các cấp khác nhau thêm tiền tố tương đối tương ứng. Không có ảnh dùng khung chữ cái/tên, không ảnh lỗi.
- `researchProfiles`: mảng liên kết không rỗng, từng phần tử đủ label/url (Scholar, ORCID, trang trường...). Kiểm tra đúng người theo tên và đơn vị/chủ đề.
- `metrics`: từng phần tử có sourceName/sourceUrl/asOf/scope; scope Job 1 chỉ nhận `all-time`. Ít nhất một chỉ số citations/hIndex/i10Index là số nguyên không âm. Chỉ lấy chỉ số thực sự có trên nguồn và đúng phạm vi; không trộn số từ các nguồn vào một bản ghi, không tự tính hay suy đoán.
- Hiển thị chỉ số kèm nguồn và ngày chụp số liệu; không tuyên bố số hiện tại, không xếp hạng giảng viên. Mục đích giúp tham khảo thành tựu nghiên cứu.
- Không thêm ID. Không chép danh sách đề tài/roadmap vào lecturers.json; đối chiếu bằng email. Các nhóm chủ đề là “nhóm đề tài trên website”, không tự biến thành researchAreas chính thức.

## Kiểu dữ liệu và cách kiểm tra

- Root chỉ có lecturers là mảng 16 object. Tên/email là chuỗi không rỗng, email duy nhất sau trim và chuyển chữ thường để so sánh; giữ tên hiển thị đúng nguồn hợp nhất.
- profile/photo là object; researchProfiles/metrics/researchAreas nếu có phải là mảng không rỗng. researchAreas chứa chuỗi; researchProfiles và metrics chứa object. Các trường văn bản còn lại là chuỗi không rỗng, URL nguồn là http/https hợp lệ.
- checkedAt/asOf là ngày lịch hợp lệ dạng YYYY-MM-DD, ghi ngày xác minh/ghi nhận thật; không dùng ngày tương lai. Kiểu số của chỉ số là integer, không ghi chuỗi như "1,234".
- Không thêm trường ngoài schema. Bỏ trường tùy chọn rỗng; parse JSON chỉ kiểm tra cú pháp, vẫn phải đối chiếu email/nguồn/kiểu dữ liệu.
