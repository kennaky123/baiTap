import { useState, useEffect, useRef } from 'react';

export default function App() {
  // 1. Quản lý danh sách todos dạng mảng chứa các object { id, text, done }
  const [todos, setTodos] = useState([
    { id: '1', text: 'Học cú pháp cơ bản của React', done: true },
    { id: '2', text: 'Nắm vững useState và tính bất biến (immutable)', done: false },
    { id: '3', text: 'Thực hành useEffect và useRef', done: false },
  ]);

  // State cho controlled input
  const [inputText, setInputText] = useState('');

  // State cho bộ lọc: 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all');

  // 4. useRef: tham chiếu tới ô input để tự động focus lại sau khi thêm
  const inputRef = useRef(null);

  // 5. useEffect: hiển thị số việc chưa hoàn thành lên document.title
  const activeCount = todos.filter((todo) => !todo.done).length;

  useEffect(() => {
    document.title = `(${activeCount}) việc cần làm - Todo List`;
  }, [activeCount]);

  // Xử lý thêm công việc mới
  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmedText = inputText.trim();

    // Không cho thêm nếu chuỗi rỗng hoặc chỉ có khoảng trắng
    if (!trimmedText) return;

    // Cập nhật state bất biến (immutable) bằng spread operator, tạo id duy nhất
    const newTodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: trimmedText,
      done: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Xóa trống ô input và focus lại thông qua ref
    setInputText('');
    inputRef.current?.focus();
  };

  // Đánh dấu hoàn thành / chưa hoàn thành (dùng map tạo mảng mới, không mutate)
  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Xóa công việc (dùng filter tạo mảng mới, không mutate)
  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 3. Danh sách đã lọc: TÍNH TOÁN TRỰC TIẾP từ state, không tạo thêm state riêng!
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true; // 'all'
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Bài 1: Todo List Mini</h2>
        <p style={styles.desc}>
          Trọng tâm: <code>useState</code> (immutable update, controlled input),{' '}
          <code>useRef</code> (focus input), <code>useEffect</code> (title tab: (
          {activeCount}) việc cần làm).
        </p>

        {/* Form thêm todo (hỗ trợ cả click nút Thêm và nhấn Enter) */}
        <form onSubmit={handleAddTodo} style={styles.form}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Nhập công việc cần làm..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.btnPrimary}>
            Thêm
          </button>
        </form>

        {/* 3 nút bộ lọc */}
        <div style={styles.filterGroup}>
          <span style={{ fontWeight: 500 }}>Bộ lọc: </span>
          <button
            style={filter === 'all' ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setFilter('all')}
          >
            Tất cả ({todos.length})
          </button>
          <button
            style={filter === 'active' ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setFilter('active')}
          >
            Đang làm ({todos.filter((t) => !t.done).length})
          </button>
          <button
            style={
              filter === 'completed'
                ? styles.filterBtnActive
                : styles.filterBtn
            }
            onClick={() => setFilter('completed')}
          >
            Đã xong ({todos.filter((t) => t.done).length})
          </button>
        </div>

        {/* Danh sách todo */}
        <ul style={styles.list}>
          {filteredTodos.length === 0 ? (
            <li style={styles.emptyText}>Không có công việc nào trong danh sách.</li>
          ) : (
            filteredTodos.map((todo) => (
              <li key={todo.id} style={styles.listItem}>
                <label style={styles.todoLabel}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span
                    style={{
                      marginLeft: '10px',
                      textDecoration: todo.done ? 'line-through' : 'none',
                      color: todo.done ? '#94a3b8' : '#1e293b',
                    }}
                  >
                    {todo.text}
                  </span>
                </label>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.btnDanger}
                  title="Xóa công việc"
                >
                  Xóa
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f1f5f9',
  },
  container: {
    width: '100%',
    maxWidth: '560px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '22px',
    color: '#0f172a',
  },
  desc: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
    margin: '0 0 20px 0',
  },
  form: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  input: {
    flex: 1,
    padding: '9px 12px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    outline: 'none',
  },
  btnPrimary: {
    padding: '9px 18px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '6px 12px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    color: '#475569',
  },
  filterBtnActive: {
    padding: '6px 12px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: '1px solid #0284c7',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 8px',
    borderBottom: '1px solid #f1f5f9',
  },
  todoLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: 1,
  },
  btnDanger: {
    padding: '5px 12px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '24px 0',
  },
};
