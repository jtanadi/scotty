import React, { FC, ReactElement } from "react"

import { Code, Island, ModalCover } from "../globalStyles"
import {
  Title,
  ErrorButton,
  ButtonsContainer,
  Body,
  ErrorMessage,
} from "./styles"

type PropTypes = {
  error?: string
  message?: string
  handleTryAgain: () => void
}

const BeamingModal: FC<PropTypes> = ({
  error,
  message,
  handleTryAgain,
}): ReactElement => {
  const renderModalContents = (): ReactElement => {
    if (message) {
      return (
        <Body>
          <Code>{message}</Code>
        </Body>
      )
    } else if (error) {
      return (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ButtonsContainer>
            <ErrorButton onClick={handleTryAgain}>Try again</ErrorButton>
          </ButtonsContainer>
        </>
      )
    }
  }

  return (
    <ModalCover>
      <Island>
        <Title>🛸️ Beaming.... 🛸️ </Title>
        {renderModalContents()}
      </Island>
    </ModalCover>
  )
}

export default BeamingModal
