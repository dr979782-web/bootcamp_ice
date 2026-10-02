import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getAvailablePeriods } from '../assets/imageRegistry.js';

const AnalysisContext = createContext(null);

/**
 * 분석 화면 공통 상태
 * - year / month : 모든 섹션이 공유하는 기준 연월 (F-03 월 선택, F-05 타임라인과 연동 예정)
 * - variable     : F-01 변수 선택 (F-06은 3변수를 모두 보여주므로 사용하지 않음)
 * - periods      : 이미지가 준비된 연월 목록
 */
/** 정의서 F-12: 기본 화면은 SIC · 2025년 · 9월 */
const DEFAULT_STATE = { variable: 'sic', year: 2025, month: 9 };

export function AnalysisProvider({ children }) {
  const periods = useMemo(() => getAvailablePeriods('sic'), []);

  // 기본 연월 이미지가 없으면 가장 최근 이미지로 시작
  const hasDefault = periods.some((p) => p.year === DEFAULT_STATE.year && p.month === DEFAULT_STATE.month);
  const start = hasDefault ? DEFAULT_STATE : (periods[periods.length - 1] ?? DEFAULT_STATE);

  const [year, setYear] = useState(start.year);
  const [month, setMonth] = useState(start.month);
  const [variable, setVariable] = useState(DEFAULT_STATE.variable);

  const index = periods.findIndex((p) => p.year === year && p.month === month);

  const goTo = useCallback(
    (i) => {
      const p = periods[i];
      if (!p) return;
      setYear(p.year);
      setMonth(p.month);
    },
    [periods],
  );

  const value = useMemo(
    () => ({
      year,
      month,
      variable,
      periods,
      index,
      setYear,
      setMonth,
      setVariable,
      goTo,
      hasPrev: index > 0,
      hasNext: index > -1 && index < periods.length - 1,
      prev: () => goTo(index - 1),
      next: () => goTo(index + 1),
    }),
    [year, month, variable, periods, index, goTo],
  );

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis는 <AnalysisProvider> 안에서만 사용할 수 있습니다.');
  return ctx;
}
