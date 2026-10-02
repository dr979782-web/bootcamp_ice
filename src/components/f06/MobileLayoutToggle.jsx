import styles from './MobileLayoutToggle.module.css';

const OPTIONS = [
  { value: 'swipe', label: '스와이프' },
  { value: 'stack', label: '세로 나열' },
];

/** 모바일 전용: 스와이프 카드 ↔ 세로 나열 전환 (데스크탑에서는 CSS로 숨김) */
export default function MobileLayoutToggle({ value, onChange }) {
  return (
    <div className={styles.toggle} role="radiogroup" aria-label="모바일 보기 방식">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={`${styles.option} ${value === o.value ? styles.active : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
