import styles from './Page.module.css';

/** 아직 구현 전인 메뉴용 임시 페이지 */
export default function ComingSoonPage({ title }) {
  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.notice}>
        <h1>{title}</h1>
        <p>준비 중인 페이지입니다.</p>
      </section>
    </div>
  );
}
