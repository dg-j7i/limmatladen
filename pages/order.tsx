import { Button, Grid, Spacer, Text, useInput } from '@geist-ui/react'
import styles from '../src/styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import { FoodSelection } from '../src/components/foodSelection/foodSelection'
import { SessionConnector } from '../src/components/session/sessionConnector'
import { useSessionContext } from '../src/components/session/sessionContext'
import { NameInput } from '../src/components/order/nameInput'

const OrderPage = () => {
  const { currentSession, createNewSession } = useSessionContext()
  const { state: person, bindings } = useInput('')
  const [hasPerson, setHasPerson] = useState(false)

  useEffect(() => {
    let delayDebounceQuery: ReturnType<typeof setTimeout>

    if (person.length >= 2) {
      delayDebounceQuery = setTimeout(() => setHasPerson(true), 600)
    } else {
      setHasPerson(false)
    }
    return () => clearTimeout(delayDebounceQuery)
  }, [person])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {currentSession ? (
          <>
            <NameInput {...bindings} label={'Dein Name'} />
            {hasPerson && <FoodSelection person={person} />}
          </>
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
