import { createContext, FunctionComponent, useContext } from 'react'
import { getRandomName } from '../../utils/getRandomName'
import { useSessionStorageState } from '../../utils/useSessionStorageState'
import { IOrder } from '../order/types'

export interface ISession {
  _id: string
  name: string
  owner: string
  orders: IOrder[]
  isActive: boolean
  verification: string
  access: string
}

interface ISessionContext {
  currentSession: ISession | null
  createNewSession: (owner: string, name?: string) => Promise<void>
  joinExistingSession: (
    id: string,
    accessCode: string,
    callback?: () => void
  ) => Promise<void>
}

const SessionContext = createContext<ISessionContext | undefined>(undefined)
SessionContext.displayName = 'SessionContext'

export const SessionContextProvider: FunctionComponent = ({ children }) => {
  const [currentSession, setCurrentSession] = useSessionStorageState<ISession>(
    'current_session',
    null
  )

  const createNewSession = async (owner: string, name?: string) => {
    const sessionName = name || getRandomName()
    try {
      const newSession = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ name: sessionName, owner }),
      }).then((res) => res.json())

      setCurrentSession(newSession)
    } catch (err) {
      console.error('Failed to create a new session:', err)
    }
  }

  const joinExistingSession = async (
    sessionId: string,
    accessCode: string,
    callback?: () => void
  ) => {
    try {
      const existingSession = await fetch('/api/sessions/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ sessionId, accessCode }),
      }).then((res) => res.json())

      setCurrentSession(existingSession)
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error('Failed to create a new session:', err)
    }
  }

  return (
    <SessionContext.Provider
      value={{ currentSession, createNewSession, joinExistingSession }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext(): ISessionContext {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error(
      'SessionContext must be used within a SessionContextProvider.'
    )
  }

  return context
}
