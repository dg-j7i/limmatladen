import { Grid, Text, Spacer, Button, Spinner } from '@geist-ui/react'
import React, { FunctionComponent, useState } from 'react'
import { SessionConnector } from './sessionConnector'
import { useSessionContext } from './sessionContext'

export const SessionTeaser: FunctionComponent = () => {
  const { createNewSession } = useSessionContext()
  const [isCreatingNewSession, setIsCreatingNewSession] = useState(false)

  return (
    <Grid.Container direction="column" justify="center" alignItems="center">
      {isCreatingNewSession ? (
        <Spinner />
      ) : (
        <>
          <Spacer h={3} />
          <Text h1>Start a Session to Order</Text>
          <Spacer h={1} />
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Button
                type="secondary-light"
                onClick={() => {
                  setIsCreatingNewSession(true)
                  createNewSession('unknown')
                }}
              >
                New Session
              </Button>
            </Grid>
            <Grid>
              <SessionConnector buttonText={'Join Existing'} />
            </Grid>
          </Grid.Container>
          <Spacer h={2} />
        </>
      )}
    </Grid.Container>
  )
}
