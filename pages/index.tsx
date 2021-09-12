import React from 'react'
import { FoodSelection } from '../src/components/foodSelection/foodSelection'
import styles from '../src/styles/Home.module.scss'

const IndexPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <FoodSelection />
      </div>
    </div>
  )
}

export default IndexPage
