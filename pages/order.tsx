import { useInput } from '@geist-ui/react'
import styles from '../src/styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import { FoodSelection } from '../src/components/foodSelection/foodSelection'
import { useSessionContext } from '../src/components/session/sessionContext'
import { NameInput } from '../src/components/order/nameInput'
import { SessionTeaser } from '../src/components/session/sessionTeaser'

const OrderPage = () => {
  const { currentSession } = useSessionContext()
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
          <SessionTeaser />
        )}
      </div>
    </div>
  )
}

export default OrderPage
