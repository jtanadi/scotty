import React, { ReactElement } from "react"
import { Route } from "react-router-dom"

import BeamingModal from "./BeamingModal"
import Loading from "./Loading"
import LinkModal from "./LinkModal"

const TestRoutes = (): ReactElement => {
  return (
    <>
      <Route path="/test/loading" component={Loading} />
      <Route
        path="/test/BeamingModal"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            message="Message from server"
            handleTryAgain={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/BeamingModal-error"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            error="Error message"
            handleTryAgain={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/LinkModal"
        render={(): ReactElement => <LinkModal link="http://testlink.com" />}
      />
    </>
  )
}

export default TestRoutes
