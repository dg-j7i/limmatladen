import { Input, InputProps } from '@geist-ui/react'
import React, { FunctionComponent } from 'react'
import styles from './dominantInput.module.scss'

export const DominantInput: FunctionComponent<InputProps> = (props) => {
  return (
    <div className={styles.input}>
      <Input className={styles.inputField} {...props} />
    </div>
  )
}
