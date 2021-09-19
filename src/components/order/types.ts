import { FoodCategory } from '../foodSelection/foodSelection'

export interface IOrder {
  _id: string
  session_id: string
  owner: string
  access: string
  items: IOrderItem[]
}

export interface IOrderItem {
  name: FoodCategory
  ingredients: string[]
  options: IOrderItemOption[]
}

export interface IOrderItemOption {
  name: string
  isExcluded: boolean
}
