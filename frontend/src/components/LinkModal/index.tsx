import React, { ReactElement, FC, useRef, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

import {
  Cover,
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
import { Code } from "../globalStyles"

type PropTypes = {
  link: string
}

const LinkModal: FC<PropTypes> = ({ link }): ReactElement => {
  const [ready, setReady] = useState(false)
  const handleOK = (): void => {
    setReady(true)
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
      <Cover>
        <Island>
          <Title>You&rsquo;re all set!</Title>
          <Body>Copy and share the following link to invite others.</Body>

          <Input ref={inputRef} readOnly value={link} />

          <ButtonsContainer>
            <OKButton onClick={handleOK}>OK</OKButton>
          </ButtonsContainer>

          <HR />

          <Subtitle>
            &ldquo;You suspect some danger?&rdquo;{" "}
            <QuoteAttr>—Captain Kirk</QuoteAttr>
          </Subtitle>
          <Body>
            <Code>scotty</Code> is encrypted end-to-end. PDFs are only available
            for the duration of the session and are stored in a restricted S3
            bucket with very limited access.
          </Body>
        </Island>
      </Cover>
    )
  }

  return ready ? (
    <Redirect to={`${link.replace(window.location.toString(), "/")}`} />
  ) : (
    renderModal()
  )
}

export default LinkModal
