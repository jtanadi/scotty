import React, { ReactElement, useEffect, useState, useRef } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

import { DocumentContainer } from "./styles"
import { sumPadding } from "../../utils/sumPadding"

const defaultPadding = {
  top: "",
  right: "",
  bottom: "",
  left: "",
}

type PropType = {
  file: string
  pageNumber: number
  scale: number
  handleLoadSuccess({ numPages: number }): void
}

const PDFView: React.FC<PropType> = ({
  file,
  pageNumber,
  scale,
  handleLoadSuccess,
}): ReactElement => {
  const docContainerRef = useRef(null)
  const [docPadding, setDocPadding] = useState(defaultPadding)
  const calcContainerPadding = (): void => {
    const {
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    } = window.getComputedStyle(docContainerRef.current)
    setDocPadding({
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft,
    })
  }

  const [constrainByWidth, setConstrainByWidth] = useState(false)
  const handleRatioConstrains = (ref: HTMLDivElement): void => {
    if (!ref) return

    // Determine if we should use width or height constrain
    // by comparing PDF ratio to window ratio
    const { clientWidth, clientHeight } = ref
    const pdfRatio = clientWidth / clientHeight

    const { top, bottom, left, right } = docPadding
    const vPad = sumPadding(top, bottom)
    const hPad = sumPadding(left, right)
    const innerRatio = (window.innerWidth - hPad) / (window.innerHeight - vPad)

    // If window is taller than PDF, constrain by width
    // otherwise constrain by height
    if (innerRatio < pdfRatio) {
      return setConstrainByWidth(true)
    }
    return setConstrainByWidth(false)
  }

  const [pageHeight, setPageHeight] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const handleResize = (): void => {
    // pageWidth has precedence over pageHeight
    const { top, bottom, left, right } = docPadding

    if (constrainByWidth) {
      const calculatedPadding = sumPadding(left, right)
      setPageWidth(window.innerWidth - calculatedPadding)
      setPageHeight(0)
    } else {
      const calculatedPadding = sumPadding(top, bottom)
      setPageHeight(window.innerHeight - calculatedPadding)
      setPageWidth(0)
    }
  }

  useEffect((): (() => void) => {
    calcContainerPadding()
    handleResize()
    window.addEventListener("resize", handleResize)

    return (): void => {
      window.removeEventListener("resize", handleResize)
    }
  }, [constrainByWidth])

  return (
    <DocumentContainer ref={docContainerRef}>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        <Page
          height={pageHeight}
          width={pageWidth}
          pageNumber={pageNumber}
          scale={scale}
          inputRef={handleRatioConstrains}
          renderAnnotationLayer={false}
        />
      </Document>
    </DocumentContainer>
  )
}

export default PDFView
