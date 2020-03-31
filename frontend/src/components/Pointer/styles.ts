import styled from "styled-components"

import { PropType } from "./index"

// Cursor size in px
const SIZE = 8

export const PointerDiv = styled.div.attrs((props: PropType) => ({
  style: {
    top: props.y + "px",
    left: props.x + "px",
    backgroundColor: props.color,
  },
}))<PropType>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  position: fixed;
  z-index: 9999;
`
