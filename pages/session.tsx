import { Button, Grid, Spacer, Page } from '@geist-ui/react'
import React from 'react'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'

const SessionPage = () => {
  const { currentSession, createNewSession } = useSessionContext()

  return (
    <Page>
      <Page.Header center>
        <Grid.Container justify="center">
          <Grid>
            <Spacer h={6} />
            <h1>Start Collecting Orders</h1>
          </Grid>
        </Grid.Container>
      </Page.Header>
      <Page.Content>
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Button
              type="secondary"
              onClick={() => createNewSession('Fancy Pancy', 'Lila')}
            >
              New Session
            </Button>
          </Grid>
          <Grid>
            <SessionConnector buttonText={'Join Existing'} />
          </Grid>
        </Grid.Container>
        {currentSession && (
          <Grid.Container justify="center" alignItems="center">
            <Grid>
              <Spacer h={4} />
              <pre>{JSON.stringify(currentSession, null, 2)}</pre>
            </Grid>
          </Grid.Container>
        )}
      </Page.Content>
    </Page>
  )
}

export default SessionPage
