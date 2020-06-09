import React, { FC, ReactElement } from "react"

import { Container, PdfFilename, ReadyMessage } from "./styles"

type PropTypes = {
  mode: string
  filename: string
}

const Prompt: FC<PropTypes> = ({ mode, filename }): ReactElement => {
  const renderMessage = (): ReactElement => {
    switch (mode) {
      case "select":
        return (
          <>
            <ReadyMessage>To get started</ReadyMessage>
            <PdfFilename>select a PDF file</PdfFilename>
          </>
        )
      case "upload":
        return (
          <>
            <ReadyMessage>Ready to beam</ReadyMessage>
            <PdfFilename>{filename || "filename placeholder"}</PdfFilename>
          </>
        )
      default:
        return null
    }
  }

  return <Container>{renderMessage()}</Container>
}

export default Prompt
