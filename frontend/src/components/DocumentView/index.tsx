import React, { FC, ReactElement, MouseEvent } from "react"

import { DocumentContainer, Page } from "./styles"

type PropTypes = {
  src: string
}

const View: FC<PropTypes> = ({ src }): ReactElement => {
  const handleContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
  }

  return (
    <DocumentContainer>
      <Page src={src} onContextMenu={handleContextMenu} />
    </DocumentContainer>
  )
}

export default View
