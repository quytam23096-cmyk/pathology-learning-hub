# Atlas GPB

Website tĩnh tiếng Việt dạng atlas giải phẫu bệnh: chia theo cơ quan, trong từng cơ quan có các chẩn đoán cụ thể, ảnh vi thể, điểm cần nhìn, bẫy dễ nhầm, gợi ý báo cáo và liên kết nguồn chính thống.

## Điểm chính

- Thanh điều hướng cố định, hero H&E toàn chiều rộng với CTA rõ ràng, khu làm việc atlas và footer nguồn học được thiết kế lại theo hướng hiện đại, tương lai và responsive.
- Giao diện chính dùng bố cục Atlas Workspace: thanh cơ quan cố định, lưới chẩn đoán có ảnh, hồ sơ vi thể lớn và nội dung học song ngữ đặt cạnh nhau.
- Có trang `interface-demos.html` để thử trực tiếp ba hướng giao diện mới: Clinical Light, Digital Scope và Atlas Workspace. Mỗi mẫu dùng chung dữ liệu GPB mẫu, hỗ trợ tìm kiếm, lọc cơ quan, chọn ca, đổi tab nội dung và phóng đại ảnh.
- 15 nhóm cơ quan, 102 thẻ chẩn đoán mẫu.
- Cả 102 thẻ có nội dung học song ngữ Việt - Anh: đặc điểm vi thể/tế bào, gợi ý báo cáo, điểm ghi nhớ và bẫy chẩn đoán.
- 101 thẻ có ảnh mở đã đối chiếu tên tệp và giấy phép; thẻ còn lại hiện trạng thái chờ thay vì dùng ảnh gần giống hoặc sai thực thể.
- Thư viện WHO/IARC phản ánh 20 quyển đang có trên WHO Classification Online: 4 quyển tế bào học, 2 quyển ấn bản 6 và 14 quyển ấn bản 5.
- 4.487 mục trong mục lục có URL `chaptercontent/{bookId}/{chapterId}` trực tiếp; giao diện hiển thị rõ Book ID và Chapter ID để kiểm tra trích dẫn.
- Mặc định thư viện ưu tiên 2.930 mục chẩn đoán; người học có thể bật công tắc để xem thêm 1.368 mục hỗ trợ và 189 mục xuất bản/giới thiệu.
- Tệp danh mục chỉ lưu metadata mục lục và URL chính thức, không lưu tài khoản, token, nội dung bài, bảng hoặc hình ảnh WHO.
- Có tìm kiếm song ngữ toàn danh mục WHO, lọc theo quyển và mở thẻ học tiếng Việt khi atlas đã có nội dung tương ứng.
- Các thực thể đã đối chiếu hiển thị mã hình thái ICD-O-4; tổn thương không tân sinh ghi rõ không áp dụng, còn mã phụ thuộc cấp độ/xâm nhập được giải thích riêng.
- Có bộ lọc theo cơ quan, kiểu cấu trúc và tìm kiếm tiếng Việt/tiếng Anh.
- Có poster ghi nhớ theo cơ quan, phù hợp kiểu học bằng hình ảnh.
- Có nút thay ảnh cho từng chẩn đoán, lưu cục bộ trên trình duyệt.
- Có trình tạo thẻ atlas để tự thêm: cơ quan, chẩn đoán, URL ảnh, vi thể cần nhìn, gợi ý báo cáo, điểm ghi nhớ, bẫy chẩn đoán và dấu ấn.
- Có xuất/nhập JSON cho các thẻ tự thêm để sao lưu hoặc đưa vào mã nguồn công khai.
- Ảnh nhúng ưu tiên nguồn mở có liên kết tệp gốc; WHO/IARC, PathologyOutlines, CAP và tài liệu Bộ Y tế được dùng để đối chiếu phân loại, vi thể, báo cáo và thuật ngữ tiếng Việt.
- Kho WebPathology gồm 1.004 URL gallery/danh mục duy nhất thuộc 18 nhóm cơ quan, lấy từ sitemap công khai và tìm được bằng tiếng Việt hoặc tiếng Anh.
- WebPathology luôn được mở ở trang nguồn độc lập. Atlas không sao chép, tải lại, đóng khung hay nhúng hình ảnh WebPathology vì nội dung này có bản quyền.

## Chuẩn hóa thuật ngữ

