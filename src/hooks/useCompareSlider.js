import { useCallback, useRef, useState } from 'react';

const clamp = (v) => Math.min(100, Math.max(0, v));

/**
 * 스와이프 비교 핸들 로직 (마우스·터치·키보드)
 * - position: 0~100 (%) — 왼쪽 이미지가 보이는 폭
 * - containerProps: 비교 영역 div에 펼쳐 넣기 (어디를 눌러도 그 위치로 이동 + 드래그)
 * - handleProps: 핸들 버튼에 펼쳐 넣기 (role="slider", 방향키 지원)
 *
 * 키보드: ←/→(또는 ↓/↑) 2%, Shift+방향키·PageUp/Down 10%, Home 0%, End 100%
 */
export default function useCompareSlider(initial = 50, { step = 2, bigStep = 10 } = {}) {
  const ref = useRef(null);
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const moveTo = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      ref.current?.setPointerCapture?.(e.pointerId);
      setDragging(true);
      moveTo(e.clientX);
    },
    [moveTo],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (dragging) moveTo(e.clientX);
    },
    [dragging, moveTo],
  );

  const endDrag = useCallback((e) => {
    setDragging(false);
    if (ref.current?.hasPointerCapture?.(e.pointerId)) ref.current.releasePointerCapture(e.pointerId);
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      const s = e.shiftKey ? bigStep : step;
      let next;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = position - s;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          next = position + s;
          break;
        case 'PageDown':
          next = position - bigStep;
          break;
        case 'PageUp':
          next = position + bigStep;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = 100;
          break;
        default:
          return;
      }
      e.preventDefault();
      setPosition(clamp(next));
    },
    [position, step, bigStep],
  );

  return {
    ref,
    position,
    setPosition,
    dragging,
    containerProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
    handleProps: {
      role: 'slider',
      tabIndex: 0,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': Math.round(position),
      'aria-orientation': 'horizontal',
      onKeyDown,
    },
  };
}
