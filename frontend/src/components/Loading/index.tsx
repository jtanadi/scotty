import React, { FC, ReactElement } from "react"

import { LoadingCover, LoadingIcon } from "./styles"

const Loading: FC<{}> = (): ReactElement => {
  return (
    <LoadingCover>
      <LoadingIcon src="/static/Spinner-1s-200px.svg" alt="Loading..." />
    </LoadingCover>
  )
}

export default Loading
