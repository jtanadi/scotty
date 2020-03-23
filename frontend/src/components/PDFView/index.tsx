import React, { ReactElement } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

import { ViewContainer, DocumentContainer } from "./styles"

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
    <ViewContainer>
      <DocumentContainer>
        <Document file={file} onLoadSuccess={handleLoadSuccess}>
          <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
        </Document>
      </DocumentContainer>
    </ViewContainer>
  )
}

export default PDFView
