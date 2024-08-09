import Link from 'next/link';
import Icon from '@Icons';
import PrimaryNavigation from '../PrimaryNavigation';
import styles from './styles.module.css';


async function Header() {
  return (
    <header className={styles['top-header']}>
      <div className={styles['navLeft']}>
        <Link href="/dashboard">
          <Icon name='logo-bna-dark' />
        </Link>
      </div>

      <PrimaryNavigation />
    </header>
  );
}


export default Header;
