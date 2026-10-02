/**
 * 지도 변수 정의 (F-01 변수 선택, F-06 3변수 나란히 보기에서 공통 사용)
 * key 는 이미지 파일명 접두사와 같아야 합니다. (예: sic_1989_01.png)
 */
export const VARIABLES = {
  sic: {
    key: 'sic',
    label: '해빙 농도',
    short: 'SIC',
    unit: '%',
    icon: 'snow',
    description: '바다 표면의 얼음이 차지하는 비율(%)',
  },
  tos: {
    key: 'tos',
    label: '해수면 온도',
    short: 'TOS',
    unit: '°C',
    icon: 'thermo',
    description: '해수면의 온도(°C)',
  },
  tas: {
    key: 'tas',
    label: '지표 기온',
    short: 'TAS',
    unit: '°C',
    icon: 'sun',
    description: '지표 근처(2 m)의 기온(°C)',
  },
};

/** F-06 표시 순서 */
export const TRI_VARIABLE_ORDER = ['sic', 'tos', 'tas'];

/** 서비스 전체 연도 범위 */
export const YEAR_RANGE = { min: 1989, max: 2025 };

/** F-07 두 연도 스와이프 비교 기본값 */
export const COMPARE_DEFAULTS = {
  variable: 'sic',
  month: 9,
  leftYear: 1989,
  rightYear: 2025,
};

/** 반응형 기준 (CSS의 @media 값과 맞춰 둘 것) */
export const BREAKPOINT_MOBILE = 768;
