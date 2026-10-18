import { useState, useRef, useEffect } from 'react';

// Hàm định dạng mm:ss:ms (ms hiển thị 2 chữ số từ 00 -> 99)
function formatTime(timeInMs) {
  const minutes = Math.floor(timeInMs / 60000);
  const seconds = Math.floor((timeInMs % 60000) / 1000);
  const milliseconds = Math.floor((timeInMs % 1000) / 10);

  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

export default function Stopwatch() {
  // State lưu tổng thời gian đã trôi qua tính theo mili-giây
  const [time, setTime] = useState(0);

  // State theo dõi trạng thái đang chạy
  const [isRunning, setIsRunning] = useState(false);

  // State lưu danh sách các vòng (lap)
  const [laps, setLaps] = useState([]);

  // useRef lưu interval ID để có thể dừng nó mà không kích hoạt re-render
  const timerIdRef = useRef(null);

  // useRef lưu mốc thời gian bắt đầu (Date.now()) để tính hiệu số chuẩn xác thay vì cộng dồn 10ms
  const startTimeRef = useRef(0);

  // 5. useEffect cleanup: khi component bị unmount, interval PHẢI được dọn dẹp
  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
        console.log('Stopwatch unmounted: đã xóa setInterval dọn dẹp bộ nhớ!');
      }
    };
  }, []);

  // Bắt đầu / Tiếp tục chạy đồng hồ
  const handleStart = () => {
    // 4. useRef kiểm tra: nếu interval đã tồn tại thì return ngay,
    // ngăn người dùng bấm "Bắt đầu" liên tiếp tạo thêm nhiều interval
    if (timerIdRef.current !== null) return;

    setIsRunning(true);

    // Tính mốc thời gian: Date.now() trừ đi thời gian đã tích lũy trước đó
    startTimeRef.current = Date.now() - time;

    timerIdRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  // Tạm dừng đồng hồ
  const handlePause = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
  };

  // Đặt lại (Reset)
  const handleReset = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    startTimeRef.current = 0;
  };

  // Nút "Vòng" (Lap): lưu lại thời điểm hiện tại, vòng mới nhất ở trên cùng
  const handleLap = () => {
    setLaps((prevLaps) => [time, ...prevLaps]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bài 2: Đồng hồ bấm giờ Stopwatch</h2>
      <p style={styles.desc}>
        Trọng tâm: <code>useRef</code> (lưu interval ID và mốc thời gian, chống bấm lặp tạo thêm interval),{' '}
        <code>useEffect</code> (dọn dẹp interval khi unmount).
      </p>

      {/* Hiển thị mm:ss:ms */}
      <div style={styles.timeDisplay}>{formatTime(time)}</div>

      {/* Các nút điều khiển */}
      <div style={styles.buttonGroup}>
        {!isRunning ? (
          time === 0 ? (
            <button onClick={handleStart} style={styles.btnStart}>
              Bắt đầu
            </button>
          ) : (
            <button onClick={handleStart} style={styles.btnResume}>
              Tiếp tục
            </button>
          )
        ) : (
          <button onClick={handlePause} style={styles.btnPause}>
            Tạm dừng
          </button>
        )}

        <button
          onClick={handleLap}
          disabled={time === 0}
          style={time === 0 ? styles.btnDisabled : styles.btnLap}
        >
          Vòng (Lap)
        </button>

        <button
          onClick={handleReset}
          disabled={time === 0 && !isRunning}
          style={time === 0 && !isRunning ? styles.btnDisabled : styles.btnReset}
        >
          Đặt lại
        </button>
      </div>

      {/* Danh sách các vòng Lap */}
      {laps.length > 0 && (
        <div style={styles.lapsSection}>
          <h4 style={styles.lapsTitle}>Danh sách các vòng (mới nhất ở trên cùng):</h4>
          <ul style={styles.lapsList}>
            {laps.map((lapTime, idx) => {
              const lapIndex = laps.length - idx;
              return (
                <li key={lapIndex} style={styles.lapItem}>
                  <span>Vòng {lapIndex}</span>
                  <span style={styles.lapTime}>{formatTime(lapTime)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '560px',
    padding: '24px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
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
    textAlign: 'left',
  },
  timeDisplay: {
    fontSize: '52px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#0f172a',
    margin: '20px 0',
    letterSpacing: '2px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  btnStart: {
    padding: '10px 20px',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  btnResume: {
    padding: '10px 20px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  btnPause: {
    padding: '10px 20px',
    backgroundColor: '#eab308',
    color: '#1e293b',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  btnLap: {
    padding: '10px 20px',
    backgroundColor: '#64748b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
  },
  btnReset: {
    padding: '10px 20px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
  },
  btnDisabled: {
    padding: '10px 20px',
    backgroundColor: '#e2e8f0',
    color: '#94a3b8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '15px',
  },
  lapsSection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '12px',
    textAlign: 'left',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  lapsTitle: {
    margin: '8px 0 10px 0',
    fontSize: '14px',
    color: '#334155',
  },
  lapsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  lapItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 8px',
    borderBottom: '1px solid #f8fafc',
    fontSize: '14px',
  },
  lapTime: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
};

