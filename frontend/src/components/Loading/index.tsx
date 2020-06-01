import React, { FC, ReactElement } from "react"

import { LoadingCover, LoadingIcon } from "./styles"

const Loading: FC<{}> = (): ReactElement => {
  return (
    <LoadingCover>
      <LoadingIcon src="/static/spinner.svg" alt="Loading..." />
    </LoadingCover>
  )
}

export default Loading
