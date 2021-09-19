import { InputProps } from '@geist-ui/react'
import React, { FunctionComponent } from 'react'
import styles from './dominantInput.module.scss'

export const DominantInput: FunctionComponent<InputProps> = (props) => {
  return <input className={styles.inputField} {...props} />
}
