import React, { ReactElement } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import Home from "./Home"
import Room from "./Room"
import TestRoutes from "./TestRoutes"

const App: React.FC<{}> = (): ReactElement => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/room=:id"
        render={({ match }): ReactElement => <Room id={match.params.id} />}
      />
      {window.location.hostname === "localhost" ? <TestRoutes /> : null}
    </Router>
  )
}

export default hot(App)
