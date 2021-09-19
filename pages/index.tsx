import { Spacer, Page, Spinner } from '@geist-ui/react'
import React, { useEffect } from 'react'
import { useSessionContext } from '../src/components/session/sessionContext'
import { NextPage } from 'next'
import { SessionManagement } from '../src/components/session/sessionManagement'
import styles from '../src/styles/Home.module.scss'
import { OrderList } from '../src/components/order/orderList'
import { useRouter } from 'next/router'
import { SessionTeaser } from '../src/components/session/sessionTeaser'

interface IIndexPageProps {
  sharedSession: ISharedSession | null
}

interface ISharedSession {
  id: string
  access: string
}

const IndexPage: NextPage<IIndexPageProps> = ({ sharedSession }) => {
  const { currentSession, getSession } = useSessionContext()
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

  useEffect(() => {
    if (currentSession) {
      getSession(currentSession._id, currentSession.access)
    }
  }, [currentSession])

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
            <SessionTeaser />
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
