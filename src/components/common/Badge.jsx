import styles from './Badge.module.css';

/** 작은 라벨 칩. tone: 'primary' | 'neutral' | 'warning' */
export default function Badge({ tone = 'primary', children, className = '', ...rest }) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`} {...rest}>
      {children}
    </span>
  );
}
