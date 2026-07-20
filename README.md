# Atlas GPB

Website tĩnh tiếng Việt dạng atlas giải phẫu bệnh: chia theo cơ quan, trong từng cơ quan có các chẩn đoán cụ thể, ảnh vi thể, điểm cần nhìn, bẫy dễ nhầm, gợi ý báo cáo và link nguồn chính thống.

## Điểm chính

- 13 nhóm cơ quan, 42 thẻ chẩn đoán mẫu.
- Có bộ lọc theo cơ quan, pattern và tìm kiếm tiếng Việt/tiếng Anh.
- Có poster ghi nhớ theo cơ quan, phù hợp kiểu học bằng hình ảnh.
- Có nút thay ảnh cho từng chẩn đoán, lưu cục bộ trên trình duyệt.
- Ảnh nhúng ưu tiên nguồn mở có link file gốc; WHO/IARC, PathologyOutlines và CAP được dùng làm link đọc thêm.

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8765/`.

## Deploy miễn phí

Repo này là site tĩnh, deploy được miễn phí trên Vercel, GitHub Pages, Netlify hoặc Cloudflare Pages.

Với Vercel: import GitHub repo, chọn framework `Other`, để trống Build Command, Output Directory để trống hoặc đặt `.`.

## Ranh giới nội dung

Trang này không lưu tài khoản đăng nhập, không chứa dữ liệu bệnh án và không sao chép nguyên văn tài liệu có bản quyền. WHO Classification of Tumours Online và PathologyOutlines được dẫn link để người học tự mở nguồn chính thống.
