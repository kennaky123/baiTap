type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
    </header>
  );
}

const styles = {
  header: {
    textAlign: 'center' as const,
    marginBottom: '24px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '16px',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    color: '#0f172a',
  },
};
