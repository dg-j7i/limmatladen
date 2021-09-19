import { Button, Input, Modal, Spacer, useInput } from '@geist-ui/react'
import React, { FunctionComponent, useState } from 'react'
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
  const { getSession } = useSessionContext()
  const { state: id, bindings: sessionIdBindings } = useInput(sessionId || '')
  const { state: code, bindings: accessBindings } = useInput(accessCode || '')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const modalHandler = () => setIsModalVisible(true)

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
          <Spacer h={1} />
          <Input
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
            getSession(id, code, () => setIsModalVisible(false))
          }}
          disabled={!id || !code}
          type="success-light"
        >
          Join
        </Modal.Action>
      </Modal>
    </div>
  )
}
