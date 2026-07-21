# Atlas GPB

Website tĩnh tiếng Việt dạng atlas giải phẫu bệnh: chia theo cơ quan, trong từng cơ quan có các chẩn đoán cụ thể, ảnh vi thể, điểm cần nhìn, bẫy dễ nhầm, gợi ý báo cáo và liên kết nguồn chính thống.

## Điểm chính

- 13 nhóm cơ quan, 97 thẻ chẩn đoán mẫu.
- Thư viện danh mục WHO/IARC gồm 14 quyển và 2.674 mục phân loại/thực thể lấy từ cấu trúc công khai chính thức.
- Có tìm kiếm toàn danh mục WHO, lọc theo quyển và mở thẻ học tiếng Việt khi atlas đã có nội dung tương ứng.
- Có bộ lọc theo cơ quan, kiểu cấu trúc và tìm kiếm tiếng Việt/tiếng Anh.
- Có poster ghi nhớ theo cơ quan, phù hợp kiểu học bằng hình ảnh.
- Có nút thay ảnh cho từng chẩn đoán, lưu cục bộ trên trình duyệt.
- Có trình tạo thẻ atlas để tự thêm: cơ quan, chẩn đoán, URL ảnh, vi thể cần nhìn, gợi ý báo cáo, điểm ghi nhớ, bẫy chẩn đoán và dấu ấn.
- Có xuất/nhập JSON cho các thẻ tự thêm để sao lưu hoặc đưa vào mã nguồn công khai.
- Ảnh nhúng ưu tiên nguồn mở có liên kết tệp gốc; WHO/IARC, PathologyOutlines, CAP và tài liệu Bộ Y tế được dùng để đối chiếu phân loại, vi thể, báo cáo và thuật ngữ tiếng Việt.

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

## Cập nhật danh mục WHO

Tệp `who-catalog.js` được tạo tự động từ các trang Classification Structure công khai của WHO/IARC. Chạy lại bộ sinh dữ liệu khi cần cập nhật:

```powershell
python scripts/build-who-catalog.py
```

Bộ sinh chỉ thu thập cấu trúc phân loại và tên thực thể. Nó không sao chép mô tả, bảng, tiêu chuẩn chẩn đoán hoặc hình ảnh của WHO Classification of Tumours Online.

## Deploy miễn phí

Repo này là site tĩnh, deploy được miễn phí trên Vercel, GitHub Pages, Netlify hoặc Cloudflare Pages.

Với Vercel: import GitHub repo, chọn framework `Other`, để trống Build Command, Output Directory để trống hoặc đặt `.`.

## Ranh giới nội dung

Trang này không lưu tài khoản đăng nhập, không chứa dữ liệu bệnh án và không sao chép nguyên văn tài liệu có bản quyền. Danh pháp tiếng Anh trong thư viện WHO được giữ nguyên để bảo toàn tên chính thức; phần diễn giải tiếng Việt được biên soạn độc lập. WHO Classification of Tumours Online và PathologyOutlines được gắn liên kết để người học tự mở nguồn chính thống.
