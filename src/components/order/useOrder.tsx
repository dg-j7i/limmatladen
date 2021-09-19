import { useSessionStorageState } from '../../utils/useSessionStorageState'
import { useSessionContext } from '../session/sessionContext'
import { IOrder } from './types'

export const useOrder = () => {
  const { currentSession } = useSessionContext()
  const [orderAccessCode] = useSessionStorageState<string>(
    'order_access_code',
    generateOrderAccessCode(4)
  )

  const createNewOrder = async (
    order: Omit<IOrder, '_id' | 'session_id' | 'access'>,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    try {
      return await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          session_id: currentSession?._id,
          sessionAccess: currentSession?.access,
          access: orderAccessCode,
          ...order,
        }),
      }).then((res) => {
        onSuccess?.()
        return res.json()
      })
    } catch (err) {
      onError?.()
      console.error('Failed to create a new order:', err)
    }
  }

  return {
    createNewOrder,
    orderAccessCode,
  }
}

function generateOrderAccessCode(length: number): string {
  if (length < 1) {
    throw new Error('Length must be at least 1')
  }
  const possible = '0123456789ATSLZQEF'
  let string = ''
  for (let i = 0; i < length; i++) {
    string += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return string
}
