import { Button, Input, Modal, useInput } from '@geist-ui/react'
import React, { FunctionComponent, useState } from 'react'
import { DominantInput } from '../input/dominantInput'
import { useSessionContext } from './sessionContext'

interface ISessionConnector {
  sessionId?: string
  accessCode?: string
  buttonText?: string
}

export const SessionConnector: FunctionComponent<ISessionConnector> = ({
  sessionId,
  accessCode,
  buttonText,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const modalHandler = () => setIsModalVisible(true)
  const { state: id, bindings: sessionIdBindings } = useInput(sessionId || '')
  const { state: code, bindings: accessBindings } = useInput(accessCode || '')
  const { joinExistingSession } = useSessionContext()

  return (
    <div>
      <Button auto onClick={modalHandler}>
        {buttonText ?? 'Join Session'}
      </Button>
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Modal.Title>Join an existing session</Modal.Title>
        <Modal.Content>
          <Input
            size={1}
            placeholder="Session Id"
            width="100%"
            {...sessionIdBindings}
          />
          <DominantInput
            size={1}
            placeholder="Access Code"
            width="100%"
            {...accessBindings}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setIsModalVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          onClick={() => {
            joinExistingSession(id, code, () => setIsModalVisible(false))
          }}
        >
          Submit
        </Modal.Action>
      </Modal>
    </div>
  )
}