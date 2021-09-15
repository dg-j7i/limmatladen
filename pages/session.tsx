import {
  Button,
  Grid,
  Card,
  Spacer,
  Page,
  Description,
  Text,
  Drawer,
  useToasts,
  useClipboard,
} from '@geist-ui/react'
import React, { useEffect, useState } from 'react'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'
import { RefreshCw, Info } from '@geist-ui/react-icons'
import { OrderList } from '../src/components/order/orderList'
import { getEmailTemplate } from '../src/components/order/emailTemplate'
import { NextPage } from 'next'

interface ISessionPageProps {
  sharedSession: ISharedSession | null
}

interface ISharedSession {
  id: string
  access: string
}

const SessionPage: NextPage<ISessionPageProps> = ({ sharedSession }) => {
  const { currentSession, createNewSession, getSession } = useSessionContext()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [, setToast] = useToasts()
  const { copy } = useClipboard()

  useEffect(() => {
    if (sharedSession) {
      getSession(sharedSession.id, sharedSession.access)
    }
  }, [sharedSession])

  const handleClipboard = (id: string, access: string) => {
    copy(`${window.location.href}?id=${id}&access=${access}`)
    setToast({ text: 'Link copied' })
  }

  const sessionId = currentSession?._id
  const sessionAccess = currentSession?.access

  return (
    <Page>
      <Page.Content>
        <Grid.Container direction="column" justify="center" alignItems="center">
          <Spacer h={3} />
          <Text h1>Start a Session to Order</Text>
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
            {sessionId && sessionAccess && (
              <Grid>
                <Button
                  width="100%"
                  onClick={() => handleClipboard(sessionId, sessionAccess)}
                >
                  Share Session
                </Button>
              </Grid>
            )}
          </Grid.Container>
          <Spacer h={2} />
        </Grid.Container>
        {currentSession && (
          <Grid.Container justify="center" alignItems="center">
            <Spacer h={4} />
            <Grid xs={24} sm={12} direction="column">
              <Card>
                <Description
                  title={`Orders`}
                  content={currentSession.owner ?? null}
                />
                <Spacer h={1} />
                <OrderList
                  orders={currentSession.orders}
                  removeOrderItem={() => null}
                />
              </Card>
              {sessionId && sessionAccess && (
                <>
                  <Spacer h={1} />
                  <Grid.Container justify="space-between">
                    <a
                      href={`https://outlook.office.com/?path=/mail/action/compose&to=banhmi@limmatladen.ch?subject=Bestellung%20heute%20um%2012:00%20Uhr&body=${encodeURI(
                        getEmailTemplate(currentSession.orders)
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button type="secondary-light">Create Email</Button>
                    </a>
                    <div>
                      <Button
                        auto
                        type="abort"
                        iconRight={<Info />}
                        onClick={() => setIsDrawerVisible(true)}
                        style={{ marginRight: '8px' }}
                      />
                      <Button
                        auto
                        iconRight={<RefreshCw />}
                        onClick={() => getSession(sessionId, sessionAccess)}
                      />
                    </div>
                  </Grid.Container>
                </>
              )}

              <Drawer
                visible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                placement={'bottom'}
              >
                <Drawer.Title>Session Data</Drawer.Title>
                <Drawer.Content>
                  <pre>{JSON.stringify(currentSession, null, 2)}</pre>
                </Drawer.Content>
              </Drawer>
            </Grid>
          </Grid.Container>
        )}
      </Page.Content>
    </Page>
  )
}

SessionPage.getInitialProps = async ({ query }) => {
  const { id, access } = query

  if (id && access) {
    return {
      sharedSession: {
        id,
        access,
      },
    }
  }

  return { sharedSession: null }
}

export default SessionPage
