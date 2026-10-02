import Icon from '../common/Icon.jsx';
import { useAnalysis } from '../../context/AnalysisContext.jsx';
import { formatPeriod } from '../../utils/format.js';
import styles from './PeriodStepper.module.css';

/**
 * 기준 연월 이동 (‹ 1996년 1월 ›)
 * 전역 컨텍스트를 바꾸므로 다른 섹션(F-01~F-05 지도 등)과 자동으로 동기화됩니다.
 */
export default function PeriodStepper() {
    const { year, month, periods, index, goTo, hasPrev, hasNext, prev, next } = useAnalysis();

  return (
    <div className={styles.stepper}>
      <button type="button" className={styles.arrow} onClick={prev} disabled={!hasPrev} aria-label="이전 연월">
        <Icon name="chevronLeft" size={16} />
      </button>

      <label className="sr-only" htmlFor="f06-period">
        기준 연월
      </label>
      <select
        id="f06-period"
        className={styles.select}
        value={index}
        onChange={(e) => goTo(Number(e.target.value))}
      >
        {index === -1 && (
          <option value={-1} disabled>
            {formatPeriod(year, month)} (자료 없음)
          </option>
        )}        
        {periods.map((p, i) => (
          <option key={`${p.year}-${p.month}`} value={i}>
            {formatPeriod(p.year, p.month)}
          </option>
        ))}
      </select>

      <button type="button" className={styles.arrow} onClick={next} disabled={!hasNext} aria-label="다음 연월">
        <Icon name="chevronRight" size={16} />
      </button>
    </div>
  );
}
