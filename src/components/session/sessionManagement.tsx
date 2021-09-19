import { Button, Grid, useClipboard, useToasts, Text } from '@geist-ui/react'
import { Share2, RefreshCw, Plus, CheckInCircle } from '@geist-ui/react-icons'
import React, { FunctionComponent } from 'react'
import { getEmailTemplate } from '../order/emailTemplate'
import { useSessionContext } from './sessionContext'
import styles from './sessionManagement.module.scss'

export const SessionManagement: FunctionComponent = () => {
  const { currentSession, getSession, createNewSession } = useSessionContext()
  const [, setToast] = useToasts()
  const { copy } = useClipboard()

  if (!currentSession) {
    return null
  }

  const sessionId = currentSession?._id
  const sessionAccess = currentSession?.access

  const handleClipboard = (id: string, access: string) => {
    copy(`${window.location.href}?id=${id}&access=${access}`)
    setToast({
      text: (
        <Text className={styles.toastWithIcon}>
          <CheckInCircle color="green" />
          {'  '}
          Session link copied to clipboard.
        </Text>
      ),
    })
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
        </Grid.Container>
      </div>
    </div>
  )
}
