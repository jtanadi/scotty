import React, { FC, ReactElement, ChangeEvent } from "react"

import { Label, Input, Icon, IconWrapper } from "./styles"

type PropType = {
  handleFile(e: ChangeEvent<HTMLInputElement>): void
  pdfFile: File
}

const SelectPDF: FC<PropType> = ({ handleFile }): ReactElement => {
  return (
    <>
      <Input
        type="file"
        id="file-input"
        accept="application/pdf"
        onChange={handleFile}
      />
      <Label htmlFor="file-input">
        <IconWrapper>
          <Icon />
        </IconWrapper>
      </Label>
    </>
  )
}

export default SelectPDF
