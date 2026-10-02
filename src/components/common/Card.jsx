import styles from './Card.module.css';

/**
 * 섹션 카드 공통 틀 — "F-06  3변수 나란히 보기 (같은 연월 기준)  [우측 액션]"
 */
export default function Card({ code, title, subtitle, actions, children, className = '', ...rest }) {
  return (
    <section className={`${styles.card} ${className}`} {...rest}>
      {(code || title || actions) && (
        <header className={styles.header}>
          <h2 className={styles.title}>
            {code && <span className={styles.code}>{code}</span>}
            {title}
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </h2>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}
