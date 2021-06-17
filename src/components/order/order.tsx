import React, { FunctionComponent, useEffect } from 'react'
import { OrderList } from './orderList'
import styles from './order.module.scss'
import { getEmailTemplate } from './emailTemplate'
import { Button, Input, useInput } from '@geist-ui/react'
import { useOrderContext } from './orderContext'

export const Order: FunctionComponent = () => {
  const { state, reset, bindings } = useInput('')
  const { order, setOrder } = useOrderContext()

  const removeOrderItem = (itemIndex: number) => {
    const newOrder = [...order]
    newOrder.splice(itemIndex, 1)
    setOrder(newOrder)
  }

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
        <div className={styles.input}>
          <div className="mt-1 relative rounded-md shadow-sm">
            <Input
              size="large"
              placeholder="Paste from Clipboard"
              width="100%"
              {...bindings}
              className={styles.inputField}
            />
          </div>
        </div>
        {order.length ? (
          <>
            <OrderList order={order} removeOrderItem={removeOrderItem} />
            <div className={styles.buttonWrapper}>
              <Button type="abort" onClick={() => setOrder([])}>
                Reset
              </Button>
              <a
                href={`https://outlook.office.com/?path=/mail/action/compose&to=banhmi@limmatladen.ch?subject=Bestellung%20heute%20um%2012:00%20Uhr&body=${encodeURI(
                  getEmailTemplate(order)
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button type="secondary-light">Create Email</Button>
              </a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
// {"food":"Banhmi","main":"Tofu","options":{"Koriander":true,"Spicy":false}}
// {"food":"Banhmi","main":"Poulet","options":{"Koriander":true,"Spicy":false}}
// {"food":"Bun","main":"Pulled Pork Carnitas","options":{"Koriander":true,"Spicy":true}}
