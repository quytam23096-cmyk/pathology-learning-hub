# Atlas GPB

Trang web tĩnh tiếng Việt dạng atlas giải phẫu bệnh: chia theo cơ quan, trong từng cơ quan có các chẩn đoán cụ thể, ảnh mô bệnh học, điểm cần nhìn dưới kính, bẫy dễ nhầm và gợi ý học.

Trang không dùng dữ liệu Excel, không dùng dữ liệu bệnh án nội bộ và không lưu thông tin đăng nhập WHO/IARC. Ảnh được lấy từ nguồn mở như Wikimedia Commons qua link trang file gốc; PathologyOutlines, WHO/IARC và CAP chỉ dùng làm link đọc thêm.

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8765/`.

## Deploy miễn phí

Site không cần backend nên có thể deploy miễn phí. Bản sạch để upload nằm trong `public/`; không nên upload folder `data/` cũ lên internet.

- GitHub Pages: upload nội dung trong `public/` lên repo public rồi bật Pages.
- Vercel: import GitHub repo, Framework Preset chọn `Other`, Build Command để trống, Output Directory để trống hoặc `.` nếu repo chỉ chứa file tĩnh.
- Netlify: kéo thả `public/` hoặc file zip deploy vào Netlify Drop để có domain `*.netlify.app`.
- Cloudflare Pages: kết nối repo để có domain `*.pages.dev`.

Xem hướng dẫn từng bước trong `DEPLOY.md`.

## Ranh giới nội dung

Trang này không sao chép nguyên văn tài liệu có bản quyền và không lưu thông tin đăng nhập. WHO Classification of Tumours Online có phần yêu cầu tài khoản, vì vậy website chỉ dẫn link, không sao chép nội dung đăng nhập.
