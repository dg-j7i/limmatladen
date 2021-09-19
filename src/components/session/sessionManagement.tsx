import { Button, Drawer, Grid, useClipboard, useToasts } from '@geist-ui/react'
import { Share2, RefreshCw, Plus } from '@geist-ui/react-icons'
import React, { FunctionComponent, useState } from 'react'
import { getEmailTemplate } from '../order/emailTemplate'
import { useSessionContext } from './sessionContext'
import styles from './sessionManagement.module.scss'

export const SessionManagement: FunctionComponent = () => {
  const { currentSession, getSession, createNewSession } = useSessionContext()
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
    <div className={styles.sessionManagement}>
      <div className={styles.sessionManagementInner}>
        <Grid.Container justify="space-between" alignItems="center" gap={1}>
          {sessionId && sessionAccess && (
            <>
              <Grid xs={24} sm>
                <a
                  href={`https://outlook.office.com/?path=/mail/action/compose&to=banhmi@limmatladen.ch?subject=Bestellung%20heute%20um%2012:00%20Uhr&body=${encodeURI(
                    getEmailTemplate(currentSession.orders)
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {currentSession.orders.length ? (
                    <Button type="secondary-light">Email erstellen</Button>
                  ) : null}
                </a>
              </Grid>
              <Grid>
                <Grid.Container gap={1}>
                  <Grid xs={0} sm>
                    <Button
                      auto
                      type="abort"
                      onClick={() => setIsDrawerVisible(true)}
                      style={{ marginRight: '8px' }}
                    >
                      Details
                    </Button>
                  </Grid>
                  <Grid xs={24} sm>
                    <Button
                      auto
                      type="abort"
                      icon={<Plus />}
                      onClick={() => createNewSession('System')}
                      style={{ marginRight: '8px' }}
                    >
                      New
                    </Button>
                    {sessionId && sessionAccess && (
                      <Button
                        auto
                        icon={<Share2 />}
                        onClick={() =>
                          handleClipboard(sessionId, sessionAccess)
                        }
                        style={{ marginRight: '8px' }}
                      >
                        Share
                      </Button>
                    )}
                  </Grid>
                  <Grid xs={24} sm>
                    <Button
                      auto
                      type="success-light"
                      icon={<RefreshCw />}
                      onClick={() => getSession(sessionId, sessionAccess)}
                    >
                      Refresh
                    </Button>
                  </Grid>
                </Grid.Container>
              </Grid>
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
        </Grid.Container>
      </div>
    </div>
  )
}
