import React, { FC, ReactElement } from "react"

import { Container, PdfFilename, ReadyMessage } from "./styles"

type PropTypes = {
  show: boolean
  filename: string
}

const Filename: FC<PropTypes> = ({ show, filename }): ReactElement => {
  return (
    <Container show={show}>
      <ReadyMessage>Ready to beam</ReadyMessage>
      <PdfFilename>{filename || "filename placeholder"}</PdfFilename>
    </Container>
  )
}

export default Filename
