import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/navigation.js';
import styles from './Page.module.css';

export default function NotFoundPage() {
  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.notice}>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>주소가 바뀌었거나 삭제된 페이지일 수 있습니다.</p>
        <Link to={ROUTES.HOME} className={styles.cta}>
          홈으로
        </Link>
      </section>
    </div>
  );
}
