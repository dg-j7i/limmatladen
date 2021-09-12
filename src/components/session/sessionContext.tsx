import { createContext, FunctionComponent, useContext, useState } from 'react'
import { FoodCategory } from '../foodSelection/foodSelection'
import { ISession } from './types'

export interface IOrderItem {
  food: FoodCategory
  main: string
  options: string[]
}

interface ISessionContext {
  currentSession: ISession | null
  createNewSession: (name: string, owner: string) => Promise<void>
}

const SessionContext = createContext<ISessionContext | undefined>(undefined)
SessionContext.displayName = 'SessionContext'

export const SessionContextProvider: FunctionComponent = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null)

  const createNewSession = async (name: string, owner: string) => {
    try {
      const newSession = await fetch('/api/sessions/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, owner }),
      }).then((res) => res.json())

      setCurrentSession(newSession)
    } catch (err) {
      console.error('Failed to create a new session:', err)
    }
  }

  return (
    <SessionContext.Provider value={{ currentSession, createNewSession }}>
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
