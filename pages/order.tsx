import { Button, Grid, Spacer, Text } from '@geist-ui/react'
import styles from '../src/styles/Home.module.scss'
import React from 'react'
import { FoodSelection } from '../src/components/foodSelection/foodSelection'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'

const OrderPage = () => {
  const { currentSession, createNewSession } = useSessionContext()

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {currentSession ? (
          <FoodSelection />
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default OrderPage
