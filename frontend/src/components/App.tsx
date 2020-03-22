import React, { ReactElement } from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Room from "./Room"
import Host from "./Host"

const App: React.FC<{}> = (): ReactElement => {
  return (
    <Router>
      <Route exact path="/">
        <Host />
      </Route>
      <Route
        path="/room=:id"
        render={({ match }): ReactElement => <Room id={match.params.id} />}
      />
    </Router>
  )
}

export default App
