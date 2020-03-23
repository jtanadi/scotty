import React, { ReactElement } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import Home from "./Home"
import Room from "./Room"

const App: React.FC<{}> = (): ReactElement => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/room=:id/file=:filename"
        render={({ match }): ReactElement => (
          <Room id={match.params.id} originalFilename={match.params.filename} />
        )}
      />
    </Router>
  )
}

export default hot(App)
