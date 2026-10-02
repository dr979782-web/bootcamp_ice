import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../common/Icon.jsx';
import logo from '../../assets/logo.svg';
import { NAV_ITEMS, ROUTES } from '../../constants/navigation.js';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to={ROUTES.HOME} className={styles.brand} onClick={() => setOpen(false)}>
          <img src={logo} alt="" width={44} height={44} />
          <span className={styles.org}>
            <strong>국립해양기상관측소</strong>
            <small>National Oceanic and Meteorological Observatory</small>
          </span>
        </Link>

        <div className={styles.service}>
          <strong>북극 해빙 변화 분석 서비스</strong>
          <small>데이터로 보는, 더 가까워지는 북극</small>
        </div>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="주 메뉴">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.HOME}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.tools}>
          <button type="button" className={styles.iconBtn} aria-label="검색">
            <Icon name="search" size={20} />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
