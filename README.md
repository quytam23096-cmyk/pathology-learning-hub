# Pathology Learning Hub

Trang web tĩnh tiếng Việt để học đọc kết quả giải phẫu bệnh. Nội dung được biên soạn lại theo hướng checklist học tập, có liên kết ra PathologyOutlines, WHO Classification of Tumours, CAP Cancer Protocols, NCI và ảnh minh họa mở từ Wikimedia Commons.

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Sau đó mở `http://127.0.0.1:8765/`.

## Deploy miễn phí

Site không cần backend nên có thể deploy miễn phí. Bản sạch để upload nằm trong `public/`; không nên upload folder `data/` cũ lên internet.

- GitHub Pages: upload nội dung trong `public/` lên repo public rồi bật Pages.
- Netlify: kéo thả `public/` hoặc file zip deploy vào Netlify Drop để có domain `*.netlify.app`.
- Cloudflare Pages: kết nối repo để có domain `*.pages.dev`.

Xem hướng dẫn từng bước trong `DEPLOY.md`.

## Ranh giới nội dung

Trang này không sao chép nguyên văn tài liệu có bản quyền và không lưu thông tin đăng nhập. WHO Classification of Tumours Online có phần yêu cầu tài khoản, vì vậy website chỉ dẫn link và tóm tắt bằng lời mới để phục vụ học tập cá nhân.
