import styled from "styled-components"

import { PropType } from "./index"

// Cursor size in px
const SIZE = 8

export const PointerDiv = styled.div.attrs((props: PropType) => ({
  style: {
    top: `${props.y - SIZE / 2}px`,
    left: `${props.x - SIZE / 2}px`,
    backgroundColor: props.color,
  },
}))<PropType>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  position: fixed;
  z-index: 999;
  pointer-events: none;
`
