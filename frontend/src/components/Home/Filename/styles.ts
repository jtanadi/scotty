import styled from "styled-components"

import { H2, H3, COLORS } from "../../globalStyles"

type ContainerPropType = {
  show: boolean
}

export const Container = styled.div<ContainerPropType>`
  text-align: center;
  opacity: ${(props): string => (props.show ? "1" : "0")};
  margin: -2.5rem 0 2rem 0;
`

export const PdfFilename = styled(H2)`
  color: ${COLORS.WHITE};
  margin: 0;
`

export const ReadyMessage = styled(H3)`
  color: ${COLORS.WHITE};
  margin: 0;
`
