import React, { ReactElement, useEffect, useState, useRef } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

import { DocumentContainer } from "./styles"
import { sumPadding } from "../../utils/sumPadding"

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
  const [containerPadding, setContainerPadding] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  })
  const getContainerPadding = (): void => {
    const {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    } = window.getComputedStyle(docContainerRef.current)
    setContainerPadding({
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft,
    })
  }
  const docContainerRef = useRef(null)
  const [useHeight, setUseHeight] = useState(false)
  const [useWidth, setUseWidth] = useState(false)
  const handlePageRef = (ref: HTMLDivElement): void => {
    if (!ref) return

    const vertPadding = sumPadding({
      top: containerPadding.top,
      bottom: containerPadding.bottom,
    })
    const horzPadding = sumPadding({
      left: containerPadding.left,
      right: containerPadding.right,
    })
    const { clientWidth, clientHeight } = ref
    if (clientWidth + horzPadding > window.innerWidth) {
      setUseWidth(true)
    } else if (clientHeight + vertPadding > window.innerHeight) {
      setUseHeight(true)
    }
  }

  const [pageHeight, setPageHeight] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const handleResize = (): void => {
    // pageWidth has precedence over pageHeight
    if (useWidth) {
      const calculatedPadding = sumPadding({
        left: containerPadding.left,
        right: containerPadding.right,
      })
      setPageWidth(window.innerWidth - calculatedPadding)
    } else if (useHeight) {
      const calculatedPadding = sumPadding({
        top: containerPadding.top,
        bottom: containerPadding.bottom,
      })
      setPageHeight(window.innerHeight - calculatedPadding)
    }
  }

  useEffect((): (() => void) => {
    getContainerPadding()
    handleResize()
    window.addEventListener("resize", handleResize)

    return (): void => {
      window.removeEventListener("resize", handleResize)
    }
  }, [useHeight, useWidth])

  return (
    <DocumentContainer ref={docContainerRef}>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        <Page
          height={pageHeight}
          width={pageWidth}
          pageNumber={pageNumber}
          inputRef={handlePageRef}
          renderAnnotationLayer={false}
        />
      </Document>
    </DocumentContainer>
  )
}

export default PDFView
