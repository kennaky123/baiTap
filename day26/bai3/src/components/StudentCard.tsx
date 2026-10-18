import type { Student } from '../types';

type StudentCardProps = {
  student: Student;
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Thông tin cá nhân</h3>
      <div style={styles.infoRow}>
        <span style={styles.label}>Họ và tên:</span>
        <span style={styles.value}>{student.name}</span>
      </div>
      <div style={styles.infoRow}>
        <span style={styles.label}>Tuổi:</span>
        <span style={styles.value}>{student.age}</span>
      </div>
      <div style={styles.infoRow}>
        <span style={styles.label}>Lớp:</span>
        <span style={styles.value}>{student.className}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
  },
  cardTitle: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#1e293b',
    borderBottom: '1px solid #f1f5f9',
    paddingBottom: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #f1f5f9',
    fontSize: '15px',
  },
  label: {
    color: '#64748b',
    fontWeight: 500,
  },
  value: {
    color: '#0f172a',
    fontWeight: 600,
  },
};
