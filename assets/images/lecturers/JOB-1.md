# TV3 — Ảnh giảng viên (tùy chọn)

Đầu vào: ảnh đúng người có nguồn và căn cứ sử dụng. Đầu ra: ảnh .jpg, .png hoặc .webp đặt ngay tại thư mục này, tham chiếu trong [lecturers.json](../../../data/JOB-1.md).

- Đặt tên file không dấu, chữ thường và gạch ngang, ví dụ nguyen-tan-cam.jpg; chỉ dùng tên đó khi ảnh thực sự đúng người.
- Ghi photo.path theo gốc repo: assets/images/lecturers/ten-file.jpg; kèm alt, sourceUrl, usageNote theo schema.
- Không có ảnh phù hợp thì bỏ photo, dùng fallback bằng chữ trong HTML. Không tạo ảnh AI làm chân dung hoặc lấy ảnh người trùng tên.
- Tối ưu kích thước ảnh cho thẻ/hồ sơ, giữ tỷ lệ; không commit ảnh gốc quá lớn không sử dụng. Nếu tạo biến thể phục vụ srcset, ghi rõ đường dẫn trong HTML và kiểm tra hiển thị.
- Kiểm tra ảnh mở được, HTML có alt, loading=lazy khi dưới màn hình và đường dẫn đúng từ cả danh bạ lẫn trang chi tiết.

Không yêu cầu phải có ảnh cho cả 16 người. Không sửa JSON nghiên cứu, CSS chung hay thư mục ảnh ngoài task. Xem [task TV3](../../../lecturers/JOB-1.md) để biết phạm vi đầy đủ.
