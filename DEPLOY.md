# Deploy miễn phí

Source code đã sẵn sàng để đưa lên internet bằng hosting tĩnh miễn phí.

Quan trọng: hãy deploy thư mục `public/` hoặc file `pathology-learning-hub-public.zip`, không upload toàn bộ thư mục làm việc cũ vì folder gốc có thể còn dữ liệu nội bộ từ app registry trước đây. Bản web này là atlas ảnh học tập, không chứa Excel, tài khoản WHO/IARC hoặc dữ liệu bệnh án.

## Vercel từ GitHub

1. Upload các file `index.html`, `styles.css`, `app.js`, `README.md`, `DEPLOY.md` lên repository GitHub.
2. Mở https://vercel.com/new và import repository đó.
3. Framework Preset: chọn `Other`.
4. Build Command: để trống.
5. Output Directory: để trống hoặc đặt `.` nếu Vercel hỏi rõ thư mục xuất bản.
6. Bấm `Deploy`.
7. Vào `Project Settings` -> `Domains` để đổi tên miền phụ miễn phí dạng `ten-ban-chon.vercel.app`.

## Cách nhanh nhất: Netlify Drop

1. Mở https://app.netlify.com/drop
2. Đăng nhập hoặc tạo tài khoản miễn phí.
3. Kéo thả thư mục `public/` hoặc file `pathology-learning-hub-public.zip` vào trang đó.
4. Netlify sẽ tạo URL dạng `https://ten-site.netlify.app`.
5. Vào `Site configuration` -> `Change site name` để đổi tên miền phụ miễn phí.

## Cách bền vững: GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ `pathology-learning-hub`.
2. Upload các file bên trong thư mục `public/` lên repository.
3. Vào `Settings` -> `Pages`.
4. Chọn `Deploy from a branch`.
5. Chọn branch `main`, folder `/root`, rồi bấm `Save`.
6. Website sẽ có URL dạng `https://username.github.io/pathology-learning-hub/`.

## Cloudflare Pages

1. Tạo project mới tại https://pages.cloudflare.com/
2. Kết nối repository chứa source code sạch.
3. Framework preset: `None`.
4. Build command: để trống.
5. Output directory: `public` nếu repo là thư mục làm việc đầy đủ, hoặc `.` nếu repo chỉ chứa nội dung trong `public/`.
6. Website sẽ có URL dạng `https://ten-site.pages.dev`.

## Ghi chú

- Đây là website tĩnh, không cần server/backend.
- Không có dữ liệu đăng nhập WHO/IARC trong source.
- Các link nguồn mở ra trang gốc, nội dung trong site là bản học tập được biên soạn lại.
