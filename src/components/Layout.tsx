import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'ground';
}

export function Layout({ children, variant = 'default' }: LayoutProps) {
  return (
    <div
      className={`${styles.layout} ${variant === 'ground' ? styles.ground : ''}`}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
