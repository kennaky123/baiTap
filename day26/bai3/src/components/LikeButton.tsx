type LikeButtonProps = {
  likes: number;
  onLike: () => void;
};

export default function LikeButton({ likes, onLike }: LikeButtonProps) {
  return (
    <div style={styles.container}>
      <button onClick={onLike} style={styles.button}>
        👍 Thích ({likes})
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '12px',
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
  },
};
