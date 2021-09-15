import React, { FunctionComponent } from 'react'
import styles from './nameInput.module.scss'
import { InputProps } from '@geist-ui/react'
import { DominantInput } from '../input/dominantInput'

export const NameInput: FunctionComponent<InputProps> = (props) => {
  return (
    <section className={styles.content}>
      <div className={styles.contentInner}>
        <h1 className={styles.title}>Your name</h1>
        <DominantInput size={2} placeholder=". . ." width="100%" {...props} />
      </div>
    </section>
  )
}
