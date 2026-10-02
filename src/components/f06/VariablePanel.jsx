import { useState } from 'react';
import Icon from '../common/Icon.jsx';
import Badge from '../common/Badge.jsx';
import styles from './VariablePanel.module.css';

/**
 * F-06 개별 패널 — 변수 하나의 지도 이미지
 * @param {object}  variable      constants/variables.js 의 항목
 * @param {string}  src           이미지 URL (없으면 빈 상태)
 * @param {boolean} isPlaceholder 임시(대체) 이미지 여부
 * @param {string}  periodLabel   "1996년 1월"
 * @param {func}    onExpand      확대 보기 클릭
 */
export default function VariablePanel({ variable, src, isPlaceholder, periodLabel, onExpand }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loading = Boolean(src) && loadedSrc !== src;
  const title = `${variable.label} (${variable.short})`;

  return (
    <article className={styles.panel} aria-label={`${periodLabel} ${title}`}>
      <header className={styles.head}>
        <h3 className={styles.title}>
          <Icon name={variable.icon} size={16} className={styles.icon} />
          {title}
        </h3>
        {isPlaceholder && (
          <Badge tone="warning" title="이 변수의 이미지가 아직 없어 SIC 이미지로 대신 표시 중">
            임시 이미지
          </Badge>
        )}
      </header>

      <div className={styles.frame}>
        {src ? (
          <button
            type="button"
            className={styles.imgBtn}
            onClick={() => onExpand?.({ src, alt: `${periodLabel} ${title} 지도`, caption: `${periodLabel} · ${title}` })}
            aria-label={`${title} 크게 보기`}
          >
            {loading && <span className={styles.skeleton} aria-hidden="true" />}
            <img
              key={src}
              src={src}
              alt={`${periodLabel} ${title} 지도`}
              className={`${styles.img} ${loading ? styles.hidden : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoadedSrc(src)}
              draggable={false}
            />
            <span className={styles.expand} aria-hidden="true">
              <Icon name="expand" size={14} />
            </span>
          </button>
        ) : (
          <div className={styles.empty}>
            <Icon name="image" size={28} />
            <p>{periodLabel} 이미지가 아직 없습니다</p>
          </div>
        )}
      </div>

      <p className={styles.desc}>{variable.description}</p>
    </article>
  );
}
