import React, { FC, ReactElement } from "react"

import { Island, ModalCover, Bold } from "../globalStyles"
import {
  Filename,
  ErrorButton,
  ButtonsContainer,
  LoadingIcon,
  Message,
  ErrorMessage,
} from "./styles"

type PropTypes = {
  filename: string
  error?: string
  message?: string
  handleTryAgain: () => void
}

const BeamingModal: FC<PropTypes> = ({
  filename,
  error,
  message,
  handleTryAgain,
}): ReactElement => {
  const renderModalContents = (): ReactElement => {
    if (error) {
      return (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <ButtonsContainer>
            <ErrorButton onClick={handleTryAgain}>Try again</ErrorButton>
          </ButtonsContainer>
        </>
      )
    } else if (message) {
      return (
        <>
          <LoadingIcon src="/static/spinner.svg" alt="Loading..." />
          <Message>{message}</Message>
        </>
      )
    }
  }

  return (
    <ModalCover>
      <Island>
        <Filename>
          Beaming <Bold>{filename}</Bold>
        </Filename>
        {renderModalContents()}
      </Island>
    </ModalCover>
  )
}

export default BeamingModal
