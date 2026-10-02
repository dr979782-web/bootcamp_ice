import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import styles from './ImageLightbox.module.css';

/** 이미지 확대 보기 모달. ESC / 배경 클릭으로 닫힘 */
export default function ImageLightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    if (!src) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
          <Icon name="close" size={20} />
        </button>
        <img src={src} alt={alt} className={styles.img} />
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </div>,
    document.body,
  );
}
