import React, { FC, ReactElement } from "react"

import { DocumentContainer, Image } from "./styles"

type PropTypes = {
  pdfUrl: string
  pageNum: number
  pages: string[]
}

const View: FC<PropTypes> = ({ pdfUrl, pages, pageNum }): ReactElement => {
  return (
    <DocumentContainer>
      <Image src={`${pdfUrl}/${pages[pageNum - 1]}`} />
    </DocumentContainer>
  )
}

export default View
