import Link from 'next/link';
import styles from '../styles/layout.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} href="/">Home</Link>
      <Link className={styles.link} href="/artigos">Artigos</Link>
    </nav>
  );
}
