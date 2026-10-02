import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 가로 scroll-snap 컨테이너의 현재 카드 인덱스를 추적하고,
 * 특정 인덱스로 스크롤하는 함수를 돌려줍니다. (모바일 스와이프 카드용)
 */
export default function useScrollSnapIndex(itemCount, enabled = true) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const child = el.firstElementChild;
        if (!child) return;
        const step = child.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0);
        const i = Math.round(el.scrollLeft / step);
        setActive(Math.max(0, Math.min(itemCount - 1, i)));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
    };
  }, [itemCount, enabled]);

  const scrollTo = useCallback((i) => {
    const el = ref.current;
    const target = el?.children[i];
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  }, []);

  return { ref, active, scrollTo };
}
