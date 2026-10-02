import Icon from './Icon.jsx';
import useCompareSlider from '../../hooks/useCompareSlider.js';
import useLoadedImage from '../../hooks/useLoadedImage.js';
import styles from './CompareSlider.module.css';

/**
 * 두 이미지를 겹쳐 놓고 가운데 핸들로 비교하는 범용 컴포넌트
 * 두 이미지는 크기·투영이 같아야 합니다.
 *
 * @param {{src: string|null, label: string, alt: string}} left   왼쪽(이전) 이미지
 * @param {{src: string|null, label: string, alt: string}} right  오른쪽(이후) 이미지
 * @param {number} aspectRatio  이미지 비율 (가로/세로)
 * @param {string} emptyText    이미지가 없을 때 문구
 */
export default function CompareSlider({
  left,
  right,
  aspectRatio = 986 / 1223,
  initial = 50,
  emptyText = '이 달의 자료가 없습니다',
}) {
  const { ref, position, setPosition, dragging, containerProps, handleProps } = useCompareSlider(initial);
  const L = useLoadedImage(left.src);
  const R = useLoadedImage(right.src);

  const pct = Math.round(position);

  return (
    <div className={styles.wrap}>
      <div
        ref={ref}
        className={`${styles.stage} ${dragging ? styles.dragging : ''}`}
        style={{ aspectRatio }}
        {...containerProps}
      >
        {/* 오른쪽(아래층): 전체 */}
        <Layer shown={R.shown} alt={right.alt} emptyText={emptyText} label={right.label} />

        {/* 왼쪽(위층): 핸들 위치까지만 보이도록 잘라냄 */}
        <div className={styles.clip} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Layer shown={L.shown} alt={left.alt} emptyText={emptyText} label={left.label} />
        </div>

        <span className={`${styles.tag} ${styles.tagLeft}`}>{left.label}</span>
        <span className={`${styles.tag} ${styles.tagRight}`}>{right.label}</span>

        {(L.loading || R.loading) && <span className={styles.loading}>불러오는 중…</span>}

        <div className={styles.divider} style={{ left: `${position}%` }}>
          <button
            type="button"
            className={styles.handle}
            aria-label={`비교 위치: 왼쪽 ${left.label}, 오른쪽 ${right.label}`}
            aria-valuetext={`왼쪽 ${left.label} ${pct}%, 오른쪽 ${right.label} ${100 - pct}%`}
            onDoubleClick={() => setPosition(50)}
            {...handleProps}
          >
            <Icon name="chevronLeft" size={14} strokeWidth={2.4} />
            <Icon name="chevronRight" size={14} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Layer({ shown, alt, emptyText, label }) {
  if (!shown) {
    return (
      <div className={styles.empty} role="img" aria-label={`${label}: ${emptyText}`}>
        <Icon name="image" size={26} />
        <span>
          {label}
          <br />
          {emptyText}
        </span>
      </div>
    );
  }
  return <img src={shown} alt={alt} className={styles.img} draggable={false} />;
}
