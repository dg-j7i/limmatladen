import { useSessionContext } from '../session/sessionContext'
import { IOrder } from './types'

export const useOrder = () => {
  const { currentSession } = useSessionContext()

  const createNewOrder = async (
    order: Omit<IOrder, '_id' | 'session_id'>,
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
  }
}
