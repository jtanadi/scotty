import React, { ReactElement, FC, useRef, useEffect, useState } from "react"

import { Code } from "../globalStyles"
import {
  LinkModalCover,
  Island,
  Input,
  ButtonsContainer,
  OKButton,
  HR,
  Title,
  Subtitle,
  Body,
  QuoteAttr,
} from "./styles"

type PropTypes = {
  link: string
}

const LinkModal: FC<PropTypes> = ({ link }): ReactElement => {
  const [show, setShow] = useState(true)
  const handleOK = (): void => {
    setShow(false)
  }

  const inputRef = useRef(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  const renderModal = (): ReactElement => {
    return (
      <LinkModalCover>
        <Island>
          <Title>You&rsquo;re all set!</Title>
          <Body>Copy and share the following link to invite others.</Body>

          <Input ref={inputRef} readOnly value={link} />

          <ButtonsContainer>
            <OKButton onClick={handleOK}>OK</OKButton>
          </ButtonsContainer>

          <HR />

          <Subtitle>
            &ldquo;You suspect some danger?&rdquo;
            <QuoteAttr>—Captain Kirk</QuoteAttr>
          </Subtitle>
          <Body>
            <Code>scotty</Code> is encrypted end-to-end. PDFs are only available
            for the duration of the session and are stored in a restricted S3
            bucket with very limited read/write access.
          </Body>
        </Island>
      </LinkModalCover>
    )
  }

  return show ? renderModal() : null
}

export default LinkModal
