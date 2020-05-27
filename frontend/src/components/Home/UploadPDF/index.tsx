import React, { FC, ReactElement, MouseEvent } from "react"
import { UploadButton, UploadButtonText } from "./styles"

type PropTypes = {
  disabled: boolean
  reset: boolean
  handleUpload(e: MouseEvent): Promise<void>
}

const UploadPDF: FC<PropTypes> = ({
  disabled,
  handleUpload,
  reset,
}): ReactElement => {
  return (
    <UploadButton disabled={disabled} onClick={handleUpload} reset={reset}>
      <UploadButtonText reset={reset}>Beam me up, Scotty!</UploadButtonText>
    </UploadButton>
  )
}

export default UploadPDF
