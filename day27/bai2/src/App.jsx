import { useState } from 'react';
import Stopwatch from './Stopwatch';

export default function App() {
  const [showStopwatch, setShowStopwatch] = useState(true);

  return (
    <div style={styles.page}>
      <div style={styles.outerContainer}>
        {/* Nút kiểm tra Unmount Cleanup của useEffect */}
        <div style={styles.unmountBar}>
          <span style={{ fontWeight: 500 }}>Kiểm tra unmount: </span>
          <button
            onClick={() => setShowStopwatch((prev) => !prev)}
            style={showStopwatch ? styles.btnHide : styles.btnShow}
          >
            {showStopwatch ? 'Ẩn Stopwatch (Unmount)' : 'Hiện lại Stopwatch (Mount)'}
          </button>
          <p style={styles.unmountHint}>
            💡 Bấm "Bắt đầu" cho đồng hồ chạy, rồi bấm nút "Ẩn Stopwatch" ở trên. Mở DevTools (F12) tab Console:
            bạn sẽ thấy thông báo dọn dẹp interval từ hàm cleanup của <code>useEffect</code>.
          </p>
        </div>

        {showStopwatch ? (
          <Stopwatch />
        ) : (
          <div style={styles.unmountedBox}>
            ⚠️ Component Stopwatch đã được tháo gỡ khỏi DOM (Unmounted).<br />
            Hàm cleanup trong <code>useEffect</code> đã chạy và dọn dẹp <code>setInterval</code>.
          </div>
        )}
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
  outerContainer: {
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  unmountBar: {
    padding: '14px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  },
  btnHide: {
    padding: '6px 14px',
    backgroundColor: '#f97316',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  btnShow: {
    padding: '6px 14px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginLeft: '8px',
  },
  unmountHint: {
    margin: '10px 0 0 0',
    fontSize: '12px',
    color: '#64748b',
    lineHeight: '1.4',
  },
  unmountedBox: {
    padding: '30px 20px',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    color: '#b45309',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '1.6',
  },
};
