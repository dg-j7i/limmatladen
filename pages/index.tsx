import React from 'react'
import { FoodSelection } from '../src/components/foodSelection/foodSelection'
import styles from '../src/styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <div className={styles.container}>
        <main className={styles.main}>
          <FoodSelection />
        </main>
      </div>
    </div>
  )
}
