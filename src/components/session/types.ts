export interface ISession {
  _id: string
  name: string
  owner: string
  orders: IOrder[]
  isActive: boolean
  verificationCode: string
  accessCode: string
}

export interface IOrder {
  _id: string
  owner: string
  accessCode: string
  items: [
    {
      name: string
      ingredients: string[]
      options: string[]
    }
  ]
}
