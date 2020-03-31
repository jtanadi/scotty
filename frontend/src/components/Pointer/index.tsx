import React, { FC, ReactElement } from "react"

import { PointerDiv } from "./styles"

export type PropType = {
  x: number
  y: number
  color: string
}

const Pointer: FC<PropType> = ({ x, y, color }): ReactElement => {
  return <PointerDiv x={x} y={y} color={color} />
}

export default Pointer
