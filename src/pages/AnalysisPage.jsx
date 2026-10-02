import { TriVariableView } from '../components/f06';
import { YearSwipeCompare } from '../components/f07';
import styles from './Page.module.css';

/**
 * 분석서비스 페이지
 * 섹션은 기능 ID(F-xx) 단위 컴포넌트로 조립합니다.
 * 다른 섹션(F-01 변수 선택, F-07 스와이프 비교, F-10 추세 등)도
 * components/f0x/ 폴더를 만들어 같은 방식으로 추가하면 됩니다.
 */
export default function AnalysisPage() {
  return (
    <div className={`container ${styles.page}`}>
      <h1 className="sr-only">북극 해빙 변화 분석</h1>

      {/* F-06 3변수 나란히 보기 */}
      <TriVariableView defaultMobileLayout="swipe" />
            {/* F-07 두 연도 스와이프 비교 */}
      <YearSwipeCompare />
    </div>
  );
}
