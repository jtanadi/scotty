import React, { FC, ReactElement, MouseEvent } from "react"
import { UploadButton, UploadButtonText } from "./styles"

type PropTypes = {
  disabled: boolean
  inUploadMode: boolean
  handleUpload(e: MouseEvent): Promise<void>
}

const UploadPDF: FC<PropTypes> = ({
  disabled,
  handleUpload,
  inUploadMode,
}): ReactElement => {
  return (
    <UploadButton
      disabled={disabled}
      onClick={handleUpload}
      inUploadMode={inUploadMode}
    >
      <UploadButtonText inUploadMode={inUploadMode}>
        Beam me up, Scotty!
      </UploadButtonText>
    </UploadButton>
  )
}

export default UploadPDF
