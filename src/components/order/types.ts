import { FoodCategory } from '../foodSelection/foodSelection'

export interface IOrder {
  _id: string
  session_id: string
  owner: string
  access: string
  items: [
    {
      name: string
      ingredients: string[]
      options: string[]
    }
  ]
}

export interface IOrderItem {
  food: FoodCategory
  main: string
  options: string[]
}
