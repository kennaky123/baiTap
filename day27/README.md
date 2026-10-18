# Day 27 - React Hooks: useState, useRef, useEffect

Thư mục `day27` được chia thành từng thư mục con tương ứng với từng bài tập:

```
day27/
├── bai1/   # Bài 1: Todo List mini (trọng tâm useState)
├── bai2/   # Bài 2: Đồng hồ bấm giờ Stopwatch (trọng tâm useRef)
└── bai3/   # Bài 3: Tìm kiếm người dùng qua API (trọng tâm useEffect)
```

---

## 🚀 Hướng dẫn chạy từng bài

Mỗi bài là một ứng dụng React độc lập sử dụng Vite:

### 1. Bài 1: Todo List mini
```bash
cd bai1
npm run dev
```

### 2. Bài 2: Đồng hồ bấm giờ Stopwatch
```bash
cd bai2
npm run dev
```

### 3. Bài 3: Tìm kiếm người dùng qua API
```bash
cd bai3
npm run dev
```

---

## 📌 Tóm tắt kiến thức cốt lõi

### Bài 1: `bai1` (Trọng tâm: `useState`)
- **Quản lý state mảng/object bất biến (Immutable):**
  - Thêm todo: `setTodos(prev => [...prev, newTodo])`.
  - Toggle hoàn thành: `setTodos(prev => prev.map(...))`.
  - Xóa todo: `setTodos(prev => prev.filter(...))`.
- **Dùng key bằng id:** Dùng `crypto.randomUUID()` hoặc `Date.now()`, không dùng index làm key.
- **Không tạo state thừa:** Danh sách sau khi lọc được tính trực tiếp `const filteredTodos = todos.filter(...)`.
- **`useRef`:** Tự động xóa trống và focus lại ô input (`inputRef.current?.focus()`).
- **`useEffect`:** Tự động đồng bộ `document.title` thành `(X) việc cần làm`.

### Bài 2: `bai2` (Trọng tâm: `useRef`)
- **Hiển thị thời gian:** Chuẩn `mm:ss:ms` (ms làm tròn 2 chữ số 00 - 99).
- **Lưu interval ID và timestamp bằng `useRef`:**
  - `timerIdRef = useRef(null)`: lưu ID của `setInterval` mà không gây re-render lại component.
  - `startTimeRef = useRef(0)`: lưu mốc `Date.now() - accumulatedTime` để tính hiệu số thời gian chuẩn xác, tránh sai số do cộng dồn 10ms.
  - **Chống click lặp:** Kiểm tra `if (timerIdRef.current !== null) return;` trước khi bắt đầu.
- **Tính năng Vòng (Lap):** Lưu danh sách vòng mới nhất ở trên cùng `setLaps(prev => [time, ...prev])`.
- **Cleanup khi unmount:** Trong `useEffect`, trả về hàm cleanup `clearInterval(timerIdRef.current)`. Ở giao diện có nút toggle Ẩn/Hiện để dễ dàng kiểm chứng qua Console.

### Bài 3: `bai3` (Trọng tâm: `useEffect`)
- **Gọi API trong `useEffect`:**
  - Khai báo hàm async bên trong `useEffect` rồi gọi hàm.
  - Quản lý trạng thái loading và error đầy đủ (kèm nút "Thử URL lỗi" để test giao diện khi lỗi).
- **Debounce 500ms:** Dùng `setTimeout` và trả về `clearTimeout` trong cleanup của `useEffect` để chỉ lọc sau khi ngừng gõ 500ms.
- **Chống Race Condition bằng `AbortController`:** Khi bấm chuyển nhanh giữa nhiều user, `controller.abort()` trong cleanup sẽ hủy request cũ, tránh hiển thị sai lệch bài viết.
- **`useRef`:**
  - Đếm và hiển thị số lần component render (`renderCountRef.current += 1`).
  - Tự động focus ô tìm kiếm khi component vừa mount (`searchInputRef.current?.focus()`).

