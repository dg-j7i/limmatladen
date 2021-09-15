import styles from './navigation.module.scss'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import Link from 'next/link'

export const Navigation: FunctionComponent = () => {
  const { pathname } = useRouter()

  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <a
          className={`${styles.navigationItem} ${
            pathname === '/' ? styles.active : ''
          }`}
        >
          Session
        </a>
      </Link>
      <Link href="/order">
        <a
          className={`${styles.navigationItem} ${
            pathname === '/order' ? styles.active : ''
          }`}
        >
          Order
        </a>
      </Link>
      <a
        href="https://limmatladen.ch/"
        target="_blank"
        className={`${styles.navigationItem} ${styles.external}`}
        rel="noreferrer"
      >
        Limmat-Lädeli
      </a>
    </nav>
  )
}
