import { Card, Divider, Spacer, Tag, Text } from '@geist-ui/react'
import React, { FunctionComponent } from 'react'
import { IOrder } from './types'

interface IOrderListProps {
  orders: IOrder[]
  removeOrderItem: (index: number) => void
}

export const OrderList: FunctionComponent<IOrderListProps> = ({ orders }) => {
  return (
    <>
      {orders.map((order) => {
        const items = order.items.map((item) => {
          const options = item.options.map((option: string) => (
            <Tag style={{ marginRight: '4px' }} key={option} type="secondary">
              {option}
            </Tag>
          ))

          return (
            <>
              <h4 style={{ marginBottom: 0 }}>{item.name}</h4>
              <h5>{item.ingredients[0]}</h5>
              {options}
            </>
          )
        })

        return (
          <>
            <Card key={order._id}>
              <Text type="secondary">{order.owner}</Text>
              <Divider />
              {items}
            </Card>
            <Spacer h={1} />
          </>
        )
      })}
    </>
  )
}