- Tên chẩn đoán hiển thị bằng tiếng Việt, kèm tên tiếng Anh để tra cứu song ngữ.
- `medical-vi.js` cung cấp lớp thuật ngữ Việt cho toàn bộ tiêu đề WHO và WebPathology; mỗi thẻ vẫn giữ tên tiếng Anh nguyên bản ngay bên dưới để đối chiếu.
- Tìm kiếm được lập chỉ mục theo từng trường tiếng Việt/tiếng Anh, tránh ghép nhầm `Da` với `Dày...` thành từ khóa `dạ dày`.
- Các thuật ngữ như `grade`, `margin`, `marker`, `squamous cell` và `carcinoma` được trình bày lần lượt là độ mô học, diện cắt, dấu ấn, tế bào vảy và ung thư biểu mô.
- Danh pháp được đối chiếu với WHO/IARC và cách dùng trong tài liệu chuyên môn của Bộ Y tế Việt Nam; tên phân loại, gen, dấu ấn và viết tắt quốc tế cần thiết vẫn được giữ nguyên.

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8765/`.

Mở `http://127.0.0.1:8765/interface-demos.html` để so sánh ba giao diện. Có thể mở thẳng từng mẫu bằng tham số `?theme=clinical`, `?theme=scope` hoặc `?theme=workspace`.

## Biên dịch Tailwind CSS

Tệp `tailwind.css` đã được biên dịch và đưa vào repo nên bản deploy tĩnh có thể chạy ngay. Sau khi sửa các utility class Tailwind trong HTML, cài dependency và biên dịch lại:

```powershell
npm install
npm run build:css
```

Các quy tắc giao diện riêng của atlas vẫn nằm trong `styles.css`; hành vi của menu responsive nằm trong `ui.js`.

## Cập nhật danh mục WHO

Tệp `who-catalog.js` được tạo tự động từ mục lục WHO Classification Online. Tài khoản chỉ được đọc từ biến môi trường trong lúc chạy và không được ghi vào tệp sinh ra:

```powershell
$env:WHO_EMAIL = "your-email@example.com"
$env:WHO_PASSWORD = "your-password"
python scripts/build-who-online-catalog.py
Remove-Item Env:WHO_EMAIL
Remove-Item Env:WHO_PASSWORD
```

Bộ sinh chỉ thu thập tên quyển, tiêu đề mục, vị trí mục lục, Book ID, Chapter ID và URL chính thức. Nó không sao chép mô tả, bảng, tiêu chuẩn chẩn đoán hoặc hình ảnh của WHO Classification of Tumours Online. Người dùng vẫn phải đăng nhập và có quyền phù hợp khi mở nội dung trên WHO Online.

Tệp `scripts/build-who-catalog.py` cũ được giữ làm phương án tạo danh mục từ cấu trúc công khai khi không có quyền truy cập WHO Online; dữ liệu do bộ sinh này tạo không có URL trực tiếp cho mọi thực thể.

Tệp `who-diagnosis-links.js` chứa các `bookId/chapterId` đã kiểm tra qua tìm kiếm tiêu đề của WHO Online. Tệp không chứa tài khoản, mật khẩu, token đăng nhập hay nội dung thuê bao. Mỗi liên kết được gắn quan hệ `exact` (đúng thực thể) hoặc `parent` (thực thể cha) để giao diện không trình bày quá mức độ chính xác đã xác minh.

## Cập nhật kho WebPathology

Tệp `webpathology-catalog.js` được tạo từ sitemap công khai và tự khử trùng lặp giữa biến thể tên miền có/không có `www`:

```powershell
python scripts/build-webpathology-catalog.py
```

Bộ sinh chỉ lưu URL trang gallery/danh mục công khai. Không có tệp ảnh hoặc ảnh thu nhỏ WebPathology nào được tải vào repo.

## Dữ liệu kiểm định

Tệp `atlas-curation.js` là lớp dữ liệu kiểm định của atlas: liên kết chủ đề PathologyOutlines, quyển và năm WHO, mã ICD-O-4, hệ thống Bethesda/FIGO khi phù hợp, tên tệp ảnh mở và trạng thái xác minh. Không thêm mã hoặc ảnh bằng suy đoán. Ảnh thay thế phải có trang tệp nguồn, giấy phép và mô tả khớp thực thể.

Tệp `atlas-bilingual.js` chứa phần diễn giải học tập tiếng Anh tương ứng với toàn bộ 102 thẻ. Nội dung này được biên soạn độc lập để hiển thị cạnh bản tiếng Việt, không sao chép nguyên văn từ nguồn có bản quyền.

## Deploy miễn phí

Repo này là site tĩnh, deploy được miễn phí trên Vercel, GitHub Pages, Netlify hoặc Cloudflare Pages.

Với Vercel: import GitHub repo, chọn framework `Other`, để trống Build Command, Output Directory để trống hoặc đặt `.`.

## Ranh giới nội dung

Trang này không lưu tài khoản đăng nhập, không chứa dữ liệu bệnh án và không sao chép nguyên văn tài liệu có bản quyền. Danh pháp tiếng Anh trong thư viện WHO được giữ nguyên để bảo toàn tên chính thức; phần diễn giải tiếng Việt được biên soạn độc lập. WHO Classification of Tumours Online, PathologyOutlines và WebPathology được gắn liên kết để người học tự mở nguồn gốc.
