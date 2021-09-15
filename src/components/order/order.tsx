import React, { FunctionComponent, useEffect } from 'react'
import styles from './order.module.scss'
import { useInput } from '@geist-ui/react'
import { useOrderContext } from './orderContext'
import { DominantInput } from '../input/dominantInput'

export const Order: FunctionComponent = () => {
  const { state, reset, bindings } = useInput('')
  const { order, setOrder } = useOrderContext()

  useEffect(() => {
    if (state) {
      const newOrder = JSON.parse(state)
      setOrder([...order, newOrder])
      reset()
    }
  }, [state])

  return (
    <section className={styles.content}>
      <div className={styles.contentInner}>
        <h2 className={styles.title}>Paste your order</h2>
        <DominantInput
          size={1}
          placeholder="Paste from Clipboard"
          width="100%"
          {...bindings}
        />
      </div>
    </section>
  )
}
// {"food":"Banhmi","main":"Tofu","options":{"Koriander":true,"Spicy":false}}
// {"food":"Banhmi","main":"Poulet","options":{"Koriander":true,"Spicy":false}}
// {"food":"Bun","main":"Pulled Pork Carnitas","options":{"Koriander":true,"Spicy":true}}
