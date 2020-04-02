import React, { ReactElement, useEffect, useState, useRef } from "react"
import { Document, Page } from "react-pdf/dist/entry.webpack"

import Loading from "../Loading"

import { DocumentContainer, PageContainer } from "./styles"
import { Padding, sumPadding } from "../../utils/paddingUtils"

type Dims = {
  width: number
  height: number
}

const defaultPadding: Padding = {
  top: "",
  right: "",
  bottom: "",
  left: "",
}

const defaultDims: Dims = {
  width: 0,
  height: 0,
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
  const [docPadding, setDocPadding] = useState<Padding>(defaultPadding)
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

  const [originalDims, setOriginalDims] = useState<Dims>(defaultDims)
  const handlePageSuccess = ({ originalWidth, originalHeight }): void => {
    setOriginalDims({ width: originalWidth, height: originalHeight })
  }

  const [pageDims, setPageDims] = useState<Dims>(defaultDims)
  const handleResize = (): void => {
    if (!originalDims.width && !originalDims.height) return

    const pageRatio = originalDims.width / originalDims.height

    const { top, bottom, left, right } = docPadding
    const viewWidth = window.innerWidth - sumPadding(left, right)
    const viewHeight = window.innerHeight - sumPadding(top, bottom)
    const viewRatio = viewWidth / viewHeight

    // If window is taller than PDF, constrain by width
    // otherwise constrain by height
    if (viewRatio < pageRatio) {
      return setPageDims({ width: viewWidth, height: 0 })
    }
    return setPageDims({ height: viewHeight, width: 0 })
  }

  useEffect((): void => {
    calcContainerPadding()
  }, [])

  useEffect((): (() => void) => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return (): void => {
      window.removeEventListener("resize", handleResize)
    }
  }, [originalDims])

  console.log("Render")

  return (
    <DocumentContainer ref={docContainerRef}>
      <Document
        loading={<Loading />}
        file={file}
        onLoadSuccess={handleLoadSuccess}
      >
        <PageContainer>
          <Page
            height={pageDims.height}
            width={pageDims.width}
            onLoadSuccess={handlePageSuccess}
            pageNumber={pageNumber}
            scale={scale}
            renderAnnotationLayer={false}
          />
        </PageContainer>
      </Document>
    </DocumentContainer>
  )
}

export default PDFView
