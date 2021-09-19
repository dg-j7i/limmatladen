import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Spacer,
  Tag,
} from '@geist-ui/react'
import { Plus } from '@geist-ui/react-icons'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { IOrder, IOrderItemOption } from './types'
import { useOrder } from './useOrder'

interface IOrderListProps {
  orders: IOrder[]
  removeOrderItem: (index: number) => void
}

export const OrderList: FunctionComponent<IOrderListProps> = ({ orders }) => {
  const { orderAccessCode } = useOrder()

  return (
    <>
      <Grid.Container gap={1}>
        {orders.map((order) => {
          const isOwnOrderItem = orderAccessCode === order.access
          const items = order.items.map((item) => {
            return (
              <>
                <h4 style={{ marginBottom: 0 }}>{item.name}</h4>
                <h5>{item.ingredients[0]}</h5>
                {renderOptions(item.options, isOwnOrderItem)}
              </>
            )
          })

          return (
            <Grid xs={24} sm={12} md={8} lg={6} xl={4} key={order._id}>
              <Card
                shadow
                width="100%"
                type={isOwnOrderItem ? 'success' : 'default'}
              >
                <Badge
                  style={{
                    backgroundColor: `${isOwnOrderItem ? '#0070f3' : '#000'}`,
                  }}
                >
                  {order.owner}
                </Badge>
                <Divider />
                {items}
              </Card>
              <Spacer h={1} />
            </Grid>
          )
        })}
      </Grid.Container>
      <Spacer h={3} />
      <Grid.Container justify="flex-start">
        <Link href="/order">
          <Button type="secondary-light" icon={<Plus />}>
            Neu hinzufügen
          </Button>
        </Link>
      </Grid.Container>
    </>
  )
}

const renderOptions = (
  options: IOrderItemOption[],
  isOwnOrderItem: boolean
) => {
  const tagType = isOwnOrderItem ? 'success' : 'secondary'
  const optionTags = options.map((option: IOrderItemOption, index: number) => {
    return option.isExcluded ? (
      <Tag style={{ marginRight: '4px' }} key={index} type={tagType}>
        Ohne {option.name}
      </Tag>
    ) : null
  })

  return optionTags.filter((option) => option).length ? (
    optionTags
  ) : (
    <Tag style={{ marginRight: '4px' }} type={tagType}>
      Mit alles
    </Tag>
  )
}
