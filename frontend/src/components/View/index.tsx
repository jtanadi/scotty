import React, { FC, ReactElement } from "react"

type PropTypes = {
  pdfUrl: string
  pageNum: number
}

const View: FC<PropTypes> = ({ pdfUrl, pageNum }): ReactElement => {
  return <img src={`${pdfUrl}/page-${pageNum}.png`} />
}

export default View
