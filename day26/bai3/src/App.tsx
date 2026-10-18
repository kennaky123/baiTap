import { useState } from 'react';
import type { Student } from './types';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import SkillList from './components/SkillList';
import LikeButton from './components/LikeButton';

export default function App() {
  // 1. string: Tiêu đề trang
  const title: string = 'Hồ sơ sinh viên';

  // 2. number: Quản lý số lượt thích
  const [likes, setLikes] = useState<number>(0);

  // 3. object: Thông tin sinh viên (dùng type Student)
  const student: Student = {
    name: 'Nguyễn Văn An',
    age: 20,
    className: 'WEB-K12',
  };

  // 4. array: Danh sách kỹ năng
  const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'React'];

  // 5. function: Hàm tăng số lượt thích
  const handleLike = (): void => setLikes(likes + 1);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Component 1: nhận prop kiểu string */}
        <Header title={title} />

        {/* Component 2: nhận prop kiểu object (Student) */}
        <StudentCard student={student} />

        {/* Component 3: nhận prop kiểu array (string[]) */}
        <SkillList skills={skills} />

        {/* Component 4: nhận prop kiểu number và function */}
        <LikeButton likes={likes} onLike={handleLike} />
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
    backgroundColor: '#f1f5f9',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
};
