export const formatPeriod = (year, month) => `${year}년 ${month}월`;

export const formatMonth = (month) => `${month}월`;

/** [min..max] 정수 배열 */
export const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);