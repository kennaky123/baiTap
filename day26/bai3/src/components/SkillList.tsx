type SkillListProps = {
  skills: string[];
};

export default function SkillList({ skills }: SkillListProps) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Kỹ năng</h3>
      {skills.length === 0 ? (
        <p style={styles.emptyText}>Chưa có kỹ năng</p>
      ) : (
        <ul style={styles.list}>
          {skills.map((skill: string, index: number) => (
            <li key={`${skill}-${index}`} style={styles.badge}>
              {skill}
            </li>
          ))}
        </ul>
      )}
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
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  badge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid #bae6fd',
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic',
    margin: 0,
  },
};
