'use client';

import type { MouseEvent } from 'react';

import { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';

import SignoutButton from '../SignoutButton';
import styles from './styles.module.css';


function PrimaryNavigation() {
  const { authStatus, user, signOut } = useAuthenticator(context => [context.user]);
  const [selected, setSelected] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/dashboard') {
      setSelected(null);
    }
  }, [pathName]);

  if (authStatus !== 'authenticated') {
    return redirect('/login');
  }

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault();
    setSelected(event.currentTarget.id);
  }

  return (
    <nav aria-labelledby="primary-navigation" className={styles['nav']}>
      <ul id="primary-navigation">
        <li id="submissions" className={`${styles['nav-item']} ${selected === 'submissions' ? styles['selected'] : ''}`}
          onClick={handleOnClick}
        >
          <Link href="/dashboard/submissions">Submissions</Link>
        </li>
        <li id="new-analysis" className={`${styles['nav-item']} ${selected === 'new-analysis' ? styles['selected'] : ''}`}
          onClick={handleOnClick}
        >
          <Link href="/dashboard/new-analysis">New Analysis</Link>
        </li>
        <li id="results" className={`${styles['nav-item']} ${selected === 'results' ? styles['selected'] : ''}`}
          onClick={handleOnClick}
        >
          <Link href="/dashboard/results">Results</Link>
        </li>
      </ul>

      <SignoutButton onClick={signOut}></SignoutButton>
    </nav>
  );
}


export default PrimaryNavigation;
