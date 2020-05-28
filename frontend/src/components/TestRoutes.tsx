import React, { ReactElement } from "react"
import { Route } from "react-router-dom"

import BeamingModal from "./BeamingModal"
import Loading from "./Loading"

const TestRoutes = (): ReactElement => {
  return (
    <>
      <Route path="/test/loading" component={Loading} />
      <Route
        path="/test/beaming"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            message="Message from server"
            handleTryAgain={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/beaming-error"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            error="Error message"
            handleTryAgain={(): void => {}}
          />
        )}
      />
    </>
  )
}

export default TestRoutes
