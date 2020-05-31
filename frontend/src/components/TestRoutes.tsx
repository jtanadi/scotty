import React, { ReactElement } from "react"
import { Route } from "react-router-dom"

import BeamingModal from "./BeamingModal"
import Loading from "./Loading"
import LinkModal from "./LinkModal"
import NavBar from "./NavBar"

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

      <Route
        path="/test/NavBar"
        render={(): ReactElement => (
          <NavBar
            pageNum={1}
            maxPage={2}
            filename="test"
            users={[]}
            showMouse={false}
            pointerColor="#ffffff"
            handleChangePage={(): void => {}}
            handleClose={(): void => {}}
          />
        )}
      />
    </>
  )
}

export default TestRoutes
