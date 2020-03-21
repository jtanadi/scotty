import React, { ReactElement } from "react"

import Room from "./Room"
import Host from "./Host"

const App: React.FC<{}> = (): ReactElement => {
  return document.location.hash.replace("#/", "").startsWith("room=") ? (
    <Room />
  ) : (
    <Host />
  )
}

export default App
