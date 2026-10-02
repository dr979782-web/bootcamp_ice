import { useMemo, useState } from 'react';
import Card from '../common/Card.jsx';
import ImageLightbox from '../common/ImageLightbox.jsx';
import VariablePanel from './VariablePanel.jsx';
import PeriodStepper from './PeriodStepper.jsx';
import MobileLayoutToggle from './MobileLayoutToggle.jsx';
import SwipeDots from './SwipeDots.jsx';
import { useAnalysis } from '../../context/AnalysisContext.jsx';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import useScrollSnapIndex from '../../hooks/useScrollSnapIndex.js';
import { getVariableImage } from '../../assets/imageRegistry.js';
import { VARIABLES, TRI_VARIABLE_ORDER, BREAKPOINT_MOBILE } from '../../constants/variables.js';
import { formatPeriod } from '../../utils/format.js';
import styles from './TriVariableView.module.css';

/**
 * F-06 3변수 나란히 보기 (같은 연월 기준)
 *
 * - 데스크탑(>768px): 가로 3열 그리드
 * - 모바일(≤768px) : 'swipe' 좌우 스와이프 카드(scroll-snap) / 'stack' 세로 나열
 *
 * @param {'swipe'|'stack'} defaultMobileLayout 모바일 기본 보기 방식
 */
export default function TriVariableView({ defaultMobileLayout = 'swipe' }) {
  const { year, month } = useAnalysis();
  const [mobileLayout, setMobileLayout] = useState(defaultMobileLayout);
  const [lightbox, setLightbox] = useState(null);

  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINT_MOBILE}px)`);
  const swipeOn = isMobile && mobileLayout === 'swipe';

  const panels = useMemo(
    () =>
      TRI_VARIABLE_ORDER.map((key) => ({
        variable: VARIABLES[key],
        ...getVariableImage(key, year, month),
      })),
    [year, month],
  );

  const { ref, active, scrollTo } = useScrollSnapIndex(panels.length, swipeOn);
  const periodLabel = formatPeriod(year, month);

  return (
    <Card
      code="F-06"
      title="3변수 나란히 보기"
      subtitle="(같은 연월 기준)"
      actions={
        <>
          <MobileLayoutToggle value={mobileLayout} onChange={setMobileLayout} />
          <PeriodStepper />
        </>
      }
    >
      <div
        ref={ref}
        className={`${styles.grid} ${styles[mobileLayout]}`}
        aria-label={`${periodLabel} 해빙 농도·해수면 온도·지표 기온 비교`}
        aria-roledescription={swipeOn ? '캐러셀' : undefined}
      >
        {panels.map((p) => (
          <div key={p.variable.key} className={styles.cell}>
            <VariablePanel
              variable={p.variable}
              src={p.src}
              isPlaceholder={p.isPlaceholder}
              periodLabel={periodLabel}
              onExpand={setLightbox}
            />
          </div>
        ))}
      </div>

      {swipeOn && (
        <SwipeDots
          labels={panels.map((p) => p.variable.label)}
          active={active}
          onSelect={scrollTo}
        />
      )}

      <ImageLightbox
        src={lightbox?.src}
        alt={lightbox?.alt}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </Card>
  );
}
