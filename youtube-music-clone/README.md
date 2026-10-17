# YouTube Music Clone

Phát triển tiếp cấu trúc JavaScript thuần có sẵn: Vite, Tailwind CSS 4 và Navigo 8. Không sử dụng React/Vue.

## Chạy dự án

```sh
npm install
npm run dev
```

`npm run build` tạo bản production trong `dist`; `npm run preview` xem bản build.

API mặc định: https://youtube-music.f8team.dev/api. Có thể đặt `VITE_API_URL` trong `.env.local`.

## Chức năng

- Trang chủ, lọc tâm trạng, các hàng album/playlist cuộn ngang.
- Khám phá, bản phát hành mới, bảng xếp hạng theo quốc gia, thể loại và dòng nhạc.
- Chi tiết album/playlist, tìm kiếm có gợi ý và phân trang.
- Phát MP3: tạm dừng, trước/sau, tua, âm lượng, tắt tiếng, trộn bài, lặp bài và hàng đợi.
- Nhạc tiếp tục phát khi chuyển trang; hàng đợi chỉ thay đổi khi người dùng chọn phát danh sách khác.
- Video qua YouTube embed khi API cung cấp videoId.
- Đăng nhập/đăng ký/đăng xuất, tự làm mới token.
- Bài yêu thích và lịch sử nghe lưu trên trình duyệt; gợi ý cá nhân lấy từ API khi đăng nhập.
- Responsive, điều hướng bàn phím, trạng thái tải/lỗi/thử lại. Phím Space phát/tạm dừng ngoài ô nhập liệu.

## Cấu trúc

`src/components`: thành phần HTML; `src/pages`: trang; `src/services`: API; `src/router`: Navigo; `src/store/playerStore.js`: trình phát độc lập trang; `src/utils`: chuẩn hóa dữ liệu và escape HTML; `src/styles`: Tailwind cùng style bố cục.

Dữ liệu API là dữ liệu mẫu: ảnh Picsum, một số nguồn nhạc SoundHelix. Khả năng phát phụ thuộc máy chủ nguồn; ứng dụng thông báo lỗi nếu nguồn không khả dụng. Yêu thích/lịch sử cục bộ thuộc thiết bị, không đồng bộ tài khoản.

## Kiểm tra

```sh
npm run build
npm test
```

Bộ kiểm tra dùng Playwright với Microsoft Edge cài trên máy. Có thể đổi channel trong `playwright.config.js` nếu dùng trình duyệt khác.

