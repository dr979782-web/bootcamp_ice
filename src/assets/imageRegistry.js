/**
 * 지도 이미지 레지스트리
 *
 * src/assets/images/<변수>/ 폴더에 `<변수>_<YYYY>_<MM>.png` 규칙으로 파일을 넣으면
 * 자동으로 등록됩니다. (예: images/tos/tos_1995_09.png)
 * → 코드 수정 없이 이미지만 추가하면 됨.
 */
const files = import.meta.glob('./images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

const FILE_RE = /([a-z]+)_(\d{4})[-_](\d{2})\.(png|jpe?g|webp)$/i;

/** { sic: { '1989-01': url, ... }, tos: {...}, tas: {...} } */
const registry = {};

for (const [path, url] of Object.entries(files)) {
  const m = path.match(FILE_RE);
  if (!m) continue;
  const [, varKey, yyyy, mm] = m;
  const key = varKey.toLowerCase();
  registry[key] ??= {};
  registry[key][`${yyyy}-${mm}`] = url;
}

/**
 * 임시 대체 규칙: 아직 이미지가 없는 변수는 다른 변수 이미지로 대신 표시.
 * TOS/TAS 이미지가 준비되면 이 객체에서 해당 줄만 지우면 됩니다.
 */
const TEMP_FALLBACK = {
  tos: 'sic',
  tas: 'sic',
};

const periodKey = (year, month) => `${year}-${String(month).padStart(2, '0')}`;

/**
 * @returns {{ src: string|null, isPlaceholder: boolean }}
 *  - src: 이미지 URL (없으면 null)
 *  - isPlaceholder: 대체 이미지로 표시 중인지
 */
export function getVariableImage(varKey, year, month) {
  const key = periodKey(year, month);
  const own = registry[varKey]?.[key];
  if (own) return { src: own, isPlaceholder: false };

  const fb = TEMP_FALLBACK[varKey];
  const fbSrc = fb ? registry[fb]?.[key] : null;
  if (fbSrc) return { src: fbSrc, isPlaceholder: true };

  return { src: null, isPlaceholder: false };
}

/** 해당 변수·연월에 표시할 이미지가 있는지 (임시 대체 이미지 포함) */
export function hasVariableImage(varKey, year, month) {
  return getVariableImage(varKey, year, month).src !== null;
}

/** 이미지가 존재하는 (연, 월) 목록 — 오름차순 */
export function getAvailablePeriods(varKey = 'sic') {
  return Object.keys(registry[varKey] ?? {})
    .sort()
    .map((k) => {
      const [y, m] = k.split('-').map(Number);
      return { year: y, month: m };
    });
}
