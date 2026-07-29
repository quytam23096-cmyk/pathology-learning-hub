# Deploy miễn phí

Source code dùng Vercel Functions và Routing Middleware để yêu cầu đăng nhập trước khi mở Atlas hoặc HMMD Search.

## Cấu hình đăng nhập an toàn

Không ghi email, mật khẩu hoặc khóa phiên thật vào GitHub. Trước khi deploy, tạo ba biến môi trường trong Vercel tại `Project Settings` -> `Environment Variables`:

- `ATLAS_AUTH_EMAIL`: email được phép đăng nhập.
- `ATLAS_AUTH_PASSWORD_HASH`: chuỗi băm PBKDF2-SHA256 của mật khẩu, không phải mật khẩu thuần.
- `ATLAS_SESSION_SECRET`: khóa ngẫu nhiên dài ít nhất 32 byte để ký cookie phiên.

Áp dụng biến cho `Production`, `Preview` và `Development` nếu cần. Sau khi thêm hoặc đổi biến môi trường, redeploy dự án để bản triển khai mới nhận cấu hình.

## Vercel từ GitHub

1. Đưa các file `index.html`, `styles.css`, `app.js`, `who-catalog.js`, `README.md`, `DEPLOY.md` và thư mục `scripts` lên repository GitHub.
2. Mở https://vercel.com/new và import repository đó.
3. Framework Preset: chọn `Other`.
4. Build Command: để trống.
5. Output Directory: để trống hoặc đặt `.` nếu Vercel hỏi rõ thư mục xuất bản.
6. Bấm `Deploy`.
7. Vào `Project Settings` -> `Domains` để đổi tên miền phụ miễn phí dạng `ten-ban-chon.vercel.app`.

## GitHub Pages

GitHub Pages chỉ phục vụ tệp tĩnh nên không chạy được lớp đăng nhập phía máy chủ của dự án này. Chỉ dùng GitHub để lưu source code; dùng Vercel để xuất bản website có bảo vệ.

1. Vào repository GitHub.
2. Mở `Settings` -> `Pages`.
3. Chọn `Deploy from a branch`.
4. Chọn branch `main`, folder `/root`, rồi bấm `Save`.
5. Website sẽ có URL dạng `https://username.github.io/pathology-learning-hub/`.

## Netlify Drop

Netlify Drop tĩnh không chạy trực tiếp Vercel Functions và Routing Middleware. Muốn chuyển nhà cung cấp cần viết lại lớp xác thực bằng Functions/Middleware tương đương.

1. Mở https://app.netlify.com/drop
2. Kéo thả thư mục chứa các file tĩnh hoặc file zip deploy.
3. Netlify tạo URL dạng `https://ten-site.netlify.app`.
4. Vào `Site configuration` -> `Change site name` để đổi tên miền phụ miễn phí.

## Ghi chú quan trọng

- Phần atlas vẫn là tệp tĩnh, nhưng đăng nhập dùng Vercel Function và Routing Middleware phía máy chủ.
- Tính năng đổi ảnh và Atlas Studio tự thêm thẻ đang lưu trên trình duyệt của người dùng.
- Muốn ảnh/thẻ tự thêm hiển thị cho mọi người, hãy xuất JSON hoặc đưa dữ liệu vào `app.js` rồi push lại GitHub.
- Không đưa file dữ liệu nội bộ, tài khoản đăng nhập, mật khẩu, khóa phiên hoặc bệnh án lên repository public.
