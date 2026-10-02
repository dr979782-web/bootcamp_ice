import styles from './SwipeDots.module.css';

/** 스와이프 카드 위치 표시 + 해당 카드로 이동 */
export default function SwipeDots({ labels, active, onSelect }) {
  return (
    <div className={styles.dots}>
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          className={`${styles.dot} ${i === active ? styles.active : ''}`}
          aria-label={`${i + 1}번째 카드: ${label}`}
          aria-current={i === active ? 'true' : undefined}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
