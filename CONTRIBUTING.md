# Quy trình đóng góp

## Job 2 — quy trình hiện hành

PR #4 đã merge vào main. Nhánh integration/job-2 được tạo từ bản nền đó để nhận toàn bộ PR Job 2. Thành viên lấy upstream/integration/job-2 làm nền; không dùng nhánh Job 1 cũ. Đọc bản ghi sửa chữa phần mình nhận và quy chuẩn IE104; dùng kiến thức IE106 để đánh giá tính dễ dùng.

| Người | Task | Nhánh mới trên fork | Người góp ý phần gốc |
|---|---|---|---|
| TV1 | [Chi tiết/roadmap](topics/detail/JOB-2.md) | task/job-2-tv1-roadmap | TV2 |
| TV2 | [Danh bạ và hồ sơ](lecturers/JOB-2.md) | task/job-2-tv2-lecturers | TV3 |
| TV3 | [Khám phá](topics/JOB-2.md) | task/job-2-tv3-topics | TV1 |

### Hiểu đúng nhánh và remote

integration/job-2 trên repo nhóm trưởng là bản nền chung và nơi nhận PR. Mỗi thành viên viết code trên nhánh task riêng của mình, rồi push nhánh đó lên fork. Clone tải repo về máy; bước fetch/switch bên dưới bảo đảm code bắt đầu từ đúng bản Job 2, kể cả fork chỉ có main cũ.

- origin: repo fork của thành viên, ví dụ https://github.com/YOUR_USERNAME/ie104.git.
- upstream: repo nhóm trưởng https://github.com/liem-2006/ie104.git.
- Nhánh làm việc: tên task tương ứng bảng trên. Không cùng push trực tiếp vào integration/job-2.

### A. Chưa có repo trên máy

Fork repo nhóm trưởng bằng tài khoản mình trên GitHub (nếu đã fork thì dùng fork hiện có). Thay YOUR_USERNAME bằng tài khoản GitHub của mình:

~~~sh
git clone https://github.com/YOUR_USERNAME/ie104.git
cd ie104
git remote add upstream https://github.com/liem-2006/ie104.git
git fetch upstream
~~~

Sau đó tạo nhánh theo mục C. Không cần fork có sẵn integration/job-2: git fetch upstream lấy nhánh này từ repo nhóm trưởng.

### B. Đã có repo trên máy từ Job 1

~~~sh
git status
git remote -v
~~~

Lưu/commit công việc đang làm trước khi chuyển nhánh; không xóa hoặc reset để làm sạch. origin phải là fork cá nhân. Nếu origin đang là repo nhóm trưởng, sau khi tạo fork hãy đổi:

~~~sh
git remote set-url origin https://github.com/YOUR_USERNAME/ie104.git
~~~

Nếu chưa có upstream, thêm một lần:

~~~sh
git remote add upstream https://github.com/liem-2006/ie104.git
~~~

Nếu upstream đã tồn tại nhưng sai URL, dùng git remote set-url upstream https://github.com/liem-2006/ie104.git. Sau đó:

~~~sh
git fetch upstream
~~~

### C. Tạo nhánh mới — chỉ chạy lệnh của mình

TV1:

~~~sh
git switch -c task/job-2-tv1-roadmap upstream/integration/job-2
~~~

TV2:

~~~sh
git switch -c task/job-2-tv2-lecturers upstream/integration/job-2
~~~

TV3:

~~~sh
git switch -c task/job-2-tv3-topics upstream/integration/job-2
~~~

Nếu nhánh task đã được tạo đúng trước đó, dùng git switch với tên nhánh đó, không chạy lại -c. Sau khi chuyển nhánh, đọc JOB-2.md phần mình nhận và chạy Live Server từ root repo. Có thể kiểm tra git branch --show-current để biết đang đứng đúng nhánh task.

### D. Làm bài, push và mở PR

Stage đúng file được giao bằng git add với từng đường dẫn cụ thể; kiểm tra git diff --cached và commit. Không dùng git add . nếu có thay đổi ngoài task.

Ví dụ TV1 (TV2/TV3 thay tên nhánh tương ứng):

~~~sh
git commit -m "feat: improve Job 2 roadmap usability"
git push -u origin task/job-2-tv1-roadmap
~~~

Trên GitHub chọn Pull requests → New pull request → compare across forks nếu cần:

| Trường | Giá trị |
|---|---|
| Base repository | liem-2006/ie104 |
| Base branch | integration/job-2 |
| Head repository | YOUR_USERNAME/ie104 |
| Compare branch | Nhánh task Job 2 của mình |

Kiểm tra base branch trước khi gửi vì GitHub có thể mặc định chọn main. Nếu đã mở nhầm PR vào main, sửa base thành integration/job-2 và kiểm tra lại diff.

Một PR/người. Ghi commit nền, link task, bảng trước–sau, ảnh và kết quả thực tế. Có thể mở Draft PR sớm. Sau góp ý, commit/push tiếp cùng nhánh để cập nhật PR hiện có; không mở PR mới cho mỗi lần sửa.

### E. Lấy cập nhật chung

Khi nhóm trưởng báo integration/job-2 có bản mới, lưu/commit công việc, đứng trên nhánh task của mình rồi chạy:

~~~sh
git fetch upstream
git merge upstream/integration/job-2
~~~

Giải quyết xung đột trong phạm vi task, hỏi nhóm trưởng nếu liên quan phần chung; chạy kiểm thử lại rồi push cùng nhánh lên origin. Không force push.

Nhóm trưởng sở hữu trang vào, token/CSS/component/module dữ liệu/theme chung trong Job 2, thay phân công TV1 giữ nền chung ở Job 1. Thành viên ghi đề xuất phần chung trong PR; không tự sửa ngoài task. Tác giả ban đầu góp ý, nhóm trưởng duyệt và merge.

Khi bản nền Job 2 cập nhật, chạy git fetch upstream rồi git merge upstream/integration/job-2 trên nhánh task; giải quyết xung đột đúng phạm vi, không force push. Nhóm trưởng duyệt và merge từng PR vào integration/job-2; sau khi kiểm thử tích hợp, mở PR tổng vào main. Thành viên không push vào repo chính và không tự merge.

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
