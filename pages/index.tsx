import { Button, Grid, Spacer, Text, Page } from '@geist-ui/react'
import React, { useEffect } from 'react'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'
import { NextPage } from 'next'
import { SessionManagement } from '../src/components/session/sessionManagement'
import styles from '../src/styles/Home.module.scss'

interface IIndexPageProps {
  sharedSession: ISharedSession | null
}

interface ISharedSession {
  id: string
  access: string
}

const IndexPage: NextPage<IIndexPageProps> = ({ sharedSession }) => {
  const { currentSession, createNewSession, getSession } = useSessionContext()

  useEffect(() => {
    if (sharedSession) {
      getSession(sharedSession.id, sharedSession.access)
    }
  }, [sharedSession])

  return (
    <>
      {!currentSession ? (
        <div className={styles.container}>
          <div className={styles.main}>
            <Grid.Container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Spacer h={3} />
              <Text h1>Start a Session to Order</Text>
              <Spacer h={1} />
              <Grid.Container gap={2} justify="center">
                <Grid>
                  <Button
                    type="secondary"
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
          </div>
        </div>
      ) : (
        <Page>
          <Page.Content>
            <SessionManagement />
          </Page.Content>
        </Page>
      )}
    </>
  )
}

IndexPage.getInitialProps = async ({ query }) => {
  const { id, access } = query

  if (typeof id === 'string' && typeof access === 'string') {
    return {
      sharedSession: {
        id,
        access,
      },
    }
  }

  return { sharedSession: null }
}

export default IndexPage
