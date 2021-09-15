import {
  Button,
  Card,
  Description,
  Drawer,
  Grid,
  Spacer,
  useClipboard,
  useToasts,
} from '@geist-ui/react'
import { Share2, RefreshCw } from '@geist-ui/react-icons'
import React, { FunctionComponent, useState } from 'react'
import { getEmailTemplate } from '../order/emailTemplate'
import { OrderList } from '../order/orderList'
import { useSessionContext } from './sessionContext'

export const SessionManagement: FunctionComponent = () => {
  const { currentSession, getSession } = useSessionContext()
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [, setToast] = useToasts()
  const { copy } = useClipboard()

  if (!currentSession) {
    return null
  }

  const sessionId = currentSession?._id
  const sessionAccess = currentSession?.access

  const handleClipboard = (id: string, access: string) => {
    copy(`${window.location.href}?id=${id}&access=${access}`)
    setToast({ text: 'Link copied' })
  }

  return (
    <Grid.Container justify="center" alignItems="center">
      <Spacer h={4} />
      <Grid xs={24} sm={12} direction="column">
        <Card>
          <Description
            title={
              currentSession.owner
                ? `Session owner: ${currentSession.owner}`
                : null
            }
            content={`Orders`}
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
                {currentSession.orders.length ? (
                  <Button type="secondary-light">Create Email</Button>
                ) : null}
              </a>
              <div>
                <Button
                  auto
                  type="abort"
                  onClick={() => setIsDrawerVisible(true)}
                  style={{ marginRight: '8px' }}
                >
                  Details
                </Button>
                {sessionId && sessionAccess && (
                  <Button
                    auto
                    icon={<Share2 />}
                    onClick={() => handleClipboard(sessionId, sessionAccess)}
                    style={{ marginRight: '8px' }}
                  >
                    Share
                  </Button>
                )}
                <Button
                  auto
                  icon={<RefreshCw />}
                  onClick={() => getSession(sessionId, sessionAccess)}
                >
                  Refresh
                </Button>
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
  )
}
