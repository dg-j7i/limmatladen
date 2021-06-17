import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { FoodCategory } from '../foodSelection/foodSelection'

export interface IOrderItem {
  food: FoodCategory
  main: string
  options: string[]
}

interface ICookieConsentContext {
  order: IOrderItem[]
  setOrder: Dispatch<SetStateAction<IOrderItem[]>>
  addOrderItem: (orderItem: IOrderItem) => void
}

const OrderContext = createContext<ICookieConsentContext | undefined>(undefined)
OrderContext.displayName = 'OrderContext'

export const OrderContextProvider: FunctionComponent = ({ children }) => {
  const [order, setOrder] = useState<IOrderItem[]>([])

  const addOrderItem = (orderItem: IOrderItem) => {
    setOrder([...order, orderItem])
  }

  return (
    <OrderContext.Provider value={{ order, setOrder, addOrderItem }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrderContext(): ICookieConsentContext {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('OrderContext must be used within a OrderContextProvider.')
  }

  return context
}
