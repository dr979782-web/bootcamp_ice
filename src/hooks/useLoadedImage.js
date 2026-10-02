import { useEffect, useState } from 'react';

/**
 * 새 이미지가 완전히 로드된 뒤에만 교체 (정의서 F-01~F-03: 깜빡임 방지)
 * - 로드 중에는 이전 이미지를 계속 보여 주고 loading=true
 * - src가 null이면 즉시 null (자료 없음 상태)
 */
export default function useLoadedImage(src) {
  const [shown, setShown] = useState(src);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!src) {
      setShown(null);
      setLoading(false);
      return undefined;
    }
    if (src === shown) return undefined;

    let cancelled = false;
    setLoading(true);
    const img = new Image();
    img.onload = img.onerror = () => {
      if (cancelled) return;
      setShown(src);
      setLoading(false);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return { shown, loading };
}
