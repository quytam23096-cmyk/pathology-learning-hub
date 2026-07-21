# Deploy miễn phí

Source code đã sẵn sàng để đưa lên internet bằng hosting tĩnh miễn phí.

## Vercel từ GitHub

1. Đưa các file `index.html`, `styles.css`, `app.js`, `who-catalog.js`, `README.md`, `DEPLOY.md` và thư mục `scripts` lên repository GitHub.
2. Mở https://vercel.com/new và import repository đó.
3. Framework Preset: chọn `Other`.
4. Build Command: để trống.
5. Output Directory: để trống hoặc đặt `.` nếu Vercel hỏi rõ thư mục xuất bản.
6. Bấm `Deploy`.
7. Vào `Project Settings` -> `Domains` để đổi tên miền phụ miễn phí dạng `ten-ban-chon.vercel.app`.

## GitHub Pages

1. Vào repository GitHub.
2. Mở `Settings` -> `Pages`.
3. Chọn `Deploy from a branch`.
4. Chọn branch `main`, folder `/root`, rồi bấm `Save`.
5. Website sẽ có URL dạng `https://username.github.io/pathology-learning-hub/`.

## Netlify Drop

1. Mở https://app.netlify.com/drop
2. Kéo thả thư mục chứa các file tĩnh hoặc file zip deploy.
3. Netlify tạo URL dạng `https://ten-site.netlify.app`.
4. Vào `Site configuration` -> `Change site name` để đổi tên miền phụ miễn phí.

## Ghi chú quan trọng

- Đây là website tĩnh, không cần server/backend.
- Tính năng đổi ảnh và Atlas Studio tự thêm thẻ đang lưu trên trình duyệt của người dùng.
- Muốn ảnh/thẻ tự thêm hiển thị cho mọi người, hãy xuất JSON hoặc đưa dữ liệu vào `app.js` rồi push lại GitHub.
- Không đưa file dữ liệu nội bộ, tài khoản đăng nhập, hoặc bệnh án lên repository public.
