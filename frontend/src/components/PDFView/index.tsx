import React, { ReactElement } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

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
    <div>
      <h3>Page {pageNumber}</h3>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  )
}

export default PDFView
