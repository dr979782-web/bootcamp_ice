import { useState } from 'react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Icon from '../common/Icon.jsx';
import CompareSlider from '../common/CompareSlider.jsx';
import CompareControls from './CompareControls.jsx';
import { useAnalysis } from '../../context/AnalysisContext.jsx';
import { getVariableImage } from '../../assets/imageRegistry.js';
import { VARIABLES, COMPARE_DEFAULTS } from '../../constants/variables.js';
import { formatPeriod } from '../../utils/format.js';
import styles from './YearSwipeCompare.module.css';

/**
 * F-07 두 연도 스와이프
 * - 왼쪽·오른쪽 연도를 각각 드롭다운으로 선택 (기본 1989년 9월 vs 2025년 9월)
 * - 가운데 핸들: 마우스 드래그 / 터치 드래그 / 방향키
 * - 변수·월은 페이지 공통 상태(AnalysisContext)를 사용 → 두 이미지는 항상 같은 변수·같은 월
 */
export default function YearSwipeCompare() {
  const { variable, setVariable, month, setMonth } = useAnalysis();
  const [leftYear, setLeftYear] = useState(COMPARE_DEFAULTS.leftYear);
  const [rightYear, setRightYear] = useState(COMPARE_DEFAULTS.rightYear);

  const v = VARIABLES[variable];
  const leftImg = getVariableImage(variable, leftYear, month);
  const rightImg = getVariableImage(variable, rightYear, month);
  const isPlaceholder = leftImg.isPlaceholder || rightImg.isPlaceholder;

  const side = (year, img) => ({
    src: img.src,
    label: formatPeriod(year, month),
    alt: `${formatPeriod(year, month)} 북극 ${v.label} 지도`,
  });

  const swap = () => {
    setLeftYear(rightYear);
    setRightYear(leftYear);
  };

  return (
    <Card
      code="F-07"
      title="두 연도 스와이프 비교"
      actions={
        <>
          {isPlaceholder && <Badge tone="warning">임시 이미지</Badge>}
          <Badge tone="primary">
            {v.label} ({v.short})
          </Badge>
        </>
      }
    >
      <div className={styles.layout}>
        <div className={styles.controls}>
          <CompareControls
            variable={variable}
            month={month}
            leftYear={leftYear}
            rightYear={rightYear}
            onVariableChange={setVariable}
            onMonthChange={setMonth}
            onLeftYearChange={setLeftYear}
            onRightYearChange={setRightYear}
            onSwap={swap}
          />

          <p className={styles.hint}>
            <Icon name="info" size={14} />
            <span>
              가운데 핸들을 끌거나, 핸들을 선택한 뒤 <kbd>←</kbd> <kbd>→</kbd> 키로 움직여요. 더블클릭하면 가운데로
              돌아가요.
            </span>
          </p>

          <ul className={styles.legend}>
            <li>
              <span className={`${styles.line} ${styles.red}`} aria-hidden="true" />
              빨간 실선: 그해 해빙 농도 15% 경계
            </li>
            <li>
              <span className={`${styles.line} ${styles.dashed}`} aria-hidden="true" />
              흰 점선: 관측 기간 중 해빙이 있었던 최대 범위 (모든 연도 동일)
            </li>
          </ul>
        </div>

        <div className={styles.viewer}>
          <CompareSlider
            left={side(leftYear, leftImg)}
            right={side(rightYear, rightImg)}
            emptyText="이 달의 자료가 없습니다"
          />
        </div>
      </div>
    </Card>
  );
}
