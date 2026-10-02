import Icon from '../common/Icon.jsx';
import { VARIABLES, TRI_VARIABLE_ORDER, YEAR_RANGE } from '../../constants/variables.js';
import { hasVariableImage } from '../../assets/imageRegistry.js';
import { formatMonth, range } from '../../utils/format.js';
import styles from './CompareControls.module.css';

const YEARS = range(YEAR_RANGE.min, YEAR_RANGE.max);
const MONTHS = range(1, 12);

/**
 * F-07 조작부: 변수(공통) · 월(공통) · 왼쪽 연도 · 오른쪽 연도
 * 두 이미지는 같은 변수·같은 월만 비교 (크기·투영 동일 보장)
 */
export default function CompareControls({
  variable,
  month,
  leftYear,
  rightYear,
  onVariableChange,
  onMonthChange,
  onLeftYearChange,
  onRightYearChange,
  onSwap,
}) {
  const yearOptions = YEARS.map((y) => ({
    year: y,
    available: hasVariableImage(variable, y, month),
  }));

  return (
    <div className={styles.controls}>
      <fieldset className={styles.field}>
        <legend className={styles.label}>비교 변수</legend>
        <div className={styles.segment} role="radiogroup" aria-label="비교 변수">
          {TRI_VARIABLE_ORDER.map((key) => {
            const v = VARIABLES[key];
            const on = key === variable;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={on}
                className={`${styles.segBtn} ${on ? styles.segOn : ''}`}
                onClick={() => onVariableChange(key)}
              >
                <Icon name={v.icon} size={14} />
                {v.short}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="f07-month">
          월
        </label>
        <select
          id="f07-month"
          className={styles.select}
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {formatMonth(m)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.years}>
        <YearSelect
          id="f07-left"
          label="왼쪽 연도"
          value={leftYear}
          options={yearOptions}
          onChange={onLeftYearChange}
          tone="left"
        />
        <button type="button" className={styles.swap} onClick={onSwap} aria-label="왼쪽·오른쪽 연도 바꾸기">
          <Icon name="swap" size={16} />
        </button>
        <YearSelect
          id="f07-right"
          label="오른쪽 연도"
          value={rightYear}
          options={yearOptions}
          onChange={onRightYearChange}
          tone="right"
        />
      </div>
    </div>
  );
}

function YearSelect({ id, label, value, options, onChange, tone }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        <span className={`${styles.dot} ${styles[tone]}`} aria-hidden="true" />
        {label}
      </label>
      <select id={id} className={styles.select} value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((o) => (
          <option key={o.year} value={o.year} disabled={!o.available && o.year !== value}>
            {o.year}년{o.available ? '' : ' · 자료 없음'}
          </option>
        ))}
      </select>
    </div>
  );
}
