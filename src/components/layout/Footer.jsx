import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>데이터 출처: NOAA/NSIDC Sea Ice CDR v6 (G02202) · ECMWF ERA5</p>
        <p className={styles.sub}>© 2026 북극 해빙 변화 분석 서비스 · 인공지능 부트캠프 프로젝트</p>
      </div>
    </footer>
  );
}
