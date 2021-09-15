import {
  Button,
  Grid,
  Card,
  Spacer,
  Page,
  Description,
  Text,
} from '@geist-ui/react'
import React from 'react'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'
import { RefreshCw } from '@geist-ui/react-icons'

const SessionPage = () => {
  const { currentSession, createNewSession, getSession } = useSessionContext()

  return (
    <Page>
      <Page.Content>
        <Grid.Container direction="column" justify="center" alignItems="center">
          <Spacer h={3} />
          <Text h1>Start Collecting Orders</Text>
          <Spacer h={1} />
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Button type="secondary" onClick={() => createNewSession('John')}>
                New Session
              </Button>
            </Grid>
            <Grid>
              <SessionConnector buttonText={'Join Existing'} />
            </Grid>
          </Grid.Container>
          <Spacer h={2} />
        </Grid.Container>
        {currentSession && (
          <Grid.Container justify="center" alignItems="center">
            <Grid>
              <Spacer h={4} />
              <Card shadow>
                <Description
                  title="Current Session"
                  content={currentSession.name}
                />
                <pre>{JSON.stringify(currentSession, null, 2)}</pre>
              </Card>
              {currentSession?._id && (
                <>
                  <Spacer h={1} />
                  <Grid.Container justify="flex-end">
                    <Button
                      auto
                      iconRight={<RefreshCw />}
                      onClick={() =>
                        getSession(currentSession?._id, currentSession?.access)
                      }
                    />
                  </Grid.Container>
                </>
              )}
            </Grid>
          </Grid.Container>
        )}
      </Page.Content>
    </Page>
  )
}

export default SessionPage
