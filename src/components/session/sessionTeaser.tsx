import { Grid, Text, Spacer, Button } from '@geist-ui/react'
import React from 'react'
import { SessionConnector } from './sessionConnector'
import { useSessionContext } from './sessionContext'

export const SessionTeaser = () => {
  const { createNewSession } = useSessionContext()

  return (
    <Grid.Container direction="column" justify="center" alignItems="center">
      <Spacer h={3} />
      <Text h1>Start a Session to Order</Text>
      <Spacer h={1} />
      <Grid.Container gap={2} justify="center">
        <Grid>
          <Button
            type="secondary-light"
            onClick={() => createNewSession('John')}
          >
            New Session
          </Button>
        </Grid>
        <Grid>
          <SessionConnector buttonText={'Join Existing'} />
        </Grid>
      </Grid.Container>
      <Spacer h={2} />
    </Grid.Container>
  )
}
