import { Button, Table, Tag } from '@geist-ui/react'
import React, { FunctionComponent } from 'react'
import styles from './order.module.scss'
import { IOrderItem } from './orderContext'

interface IOrderListProps {
  order: IOrderItem[]
  removeOrderItem: (index: number) => void
}

export const OrderList: FunctionComponent<IOrderListProps> = ({
  order,
  removeOrderItem,
}) => {
  const data = order.map((order) => {
    const options = order.options.map((option: string) => (
      <Tag className={styles.option} key={option} type="secondary">
        {option}
      </Tag>
    ))
    const operation = (index: { row: number; col: number }) => {
      return (
        <Button
          type="error"
          auto
          size="mini"
          onClick={() => {
            removeOrderItem(index.row)
          }}
        >
          Remove
        </Button>
      )
    }
    return { ...order, options, operation }
  })

  return (
    <Table data={data}>
      <Table.Column prop="food" label="What" />
      <Table.Column prop="main" label="Main" />
      <Table.Column prop="options" label="Options" width={150} />
      <Table.Column prop="operation" width={150} />
    </Table>
  )
}
