import React, { FunctionComponent } from 'react'
import styles from './nameInput.module.scss'
import { InputProps, Text } from '@geist-ui/react'
import { DominantInput } from '../input/dominantInput'

export const NameInput: FunctionComponent<InputProps> = (props) => {
  return (
    <section className={styles.content}>
      <div className={styles.contentInner}>
        {props.value && (
          <Text
            style={{ textAlign: 'center', width: '100%', display: 'block' }}
            small
          >
            {props.label}
          </Text>
        )}
        <DominantInput size={2} width="100%" autoFocus {...props} />
      </div>
    </section>
  )
}
