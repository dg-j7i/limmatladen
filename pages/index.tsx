import { Button, Grid, Spacer, Text, Page, Spinner } from '@geist-ui/react'
import React, { useEffect } from 'react'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'
import { NextPage } from 'next'
import { SessionManagement } from '../src/components/session/sessionManagement'
import styles from '../src/styles/Home.module.scss'
import { OrderList } from '../src/components/order/orderList'
import { useRouter } from 'next/router'

interface IIndexPageProps {
  sharedSession: ISharedSession | null
}

interface ISharedSession {
  id: string
  access: string
}

const IndexPage: NextPage<IIndexPageProps> = ({ sharedSession }) => {
  const { currentSession, createNewSession, getSession } = useSessionContext()
  const { push } = useRouter()

  useEffect(() => {
    if (sharedSession) {
      const joinSession = async () => {
        await getSession(sharedSession.id, sharedSession.access)
        push('/order')
      }

      joinSession()
    }
  }, [sharedSession])

  if (sharedSession) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <Spinner />
        </div>
      </div>
    )
  }

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
        <Page dotBackdrop>
          <Page.Content>
            <h1>Bestellungen</h1>
            <Spacer h={1} />
            <OrderList
              orders={currentSession.orders}
              removeOrderItem={() => null}
            />
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
