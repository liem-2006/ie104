# Quy trình đóng góp

## Job 2 — quy trình hiện hành

Chờ nhóm trưởng merge PR bản nền từ integration/job-1-fixes vào main rồi mới bắt đầu code. Không lấy main cũ hoặc nhánh Job 1 làm nền. Đọc bản ghi sửa chữa phần mình nhận và quy chuẩn IE104; dùng kiến thức IE106 để đánh giá tính dễ dùng.

| Người | Task | Nhánh mới trên fork | Người góp ý phần gốc |
|---|---|---|---|
| TV1 | [Chi tiết/roadmap](topics/detail/JOB-2.md) | task/job-2-tv1-roadmap | TV2 |
| TV2 | [Danh bạ và hồ sơ](lecturers/JOB-2.md) | task/job-2-tv2-lecturers | TV3 |
| TV3 | [Khám phá](topics/JOB-2.md) | task/job-2-tv3-topics | TV1 |

Nếu chưa clone fork, làm bước Fork bên dưới nhưng dùng tên nhánh Job 2. origin là fork của mình; upstream là https://github.com/liem-2006/ie104.git. Thêm upstream một lần nếu chưa có. Kiểm tra git status và lưu công việc đang làm trước khi chuyển nhánh.

Ví dụ TV1, sau khi PR nền đã merge:

~~~sh
git fetch upstream
git switch -c task/job-2-tv1-roadmap upstream/main
~~~

TV2/TV3 thay tên nhánh theo bảng. Stage đúng file task, commit rồi push lên fork:

~~~sh
git push -u origin task/job-2-tv1-roadmap
~~~

Mở một PR/người, base liem-2006/ie104:main, compare nhánh Job 2 trên fork. Ghi commit main làm nền, link task, vấn đề quan sát, bảng trước–sau, ảnh và kết quả kiểm thử thực tế. Có thể mở Draft PR sớm; không dùng nhánh cũ hoặc merge lại PR #1–#3.

Nhóm trưởng sở hữu trang vào, token/CSS/component/module dữ liệu/theme chung trong Job 2, thay phân công TV1 giữ nền chung ở Job 1. Thành viên ghi đề xuất phần chung trong PR; không tự sửa ngoài task. Tác giả ban đầu góp ý, nhóm trưởng duyệt và merge.

Các ví dụ Job 1 bên dưới là quy trình cũ; dùng bảng Job 2 để chọn task và tên nhánh.

## Nhận task

Nhóm trưởng giao việc bằng JOB-N.md hoặc tài liệu task có phạm vi cụ thể. Phiên bản tích hợp hiện hành theo [kế hoạch sửa lỗi](idea/ke-hoach-tich-hop-sua-loi.md), đã cho phép JavaScript và JSON động. Đọc bản ghi sửa chữa TV1–TV3 trước khi tiếp tục; đọc Yêu cầu giao diện hiện hành ở đầu JOB-1.md và không áp dụng giới hạn HTML/CSS tĩnh trong phần Lịch sử. Không thêm framework hoặc tính năng ngoài task.

## Fork và tạo nhánh

Fork `liem-2006/ie104` trên GitHub, rồi thay `YOUR_USERNAME` trong các lệnh:

```sh
git clone https://github.com/YOUR_USERNAME/ie104.git
cd ie104
git remote add upstream https://github.com/liem-2006/ie104.git
git fetch upstream
git switch -c task/12-html-topics upstream/main
```

Nhánh đặt dạng `task/<issue>-<mo-ta-ngan>`, ví dụ `task/12-html-topics`. Mỗi task một nhánh và một PR. `origin` là fork của mình; `upstream` là repo của nhóm trưởng.

Nếu chưa có Issue, dùng `task/job-1-tv1-foundation`, `task/job-1-tv1-topics`, `task/job-1-tv2-roadmap`, `task/job-1-tv3-lecturers`; PR dẫn tới JOB-1.md tương ứng và bỏ dòng Closes # chưa có số. Không cần chờ tạo Issue mới bắt đầu công việc đã được giao.

## Gửi bài

```sh
git status
git diff
git add topics/
git commit -m "feat: add topic HTML structure"
git push -u origin task/12-html-topics
```

Chỉ stage file thuộc task; đường dẫn `topics/` ở trên là ví dụ, không bao gồm thay đổi của TV2 ở topics/detail nếu bạn làm TV1. Mở PR trên GitHub, base `liem-2006/ie104:main`, compare là nhánh trên fork. Điền mẫu PR, dẫn JOB-N.md hoặc Issue, ảnh minh chứng nếu có giao diện và kết quả tự kiểm tra. Gửi Draft PR khi cần góp ý sớm. Thành viên không push vào repo chính và không tự merge.

Sau góp ý, sửa, commit và push lên cùng nhánh; PR tự cập nhật. Khi main có thay đổi:

```sh
git fetch upstream
git merge upstream/main
```

Giải quyết xung đột trong phạm vi task; hỏi nhóm trưởng nếu xung đột ở cấu trúc chung. Không force push. Sau khi PR được chủ repo merge, bắt đầu task tiếp theo từ `upstream/main` mới nhất.

## Checklist

- Đúng JOB-N.md hoặc Issue và phạm vi file; đọc AGENTS.md và skill IE104.
- HTML ngữ nghĩa; CSS BEM, responsive và scope theo trang; JS thuần, hàm một nhiệm vụ, JSDoc.
- Chỉ kiểm tra yêu cầu phù hợp chặng hiện tại; đến chặng JS phải thử qua HTTP, không có lỗi console.
- Không sửa dữ liệu, schema, quy tắc nhóm hoặc file người khác ngoài task.
- Không commit mật khẩu, token, `.env`, file cá nhân hay công cụ sinh mã không cần thiết.
- Người khác có thể đọc và giải thích phần code đã bàn giao; ghi rõ phần dùng AI và phần đã tự kiểm tra.

Nhóm trưởng rà nội dung diff, tiêu chí task và giao diện trước khi approve/merge. PR có sửa mới sau khi duyệt cần được duyệt lại. Nhánh tích hợp phải kiểm tra đầy đủ liên kết xuyên trang. Giữ PR gốc để đối chiếu, không merge chồng lên nhánh tích hợp.
