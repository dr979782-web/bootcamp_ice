import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/navigation.js';
import styles from './Page.module.css';

export default function HomePage() {
  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.hero}>
        <h1>북극 해빙 변화 분석 서비스</h1>
        <p>1989년부터 지금까지, 위성 관측 자료로 북극 해빙의 변화를 살펴보세요.</p>
        <Link to={ROUTES.ANALYSIS} className={styles.cta}>
          분석서비스 바로가기
        </Link>
      </section>
    </div>
  );
}
