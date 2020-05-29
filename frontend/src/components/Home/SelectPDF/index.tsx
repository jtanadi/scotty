import React, { FC, ReactElement, ChangeEvent } from "react"

import { COLORS } from "../../globalStyles"
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
          <Icon
            width="35"
            height="25"
            viewBox="0 0 35 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.24 24H7.6L1 8.07692H5.84M32.24 24L26.08 8.07692H5.84M32.24 24L34 3.65385H13.76L14.2 1H6.72L5.84 8.07692"
              stroke={COLORS.MUSTARD}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
        </IconWrapper>
      </Label>
    </>
  )
}

export default SelectPDF
