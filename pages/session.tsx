import { Button } from '@geist-ui/react'
import { useSessionContext } from '../src/components/session/sessionContext'

const SessionPage = () => {
  const { currentSession, createNewSession } = useSessionContext()

  return (
    <div className="bg-white dark:bg-black">
      <Button onClick={() => createNewSession('Fancy Pancy', 'Lila')}>
        Create New
      </Button>
      {currentSession && <pre>{JSON.stringify(currentSession, null, 2)}</pre>}
    </div>
  )
}

export default SessionPage
