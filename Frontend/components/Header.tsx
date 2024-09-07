import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" legacyBehavior>
        <a className={styles.button}>Log In</a>
      </Link>
      <Link href="/cart" legacyBehavior>
        <a className={styles.button}>Cart</a>
      </Link>
    </header>
  );
};

export default Header;
