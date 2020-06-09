import styled from "styled-components"

import { H2, H3, COLORS } from "../../globalStyles"

export const Container = styled.div`
  text-align: center;
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
