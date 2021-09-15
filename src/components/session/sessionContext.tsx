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
  getSession: (
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

  const getSession = async (
    sessionId: string,
    accessCode: string,
    callback?: () => void
  ) => {
    try {
      const getSession = await fetch(
        `/api/sessions/${sessionId}?access=${accessCode}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      ).then((res) => res.json())

      setCurrentSession({
        ...currentSession,
        ...getSession,
        access: accessCode,
      })
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error('Failed to load new session:', err)
    }
  }

  return (
    <SessionContext.Provider
      value={{ currentSession, createNewSession, getSession }}
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
