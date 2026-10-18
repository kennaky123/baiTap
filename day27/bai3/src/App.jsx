import { useState, useEffect, useRef } from 'react';

export default function App() {
  // 5. useRef: đếm và hiển thị số lần component đã render (không dùng state)
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // 5. useRef: tự động focus ô tìm kiếm khi trang vừa tải
  const searchInputRef = useRef(null);

  // State danh sách người dùng, trạng thái tải và lỗi
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userError, setUserError] = useState(null);

  // Cờ thử nghiệm URL sai để kiểm tra thông báo lỗi
  const [isBrokenUrl, setIsBrokenUrl] = useState(false);

  // State cho input và từ khóa sau khi debounce 500ms
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // State cho người dùng được chọn và danh sách bài viết
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postError, setPostError] = useState(null);

  // Tự động focus ô tìm kiếm khi component mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // 1 & 2. useEffect: Gọi API danh sách người dùng khi mount (hoặc khi bật tắt URL lỗi để test)
  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setUserError(null);
      try {
        const url = isBrokenUrl
          ? 'https://jsonplaceholder.typicode.com/users-wrong-url-to-test-error'
          : 'https://jsonplaceholder.typicode.com/users';

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Lỗi HTTP ${res.status}: Không thể lấy dữ liệu danh sách người dùng.`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setUserError(err.message || 'Đã xảy ra lỗi khi gọi API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingUsers(false);
        }
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [isBrokenUrl]);

  // 3. useEffect: Debounce 500ms cho ô tìm kiếm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup: hủy timer nếu người dùng tiếp tục gõ trong vòng 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // 4. useEffect: Gọi API lấy bài viết khi người dùng được chọn (có AbortController chống race condition)
  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setPostError(null);
      return;
    }

    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      setPostError(null);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selectedUser.id}/posts`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`Lỗi HTTP ${res.status}: Không thể tải bài viết.`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        // Bỏ qua lỗi nếu do bị abort khi chuyển nhanh người dùng
        if (err.name !== 'AbortError') {
          setPostError(err.message || 'Lỗi khi tải bài viết.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingPosts(false);
        }
      }
    };

    fetchPosts();

    // Cleanup: hủy request cũ ngay lập tức nếu chọn người dùng khác trước khi request kịp hoàn tất
    return () => {
      controller.abort();
    };
  }, [selectedUser]);

  // Lọc danh sách người dùng theo debouncedSearchTerm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase().trim())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Bài 3: Tìm kiếm người dùng qua API</h2>
        <p style={styles.desc}>
          Trọng tâm: <code>useEffect</code> (gọi API, xử lý loading/error, debounce 500ms, AbortController
          chống race condition), <code>useRef</code> (đếm lượt render, auto-focus).
        </p>

        {/* Đếm số lần render bằng useRef */}
        <div style={styles.renderBadge}>
          ⚡ Số lần component đã Render (useRef): <strong>{renderCountRef.current}</strong>
        </div>

        {/* Thanh tìm kiếm & Nút test lỗi */}
        <div style={styles.searchRow}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="🔍 Tìm người dùng theo tên (Debounce 500ms)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          <button
            onClick={() => setIsBrokenUrl((prev) => !prev)}
            style={isBrokenUrl ? styles.btnTestErrorActive : styles.btnTestError}
            title="Bấm để thử trạng thái khi API trả về lỗi"
          >
            {isBrokenUrl ? 'Đang bật URL lỗi (Bấm để sửa lại)' : 'Thử URL lỗi (Test Error)'}
          </button>
        </div>

        {/* Trạng thái debounce */}
        <div style={styles.debounceStatus}>
          {searchTerm !== debouncedSearchTerm ? (
            <span style={{ color: '#d97706' }}>⏳ Đang chờ bạn ngừng gõ (500ms)...</span>
          ) : debouncedSearchTerm ? (
            <span>
              Kết quả lọc cho: "<strong>{debouncedSearchTerm}</strong>" ({filteredUsers.length} người)
            </span>
          ) : (
            <span>Hiển thị tất cả ({filteredUsers.length} người)</span>
          )}
        </div>

        <div style={styles.layout}>
          {/* Cột danh sách user */}
          <div style={styles.leftCol}>
            <h3 style={styles.colTitle}>Danh sách người dùng</h3>

            {isLoadingUsers && <div style={styles.loadingBox}>⏳ Đang tải dữ liệu người dùng...</div>}

            {userError && (
              <div style={styles.errorBox}>
                ❌ <strong>Lỗi:</strong> {userError}
              </div>
            )}

            {!isLoadingUsers && !userError && (
              <ul style={styles.userList}>
                {filteredUsers.length === 0 ? (
                  <li style={styles.emptyBox}>Không tìm thấy người dùng phù hợp.</li>
                ) : (
                  filteredUsers.map((user) => {
                    const isSelected = selectedUser?.id === user.id;
                    return (
                      <li
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        style={{
                          ...styles.userCard,
                          borderColor: isSelected ? '#0284c7' : '#e2e8f0',
                          backgroundColor: isSelected ? '#f0f9ff' : '#f8fafc',
                        }}
                      >
                        <div style={styles.userName}>{user.name}</div>
                        <div style={styles.userDetail}>📧 {user.email}</div>
                        <div style={styles.userDetail}>🏢 {user.company?.name}</div>
                        <div style={styles.hintText}>
                          {isSelected ? '👉 Đang xem bài viết' : '👉 Nhấp để xem bài viết'}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            )}
          </div>

          {/* Cột bài viết của user */}
          <div style={styles.rightCol}>
            <h3 style={styles.colTitle}>
              {selectedUser ? `Bài viết của: ${selectedUser.name}` : 'Chi tiết bài viết'}
            </h3>

            {!selectedUser ? (
              <div style={styles.placeholderBox}>
                👈 Vui lòng chọn một người dùng ở danh sách bên trái để xem bài viết.
              </div>
            ) : (
              <>
                {isLoadingPosts && (
                  <div style={styles.loadingBox}>⏳ Đang tải bài viết của {selectedUser.name}...</div>
                )}

                {postError && (
                  <div style={styles.errorBox}>
                    ❌ <strong>Lỗi:</strong> {postError}
                  </div>
                )}

                {!isLoadingPosts && !postError && (
                  <div style={styles.postsList}>
                    {posts.length === 0 ? (
                      <div style={styles.emptyBox}>Người dùng này chưa có bài viết nào.</div>
                    ) : (
                      posts.map((post) => (
                        <div key={post.id} style={styles.postCard}>
                          <h4 style={styles.postTitle}>{post.title}</h4>
                          <p style={styles.postBody}>{post.body}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
    maxWidth: '960px',
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
    margin: '0 0 16px 0',
  },
  renderBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '4px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '1px solid #fde68a',
  },
  searchRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '240px',
    padding: '9px 12px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    outline: 'none',
  },
  btnTestError: {
    padding: '8px 14px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '13px',
  },
  btnTestErrorActive: {
    padding: '8px 14px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fca5a5',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  debounceStatus: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '16px',
  },
  layout: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  leftCol: {
    flex: 1,
    minWidth: '280px',
    maxHeight: '480px',
    overflowY: 'auto',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '12px',
  },
  rightCol: {
    flex: 1.3,
    minWidth: '300px',
    maxHeight: '480px',
    overflowY: 'auto',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '12px',
  },
  colTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    color: '#0f172a',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '6px',
  },
  userList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  userCard: {
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  userName: {
    fontWeight: 'bold',
    color: '#0f172a',
    fontSize: '15px',
  },
  userDetail: {
    fontSize: '13px',
    color: '#475569',
    marginTop: '3px',
  },
  hintText: {
    fontSize: '11px',
    color: '#0284c7',
    marginTop: '6px',
    fontWeight: 500,
  },
  loadingBox: {
    padding: '24px',
    textAlign: 'center',
    color: '#64748b',
    fontSize: '14px',
  },
  errorBox: {
    padding: '12px',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    borderRadius: '4px',
    border: '1px solid #fecaca',
    fontSize: '14px',
    margin: '8px 0',
  },
  placeholderBox: {
    padding: '40px 20px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  postCard: {
    padding: '10px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    backgroundColor: '#fafafa',
  },
  postTitle: {
    margin: '0 0 6px 0',
    fontSize: '14px',
    textTransform: 'capitalize',
    color: '#0f172a',
  },
  postBody: {
    margin: 0,
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.45',
  },
  emptyBox: {
    padding: '20px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '14px',
  },
};
