import React, { ReactElement } from "react"
import { HashRouter as Router, Route } from "react-router-dom"

import Home from "./Home"
import Room from "./Room"

const App: React.FC<{}> = (): ReactElement => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/room=:id"
        render={({ match }): ReactElement => <Room id={match.params.id} />}
      />
    </Router>
  )
}

export default App
