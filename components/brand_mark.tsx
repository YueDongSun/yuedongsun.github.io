import styles from './brand_mark.module.css';

type Brand_mark_variant = 'header' | 'display';

export function Brand_mark({ variant = 'header' }: { variant?: Brand_mark_variant }) {
  return (
    <span className={`${styles.mark} ${variant === 'display' ? styles.display : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false" role="presentation">
        <path className={styles.path} d="M6.5 9.5c4.1 0 6 1.9 7.7 4.7.5.9.9 1.8 1.8 1.8s1.3-.9 1.8-1.8c1.7-2.8 3.6-4.7 7.7-4.7" />
        <path className={styles.path} d="M6.5 22.5c4.1 0 6-1.9 7.7-4.7.5-.9.9-1.8 1.8-1.8s1.3.9 1.8 1.8c1.7 2.8 3.6 4.7 7.7 4.7" />
        <circle className={styles.node} cx="6.5" cy="9.5" r="1.3" />
        <circle className={styles.node} cx="25.5" cy="9.5" r="1.3" />
        <circle className={styles.node} cx="6.5" cy="22.5" r="1.3" />
        <circle className={styles.node} cx="25.5" cy="22.5" r="1.3" />
        <circle className={styles.center} cx="16" cy="16" r="1.9" />
      </svg>
    </span>
  );
}
