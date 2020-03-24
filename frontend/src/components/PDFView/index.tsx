import React, { ReactElement } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

import { DocumentContainer } from "./styles"

type PropType = {
  file: string
  pageNumber: number
  handleLoadSuccess({ numPages: number }): void
}

const PDFView: React.FC<PropType> = ({
  file,
  pageNumber,
  handleLoadSuccess,
}): ReactElement => {
  return (
    <DocumentContainer>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
      </Document>
    </DocumentContainer>
  )
}

export default PDFView
