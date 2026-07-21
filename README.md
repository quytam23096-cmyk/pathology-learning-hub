# Atlas GPB

Website tĩnh tiếng Việt dạng atlas giải phẫu bệnh: chia theo cơ quan, trong từng cơ quan có các chẩn đoán cụ thể, ảnh vi thể, điểm cần nhìn, bẫy dễ nhầm, gợi ý báo cáo và liên kết nguồn chính thống.

## Điểm chính

- Giao diện chính dùng bố cục Atlas Workspace: thanh cơ quan cố định, danh sách ca cuộn ngang, ảnh vi thể lớn và nội dung học song ngữ đặt cạnh nhau.
- Có trang `interface-demos.html` để thử trực tiếp ba hướng giao diện mới: Clinical Light, Digital Scope và Atlas Workspace. Mỗi mẫu dùng chung dữ liệu GPB mẫu, hỗ trợ tìm kiếm, lọc cơ quan, chọn ca, đổi tab nội dung và phóng đại ảnh.
- 13 nhóm cơ quan, 97 thẻ chẩn đoán mẫu.
- Cả 97 thẻ có nội dung học song ngữ Việt - Anh: đặc điểm vi thể/tế bào, gợi ý báo cáo, điểm ghi nhớ và bẫy chẩn đoán.
- 70 thẻ có ảnh mở đã đối chiếu tên tệp và giấy phép; 27 thẻ còn lại hiện trạng thái chờ thay vì dùng ảnh gần giống hoặc sai thực thể.
- Thư viện danh mục WHO/IARC gồm 14 quyển và 2.674 mục phân loại/thực thể lấy từ cấu trúc công khai chính thức.
- 80 liên kết WHO Online đã được kiểm tra bằng tìm kiếm tiêu đề chính thức: 68 liên kết đúng thực thể và 12 liên kết tới thực thể cha được dán nhãn riêng; không gắn liên kết thực thể cho bệnh không thuộc phân loại u.
- WHO Online hiện có bản beta ấn bản 6 cho hệ tiêu hóa và vú; atlas ghi chú riêng trạng thái này, còn liên kết thực thể đã kiểm tra thuộc ấn bản 5 vẫn được dán nhãn ấn bản 5 để tránh nhập nhằng.
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
- Các thuật ngữ như `grade`, `margin`, `marker`, `squamous cell` và `carcinoma` được trình bày lần lượt là độ mô học, diện cắt, dấu ấn, tế bào vảy và ung thư biểu mô.
- Danh pháp được đối chiếu với WHO/IARC và cách dùng trong tài liệu chuyên môn của Bộ Y tế Việt Nam; tên phân loại, gen, dấu ấn và viết tắt quốc tế cần thiết vẫn được giữ nguyên.

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8765/`.

Mở `http://127.0.0.1:8765/interface-demos.html` để so sánh ba giao diện. Có thể mở thẳng từng mẫu bằng tham số `?theme=clinical`, `?theme=scope` hoặc `?theme=workspace`.

## Cập nhật danh mục WHO

Tệp `who-catalog.js` được tạo tự động từ các trang Classification Structure công khai của WHO/IARC. Chạy lại bộ sinh dữ liệu khi cần cập nhật:

```powershell
python scripts/build-who-catalog.py
```

Bộ sinh chỉ thu thập cấu trúc phân loại và tên thực thể. Nó không sao chép mô tả, bảng, tiêu chuẩn chẩn đoán hoặc hình ảnh của WHO Classification of Tumours Online.

Tệp `who-diagnosis-links.js` chứa các `bookId/chapterId` đã kiểm tra qua tìm kiếm tiêu đề của WHO Online. Tệp không chứa tài khoản, mật khẩu, token đăng nhập hay nội dung thuê bao. Mỗi liên kết được gắn quan hệ `exact` (đúng thực thể) hoặc `parent` (thực thể cha) để giao diện không trình bày quá mức độ chính xác đã xác minh.

## Cập nhật kho WebPathology

Tệp `webpathology-catalog.js` được tạo từ sitemap công khai và tự khử trùng lặp giữa biến thể tên miền có/không có `www`:

```powershell
python scripts/build-webpathology-catalog.py
```

Bộ sinh chỉ lưu URL trang gallery/danh mục công khai. Không có tệp ảnh hoặc ảnh thu nhỏ WebPathology nào được tải vào repo.

## Dữ liệu kiểm định

Tệp `atlas-curation.js` là lớp dữ liệu kiểm định của atlas: liên kết chủ đề PathologyOutlines, quyển và năm WHO, mã ICD-O-4, hệ thống Bethesda/FIGO khi phù hợp, tên tệp ảnh mở và trạng thái xác minh. Không thêm mã hoặc ảnh bằng suy đoán. Ảnh thay thế phải có trang tệp nguồn, giấy phép và mô tả khớp thực thể.

Tệp `atlas-bilingual.js` chứa phần diễn giải học tập tiếng Anh tương ứng với toàn bộ 97 thẻ. Nội dung này được biên soạn độc lập để hiển thị cạnh bản tiếng Việt, không sao chép nguyên văn từ nguồn có bản quyền.

## Deploy miễn phí

Repo này là site tĩnh, deploy được miễn phí trên Vercel, GitHub Pages, Netlify hoặc Cloudflare Pages.

Với Vercel: import GitHub repo, chọn framework `Other`, để trống Build Command, Output Directory để trống hoặc đặt `.`.

## Ranh giới nội dung

Trang này không lưu tài khoản đăng nhập, không chứa dữ liệu bệnh án và không sao chép nguyên văn tài liệu có bản quyền. Danh pháp tiếng Anh trong thư viện WHO được giữ nguyên để bảo toàn tên chính thức; phần diễn giải tiếng Việt được biên soạn độc lập. WHO Classification of Tumours Online, PathologyOutlines và WebPathology được gắn liên kết để người học tự mở nguồn gốc.
